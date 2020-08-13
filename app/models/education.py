from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

from .school import School
from .student import Student


class Education(ExportModelOperationsMixin('education'), models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    degree = models.CharField(max_length=32)
    major = models.CharField(max_length=255)
