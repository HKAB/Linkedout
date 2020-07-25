from django.db import models
from .student import Student
from .skill import Skill

class Student_skill(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    skill=models.ForeignKey(Skill,on_delete=models.CASCADE)
