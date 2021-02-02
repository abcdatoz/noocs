from catalogos.models import UsuarioEscuela, Tipo, Banner, Municipio, Escuela , Curso, VideoActividades
from catalogos.models import  Question, Answer, MisCursos

from .serializers import  UsuarioEscuelaSerializer, TipoSerializer, BannerSerializer, MunicipioSerializer,EscuelaSerializer, CursoSerializer, VideoActividadesSerializer 
from .serializers import  QuestionSerializer, AnswerSerializer, MisCursosSerializer


from rest_framework import viewsets, permissions
from rest_framework.response import Response
 
class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    permission_classes =  [permissions.AllowAny]
    serializer_class = TipoSerializer

class UsuarioEscuelaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioEscuela.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioEscuelaSerializer

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

    def create (self, request, *args, **kargs):
        data = request.data
        banner = Banner.objects.create(
            titulo = data['titulo'],
            imagen = data['imagen'],
            status = True,
            created_by = self.request.user,
            updated_by = 'usuario : ' + self.request.user.username
        )
        banner.save()
        serializer = BannerSerializer(banner)
        return Response(serializer.data)
    
    def update(self, request, *args, **kargs):
        data = request.data
        instance = self.get_object()
        instance.imagen.delete()
        instance.nombre = data['titulo']        
        instance.imagen = data['imagen']

        instance.save()
        serializer = BannerSerializer(instance)
        return Response(serializer.data)
         

    
    def destroy(self, request, *args, **kargs):
        instance = self.get_object()
        instance.imagen.delete()
        self.perform_destroy(instance)

        serializer = BannerSerializer(instance)        
        return Response(serializer.data)

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CursoSerializer

    def create (self, request, *args, **kargs):
        data = request.data
        curso = Curso.objects.create(
            nombre = data['nombre'],
            imagen = data['imagen'],
            descripcionA = data['descripcionA'],
            descripcionB = data['descripcionB'],
            descripcionC = data['descripcionC'],
            status = True,
            created_by = self.request.user,
            updated_by = 'usuario : ' + self.request.user.username
        )
        curso.save()
        serializer = CursoSerializer(curso)
        return Response(serializer.data)
    
    def update(self, request, *args, **kargs):
        data = request.data

        instance = self.get_object()
        instance.imagen.delete()
        instance.nombre = data['nombre']
        instance.descripcionA = data['descripcionA']
        instance.descripcionB = data['descripcionB']
        instance.descripcionC = data['descripcionC']
        instance.imagen = data['imagen']

        instance.save()
        serializer = CursoSerializer(instance)
        return Response(serializer.data)
         
    
    def destroy(self, request, *args, **kargs):
        instance = self.get_object()
        instance.imagen.delete()
        self.perform_destroy(instance)

        serializer = CursoSerializer(instance)        
        return Response(serializer.data)
 
class VideoActividadesViewSet(viewsets.ModelViewSet):
    queryset = VideoActividades.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = VideoActividadesSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = QuestionSerializer

    def create (self, request, *args, **kargs):
        data = request.data

        curso = Curso.objects.get(id=data['curso'])

        question = Question.objects.create(
            curso=curso,
            inciso = data['inciso'],
            pregunta = data['pregunta']
        )

        question.save()

        ans = Answer.objects.create( question = question, opcion = data['respuesta'], es_correcta = True )
        ansB = Answer.objects.create( question = question, opcion = data['opcionB'], es_correcta = False )
        ansC = Answer.objects.create( question = question, opcion = data['opcionC'], es_correcta = False )
        ansD = Answer.objects.create( question = question, opcion = data['opcionD'], es_correcta = False )

        ans.save()
        ansB.save()
        ansC.save()
        ansD.save()

        serializer = QuestionSerializer(question)
        return Response(serializer.data)




class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = AnswerSerializer


class MisCursosViewSet(viewsets.ModelViewSet):
    queryset = MisCursos.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = MisCursosSerializer

    def create (self, request, *args, **kargs):
        data = request.data 

        curso = Curso.objects.get(id=data['curso'])

        registro = MisCursos.objects.create(
            curso = curso,
            usuario = data['usuario'],
            estatus = 'Iniciado'             
        ) 

        registro.save()
        serializer = MisCursosSerializer(registro)
        return Response(serializer.data)
