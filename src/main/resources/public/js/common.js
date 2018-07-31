/**
 * Created by lzz on 2018/2/1.
 */

function isJson(data) {
    try {
        var obj=JSON.parse(data);
        return true;
    } catch(e) {
        return false;
    }
}

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}




$.fn.autoTextarea = function(options) {

    var defaults={

        maxHeight:null,//文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度

        minHeight:$(this).height() //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示

    };

    var opts = $.extend({},defaults,options);

    return $(this).each(function() {

        $(this).bind("paste cut keydown keyup focus blur",function(){

            var height,style=this.style;

            this.style.height =  opts.minHeight + 'px';

            if (this.scrollHeight > opts.minHeight) {

                if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {

                    height = opts.maxHeight;

                    style.overflowY = 'scroll';

                } else {

                    height = this.scrollHeight;

                    style.overflowY = 'hidden';

                }

                style.height = height  + 'px';

            }

        });

    });

};