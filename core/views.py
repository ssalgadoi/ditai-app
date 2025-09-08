from django.shortcuts import render, get_object_or_404
from .models import Service

# Vista del home con todos los servicios
def home(request):
    services = Service.objects.order_by('?')  # Obtiene todos los servicios aleatoriamente
    return render(request, "core/home.html", {'services': services})

# Vista para mostrar el detalle de un servicio
def service_detail(request, id):
    service = get_object_or_404(Service, id=id)  # Obtiene el servicio por su ID
    return render(request, 'core/service_detail.html', {'service': service})
                