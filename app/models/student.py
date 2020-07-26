from django.db import models

from .account import Account
from .skill import Skill


class Student(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=127)
    lastname = models.CharField(max_length=127)
    dateofbirth = models.DateField()
    profile_picture = models.ImageField(
        null=True, upload_to='profile/', default='default.jpg')
    description = models.TextField(null=True)

    skills = models.ManyToManyField(Skill)
