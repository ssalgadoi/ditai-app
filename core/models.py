from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=255, verbose_name="Título")
    description = models.TextField(verbose_name="Descripción")
    content = models.TextField(verbose_name="Contenido")
    imagen = models.ImageField(upload_to='services/images/', verbose_name="Imagen")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de edición")

    class Meta:
        verbose_name = "Servicio"
        verbose_name_plural = "Servicios"
        ordering = ["-created"]

    def __str__(self):
        return self.title


class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='imagenes')
    image = models.ImageField(upload_to="services/images", verbose_name="Imagen", null=True, blank=True)

    class Meta:
        verbose_name = "Imagen de servicio"
        verbose_name_plural = "Imágenes de servicio"
        

    def __str__(self):
        return f"Imagen de {self.service.title}"
