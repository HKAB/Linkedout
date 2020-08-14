from app.models.account import Account
from app.models.company import Company
from app.models.student import Student
from app.exceptions import InvalidInputFormat


def check_follow(*, account: Account, id: int) -> bool:
    c = Company.objects.filter(account__id=id).first()
    if not c:
        raise InvalidInputFormat("Company with id {} doesn't exist.".format(id))
        return { 'followed': False }
    else:
        if c.followers.filter(account=account).exists():
            return { 'followed': True }
        return { 'followed': False }


def create_follow (*, account: Account, id: int) -> bool:
    c = Company.objects.filter(account__id=id).first()
    if not c:
        raise InvalidInputFormat("Company with id {} doesn't exist.".format(id))
        return { 'followed': False }

    student_account = get_student_account(account)
    if c.followers.filter(account=account).exists():
        raise InvalidInputFormat("User with id {} already followed comp. with id {}.".format(account.id, id))
    c.followers.add(student_account)
    return { 'followed': True }


def delete_follow (*, account: Account, id: int) -> bool:
    c = Company.objects.filter(account_id=id).first()
    if not c:
        raise InvalidInputFormat("Company with id {} doesn't exist.".format(id))
        return { 'followed': False }

    student_account = get_student_account(account)
    if not c.followers.filter(account=account).exists():
        raise InvalidInputFormat("User with id {} hasn't followed comp. with id {} yet.".format(account.id, id))
    c.followers.remove(student_account)
    return { 'followed': False }


def count_follow (*, account: Account, id: int) -> dict:
    c = Company.objects.filter(account__id=id).first()
    if not c:
        raise InvalidInputFormat("Company with id {} doesn't exist.".format(id))
        return { 'count': 0 }
    return {
        'count': c.followers.count()
    }


def company_followed (*, account: Account, id: int) -> list:
    companies = Company.objects.filter(followers=get_student_with_id(id))
    return [
        {
            'id': c.account.id,
            'name': c.name,
            'profile_picture': c.profile_picture,
            'description': c.description,
            'followed_count': c.followers.count(),
        } for c in companies
    ]


def get_student_account(account: Account) -> Student:
    e = Student.objects.filter(account=account).first()
    if e is None:
        raise InvalidInputFormat("Student not found!")
    return e

def get_student_with_id(id: int) -> Student:
    return Student.objects.filter(account__id=id).first()
