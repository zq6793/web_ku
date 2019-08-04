;
(function($) {
    var defaults = {
        active: 0
    };
    $.fn.progress = function(options, index) {
        if (typeof(options) === 'string') {
            if ('hide' === options) {
                return $.proxy(hideProgressNode, this)(index);
            }else{
                return $.proxy(showProgressNode, this)(index);
            }
        } else {
            var settings = $.extend({}, defaults, options);
            return $.proxy(buildProgress, this)(settings);
        }
    }

    function buildProgress(settings) {
        return this.each(function() {
            if (!settings.data) {
                return false;
            }
            var ul = $('<ul></ul>')
                .css({
                    listStyle: 'none',
                    width: '100%',
                    position: 'relative',
                    zIndex: '10'
                })
            var liWidth = (100 / settings.data.length).toFixed(2)
            $.each(settings.data, function(i, n) {
                var li = $('<li class="progressUnit"></li>')
                    .append('<span>' + n.title + '</span>')
                    .append('<span>' + (i + 1) + '</span>')
                    .append('<span>' + convert(n.date) + '</span>')
                    .css({
                        float: 'left',
                        textAlign: 'center',
                        width: liWidth + '%',
                        position: 'relative'
                    })
                li
                    .children()
                    .css({
                        display: 'block'
                    })
                    .first()
                    .css({
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    })
                    .next()
                    .css({
                        color: settings.active <= i ? '#000' : '#fff',
                        background: settings.active <= i ? '#ccc' : '#1296DB',
                        borderRadius: '50%',
                        display: 'inline-block',
                        width: 35,
                        height: 35,
                        lineHeight: '35px',
                        margin: '15px 0'
                    })
                    .next()
                    .css({
                        color: '#666',
                        fontSize: '.8em'
                    })
                li
                    .append('<span></span>')
                    .children()
                    .last()
                    .css({
                        display: 'block',
                        width: '100%',
                        height: '15px',
                        background: settings.active <= i ? '#ccc' : '#1296DB',
                        position: 'absolute',
                        left: '50%',
                        top: '45px',
                        zIndex: -1,
                    })
                ul.append(li);
            })
            $(this).append(ul).find('ul').find('li:last').find('span:last').remove();
        })
    }

    function hideProgressNode(index) {
        return this.each(function() {
            $(this)
                .find('li')
                .eq(index)
                .find('span')
                .eq(1)
                .css({
                    background: 'repeating-linear-gradient(-45deg, #a1a1a1,#fff 5px, #a1a1a1 5px)'
                })
                .parent()
                .prev()
                .find('span:last')
                .css({
                    background: 'repeating-linear-gradient(-45deg, #a1a1a1,#fff 5px, #a1a1a1 5px)'
                })
        })
    }

    function showProgressNode(index){
        return this.each(function() {
            $(this)
                .find('li')
                .eq(index)
                .find('span')
                .eq(1)
                .css({
                    background: '#ccc'
                })
                .parent()
                .prev()
                .find('span:last')
                .css({
                    background: '#ccc'
                })
        })
    }
    function convert(date){
        if(!date){
            return '';
        }
        var now = new Date(date.replace(/-/g,"/"));
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        month = month + 1;
        return year+'/'+month+'/'+date;
    }
})(jQuery);