from django.db import models
from .student import Student
from .student_post import Student_post


class Interest(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    student_post = models.ForeignKey(Student_post, on_delete=models.CASCADE)
