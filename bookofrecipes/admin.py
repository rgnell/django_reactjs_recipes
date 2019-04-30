from django.contrib import admin

# Register your models here.
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'amountIngred', 'timePrepare', 'category')
    list_filter = ('category','timePrepare')
