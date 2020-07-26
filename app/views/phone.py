from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.services.phone import list_phone, create_phone, update_phone, delete_phone


class PhoneListView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PhoneListIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        phones = serializers.ListField()

        class Meta:
            ref_name = 'PhoneListOut'
            fields = ['phones']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = list_phone(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class PhoneCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        phone = serializers.CharField(required=True)

        class Meta:
            ref_name = 'PhoneCreateIn'
            fields = ['phone']

    class OutputSerializer(serializers.Serializer):
        phones = serializers.ListField()

        class Meta:
            ref_name = 'PhoneCreateOut'
            fields = ['phones']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_phone(account=request.user, **
                              serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)


class PhoneUpdateView(APIView):
    class InputSerializer(serializers.Serializer):
        old_phone = serializers.CharField(required=True)
        new_phone = serializers.CharField(required=True)

        class Meta:
            ref_name = 'PhoneUpdateIn'
            fields = ['old_phone', 'new_phone']

    class OutputSerializer(serializers.Serializer):
        phones = serializers.ListField()

        class Meta:
            ref_name = 'PhoneUpdateOut'
            fields = ['phones']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_phone(account=request.user, **
                              serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class PhoneDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        phone = serializers.CharField(required=True)

        class Meta:
            ref_name = 'PhoneDeleteIn'
            fields = ['phone']

    class OutputSerializer(serializers.Serializer):
        phones = serializers.ListField()

        class Meta:
            ref_name = 'PhoneDeleteOut'
            fields = ['phones']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_phone(account=request.user, **
                              serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)
