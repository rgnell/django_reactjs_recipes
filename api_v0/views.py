from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets
from .serializers import *
from bookofrecipes.models import Recipe
#from snippets.serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly, IsAuthenticated
from .pagination import CustomPagination

#work
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    #permission_classes = [IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.action == 'list':
            return RecipePreviewSerializer
        else:
            return RecipeDetailSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticatedOrReadOnly]
        elif self.action == 'create': #or self.action == 'update' or self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)









