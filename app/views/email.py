from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.models.account import Account
from app.services.email import get_email_list, create_email

class EmailView(APIView):
    # Default input serializer, use for POST and DELETE
    class InputSerializer(serializers.Serializer):
        email = serializers.CharField(required=True)

        class Meta:
            ref_name = 'Email'
            fields = ['email']

    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: "Email added"})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        create_email(**serializer.validated_data)
        return Response("Email added.", status=status.HTTP_201_CREATED)

    # Input serializer use only for GET
    class GETInputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'Email'
            fields = ['id']

    class GETOutputSerializer(serializers.Serializer):
        email_list = serializers.ListField(child = serializers.CharField())

        class Meta:
            ref_name = 'Email'
            fields = ['email_list']

    @swagger_auto_schema(query_serializer=GETInputSerializer, responses={200: GETOutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.GETInputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_email_list(**serializer.validated_data)
        return Response(self.GETOutputSerializer(result).data)
