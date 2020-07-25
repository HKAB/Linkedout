from django.db import models
from .account import Account



class Student_post(models.Model):
    account= models.ForeignKey(Account,on_delete=models.CASCADE)
    content=models.CharField(max_length=32)
    published_date=models.DateField()