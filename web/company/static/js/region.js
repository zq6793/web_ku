;
(function($) {
    var defaults = {
        url: DX.domain('user') + "/user/dict/findByPid",
        tag: 'REGION',
        callback: function(id, province, city, country) {}
    };
    var settings = {};
    $.fn.region = function(options) {
        settings = $.extend({}, defaults, options);
        return this.each(function() {
            $(this).click(function() {
                if (!$(this).next().hasClass('REGION')) {
                    $(this).after('<ul class="REGION"></ul>');
                    $(this).next().append('<style type="text/css">ul.REGION{margin:0;padding:0;list-style:none;position:absolute;z-index:50;}ul.REGION li{float:left;overflow:auto;margin:0;padding:0;width:250px;height:287px;background:#fff;box-shadow:0 0 1px #ccc}ul.REGION li span{display:block;padding-left:15px;height:35px;border-bottom:solid 1px #eaeaea;line-height:35px;cursor:pointer}ul.REGION li span.active,ul.REGION li span:hover{color:#1296db;border-bottom-color:#1296db}ul.REGION li::-webkit-scrollbar{width:6px}ul.REGION li::-webkit-scrollbar-thumb{border-radius:4px;background:#999;box-shadow:inset 0 0 5px rgba(0,0,0,.2)}ul.REGION li::-webkit-scrollbar-track{border-radius:4px;background:#ededed;box-shadow:inset 0 0 5px rgba(0,0,0,.2)}</style>');
                    doRander($(this).next());
                } else {
                    $(this).next().remove();
                }
            })
        })
    }

    function doRander($this) {
        $this.prepend(buildHtml(0))
        $this
            .css({
                left: $this.prev().position().left + 'px'
            })
            .children()
            .first()
            .children()
            .click(function() {
                $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                var node = $(this).attr('data-node');
                settings.callback(JSON.parse(node));
                $this.remove();
            })
    }

    function buildHtml(pid) {
        var data = getData(pid);
        var html = '<li>';
        $.each(data, function(i, n) {
            html += '<span data-node=\'' + JSON.stringify(n) + '\'>' + n.name + '</span>'
        })
        return html + '</li>';
    }

    function getData(pid) {
        var data = [];
        var url = settings.url + '?tag=' + settings.tag + '&pid=' + (pid == undefined ? 0 : pid);
        var xhr = new XMLHttpRequest()
        // xhr.withCredentials = true;
        var token = DX.getToken();
        var dx = DX.getDX();
        url += '&Token='+token;
        url += '&DX='+dx;
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 || xhr.status == 200 || xhr.status == 304) {
                data = JSON.parse(xhr.responseText);
                if (data.code == 200) {
                    data = data.data;
                } else {
                    data = [];
                }
            }
        }
        xhr.send();
        return data;
    }
})(jQuery);