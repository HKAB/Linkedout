from hashlib import sha256
import datetime
import jwt
import re

from django.db import transaction

from backend.settings import SECRET_KEY
from app.models.account import Account
from app.services.email import create_email
from app.exceptions import InvalidInputFormat

PASSWORD_SALT = 'SALT'

@transaction.atomic
def create_account(*, username: str, password: str, email: str) -> Account:
    """
    Create user account if not exist. Return Account object on success, None on failure.
    """
    username_format_check(username)
    password_format_check(password)
    account = Account.objects.filter(username=username).first()
    if account:
        return None
    m = sha256()
    m.update((password + PASSWORD_SALT).encode('utf-8'))
    password_hash = m.hexdigest()
    account = Account(username=username, password=password_hash)
    account.save()
    create_email(email=email, account=account)
    return account

def login(*, username: str, password: str) -> Account:
    """
    Login with plaintext password. Return Account object on success, None on failure.
    """
    m = sha256()
    m.update((password + PASSWORD_SALT).encode('utf-8'))
    password_hash = m.hexdigest()
    return Account.objects.filter(username=username, password=password_hash).first()

def generate_access_token(account: Account) -> str:
    """
    Generate JWT access token for a particular account.
    """
    access_token_payload = {
        'user_id': account.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=10),
        'iat': datetime.datetime.utcnow(),
    }
    access_token = jwt.encode(access_token_payload, SECRET_KEY, algorithm='HS256').decode('utf-8')
    return access_token

def username_format_check(username: str, raise_exception=True) -> bool:
    if len(username) > 36 or len(username) < 6:
        if raise_exception:
            raise InvalidInputFormat("Username must be 6 to 36 characters long.")
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
            raise InvalidInputFormat("Password must be 8 to 36 characters long.")
        return False
    return True
    