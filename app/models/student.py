from django.db import models

from .skill import Skill


class Student(models.Model):
    firstname = models.CharField(max_length=127)
    lastname = models.CharField(max_length=127)
    dateofbirth = models.DateField()
    profile_picture = models.ImageField()
    description = models.TextField(null=True)

    skills = models.ManyToManyField(Skill)
