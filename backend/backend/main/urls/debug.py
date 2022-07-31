from django.urls import path

from main import views

urlpatterns = [
    path(
        "record/<str:metric_name>/",
        views.debug.Index.as_view(),
        name="index",
    ),
]
