from django.db import models
from .account import Account

class Phone(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    phone = models.CharField(max_length=16)
    