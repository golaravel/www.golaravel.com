// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function(){
    var $navs = $('.docs-menu a');
    if($navs)
    {
        var url = location.href;
        var setted = false;
        $navs.each(function( index ) 
        {
            var href = $(this).attr('href');

            if(!(url.indexOf(href) < 0))
            {
              $(this).parent().addClass('active');
              setted = true;
            }
        });

        if(!setted)
        {
            $($navs[0]).parent().addClass('active');
        }
    }
});

$(document).ready(function(){
    $('a[href^="http://"]').add('a[href^="https://"]').attr('target','_blank');
});