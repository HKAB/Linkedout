from django.db import models

from .student import Student
from .skill import Skill


class Post(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.TextField(max_length=256)
    content = models.TextField(max_length=1024)
    published_date = models.DateField()

    skills = models.ManyToManyField(Skill)
    interested_students = models.ManyToManyField(
        Student, related_name='interest')
