# -*- coding: utf-8 -*-
#########################################################################
#
# Copyright (C) 2012 OpenPlans
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
#########################################################################

# Django settings for the GeoNode project.
import os
from geonode.settings import *
#
# General Django development settings
#

SITENAME = 'my_geonode'

# Defines the directory that contains the settings file as the LOCAL_ROOT
# It is used for relative settings elsewhere.
LOCAL_ROOT = os.path.abspath(os.path.dirname(__file__))

WSGI_APPLICATION = "my_geonode.wsgi.application"


# Load more settings from a file called local_settings.py if it exists
try:
    from local_settings import *
except ImportError:
    pass

# Additional directories which hold static files
STATICFILES_DIRS.append(
    os.path.join(LOCAL_ROOT, "static"),
)

# Note that Django automatically includes the "templates" dir in all the
# INSTALLED_APPS, se there is no need to add maps/templates or admin/templates
TEMPLATE_DIRS = (
    os.path.join(LOCAL_ROOT, "templates"),
) + TEMPLATE_DIRS

# Location of url mappings
ROOT_URLCONF = 'my_geonode.urls'

# Location of locale files
LOCALE_PATHS = (
    os.path.join(LOCAL_ROOT, 'locale'),
    ) + LOCALE_PATHS

INSTALLED_APPS = (
    'icraf_dr',
    'django_comments',
    'mptt',
    'tagging',
    'zinnia',
    'django.contrib.flatpages',
    'ckeditor',
    'extended_flatpages',
) + INSTALLED_APPS

MIDDLEWARE_CLASSES = (
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
) + MIDDLEWARE_CLASSES

CKEDITOR_UPLOAD_PATH = MEDIA_ROOT + '/editor'

CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': [
            [ 'Source','-','Save','-', 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo', '-', 'Find','Replace','-','SelectAll'],
            [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] ,'/',
            [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ],
            [ 'Link','Unlink' ],
            [ 'Image','Table','HorizontalRule','SpecialChar' ],
            [ 'Format'],
            [ 'TextColor','BGColor', '-', 'Styles','Format','FontSize' ],
            [ 'Maximize', 'ShowBlocks','-','About' ],
        ],
        'format_tags': 'p;h1;h2;h3;h4;h5;h6;pre;address;div',
    },
}
