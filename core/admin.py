from django.contrib import admin
from django.utils.html import format_html
from .models import Service, ServiceImage  # CORREGIDO: Services -> Service

# Inline para ServiceImage con preview
class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 1
    readonly_fields = ('image_tag',)  # Campo solo lectura para la miniatura
    fields = ('image', 'image_tag')  # Mostrar el campo de imagen y la vista previa

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "-"
    image_tag.short_description = 'Vista previa'

# Admin para Service
class ServiceAdmin(admin.ModelAdmin):  # CORREGIDO: ServicesAdmin -> ServiceAdmin
    list_display = ('title', 'created', 'updated')
    search_fields = ('title', 'description')
    list_filter = ('created', 'updated')
    inlines = [ServiceImageInline]

# Registrar los modelos
admin.site.register(Service, ServiceAdmin)  # CORREGIDO
admin.site.register(ServiceImage)
admin.site.site_header = "Administración de DITAI"
admin.site.site_title = "DITAI Admin"
admin.site.index_title = "Panel de Administración de DITAI"
admin.site.empty_value_display = "-empty-"
admin.site.site_url = None  # Deshabilitar el enlace al sitio público
admin.site.enable_nav_sidebar = False  # Deshabilitar la barra lateral de navegación

