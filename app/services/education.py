from datetime import date

from app.models.education import Education
from app.models.student import Student
from app.models.account import Account
from app.models.school import School
from app.exceptions import InvalidInputFormat


def list_education(*, id: int) -> list:
    education = Education.objects.filter(student__account__id=id)
    return [
        {
            'id': e.id,
            'school_name': e.school.name,
            'start_date': e.start_date,
            'end_date': e.end_date,
            'major': e.major,
            'degree': e.degree
        } for e in education
    ]


def create_education(*, account: Account, school_name: str, start_date: date, end_date: date, major: str, degree: str) -> list:
    e = Education(
        student=get_student_account(account),
        school=get_school_with_name(school_name),
        start_date=start_date,
        end_date=end_date,
        major=major,
        degree=degree
    )
    e.save()
    return list_education(id=account.id)


def update_education(*, account: Account, id: int, education: dict) -> list:
    e = Education.objects.filter(id=id).first()
    if e is None:
        raise InvalidInputFormat("Old education entry not found!")
    e.school = get_school_with_name(education.school_name)
    e.start_date = education.start_date
    e.end_date = education.end_date
    e.degree = education.degree
    e.major = education.major
    e.save()
    return list_education(id=account.id)


def delete_education(*, account: Account, id: int) -> list:
    e = Education.objects.filter(id=id).first()
    if e is None:
        raise InvalidInputFormat("Education entry not found!")
    e.delete()
    return list_education(id=account.id)


def get_student_account(account: Account) -> Student:
    e = Student.objects.filter(account=account).first()
    if e is None:
        raise InvalidInputFormat("Student not found!")
    return e


def get_school_with_name(school_name: str) -> School:
    e = School.objects.filter(name=school_name).first()
    if e is None:
        raise InvalidInputFormat("School not exist!")
    return e
