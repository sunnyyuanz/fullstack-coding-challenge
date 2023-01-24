from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status 
# Create your views here.

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  def retrieve(self, request, pk):
    user = User.objects.all().filter(username=pk).first()
    profile = UserProfile.objects.all().filter(id=user.id).first()
    print(UserProfileSerializer(profile).data)
    district = 'NYCC' + profile.district
    # Get all complaints from the user's district
    queryset = Complaint.objects.all().filter(account=district)
    serializer = ComplaintSerializer(queryset, many=True)
    return Response(serializer.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def retrieve(self, request,pk):
    user = UserProfile.objects.all().filter(full_name__contains=pk).first()
    district = 'NYCC' + user.district
  # Get only the open complaints from the user's district
  #closedata_isnull = case still open, case still open = false = case is closed. exclude closed cases to get the open cases. 
    complaints = Complaint.objects.all().filter(account=district).exclude(closedata_isnull=False)
    #queryset = Complaint.objects.all().filter(account=district).filter(closedata_isnull=true)

    print('inside open cases' + district)

    serializer = ComplaintSerializer(complaints, many=True)

    return Response(serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def retrieve(self, request, pk):
    user = UserProfile.objects.all().filter(full_name__contains=pk).first()
    district = 'NYCC' + user.district
    # Get only complaints that are close from the user's district
    complaints = Complaint.objects.all().filter(account=district).exclude(closedata_isnull=True)

    print('closed cases' + district)

    serializer = ComplaintSerializer(complaints, many=True)
    
    return Response(serializer.data)
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def retrieve(self, request, pk):
    user = UserProfile.objects.all().filter(full_name__contains=pk).first()
    district = 'NYCC' + user.district
    complaints = Complaint.objects.all().filter(account = district)
    n = len(complaints)
     # Get the top 3 complaint types from the user's district

      # Insert all elements in Hash(complaintsTypes)
    complaintsTypes = dict()
    #save the complaints type and counts as keys and values in the hash
    for i in range(n):
      if complaints[i].complaint_type in complaintsTypes.keys():
          complaintsTypes[complaints[i].complaint_type] += 1
      else:
          complaintsTypes[complaints[i].complaint_type] = 1
      
      # find the top 3 complaint Types
    top3ComplaintType = dict(sorted(complaintsTypes.items(), key=lambda d:d[1], reverse=True)[0:3])
      
    return Response(top3ComplaintType)