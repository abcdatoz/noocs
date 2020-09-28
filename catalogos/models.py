from django.db import models

# Create your models here.

class Tipo(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=100) 

    def __str__(self):
        return self.nombre