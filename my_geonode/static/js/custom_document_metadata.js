// DOM Ready
$(function() {
    // override on layers metadata edit page
    
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
        
        // required doc type radio button set
        if (!$('#form_metadata [name="doc_type"]:checked').val()) {
            $('#form_metadata #doc_type').addClass('has-error');
            
            valid = false;
        }
        else {
            $('#form_metadata #doc_type').removeClass('has-error');
        }
        
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
            
            valid = false;
        }
        else {
            $('#form_metadata #category_form').removeClass('has-error');
        }
        
        
        
        return valid;
    }
    
    $('#form_metadata').submit(function(e) {
        if (validateMetadata() == false) {
            $('html, body').animate({
                'scrollTop': $('.page-title').offset().top
            }, 500);
            
            e.preventDefault();
        }
        else {
            // form is valid
            return true;
        }
    });

});