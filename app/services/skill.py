from datetime import date

from app.models.skill import Skill
from app.models.student import Student
from app.models.account import Account
from app.exceptions import InvalidInputFormat


def list_skill(*, id: int) -> dict:
    student_exist(id)
    skills = Student.objects.filter(account__id=id).first().skills.all()
    return {
        "skills": [s.name for s in skills]
    }


def create_skill(*, account: Account, skill: str) -> dict:
    student_exist(account.id)
    student_skill_not_exist(account.id, skill)
    s = Skill.objects.filter(name__iexact=skill).first()
    if s is None:
        raise InvalidInputFormat(
            "Skill with name {} does not exist in database.".format(skill))
    student = Student.objects.filter(account__id=account.id).first()
    student.skills.add(s)
    return {
        "skills": [s.name for s in student.skills.all()]
    }


def delete_skill(*, account: Account, skill: str) -> dict:
    student_exist(account.id)
    student_skill_exist(account.id, skill)
    s = Skill.objects.filter(name__iexact=skill).first()
    if s is None:
        raise InvalidInputFormat(
            "Skill with name {} does not exist in database.".format(skill))
    student = Student.objects.filter(account__id=account.id).first()
    student.skills.remove(s)
    return {
        "skills": [s.name for s in student.skills.all()]
    }


def student_exist(account_id: str, raise_exception=True) -> bool:
    s = Student.objects.filter(account__id=account_id).first()
    if s is None:
        if raise_exception:
            raise InvalidInputFormat(
                "Student with account id {} not found.".format(account_id))
        return False
    return True


def student_skill_exist(account_id: int, skill: str, raise_exception=True) -> bool:
    s = Student.objects.filter(
        account__id=account_id).first().skills.filter(name__iexact=skill).first()
    if s is None:
        if raise_exception:
            raise InvalidInputFormat(
                "Student has no skill '{}'.".format(s.name))
        return False
    return True


def student_skill_not_exist(account_id: int, skill: str, raise_exception=True) -> bool:
    s = Student.objects.filter(
        account__id=account_id).first().skills.filter(name__iexact=skill).first()
    if s is not None:
        if raise_exception:
            raise InvalidInputFormat(
                "Student already has skill '{}'.".format(s.name))
        return False
    return True
