# Generated by Django 2.2 on 2019-04-21 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookofrecipes', '0007_auto_20190422_0006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='author',
            field=models.CharField(max_length=50, verbose_name='Автор'),
        ),
    ]
