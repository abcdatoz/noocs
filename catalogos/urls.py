from rest_framework import routers
from .api import TipoViewSet, BannerViewSet, MunicipioViewSet, EscuelaViewSet

router = routers.DefaultRouter()

router.register('api/tipos',TipoViewSet)
router.register('api/banner',BannerViewSet)
router.register('api/municipio', MunicipioViewSet)
router.register('api/escuela', EscuelaViewSet)

urlpatterns = router.urls