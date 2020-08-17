from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

from .account import Account


class Email(ExportModelOperationsMixin('email'), models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    email = models.CharField(max_length=128)
