// DOM Ready
$(function() {
    // override on layers upload page
    
    // only one accordion panel open at a time
    $('.panel-heading a').on('click', function(e) {
        if($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    
    // initialize datepickers
    var dpickerOptions = {
        format: 'YYYY-MM-DD HH:mm',
        useCurrent: true,
        pickDate: true,
        pickTime: true,
        language: 'en',
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down'
        }
    };
    
    $('#icraf_dr_date_created_picker').datetimepicker(dpickerOptions);
    $('#icraf_dr_date_published_picker').datetimepicker(dpickerOptions);
    $('#icraf_dr_date_revised_picker').datetimepicker(dpickerOptions);
    
    // override default options set in metadata_form_js
    $('#id_resource-temporal_extent_start_picker').data('DateTimePicker').destroy();
    $('#id_resource-temporal_extent_end_picker').data('DateTimePicker').destroy();
    $('#id_resource-temporal_extent_start_picker').datetimepicker(dpickerOptions);
    $('#id_resource-temporal_extent_end_picker').datetimepicker(dpickerOptions);
    
    // set default group permissions
    // 20150921 only Pengelola-Basis-Data group for all actions by default
    $('#permission_form input#view_resourcebase_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#download_resourcebase_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#change_resourcebase_metadata_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#change_layer_data_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#change_layer_style_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#manage_resourcebase_groups').val('Pengelola-Basis-Data');
    
    // set Indonesian as default language metadata
    $('#form_metadata [name="resource-language"] option[value="ind"]').attr('selected', 'selected');
    $('#form_metadata [name="resource-regions"] option[value="115"]').attr('selected', 'selected');
    
    // set selected year dropdown to current year
    var current = new Date()
    var year = current.getFullYear()
    $('#form_metadata [name="icraf_dr_year"] option:contains("' + year + '")').attr('selected', 'selected');
    
    // 20150921 uncheck anyone from permissions
    $('#permission_form [name="view_anonymous"]').attr('checked', false);
    $('#permission_form [name="download_anonymous"]').attr('checked', false);
    
    // uncheck published checkbox
    // 20150921 leave is published checked by default
    //$('#form_metadata [name="resource-is_published"]').attr('checked', false);
    
    // check required metadata fields
    validateMetadata = function() {
        var valid = true;
        
        // required text input name attributes
        var requiredFieldNames = [
          'resource-title',
          //'resource-edition', # replaced by icraf_dr_date_created
          'icraf_dr_date_created',
          'icraf_dr_source',
          'resource-abstract',
          'resource-regions',
          'resource-language',
          'resource-data_quality_statement',
          'resource-keywords',
        ];
        
        for (i = 0; i < requiredFieldNames.length; i++) {
            var requiredField = $('#form_metadata [name="' + requiredFieldNames[i] + '"]');
            
            if (!requiredField.val()) {
                $('#form_metadata div.alert').removeClass('hidden');
                requiredField.closest('.form-group').addClass('has-error');
                valid = false;
            }
            else {
                requiredField.closest('.form-group').removeClass('has-error');
            }
        }
        
        // required category radio button set
        if (!$('#form_metadata [name="category_choice_field"]:checked').val()) {
            $('#form_metadata #category_form').addClass('has-error');
        }
        else {
            $('#form_metadata #category_form').removeClass('has-error');
        }
        
        return valid;
    }
    
    // this executes before geonode's file upload handling
    $('#upload-button').on('click', function(e) {
        if (validateMetadata() == false) {
            // scroll to and open the metadata panel
            $('html, body').animate({
                'scrollTop': $('a[href$="#collapseMetadata"]').closest('.panel').offset().top - 100
            }, 0, function() {
                if($('#collapseMetadata').hasClass('in') == false) {
                    $('a[href$="#collapseMetadata"]').trigger('click');
                }
            });
            
            // don't continue with geonode's file upload handling
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
        else {
            // metadata is valid, let geonode's file upload handling do the rest
            // scroll to and open the file upload panel
            if ($('#status').length) {
                // file upload process has started, scroll to the progress bar
                $('html, body').animate({
                    'scrollTop': $('#status').offset().top
                }, 0, function() {
                    if($('#collapseFileUpload').hasClass('in') == false) {
                        $('a[href$="#collapseFileUpload"]').trigger('click');
                    }
                });
                
                // keep checking for 'Layer Info' button to appear and redirect to layer detail page
                var checkLayerInfo = setInterval(function() {
                    if ($('#status .alert-success a.btn-success').length) {
                        layerURL = $('#status .alert-success a.btn-success').attr('href');
                        clearInterval(checkLayerInfo);
                        window.location.href = layerURL; // comment this to stop redirecting to layer detail page
                   }
                }, 100); // check every 100ms
            }
            else {
                // scroll to top of file upload panel to show message
                $('html, body').animate({
                    'scrollTop': $('a[href$="#collapseFileUpload"]').closest('.panel').offset().top - 100
                }, 0, function() {
                    if($('#collapseFileUpload').hasClass('in') == false) {
                        $('a[href$="#collapseFileUpload"]').trigger('click');
                    }
                });
            }
        }
    });
});
