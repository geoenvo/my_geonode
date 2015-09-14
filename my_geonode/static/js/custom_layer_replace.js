// DOM Ready
$(function() {
    // set default group permissions
    $('#permission_form input#view_resourcebase_groups').val('Pengelola-Data-Kabupaten,Pemantau-dan-Evaluator');
    $('#permission_form input#download_resourcebase_groups').val('Pengelola-Data-Kabupaten,Pemantau-dan-Evaluator');
    $('#permission_form input#change_resourcebase_metadata_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#change_layer_data_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#change_layer_style_groups').val('Pengelola-Basis-Data');
    $('#permission_form input#manage_resourcebase_groups').val('Pengelola-Basis-Data');
    
    // this executes before geonode's file upload handling
    $('#upload-button').on('click', function(e) {
        // keep checking for 'Layer Info' button to appear and redirect to layer detail page
        var checkLayerInfo = setInterval(function() {
            if ($('#status .alert-success a.btn-success').length) {
                layerURL = $('#status .alert-success a.btn-success').attr('href');
                clearInterval(checkLayerInfo);
                window.location.href = layerURL; // comment this to stop redirecting to layer detail page
           }
        }, 100); // check every 100ms
    });
});