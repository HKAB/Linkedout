import re

from app.models.email import Email
from app.models.account import Account
from app.exceptions import InvalidInputFormat


def create_email(*, email: str, account: Account) -> Email:
    """
    Create new email with email string and corresponding account, return Email object on success.
    """
    email_format_check(email)
    new_email = Email(email=email, account=account)
    new_email.save()
    return new_email

def email_format_check(email: str, raise_exception=True) -> bool:
    if not re.fullmatch(r'[\w\-\.]+@([\w\-]+\.)+[\w-]{2,4}', email):
        if raise_exception:
            raise InvalidInputFormat('Invalid email.')
        return False
    return True