from django.db import models
from django.contrib.auth.models import User, Group
from datetime import datetime


def add_to_default_group(sender, **kwargs):
    user = kwargs["instance"]
    if kwargs["created"]:
        group = Group.objects.get(name='user_recipe')
        user.groups.add(group)


# Create your models here.
class Recipe(models.Model):
    title = models.CharField("Название",max_length=100)
    amountIngred = models.IntegerField("Количество ингредиентов")
    timePrepare = models.CharField("Время приготовления",max_length=20)
    portions = models.IntegerField("Количество порций",null=True,default=1)
    ingredients = models.TextField("Ингредиенты")
    recipe = models.TextField("Рецепт")
    CATEGORIES = [
        ("О","Основные блюда"),
        ("В","Выпечка"),
        ("З","Закуски"),
        ("Д","Десерты"),
        ("Н","Напитки"),

    ]
    category = models.CharField("Категория",max_length=1, choices=CATEGORIES, blank=True, default='О')
    author = models.ForeignKey(User,verbose_name="Автор",max_length=50,on_delete=models.SET_NULL,null=True) #related_name='snippets'
    #author = models.CharField(max_length=50, null=True)
    photo = models.ImageField("Фото",upload_to='static/',null=True)
    datePublication = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.title
    '''
    def get_absolute_url(self):
        return reverse('recipe-detail', args=[str(self.id)])
    '''
    class Meta:
        ordering = ["category"]
        verbose_name = "Рецепт"
        verbose_name_plural = "Рецепты"

    def pre_save(self, obj):
        obj.photo = self.request.FILES.get('file')