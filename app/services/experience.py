from datetime import date

from app.models.experience import Experience
from app.models.student import Student
from app.models.account import Account
from app.models.company import Company
from app.exceptions import InvalidInputFormat


def list_experience(*, id: int) -> list:
    experience = Experience.objects.filter(student__account__id=id)
    result = []
    for e in experience:
        if e.company:
            result.append({
                'id': e.id,
                'company_name': e.company.name,
                'profile_picture': e.company.profile_picture,
                'start_date': e.start_date,
                'end_date': e.end_date,
                'title': e.title,
                'description': e.description
            })
        else:
            result.append({
                'id': e.id,
                'company_name': e.company_name,
                'profile_picture': None,
                'start_date': e.start_date,
                'end_date': e.end_date,
                'title': e.title,
                'description': e.description
            })
    return result


def create_experience(*, account: Account, company_name: str, start_date: date, end_date: date, title: str, description: str) -> list:
    comp = get_company_with_name(company_name)
    e = Experience(
        student=get_student_account(account),
        company=None,
        company_name=None,
        start_date=start_date,
        end_date=end_date,
        title=title,
        description=description
    )
    if comp is None:
        e.company_name = company_name
    else:
        e.company = comp
    e.save()
    return list_experience(id=account.id)


def update_experience(*, account: Account, id: int, experience: dict) -> list:
    e = Experience.objects.filter(id=id).first()
    if e is None:
        raise InvalidInputFormat("Old experience entry not found!")
    comp = get_company_with_name(experience.company_name)
    e.start_date = experience.start_date
    e.end_date = experience.end_date
    e.title = experience.title
    e.description = experience.description
    if comp is None:
        e.company = None
        e.company_name = experience.company_name
    else:
        e.company = comp
        e.company_name = None
    e.save()
    return list_experience(id=account.id)


def delete_experience(*, account: Account, id: int) -> list:
    e = Experience.objects.filter(id=id).first()
    if e is None:
        raise InvalidInputFormat("Experience entry not found!")
    e.delete()
    return list_experience(id=account.id)


def get_student_account(account: Account) -> Student:
    e = Student.objects.filter(account=account).first()
    if e is None:
        raise InvalidInputFormat("Student not found!")
    return e


def get_company_with_name(company_name: str) -> Company:
    return Company.objects.filter(name=company_name).first()
