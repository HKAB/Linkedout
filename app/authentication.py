"""
Module for taking care of JWT based authentication.
https://dev.to/a_atalla/django-rest-framework-custom-jwt-authentication-5n5
"""

import jwt
from django.contrib.auth.models import User
from django.middleware.csrf import CsrfViewMiddleware
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication

from app.models.account import Account
from backend.settings import SECRET_KEY


class CSRFCheck(CsrfViewMiddleware):
    def _reject(self, request, reason):
        # Return the failure reason instead of an HttpResponse
        return reason


class JWTAuthentication(BaseAuthentication):
    """
    Custom authentication class.
    """

    def authenticate(self, request):
        authorization_heaader = request.headers.get('Authorization')

        if not authorization_heaader:
            return None

        try:
            access_token = authorization_heaader.split(' ')[1]
            payload = jwt.decode(access_token, SECRET_KEY,
                                 algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('access_token expired.')
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing.')
        except Exception as exc:
            print(exc)
            raise exceptions.AuthenticationFailed('Invalid access token.')

        account = Account.objects.get(id=payload['user_id'])
        if account is None:
            raise exceptions.AuthenticationFailed('User not found.')

        # self.enforce_csrf(request)
        return (account, None)

    def enforce_csrf(self, request):
        """
        Enforce CSRF validation
        """
        check = CSRFCheck()
        # populates request.META['CSRF_COOKIE'], which is used in process_view()
        check.process_request(request)
        reason = check.process_view(request, None, (), {})
        print(reason)
        if reason:
            # CSRF failed, bail with explicit error message
            raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)
