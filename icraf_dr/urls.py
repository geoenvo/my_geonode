from django.conf.urls import patterns, url
from django.views.generic import TemplateView

urlpatterns = patterns(
    'icraf_dr.views',
    ###url(r'^$', 'index', name='icraf_dr_index'),
    
    # custom home example
    url(r'^$', 'icraf_home', name='home'), # comment this and uncomment the one above to return to default routing
    
    url(r'^add_category$', 'add_category', name='icraf_dr_add_category'),
    url(r'^add_main$', 'add_main', name='icraf_dr_add_main'),
)
