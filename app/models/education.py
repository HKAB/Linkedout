from django.db import models
from .student import Student
from .school import School


class Education(models.Model):
    student= models.ForeignKey(Student,on_delete=models.CASCADE)
    school=models.ForeignKey(School,on_delete=models.CASCADE)
    start_date=models.DateField()
    end_date=models.DateField()
    degree=models.CharField(max_length=32)
    major=models.CharField(max=255)
    

