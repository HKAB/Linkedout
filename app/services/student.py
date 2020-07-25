

from app.models.account import Account
from app.models.student import Student
from app.exceptions import InvalidInputFormat


def get_student(*, id: int) -> dict:
    s = Student.objects.filter(account__id=id).first()
    if s is None:
        raise InvalidInputFormat(
            "Student with account id {} not found.".format(id))
    return {
        "firstname": s.firstname,
        "lastname": s.lastname,
        "dateofbirth": s.dateofbirth,
        "description": s.description,
    }


def create_student():
    pass


def update_student():
    pass


def student_exist(account_id: str, raise_exception=True) -> bool:
    s = Student.objects.filter(account__id=account_id).first()
    if s is None:
        if raise_exception:
            raise InvalidInputFormat(
                "Student with account id {} not found.".format(account_id))
        return False
    return True
