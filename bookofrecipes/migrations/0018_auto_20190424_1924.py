# Generated by Django 2.2 on 2019-04-24 14:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookofrecipes', '0017_auto_20190424_1116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='datePublication',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
