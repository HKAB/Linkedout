import os

from app.models.account import Account
from app.models.student import Student
from app.exceptions import InvalidInputFormat
from backend.settings import MEDIA_ROOT


def get_student(*, id: int) -> Student:
    s = Student.objects.filter(account__id=id).first()
    if s is None:
        raise InvalidInputFormat(
            "Student with account id {} not found.".format(id))
    return s


def create_student(*, account: Account, firstname: str, lastname: str, dateofbirth: str, gender: str, **kwargs) -> Student:
    student_account_check(account)
    if student_exist(account.id, raise_exception=False):
        raise InvalidInputFormat(
            "Account {} already has a student.".format(account.id))
    s = Student(account=account, firstname=firstname, lastname=lastname,
                dateofbirth=dateofbirth, gender=gender, **kwargs)
    s.save()
    return s


def update_student(*, account: Account, firstname: str, lastname: str, dateofbirth: str,gender:str, **kwargs) -> Student:
    student_account_check(account)
    student_exist(account.id)
    s = Student.objects.filter(account=account)
    s.update(account=account, firstname=firstname, lastname=lastname,
             dateofbirth=dateofbirth, gender=gender, **kwargs)
    return s.first()


def set_profile_picture(account: Account, file_instance):
    student_exist(account.id)
    if file_instance.name.split('.')[-1] not in ['png', 'jpg', 'jpeg']:
        raise InvalidInputFormat(
            "File extension must be 'png', 'jpg' or 'jpeg'")
    s = Student.objects.get(account__id=account.id)
    if s.profile_picture != Student._meta.get_field('profile_picture').get_default():
        old_file_path = os.path.join(MEDIA_ROOT, s.profile_picture.name)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)
    s.profile_picture.save(file_instance.name, file_instance, save=True)


def student_exist(account_id: str, raise_exception=True) -> bool:
    s = Student.objects.filter(account__id=account_id).first()
    if s is None:
        if raise_exception:
            raise InvalidInputFormat(
                "Student with account id {} not found.".format(account_id))
        return False
    return True


def student_account_check(account: Account, raise_exception=True):
    if account.account_type != 'student':
        if raise_exception:
            raise InvalidInputFormat(
                'Account {} is not a student account.'.format(account.id))
        return False
    return True
