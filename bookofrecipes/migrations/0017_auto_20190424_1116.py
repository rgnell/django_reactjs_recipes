# Generated by Django 2.2 on 2019-04-24 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookofrecipes', '0016_auto_20190424_1109'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='photo',
            field=models.ImageField(null=True, upload_to='static/', verbose_name='Фото'),
        ),
    ]
