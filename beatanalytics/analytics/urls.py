from django.urls import path

from . import views

urlpatterns = [
    path('artists', views.artists, name='artists'),
]
