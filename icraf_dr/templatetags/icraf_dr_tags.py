from django import template

register = template.Library()

@register.filter
def add_class(field, class_name):
    """ For adding classes to form fields.
    """
    return field.as_widget(attrs={
        "class": " ".join((field.css_classes(), class_name))
    })
