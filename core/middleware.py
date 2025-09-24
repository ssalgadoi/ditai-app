from django.shortcuts import render
from django.conf import settings

class MantenimientoMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Si el modo mantenimiento está activo
        if getattr(settings, "MAINTENANCE_MODE", False):
            # Excluye el admin para que sigas entrando
            if not request.path.startswith("/admin/"):
                return render(request, "mantenimiento.html", status=503)
        return self.get_response(request)
