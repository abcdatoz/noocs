from rest_framework import serializers
from catalogos.models import Tipo, Banner, Municipio, Escuela

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo 
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