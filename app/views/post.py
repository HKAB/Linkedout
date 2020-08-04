from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.services.post import list_post, create_post, update_post, delete_post
from app.utils import inline_serializer

'''
class StudentRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Student.objects.get(name=data)
'''


class PostListView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PostListIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        content = serializers.CharField()
        published_date = serializers.DateField()
        interested_students = serializers.ListField()
        # interested_students=StudentRelatedField(queryset=Student.objects.all(),many=True)

        class Meta:
            ref_name = 'PostListOut'
            fields = ['id', 'content', 'published_date', 'interested_students']
    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = list_post(**serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class PostCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        content = serializers.CharField(required=True)
        published_date = serializers.DateField(required=True)
        interested_students = serializers.ListField()

        class Meta:
            ref_name = 'PostCreateIn'
            fields = ['id', 'content', 'published_date', 'interested_students']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        content = serializers.CharField()
        published_date = serializers.DateField()
        interested_students = serializers.ListField()

        class Meta:
            ref_name = 'PostCreateOut'
            fields = ['id', 'content', 'published_date', 'interested_students']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_post(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_201_CREATED)


class PostUpdateView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)
        post = inline_serializer(fields={
            'content': serializers.CharField(required=True),
            'published_date': serializers.DateField(required=True),
            'interested_students': serializers.ListField(required=True),
        })

        class Meta:
            ref_name = 'PostUpdateIn'
            fields = ['id', 'post']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        content = serializers.CharField()
        published_date = serializers.DateField()
        interested_students = serializers.ListField()

        class Meta:
            ref_name = 'PostUpdateOut'
            fields = ['id', 'content', 'published_date', 'interested_students']
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_post(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class PostDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PostDeleteIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        content = serializers.CharField()
        published_date = serializers.DateField()
        interested_students = serializers.ListField()

        class Meta:
            ref_name = 'PostDeleteOut'
            fields = ['id', 'content', 'published_date', 'interested_students']
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_post(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)
