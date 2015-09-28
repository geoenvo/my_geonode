// DOM Ready
$(function() {
    // override on documents upload page
    
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
    // 20150921 leave enabled by default
    //$('#form_metadata [name="resource-is_published"]').attr('checked', false);
    
    // check required file upload field
    // only allow doc_file or doc_url, not both
    validateFileUpload = function() {
        var valid = true;
        var doc_title = $('#form_document [name="title"]');
        var doc_file = $('#form_document [name="doc_file"]');
        var doc_type = $('#form_document [name="doc_type"]:checked');
        var doc_url = $('#form_document [name="doc_url"]');
        
        if (!doc_title.val()) {
            $('#form_document div.alert').removeClass('hidden');
            doc_title.closest('.form-group').addClass('has-error');
            
            valid = false;
        }
        else {
            doc_title.closest('.form-group').removeClass('has-error');
        }
        
        if (!doc_type.val()) {
            $('#form_document div.alert').removeClass('hidden');
            $('#form_document #doc_type').addClass('has-error');
            
            valid = false;
        }
        else {
            $('#form_document #doc_type').removeClass('has-error');
        }
        
        if (!doc_file.val() && !doc_url.val()) {
            $('#form_document div.alert').removeClass('hidden');
            doc_file.closest('.form-group').addClass('has-error');
            doc_url.closest('.form-group').addClass('has-error');
            
            valid = false;
            
            return valid;
        }
        
        if (doc_file.val() && doc_url.val()) {
            $('#form_document div.alert').removeClass('hidden');
            doc_file.closest('.form-group').addClass('has-error');
            doc_url.closest('.form-group').addClass('has-error');
            
            valid = false;
        }
        else {
            doc_file.closest('.form-group').removeClass('has-error');
            doc_url.closest('.form-group').removeClass('has-error');
        }
        
        if (valid) {
            $('#form_document div.alert').addClass('hidden');
        }
        
        return valid;
    }
    
    // check required metadata fields
    validateMetadata = function() {
        var valid = true;
        
        // required text input name attributes
        var requiredFieldNames = [
          //'resource-title', # replaced by title
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
        
        if (valid) {
            $('#form_metadata div.alert').addClass('hidden');
        }
        
        return valid;
    }
    
    // this executes before geonode's file upload handling
    $('#upload-button').on('click', function(e) {
        if (validateFileUpload() == false) {
            // scroll to and open the file upload panel
            $('html, body').animate({
                'scrollTop': $('a[href$="#collapseFileUpload"]').closest('.panel').offset().top - 100
            }, 0, function() {
                if($('#collapseFileUpload').hasClass('in') == false) {
                    $('a[href$="#collapseFileUpload"]').trigger('click');
                }
            });
            
            return false;
        }
        
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
            //return true;
            
            $('#upload_form').submit();
        }
    });
});
