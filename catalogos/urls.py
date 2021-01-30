from rest_framework import routers
from .api import UsuarioEscuelaViewSet, TipoViewSet, BannerViewSet, MunicipioViewSet, EscuelaViewSet, CursoViewSet, VideoActividadesViewSet
from .api import QuestionViewSet, AnswerViewSet

router = routers.DefaultRouter()

router.register('api/tipos',TipoViewSet)
router.register('api/usuarioescuela',UsuarioEscuelaViewSet)
router.register('api/banner',BannerViewSet)
router.register('api/municipio', MunicipioViewSet)
router.register('api/escuela', EscuelaViewSet)
router.register('api/curso',CursoViewSet)
router.register('api/videoactividades', VideoActividadesViewSet)

router.register('api/question',QuestionViewSet)
router.register('api/answer',AnswerViewSet)

urlpatterns = router.urls