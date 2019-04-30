from rest_framework import serializers
from bookofrecipes.models import Recipe
from django.contrib.auth.models import User
#from snippets.models import Snippet

class UserSerializer(serializers.ModelSerializer):
    #snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
    recipes = serializers.PrimaryKeyRelatedField(many=True, queryset=Recipe.objects.all())
    class Meta:
        model = User
        filds ={
            'id',
            'username',
            'recipes ',
        }

class RecipePreviewSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    datePublication = serializers.ReadOnlyField(source='datePublication.Recipe')
    class Meta:
        model = Recipe
        #author = UserSerializer(many=True)
        fields = [
            'id',
            'title',
            'photo',
            'amountIngred',
            'timePrepare',
            'category',
            'datePublication',
            'author',
            'url',
        ]

    #url = serializers.HyperlinkedIdentityField(view_name="get_post_recipes")

class RecipeDetailSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    datePublication = serializers.ReadOnlyField(source='datePublication.Recipe')
    class Meta:
        model = Recipe
        #author = UserSerializer(many=True)
        fields = [
           'id',
           'title',
           'photo',
           'amountIngred',
           'timePrepare',
           'portions',
           'ingredients',
           'recipe',
           'category',
           'author',
           'datePublication',
           'url',
        ]

    #url = serializers.HyperlinkedIdentityField(view_name="get_delete_update_recipe")

