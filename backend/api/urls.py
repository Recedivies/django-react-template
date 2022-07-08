from django.contrib import admin
from django.urls import include, path

from api.views import SimpleAPIView, HealthCheckAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/", include("users.urls")),
    path("test", SimpleAPIView.as_view(), name="test_api_view"),
    path("health", HealthCheckAPIView.as_view(), name="health-check"),
]
