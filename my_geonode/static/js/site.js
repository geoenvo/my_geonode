// DOM Ready
$(function() {
    // Highlight current page in nav bar
    $('#nav-main li').each(function() {
        // Count the number of links to the current page in the <li>
        var matched_links = $(this).find('a[href]').filter(function() {
            var valid_path = false;
            
            var pathname = window.location.pathname;
            var href = $(this).attr('href');
            
            if (pathname.toLowerCase() == href)
                return true;
            
            if (pathname.toLowerCase().indexOf(href) >= 0 && href != '/') {
                valid_path = true;
            }
            
            return valid_path;
        }).length;
        // If there's at least one, mark the <li> as active
        if (matched_links)
            $(this).addClass('active');
    });
    
    // select all textbox content on click/focus
    $('input.select-all').on('focus', function() {
        var $this = $(this)
        .one('mouseup.mouseupSelect', function() {
            $this.select();
            return false;
        })
        .one('mousedown', function() {
            // compensate for untriggered 'mouseup' caused by focus via tab
            $this.off('mouseup.mouseupSelect');
        })
        .select();
    });
    
    // override on 'upload' and 'replace' layers page
    if ($('#file-uploader').length) {
        // only one accordion panel open at a time
        $('.panel-heading a').on('click', function(e) {
            if($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        // set default group permissions
        $('input#view_resourcebase_groups').val('Pengelola-Data-Kabupaten,Pemantau-dan-Evaluator');
        $('input#download_resourcebase_groups').val('Pengelola-Data-Kabupaten,Pemantau-dan-Evaluator');
        $('input#change_resourcebase_metadata_groups').val('Pengelola-Basis-Data');
        $('input#change_layer_data_groups').val('Pengelola-Basis-Data');
        $('input#change_layer_style_groups').val('Pengelola-Basis-Data');
        $('input#manage_resourcebase_groups').val('Pengelola-Basis-Data');
        
        // check required metadata fields
        validateMetadata = function() {
            return true;
        }
        
        // this executes before geonode's file upload handling
        $('#upload-button').on('click', function(e) {
            if (validateMetadata() == false) {
                // scroll to and open the metadata panel
                $('html, body').animate({
                    'scrollTop': $('a[href$="#collapseMetadata"]').closest('.panel').offset().top - 120
                }, 0, function() {
                    if($('#collapseMetadata').hasClass('in') == false) {
                        console.log('a');
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
                            window.location.href = layerURL;
                       }
                    }, 100); // check every 100ms
                }
                else {
                    // scroll to top of file upload panel to show message
                    $('html, body').animate({
                        'scrollTop': $('a[href$="#collapseFileUpload"]').closest('.panel').offset().top - 120
                    }, 0, function() {
                        if($('#collapseFileUpload').hasClass('in') == false) {
                            $('a[href$="#collapseFileUpload"]').trigger('click');
                        }
                    });
                }
            }
        });
    }
    
});
