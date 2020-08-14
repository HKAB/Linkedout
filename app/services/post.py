import os
from datetime import date

from app.models.post import Post
from app.models.student import Student
from app.models.account import Account
from app.exceptions import InvalidInputFormat
from backend.settings import MEDIA_ROOT



def list_post(*, id: int) -> list:
    posts = Post.objects.filter(student__account__id=id)
    return [
        {
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'published_date': p.published_date,
            'post_picture': p.post_picture,
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
    p.save()
    p.skills.add(*skills)
    return list_post(id=account.id)


def update_post(*, account: Account, id: int, title: str, content: str, skills: list) -> list:
    student_account_check(account)
    author_check(account, id)
    p = Post.objects.filter(id=id)
    p.update(
        title=title,
        content=content,
        published_date=date.today()
    )
    p.first().skills.clear()
    p.first().skills.add(*skills)

    return list_post(id=account.id)


def delete_post(*, account: Account, id: int) -> list:
    student_account_check(account)
    author_check(account, id)
    p = Post.objects.filter(id=id).first()
    if p is None:
        raise InvalidInputFormat("Post with id {} not found".format(id))
    p.delete()
    return list_post(id=account.id)


def set_post_picture(account: Account, id: int, file_instance):
    student_account_check(account)
    post_exist(id)
    author_check(account, id)
    if file_instance.name.split('.')[-1] not in ['png', 'jpg', 'jpeg']:
        raise InvalidInputFormat(
            "File extension must be 'png', 'jpg' or 'jpeg'")
    p = Post.objects.get(id=id)
    if p.post_picture != Post._meta.get_field('post_picture').get_default():
        old_file_path = os.path.join(MEDIA_ROOT, p.post_picture.name)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)
    p.post_picture.save(file_instance.name, file_instance, save=True)


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

def author_check(account: Account, id: int) -> bool:
    p = Post.objects.filter(id=id).first()
    if p.student != get_student_account(account):
        raise InvalidInputFormat('Account with id {} isn\'t author of post with id {}'.format(account.id, id))
        return False
    return True

def post_exist(id: int, raise_exception=True) -> bool:
    p = Post.objects.filter(id=id).first()
    if p is None:
        if raise_exception:
            raise InvalidInputFormat("Post with id {} not found.".format(id))
        return False
    return True
