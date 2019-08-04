;
(function($) {
    var defaults = {
        readonly: false,
        sign: '',
        signFile: '',
        signStatus: '',
        signDate: '',
        content: '',
        btnClick: function(status) {}
    }

    $.fn.comment = function(options) {
        var settings = $.extend({}, defaults, options);
        return this.each(function() {
            $(this)
                .text(settings.content)
                .attr('readonly', settings.readonly)
                .wrap('<div></div>')
                .parent()
                .css({ position: 'relative', display: 'block',width: '98%',height: '98%',marginLeft:'5px'});
            $.proxy(randerSignInfo, this)(settings);
            if (!settings.readonly) {
                $.proxy(randerShade, this)(settings);
            }
        })
    }

    function randerShade(settings) {
        $(this)
            .after('<div><button type="button">同意</button><button type="button">不同意</button></div>')
            .next()
            .css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: 'white',
                zIndex: '10',
                textAlign: 'center',
                lineHeight: $(this).outerHeight() + "px"
            })
            .children()
            .css({
                margin: '0 15px',
                border: 'solid 1px #1296DB',
                background: 'none',
                color: '#1296DB',
                padding: '5px 0',
                borderRadius: '4px',
                cursor: 'pointer',
                width: 80,
                height: 35,
                textAlign: 'center',
                lineHeight:'25px'
            })
            .first()
            .click(function() {
                $(this).parent().prev().prev().find('span').text('同意')
                $(this).parent().remove();
                settings.btnClick(true);
            })
            .next()
            .click(function() {
                $(this).parent().prev().prev().find('span').text('不同意')
                $(this).parent().remove();
                settings.btnClick(false);
            })
    }

    function randerSignInfo(settings) {
        var $this = $(this);
        $this
            .css({
                textIndent: 20,
                boxSizing: 'border-box',
                paddingBottom: 40,
                paddingTop: 20
            })
            .before('<p><span>' + (settings.signStatus === 0 ? '同意:' : (settings.signStatus !== '' ? '不同意:' : '')) + '</span></p>')
            .prev()
            .css({
                position: 'absolute',
                top: 0,
                left: 1,
                width: '99.5%',
                height: 20,
                background: 'white',
                padding: 0,
                margin: 0,
                textAlign: 'left',
                lineHeight: '20px'
            })
            .next()
            .after('<div></div>')
            .next()
            .css({
                position: 'absolute',
                display: 'inline-block',
                bottom: 0,
                right: 0,
                fontSize: '.8em',
                height: 35,
                lineHeight: '35px',
                width: '100%',
                textAlign: 'right',
                background: 'white'
            })
            .append('<span></span><span></span>')
            .children()
            .css({
                display: 'inline-block',
                height: '100%'
            })
            .first()
            .html(settings.signFile ? '<img src="' + settings.signFile + '" style="max-height: 100%;max-width: 80px;vertical-align: bottom;"/>' : settings.sign)
            .next()
            .text(convert(settings.signDate))
            .css({
                marginLeft: 10,
                marginRight: 10
            });
        if (!settings.readonly) {
            $this
                .prev()
                .append('<button type="button">重新选择</button>')
                .find('button')
                .css({
                    float: 'right',
                    height: '100%',
                    padding: '0 5px',
                    margin: 0,
                    border: 'solid 1px #1296DB',
                    background: 'none',
                    color: '#1296DB',
                    borderRadius: '4px',
                    cursor: 'pointer'
                })
                .click(function() {
                    $.proxy(randerShade, $this)(settings);
                })
        }
    }
    function convert(date){
        if(!date){
            return '';
        }
        var now = new Date(date);
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        month = month + 1;
        return year+'/'+month+'/'+date;
    }
})(jQuery);