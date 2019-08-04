;
(function($) {
    var defaults = {
        msg: '输入错误'
    }

    $.fn.tip = function(options) {
        var settings = $.extend({}, defaults, typeof(options) == 'object' ? options : { msg: options });
        return this.last().after('<span></span>')
            .next()
            .hide()
            .html(settings.msg)
            .css({
                position: 'absolute',
                background: 'white',
                fontSize: '.8em',
                color: 'red',
                padding: '2px 15px',
                border: 'solid 1px red',
                marginLeft: '5px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
            })
            .show(100);
    }
})(jQuery);