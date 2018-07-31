/**
 * Created by lzz on 2018/2/1.
 */

$(document).ready(function () {
    $.get("/url-group", function (obj) {
        var resMap = obj.res;
        for (var key in resMap){
            var li_str = '<li class="treeview"><a href="#"><i class="fa fa-group"></i> <span>' + key + '</span>';
            li_str += '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
            li_str += '<ul class="treeview-menu">';
            var list = resMap[ key ];
            for(var i = 0; i < list.length; i++){
                li_str += '<li><a data-url="/posturl?q=' + list[i].showName + '"class="tab-link"><i class="fa fa-remove remove-url pointer" data-name="' + list[i]["showName"] + '"></i> ' + list[i]["showName"]+ '</a></li>';
            }
            li_str += '<ul class="treeview-menu">';
            li_str += '</ul></li>';
            $("#url-list-menu").prepend( li_str );
        }

    });

    try {
        var hisotry_str = get_cookie("post_history");
        var history_list = [];
        if( hisotry_str != null ){
            history_list = hisotry_str.split("|");
        }
        history_list.forEach(function (value, index) {
            var urlobj = JSON.parse(value);
            var liurl = '<li><a data-url="/posturl?q=' + urlobj.url + '" class="tab-link"><i class="fa fa-circle-o"></i>' + urlobj.url + '</a></li>';
            $("#tab-list-history").prepend(liurl);
        });
    }catch (err){
        console.log(err);
    }
    var tarurl = getQueryString("q");
    $('[data-url="/posturl?q=' + tarurl + '"]').trigger("click");
});

$(document).on("click", ".remove-url", function () {
    var showName = $(this).data("name");
    $("#modal-confirm-delete").data("url", "/remove-url?showName=" + showName);
    $('#delete-url-modal').modal('show');
});


$("#modal-confirm-delete").click(function () {
    var url = $(this).data("url");
    $.get(url, function (res) {
        console.log(res);
        window.location.reload();
    });
});

var $ = jQuery.noConflict();
window.active_li_check = function () {
    $("a.tab-link").parent().removeClass("active"); // 去掉所有的样式重新设置
    $("#tab-list").children().first().data("url");
    var tab_list = $("#tab-list").children();
    for( var i = 0; i < tab_list.length; i++ ){
        var active_url = tab_list.eq(i).data("url");
        $("a[data-url='" + active_url+ "']").parent().addClass("active");
    }
}

/* 添加 iframe */
function add_iframe( tab_index, url, reload) {
    if( reload == true ){
        $("iframe[data-tab-index='" + tab_index + "']").remove();
    }
    var iframe_node = '<iframe data-tab-index="' + tab_index + '" src="'+ url +'" width="100%" style="border: none"></iframe>';
    $("#content-body").append(iframe_node);
    $("#content-body iframe").attr("height", "100%");
}
/* init */
$(document).ready(function () {
    function content_body_height() {
        var height = $(window).height();
        var style_con = "height:" + height + "px";
        $("#content-body").attr("style", style_con);
    }

    content_body_height();
    $(window).resize(function(){
        content_body_height();
    });

    //页面进来就加载首页
    add_iframe(-1, "/posturl");
    //判读是否有指定地址
    var target_url = $.trim(window.location.hash);
    target_url = target_url.substr(1, target_url.length);
    $("a[data-url='" + target_url + "']").trigger("click");
});

$("#content-body iframe").attr("height", $(window).height());
$(document).on("click", ".tab-link", function () {
    var url = $(this).data("url");
    var link_name = "";
    if( typeof($(this).data("url-name")) != "undefined" ){
        link_name = $(this).data("url-name");
    }else{
        link_name = $(this).text();
    }
    /* add iframe */
    var tab_index = $("ul#tab-list li").length;
    $("#content-body iframe").addClass("hidden");
    add_iframe(tab_index, url);

    /* tag-list */
    var tag_remove = ' <span data-tab-index="'+ tab_index + '" class="fa fa-times"></span>';
    $('#tab-list li').removeClass("li-active"); // 先移除其它 li 的样式
    /* add tab iframe */
    $("#tab-list").append("<li class='li-active' data-url='" + url + "'>" + link_name + tag_remove + "</li>");
    $('#tab-list li').unbind('click').click(function () {
        var index = $( $(this).children()[0] ).data("tab-index");
        if( $(this).hasClass("li-active") ){ // 如果是被选中的状态那就继续加载一次
            var tmp_url = $(this).data("url");
            var li_span = $(this).children()[0];
            add_iframe( $(li_span).data("tab-index"), tmp_url, true);
            return false;
        }
        $('#tab-list li').removeClass("li-active");
        $(this).addClass("li-active");
        $("#content-body > iframe").addClass("hidden");
        $("iframe[data-tab-index='" + index + "']").removeClass("hidden");
        return false;
    });

    // remove operator
    $('#tab-list > li > span').unbind('click').click(function () {
        $(this).parent().remove();
        var index = $(this).data("tab-index");
        $("iframe[data-tab-index=" + index + "]").remove();

        if( $(this).parent().hasClass("li-active") ){
            var last_index = $('ul#tab-list li').length;
            var last_li = $('ul#tab-list li')[last_index - 1];
            var last_li_index = $(last_li).children().data("tab-index");
            if( typeof(last_li_index) == "undefined" ){
                $("iframe[data-tab-index='-1']").removeClass("hidden");
                window.active_li_check();
                return;
            }
            $("iframe[data-tab-index='" + last_li_index + "']").removeClass("hidden");

            // 最后一个设置成 active
            $('#tab-list li').removeClass("li-active");
            $('#tab-list li').last().addClass("li-active");
        }
        // 重新设置左边导航栏
        $("a[data-url='" + url+ "']").parent().removeClass("active");
        window.active_li_check();
    });
});
