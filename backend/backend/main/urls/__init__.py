from django.conf import settings
from django.urls import path, include

app_name = "main"

urlpatterns = (
    [] + [path("debug", include("main.urls.debug"))] if settings.DEBUG else []
)
