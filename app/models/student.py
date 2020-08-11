from django.db import models

from .account import Account
from .skill import Skill


def store_picture(instance, filename: str) -> str:
    extension = filename.split('.')[-1]
    return "profile/student_" + "{}.{}".format(instance.account.username, extension)


class Student(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=127)
    lastname = models.CharField(max_length=127)
    dateofbirth = models.DateField()
    profile_picture = models.ImageField(
        upload_to=store_picture, default='profile/default.jpg')
    description = models.TextField(null=True)
    gender = models.CharField(max_length=8)
    skills = models.ManyToManyField(Skill)
