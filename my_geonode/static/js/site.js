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
    
    // override default group permissions on 'upload' and 'replace' layers page
    if ($('#file-uploader').length) {
        $('input#view_resourcebase_groups').val('Pengelola-Data-Kabupaten,Pemantau-dan-Evaluator');
        $('input#download_resourcebase_groups').val('Pengelola-Data-Kabupaten,Pemantau-dan-Evaluator');
        $('input#change_resourcebase_metadata_groups').val('Pengelola-Basis-Data');
        $('input#change_layer_data_groups').val('Pengelola-Basis-Data');
        $('input#change_layer_style_groups').val('Pengelola-Basis-Data');
        $('input#manage_resourcebase_groups').val('Pengelola-Basis-Data');
    }
    
});
