from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path(
        "api/",
        include("api.urls"),
    ),
    re_path(".*", TemplateView.as_view(template_name="index.html")),
]
