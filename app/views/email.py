from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.services.email import list_email, create_email, update_email, delete_email


class EmailListView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'EmailListIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        emails = serializers.ListField()

        class Meta:
            ref_name = 'EmailListOut'
            fields = ['emails']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = list_email(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class EmailCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.CharField(required=True)

        class Meta:
            ref_name = 'EmailCreateIn'
            fields = ['email']

    class OutputSerializer(serializers.Serializer):
        emails = serializers.ListField()

        class Meta:
            ref_name = 'EmailCreateOut'
            fields = ['emails']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_email(account=request.user, **
                              serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)


class EmailUpdateView(APIView):
    class InputSerializer(serializers.Serializer):
        old_email = serializers.CharField(required=True)
        new_email = serializers.CharField(required=True)

        class Meta:
            ref_name = 'EmailUpdateIn'
            fields = ['old_email', 'new_email']

    class OutputSerializer(serializers.Serializer):
        emails = serializers.ListField()

        class Meta:
            ref_name = 'EmailUpdateOut'
            fields = ['emails']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_email(account=request.user, **
                              serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class EmailDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.CharField(required=True)

        class Meta:
            ref_name = 'EmailDeleteIn'
            fields = ['email']

    class OutputSerializer(serializers.Serializer):
        emails = serializers.ListField()

        class Meta:
            ref_name = 'EmailDeleteOut'
            fields = ['emails']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_email(account=request.user, **
                              serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)
