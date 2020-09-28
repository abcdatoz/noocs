from catalogos.models import Tipo 
from rest_framework import viewsets, permissions
from .serializers import TipoSerializer


class TipoViewSet(viewsets.ModelViewSet):
    queryset = Tipo.objects.all()
    permission_classes =  [permissions.AllowAny]
    serializer_class = TipoSerializer

