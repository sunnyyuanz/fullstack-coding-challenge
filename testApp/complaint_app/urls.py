from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, LocalComplaintViewSet

router = routers.SimpleRouter()
#router.register(r'', ComplaintViewSet, base_name='complaint')
router.register(r'openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')
router.register(r'localComplaints', LocalComplaintViewSet, base_name='localComplaints')
urlpatterns = [
    path('', ComplaintViewSet.as_view({'get': 'list'}))
]
urlpatterns += router.urls