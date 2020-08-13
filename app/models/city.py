from django.db import models
from django_prometheus.models import ExportModelOperationsMixin


class City(ExportModelOperationsMixin('city'), models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name
