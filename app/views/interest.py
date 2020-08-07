from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from app.services.interest import check_interest, create_interest, delete_interest, count_interest, account_interested, post_interested


class InterestCheckView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'InterestCheckIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        interested = serializers.BooleanField()

        class Meta:
            ref_name = 'InterestCheckOut'
            fields = ['interested']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = check_interest(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class InterestCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'InterestCreateIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        interested = serializers.BooleanField()

        class Meta:
            ref_name = 'InterestCreateOut'
            fields = ['interested']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_interest(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)


class InterestDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'InterestDeleteIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        interested = serializers.BooleanField()

        class Meta:
            ref_name = 'InterestDeleteOut'
            fields = ['interested']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_interest(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class InterestCountView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'InterestCountIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        count = serializers.IntegerField()

        class Meta:
            ref_name = 'InterestCountOut'
            fields = ['count']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = count_interest(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class AccountInterestedView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'AccountInterestedIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        firstname = serializers.CharField()
        lastname = serializers.CharField()
        profile_picture = serializers.ImageField()

        class Meta:
            ref_name = 'AccountInterestedOut'
            fields = ['id', 'firstname', 'lastname', 'profile_picture']

    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = account_interested(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class PostInterestedView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PostInterestedIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        title = serializers.CharField()
        content = serializers.CharField()
        interest_count = serializers.IntegerField()

        class Meta:
            ref_name = 'PostInterestedOut'
            fields = ['id', 'title', 'content', 'interest_count']

    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = post_interested(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)
