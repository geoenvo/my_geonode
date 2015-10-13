from django.contrib import admin
from icraf_dr.models import *

class ReadOnlyModelAdmin(admin.ModelAdmin):
    """ModelAdmin class that prevents modifications through the admin.

    The changelist and the detail view work, but a 403 is returned
    if one actually tries to edit an object.

    Source: https://gist.github.com/aaugustin/1388243
    """

    actions = None

    def get_readonly_fields(self, request, obj=None):
        return self.fields or [f.name for f in self.model._meta.fields]

    def has_add_permission(self, request):
        return False

    # Allow viewing objects but not actually changing them
    def has_change_permission(self, request, obj=None):
        if request.method not in ('GET', 'HEAD'):
            return False
        return super(ReadOnlyModelAdmin, self).has_change_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        return False

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('cat_num', 'cat_alp','cat_name')
    ordering = ['cat_num']

class CoverageAdmin(admin.ModelAdmin):
    list_display = ('cov_num', 'cov_alp', 'cov_name')
    ordering = ['cov_num']

class SourceAdmin(admin.ModelAdmin):
    list_display = ('src_num', 'src_alp', 'src_name')
    ordering = ['src_num']

class YearAdmin(admin.ModelAdmin):
    list_display = ('year_num', 'year_alp', 'year_name')
    ordering = ['year_num']

class MainAdmin(ReadOnlyModelAdmin):
    list_display = ('category', 'coverage', 'source', 'year', 'basename')
    
    def category(self, instance):
        return '%s-%s-%s' % (instance.category.cat_num, instance.category.cat_alp, instance.category.cat_name)
    
    def coverage(self, instance):
        return '%s-%s-%s' % (instance.coverage.cov_num, instance.coverage.cov_alp, instance.coverage.cov_name)
    
    def source(self, instance):
        return '%s-%s-%s' % (instance.source.src_num, instance.source.src_alp, instance.source.src_name)
    
    def year(self, instance):
        return '%s-%s-%s' % (str(instance.year.year_num), instance.year.year_alp, instance.year.year_name)

class SliderAdmin(admin.ModelAdmin):
  list_display = ('position', 'image', 'is_published')
  ordering = ['position']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Coverage, CoverageAdmin)
admin.site.register(Source, SourceAdmin)
admin.site.register(Year, YearAdmin)
admin.site.register(Main, MainAdmin)
admin.site.register(Slider, SliderAdmin)
