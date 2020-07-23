from hashlib import sha256
import datetime
import jwt
import re

from django.db import transaction
from rest_framework.exceptions import AuthenticationFailed

from backend.settings import SECRET_KEY
from app.models.account import Account
from app.services.email import create_email
from app.exceptions import InvalidInputFormat

PASSWORD_SALT = 'SALT'


@transaction.atomic
def create_account(*, username: str, password: str, email: str, account_type: str) -> Account:
    """
    Create user account if not exist. Return Account object on success, None on failure.
    """
    username_format_check(username)
    password_format_check(password)
    account_type_check(account_type)
    account = Account.objects.filter(username=username).first()
    if account:
        return None
    account = Account(username=username, password=hashed_password(password),
                      account_type=account_type)
    account.save()
    create_email(email=email, account=account)
    return account


def login(*, username: str, password: str) -> dict:
    """
    Login with plaintext password. Return dictionary contains access_token and Account fields.
    """
    account = Account.objects.filter(
        username=username, password=hashed_password(password)).first()
    if not account:
        raise AuthenticationFailed("Incorrect username or password.")
    access_token = generate_access_token(account)
    return {
        'access_token': access_token,
        'account': {
            'id': account.id,
            'username': account.username,
            'account_type': account.account_type,
        }
    }


def change_password(*, account: Account, current_password: str, new_password: str) -> Account:
    if account.password != hashed_password(current_password):
        raise InvalidInputFormat("Wrong current password.")
    account.password = hashed_password(new_password)
    account.save()


def hashed_password(password: str) -> str:
    m = sha256()
    m.update((password + PASSWORD_SALT).encode('utf-8'))
    return m.hexdigest()


def generate_access_token(account: Account) -> str:
    """
    Generate JWT access token for a particular account.
    """
    access_token_payload = {
        'user_id': account.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=10),
        'iat': datetime.datetime.utcnow(),
    }
    access_token = jwt.encode(access_token_payload,
                              SECRET_KEY, algorithm='HS256').decode('utf-8')
    return access_token


def username_format_check(username: str, raise_exception=True) -> bool:
    if len(username) > 36 or len(username) < 6:
        if raise_exception:
            raise InvalidInputFormat(
                "Username must be 6 to 36 characters long.")
        return False
    match = re.fullmatch(r'[A-Za-z0-9.]+', username)
    if not match:
        if raise_exception:
            raise InvalidInputFormat("Username must be alphanumeric")
        return False
    return True


def password_format_check(password: str, raise_exception=True) -> bool:
    if len(password) > 36 or len(password) < 8:
        if raise_exception:
            raise InvalidInputFormat(
                "Password must be 8 to 36 characters long.")
        return False
    return True


def account_type_check(account_type: str, raise_exception=True) -> bool:
    if not account_type in ['student', 'company']:
        if raise_exception:
            raise InvalidInputFormat(
                "account_type should be 'student' or 'company'.")
            return False
    return True
