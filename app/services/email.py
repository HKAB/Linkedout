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


def list_email(*, id: int) -> list:
    emails = Email.objects.filter(id=id)
    return [e.email for e in emails]


def email_format_check(email: str, raise_exception=True) -> bool:
    # Just place this here for reference later (and I don't have to search again):
    # https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression

    if not re.fullmatch(r'[\w\_\-\.]+@([\w\-]+\.)+[\w-]{2,4}', email):
        if raise_exception:
            raise InvalidInputFormat('Invalid email address.')
        return False
    return True
