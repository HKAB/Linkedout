from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.exceptions import ParseError
from drf_yasg.utils import swagger_auto_schema

from app.models.student import Student
from app.services.student import get_student, create_student, update_student, set_profile_picture


class StudentProfilePictureView(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            set_profile_picture(request.user, request.data['file'])
        except KeyError:
            raise ParseError("'file' field missing.")
        return Response("Uploaded.", status=status.HTTP_201_CREATED)


class StudentGetView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'StudentGetIn'
            fields = ['id']

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Student
            ref_name = 'StudentGetOut'
            fields = ['firstname', 'lastname', 'dateofbirth',
                      'profile_picture', 'description']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_student(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class StudentCreateView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Student
            ref_name = 'StudentCreateIn'
            fields = ['firstname', 'lastname', 'dateofbirth', 'description']

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Student
            ref_name = 'StudentCreateOut'
            fields = ['firstname', 'lastname', 'dateofbirth',
                      'profile_picture', 'description']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_student(account=request.user, **
                                serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)


class StudentUpdateView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Student
            ref_name = 'StudentUpdateIn'
            fields = ['firstname', 'lastname', 'dateofbirth', 'description']

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Student
            ref_name = 'StudentUpdateOut'
            fields = ['firstname', 'lastname', 'dateofbirth',
                      'profile_picture', 'description']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_student(account=request.user, **
                                serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)
