from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError
from drf_yasg.utils import swagger_auto_schema

from app.models.student import Student
from app.services.student import get_student, create_student, update_student


class StudentProfilePictureView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, format=None):
        try:
            f = request.data['file']
            Student.objects.get(account__id=user.id).profile_picture.save(
                f.name, f, save=True)
        except KeyError:
            raise ParseError("'file' field missing.")
        return Response(status=status.HTTP_201_CREATED)


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

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializers = self.InputSerializer(data=request.query_params)
        serializers.is_valid(raise_exception=True)
        result = get_student(**serializers.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class StudentCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        student = serializers.CharField(required=True)

        class Meta:
            ref_name = 'StudentCreateIn'
            fields = ['student']

    class OutputSerializer(serializers.Serializer):
        students = serializers.ListField()

        class Meta:
            ref_name = 'StudentCreateOut'
            fields = ['students']

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
    class InputSerializer(serializers.Serializer):
        old_student = serializers.CharField(required=True)
        new_student = serializers.CharField(required=True)

        class Meta:
            ref_name = 'StudentUpdateIn'
            fields = ['old_student', 'new_student']

    class OutputSerializer(serializers.Serializer):
        students = serializers.ListField()

        class Meta:
            ref_name = 'StudentUpdateOut'
            fields = ['students']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_student(account=request.user, **
                                serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)
