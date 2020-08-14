from django.db import models
from django_prometheus.models import ExportModelOperationsMixin


class Title(ExportModelOperationsMixin('title'), models.Model):
    name = models.CharField(max_length=255)
