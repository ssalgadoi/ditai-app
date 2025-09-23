from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('service/<int:id>/', views.service_detail, name='service_detail'),

    # Rutas limpias que apuntan al home con scroll automático
    path('nosotros/', views.home, {'section': 'nosotros'}, name='nosotros'),
    path('servicios/', views.home, {'section': 'servicios'}, name='servicios'),
    path('contacto/', views.home, {'section': 'contacto'}, name='contacto'),
]
