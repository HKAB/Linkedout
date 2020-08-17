from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

from .account import Account


class Phone(ExportModelOperationsMixin('phone'), models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    phone = models.CharField(max_length=16)
