from django.db import models
from .company import Company
class Experience(models.Model):
    company=models.ForeignKey(Company,on_delete=models.CASCADE)
    start_date=models.DateField()
    end_date=models.DateField()
    company_name=models.CharField(max_length=255)
    title=models.CharField(max_length=64)
    description=models.TextField(max_length=2048)
       