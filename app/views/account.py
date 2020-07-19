from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import exceptions, status

from app.models.account import Account
from app.services.account import login, create_account, generate_access_token


class LoginView(APIView):
    class OutputSerializer(ModelSerializer):
        class Meta:
            model = Account
            fields = ['id', 'username']
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        response = Response()
        if (username is None) or (password is None):
            raise exceptions.AuthenticationFailed('Username and password required')

        account = login(username=username, password=password)
        if account is None:
            raise exceptions.AuthenticationFailed('Incorrect username or password')

        serialized_account = self.OutputSerializer(account).data
        access_token = generate_access_token(account)

        response = Response()
        response.status_code = status.HTTP_200_OK
        response.data = {
            'access_token': access_token,
            'account': serialized_account
        }
        return response
