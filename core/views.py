from django.shortcuts import render, get_object_or_404
from .models import Service

# Vista del home
def home(request, section=None):
    services = Service.objects.order_by('?')
    return render(request, "core/home.html", {
        'services': services,
        'section': section,  # pasamos la sección al template
    })

# Vista para mostrar el detalle de un servicio
def service_detail(request, id):
    service = get_object_or_404(Service, id=id)
    return render(request, 'core/service_detail.html', {'service': service})
