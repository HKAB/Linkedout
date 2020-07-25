from django.db import models

from .student import Student


class Post(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    content = models.TextField(max_length=1024)
    published_date = models.DateField()

    interested_students = models.ManyToManyField(
        Student, related_name='interest')
