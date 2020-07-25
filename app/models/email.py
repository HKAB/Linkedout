from django.db import models

from .account import Account


class Email(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    email = models.CharField(max_length=128)
