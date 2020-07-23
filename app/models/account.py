from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    account_type = models.CharField(max_length=10)

    @property
    def is_authenticated(self):
        return True
