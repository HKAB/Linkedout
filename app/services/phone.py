import re

from app.models.phone import Phone
from app.models.account import Account
from app.exceptions import InvalidInputFormat


def list_phone(*, id: int) -> dict:
    phone_list = Phone.objects.filter(account__id=id)
    return {"phones": [p.phone for p in phone_list]}


def create_phone(*, account: Account, phone: str) -> dict:
    """
    Create new phone with phone string and corresponding account,
    return all phones belong to that user on success.
    """
    phone_format_check(phone)
    phone_exist(account.id, phone)
    p = Phone(phone=phone, account=account)
    p.save()
    return {"phones": [p.phone for p in Phone.objects.filter(account__id=account.id)]}


def update_phone(*, account: Account, old_phone: str, new_phone: str) -> dict:
    phone_format_check(old_phone)
    phone_format_check(new_phone)
    p = Phone.objects.filter(account__id=account.id, phone=old_phone).first()
    if p is None:
        raise InvalidInputFormat("User has no phone number: " + old_phone)
    phone_exist(account.id, new_phone)
    p.phone = new_phone
    p.save()
    return {"phones": [p.phone for p in Phone.objects.filter(account__id=account.id)]}


def delete_phone(*, account: Account, phone: str) -> dict:
    phone_format_check(phone)
    p = Phone.objects.filter(account__id=account.id, phone=phone).first()
    if p is None:
        raise InvalidInputFormat("User has no phone number: " + phone)
    p.delete()
    return {"phones": [p.phone for p in Phone.objects.filter(account__id=account.id)]}


def phone_format_check(phone: str, raise_exception=True) -> bool:
    if not re.fullmatch(r'(\(?\+[0-9]{2}\)?)?[0-9]{1,11}', phone):
        if raise_exception:
            raise InvalidInputFormat('Invalid phone number.')
        return False
    return True


def phone_exist(account_id: int, phone: str, raise_exception=True) -> bool:
    p = Phone.objects.filter(account__id=account_id, phone=phone).first()
    if p is not None:
        if raise_exception:
            raise InvalidInputFormat(
                "Phone number already exist: " + phone)
        return False
    return True
