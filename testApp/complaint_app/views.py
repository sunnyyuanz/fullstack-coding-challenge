from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status 
from django.db.models import Count

# Create your views here.

# make user district as a global variable as this is the condition for all requests
def getUserDistrict(request):
  user = request.user
  profile = UserProfile.objects.all().filter(id=user.id).first()
  district = f'NYCC{int(profile.district):02}'
  return district

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all()
  def list(self, request):
    district = getUserDistrict(request)
    # Get all complaints from the user's district
    filtered_queryset = self.queryset.filter(account=district)
    serializer = self.serializer_class(filtered_queryset, many=True)
    return Response(serializer.data)

class LocalComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all()
  def list(self, request):
    district = getUserDistrict(request)
    # Get all complaints from the user's district
    filtered_queryset = self.queryset.filter(account=district, council_dist=district)
    serializer = self.serializer_class(filtered_queryset, many=True)
    return Response(serializer.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  queryset = Complaint.objects.all()
  serializer_class = ComplaintSerializer
  def list(self, request):
    district = getUserDistrict(request)
    # Get only the open complaints from the user's district
    #closedata_isnull = case still open, case still open = false = case is closed. exclude closed cases to get the open cases. 
    complaints = self.queryset.filter(account=district).exclude(closedate__isnull=False)

    serializer = self.serializer_class(complaints, many=True)

    return Response(serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  queryset = Complaint.objects.all()
  def list(self, request):
    district = getUserDistrict(request)
    # Get only complaints that are close from the user's district
    complaints = self.queryset.filter(account=district).exclude(closedate__isnull=True)

    serializer = ComplaintSerializer(complaints, many=True)
    
    return Response(serializer.data)
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  queryset = Complaint.objects.all()
  def list(self, request):
    district = getUserDistrict(request)
    complaints = self.queryset.filter(account = district)
    # Get the top 3 complaint types from the user's district

    # Insert all elements in Hash(complaintsTypes)
    complaintsTypes = (complaints
        .values('complaint_type')
        .annotate(c_count=Count('complaint_type'))
        .order_by('-c_count')
    )
    top3ComplaintTypes = complaintsTypes[0:3]
      
    return Response(map(lambda ct: ct['complaint_type'], top3ComplaintTypes))