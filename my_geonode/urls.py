from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from geonode.urls import *

urlpatterns = patterns('',
   url(r'^/?$',
       TemplateView.as_view(template_name='site_index.html'),
       name='home'),
   # icraf_dr app
   url(r'^icraf_dr/', include('icraf_dr.urls')),
   # zinnia blog app
   url(r'^blog/', include('zinnia.urls', namespace='zinnia')),
   url(r'^comments/', include('django_comments.urls')),
   # django extended flatpages
   url(r'^pages/', include('django.contrib.flatpages.urls')),
   url(r'^ckeditor/', include('ckeditor.urls')),
 ) + urlpatterns
