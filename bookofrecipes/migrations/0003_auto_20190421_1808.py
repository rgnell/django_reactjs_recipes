# Generated by Django 2.2 on 2019-04-21 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookofrecipes', '0002_auto_20190421_1806'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='photo',
            field=models.ImageField(upload_to='', verbose_name='Фото'),
        ),
    ]
