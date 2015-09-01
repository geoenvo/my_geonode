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

});
