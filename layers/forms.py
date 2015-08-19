import autocomplete_light

from geonode.layers.models import Layer, Attribute
from geonode.base.forms import ResourceBaseForm


class LayerForm(ResourceBaseForm):

    class Meta(ResourceBaseForm.Meta):
        model = Layer
        exclude = ResourceBaseForm.Meta.exclude + (
            'title',
            'owner',
            'abstract',
            'purpose',
            'resource-poc',
            'metadata_author',
            'restriction_code_type',
            'constraints_other',
            'license',
            'language',
            'spatial_representation_type',
            'temporal_extent_start',
            'temporal_extent_end',
            'supplemental_information',
            'distribution_url',
            'distribution_description',
            'data_quality_statement',
            'keywords',
            'thumbnail_url',
            'maintenance_frequency',
            'workspace',
            'store',
            'storeType',
            'typename',
            'default_style',
            'styles',
            'upload_session',
            'service',)
        widgets = autocomplete_light.get_widgets_dict(Layer)
