from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Tipo(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=100) 

    def __str__(self):
        return self.nombre

class Banner(models.Model):
    titulo = models.CharField(max_length=255)
    imagen = models.ImageField(upload_to='noocs_images/banner')
    status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_by = models.CharField(max_length=256)


class Municipio(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=255)
    status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_by = models.CharField(max_length=256)

    class Meta:
        ordering = ['clave']

class Escuela(models.Model):
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, null=True)
    clave = models.CharField(max_length=50)
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_by = models.CharField(max_length=256)

class Curso(models.Model):
    nombre = models.CharField(max_length=255)
    imagen = models.ImageField(upload_to='noocs_images/cursos')
    descripcionA =models.CharField(max_length=500)
    descripcionB =models.CharField(max_length=500)
    descripcionC =models.CharField(max_length=500)
    status = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_by = models.CharField(max_length=256)

class VideoActividades(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, null=False)
    tipo = models.CharField(max_length=50)
    orden = models.IntegerField()
    nombre = models.CharField(max_length=250)
    direccionURL = models.CharField(max_length=1028)

    class Meta:
        ordering = ['orden', 'nombre']


class Question(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, null=False)
    inciso = models.CharField(max_length=1)
    pregunta = models.CharField(max_length=255)

    class Meta:
        ordering = ['inciso']

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=False)
    opcion = models.CharField(max_length=100)
    es_correcta = models.BooleanField()
    class Meta:
        ordering = ['-es_correcta']

