import os

from app.models.account import Account
from app.models.company import Company
from app.exceptions import InvalidInputFormat
from backend.settings import MEDIA_ROOT


def get_company(*, id: int) -> Company:
    s = Company.objects.filter(account__id=id).first()
    if s is None:
        raise InvalidInputFormat(
            "Company with account id {} not found.".format(id))
    return s


def create_company(*, account: Account, name: str, website: str, specialties: list, **kwargs) -> Company:
    company_account_check(account)
    if company_exist(account.id, raise_exception=False):
        raise InvalidInputFormat(
            "Account {} already has a company account.".format(account.id))
    c = Company(account=account, name=name, website=website, **kwargs)
    c.save()
    c.specialties.add(*specialties)
    return c


def update_company(*, account: Account, name: str, website: str, specialties: list, **kwargs) -> Company:
    company_account_check(account)
    company_exist(account.id)
    c = Company.objects.filter(account=account)
    c.update(account=account, name=name, website=website, **kwargs)
    c.first().specialties.clear()
    c.first().specialties.add(*specialties)
    return c.first()


def set_profile_picture(account: Account, file_instance):
    company_exist(account.id)
    if file_instance.name.split('.')[-1] not in ['png', 'jpg', 'jpeg']:
        raise InvalidInputFormat(
            "File extension must be 'png', 'jpg' or 'jpeg'")
    c = Company.objects.get(account__id=account.id)
    if c.profile_picture != Company._meta.get_field('profile_picture').get_default():
        old_file_path = os.path.join(MEDIA_ROOT, c.profile_picture.name)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)
    c.profile_picture.save(file_instance.name, file_instance, save=True)


def company_exist(account_id: str, raise_exception=True) -> bool:
    c = Company.objects.filter(account__id=account_id).first()
    if c is None:
        if raise_exception:
            raise InvalidInputFormat(
                "Company with account id {} not found.".format(account_id))
        return False
    return True


def company_account_check(account: Account, raise_exception=True):
    if account.account_type != 'company':
        if raise_exception:
            raise InvalidInputFormat(
                'Account {} is not a company account.'.format(account.id))
        return False
    return True
