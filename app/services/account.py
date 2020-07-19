from hashlib import sha256
import datetime
import jwt

from django.db import transaction

from backend.settings import SECRET_KEY
from app.models.account import Account
from app.models.email import Email
from app.services.email import create_email

PASSWORD_SALT = 'SALT'

@transaction.atomic
def create_account(*, username: str, password: str, email: str) -> Account:
    """
    Create user account if not exist. Return Account object on success, None on failure.
    """
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
