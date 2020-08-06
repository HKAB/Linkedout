from datetime import date

from app.models.post import Post
from app.models.student import Student
from app.models.account import Account
from app.exceptions import InvalidInputFormat


def list_post(*, id: int) -> list:
    posts = Post.objects.filter(student__account__id=id)
    return [
        {
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'published_date': p.published_date,
            'skills': p.skills,
        } for p in posts
    ]


def get_post(*, id: int) -> Post:
    return Post.objects.filter(id=id).first()


def create_post(*, account: Account, title: str, content: str, skills: list) -> list:
    student_account_check(account)
    p = Post(
        student=get_student_account(account),
        title=title,
        content=content,
        published_date=date.today()
    )
    p.skills.add(*skills)
    p.save()
    return list_post(id=account.id)


def update_post(*, account: Account, id: int, title: str, content: str, skills: list) -> list:
    student_account_check(account)
    p = Post.objects.filter(id=id)
    p.update(
        title=title,
        content=content,
        published_date=date.today()
    )
    p.first().skills.add(*skills)

    return list_post(id=account.id)


def delete_post(*, account: Account, id: int) -> list:
    student_account_check(account)
    p = Post.objects.filter(id=id).first()
    if p is None:
        raise InvalidInputFormat("Post with id {} not found".format(id))
    p.delete()
    return list_post(id=account.id)


def student_account_check(account: Account, raise_exception=True):
    if account.account_type != 'student':
        if raise_exception:
            raise InvalidInputFormat('Account {} is not a student account.'.format(account.id))
        return False
    return True


def get_student_account(account: Account) -> Student:
    p = Student.objects.filter(account=account).first()
    if p is None:
        raise InvalidInputFormat("Student not found!")
    return p
