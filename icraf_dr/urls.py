from django.conf.urls import patterns, url
from django.views.generic import TemplateView

urlpatterns = patterns(
    'icraf_dr.views',
    url(r'^$', 'index', name='icraf_dr_index'),
    url(r'^add_category$', 'add_category', name='icraf_dr_add_category'),
    url(r'^add_main$', 'add_main', name='icraf_dr_add_main'),
)
