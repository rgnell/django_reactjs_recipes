from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import *
from django.urls import include, path, re_path
from django.conf.urls import url
from api_v0 import views
from rest_framework.urlpatterns import format_suffix_patterns
'''
router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)


urlpatterns = router.urls
'''
router = SimpleRouter()
router.register(r'recipes', RecipeViewSet)
#router.register(r'^recipes/', RecipeRetrieveUpdateDestroyView, base_name='get_delete_update_recipe')
#router.register(r'recipes', RecipeListCreateView, base_name='get_post_recipes')
urlpatterns = [
    url(r'', include(router.urls)),
]
urlpatterns = format_suffix_patterns(urlpatterns)
