from django.db import models
from django_prometheus.models import ExportModelOperationsMixin


class School(ExportModelOperationsMixin('school'), models.Model):
    name = models.CharField(max_length=255)
