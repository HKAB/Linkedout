import re

from app.models.email import Email
from app.models.account import Account
from app.exceptions import InvalidInputFormat


def list_email(*, id: int) -> dict:
    email_list = Email.objects.filter(account__id=id)
    return {"emails": [e.email for e in email_list]}


def create_email(*, account: Account, email: str) -> dict:
    """
    Create new email with email string and corresponding account,
    return all emails belong to that user on success.
    """
    email_format_check(email)
    email_exist(account.id, email)
    e = Email(email=email, account=account)
    e.save()
    return {"emails": [e.email for e in Email.objects.filter(account__id=account.id)]}


def update_email(*, account: Account, old_email: str, new_email: str) -> dict:
    email_format_check(old_email)
    email_format_check(new_email)
    e = Email.objects.filter(account__id=account.id, email=old_email).first()
    if e is None:
        raise InvalidInputFormat("User has no email: " + old_email)
    email_exist(account.id, new_email)
    e.email = new_email
    e.save()
    return {"emails": [e.email for e in Email.objects.filter(account__id=account.id)]}


def delete_email(*, account: Account, email: str) -> dict:
    email_format_check(email)
    e = Email.objects.filter(account__id=account.id, email=email).first()
    if e is None:
        raise InvalidInputFormat("User has no email: " + email)
    e.delete()
    return {"emails": [e.email for e in Email.objects.filter(account__id=account.id)]}


def email_format_check(email: str, raise_exception=True) -> bool:
    # Just place this here for reference later (and I don't have to search again):
    # https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression

    if not re.fullmatch(r'[\w\_\-\.]+@([\w\-]+\.)+[\w-]{2,4}', email):
        if raise_exception:
            raise InvalidInputFormat('Invalid email address.')
        return False
    return True


def email_exist(account_id: int, email: str, raise_exception=True) -> bool:
    p = Email.objects.filter(account__id=account_id, email=email).first()
    if p is not None:
        if raise_exception:
            raise InvalidInputFormat(
                "Email already exist: " + email)
        return False
    return True
