# Generated by Django 3.1 on 2021-01-31 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogos', '0011_miscursos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='miscursos',
            name='fecha',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]