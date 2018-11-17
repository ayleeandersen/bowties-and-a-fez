from django.urls import path

from . import views

urlpatterns = [
    path('<int:room_number>', views.room, name='room'),
]