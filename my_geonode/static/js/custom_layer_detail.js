// DOM Ready
$(function() {
    // when tab is clicked load the layer data iframe once
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        if ($(e.target).attr('href') == '#layerdata' && $('#layerdata iframe').data('loaded') == false) {
            $('#layerdata iframe').prop('src', function() {
                return $(this).data('src');
            });
            
            $('#layerdata iframe').data('loaded', true);
        }
    });
});