from rest_framework import serializers
from catalogos.models import Tipo

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo 
        fields = '__all__'