from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import exceptions, status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.models.account import Account
from app.services.account import login, create_account, generate_access_token
from app.utils import inline_serializer


class LoginView(APIView):
    class OutputSerializer(serializers.Serializer):
        access_token = serializers.CharField()
        account = inline_serializer(fields={
            'id': serializers.IntegerField(),
            'username': serializers.CharField(),
            'account_type': serializers.CharField(),
        })

        class Meta:
            fields = ['access_token', 'account']

    class InputSerializer(serializers.Serializer):
        username = serializers.CharField(required=True)
        password = serializers.CharField(required=True)

        class Meta:
            fields = ['username', 'password']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = login(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data)


class RegisterView(APIView):
    class InputSerializer(serializers.Serializer):
        username = serializers.CharField(required=True)
        password = serializers.CharField(required=True)
        email = serializers.CharField(required=True)
        account_type = serializers.CharField(required=True)
    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={201: "User created"})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        account = create_account(**serializer.validated_data)
        if account is None:
            return Response("User already exist", status=status.HTTP_409_CONFLICT)
        return Response("User created", status=status.HTTP_201_CREATED)
