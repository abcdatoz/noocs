from rest_framework import serializers
from catalogos.models import UsuarioEscuela, Tipo, Banner, Municipio, Escuela, Curso, VideoActividades
from catalogos.models import Question, Answer, MisCursos

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo 
        fields = '__all__'

class UsuarioEscuelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioEscuela
        fields = '__all__'

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'

class MunicipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = '__all__'

class EscuelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escuela
        fields = '__all__'


class CursoSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Curso
        fields = '__all__'

class VideoActividadesSerializer (serializers.ModelSerializer):
    class Meta:
        model = VideoActividades
        fields = '__all__'

class QuestionSerializer (serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer (serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)
    class Meta:
        model = Answer
        fields = '__all__'

class MisCursosSerializer ( serializers.ModelSerializer):
    class Meta:
        model = MisCursos
        fields = '__all__'     
   