from django.conf.urls import patterns, url

js_info_dict = {
    'packages': ('my_geonode.layers',),
}


urlpatterns = patterns(
    'layers.views',
    url(r'upload/?$', 'layer_upload', name='my_layer_upload'),

)
