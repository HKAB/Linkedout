from datetime import date

from app.models.post import Post
from app.models.student import Student
from app.models.account import Account
from app.exceptions import InvalidInputFormat
import os

def list_post(*, id: int) -> list:
    post = Post.objects.filter(student__account__id=id)
    return [
        {
            'id': p.id,
            'content': p.content,
            'published_date': p.published_date,
            'interested_students': p.interested_students,
            'post_picture': p.post_picture
        } for p in post
    ]


def create_post(*, account: Account, content: str, published_date: date, interested_students: list) -> list:
    p = Post(
        student=get_student_account(account),
        content=content,
        published_date=date.today()
    )
    p.interested_students.add(*interested_students)
    p.save()
    return list_post(id=account.id)


def update_post(*, account: Account, id: int, content: str, published_date: date, interested_students: list) -> list:
    p = Post.objects.filter(id=id).first()
    # if p is None:
    #   raise InvalidInputFormat("Old post entry not found!")
    # p.content=post.content
   # p.published_date=post.published_date
    # p.interested_students.add(*interested_students)

    # p.save()
    p.update(
        student=get_student_account(account),
        content=content,
        published_date=date.today()
    )
    p.interested_students.add(*interested_students)
    p.save()
    return list_post(id=account.id)


def delete_post(*, account: Account, id: int) -> list:
    p = Post.objects.filter(id=id).first()
    if p is None:
        raise InvalidInputFormat("This post entry not found")
    p.delete()
    return list_post(id=account.id)


def get_student_account(account: Account) -> Student:
    p = Student.objects.filter(account=account).first()
    if p is None:
        raise InvalidInputFormat("Student not found!")
    return p

def set_post_picture(post: Post, file_instance):
    if file_instance.name.split('.')[-1] not in ['png', 'jpg', 'jpeg']:
        raise InvalidInputFormat(
            "File extension must be 'png', 'jpg' or 'jpeg'")
    p=Post.objects.get(post__id=post.id)
    if p.post_picture!=Post._meta.get_field('post_picture').get_default():
        old_file_path=os.path.join(MEDIA_ROOT,p.post_picture.name)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)
    p.post_picture.save(file_instance.name, file_instance, save=True)