from rest_framework import routers
from .api import TipoViewSet

router = routers.DefaultRouter()
router.register('api/tipos',TipoViewSet)


urlpatterns = router.urls