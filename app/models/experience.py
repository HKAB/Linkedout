from django.db import models

from .company import Company
from .student import Student


class Experience(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    company_name = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=64)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    description = models.TextField(max_length=2048, null=True)
