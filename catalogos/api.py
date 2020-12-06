from catalogos.models import Tipo, Banner, Municipio, Escuela 
from .serializers import TipoSerializer, BannerSerializer, MunicipioSerializer,EscuelaSerializer

from rest_framework import viewsets, permissions
from rest_framework.response import Response

class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    permission_classes =  [permissions.AllowAny]
    serializer_class = TipoSerializer


class MunicipioViewSet(viewsets.ModelViewSet):
    queryset = Municipio.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = MunicipioSerializer


    def create (self, request, *args, **kargs):
        data = request.data

        registro = Municipio.objects.create(
            clave = data['clave'],
            nombre = data['nombre'],
            status = True,
            created_by = self.request.user,
            updated_by = 'user : ' + self.request.user.username
        )
        registro.save()
        serializer = MunicipioSerializer(registro)
        return Response(serializer.data)

class EscuelaViewSet(viewsets.ModelViewSet):
    queryset = Escuela.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = EscuelaSerializer
    
    def create (self, request, *args, **kargs):
        data = request.data 

        municipio = Municipio.objects.get(id=data['municipio'])

        registro = Escuela.objects.create(
            municipio = municipio,
            clave = data['clave'],
            nombre = data['nombre'],
            direccion = data['direccion'],
            status = True,
            created_by = self.request.user,
            updated_by = 'user : ' + self.request.user.username
        ) 

        registro.save()
        serializer = EscuelaSerializer(registro)
        return Response(serializer.data)


class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = BannerSerializer


    def create(self, request, *arg, **kargs):
        data = request.data
        ban = Banner.objects.create(
            titulo = data['titulo'],
            imagen = data['imagen'],
            status = True,
            created_by = self.request.user,
            updated_by = 'usuario : ' + self.request.user.username
        )

        ban.save()
        serializer = BannerSerializer(ban)
        return Response(serializer.data)

    def destroy(self, request, *args, **kargs):
        instance = self.get_object()
        instance.imagen.delete()
        self.perform_destroy(instance)