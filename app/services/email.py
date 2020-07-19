from app.models.email import Email
from app.models.account import Account


def create_email(*, email: str, account: Account) -> Email:
    """
    Create new email with email string and corresponding account, return Email object on success.
    """
    new_email = Email(email=email, account=account)
    new_email.save()
    return new_email
