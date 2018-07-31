/**
 * Created by lzz on 2018/2/1.
 */

$(document).ready(function () {
    var tarurl = getQueryString("q");
    var history_list = getPostHistory();
    history_list.forEach(function (value, index) {
        var urlobj = JSON.parse(value);
        if( urlobj.url == tarurl ){
            console.log(urlobj);
            $('[name="request-url"]').val( urlobj.url );
            $('[name="request-body"]').val( urlobj.param );
            $("#post-type").text( urlobj.type );
        }
    });

    if( window.url_model != null && window.url_model != "null" ){
        $('[name="request-url"]').val( window.url_model.url );
        $('[name="request-body"]').val( window.url_model.param );
        $("#post-type").text( window.url_model.type );
    }

    $("textarea").autoTextarea({
        maxHeight:420,
        minHeight:100,
    });
});

function  getPostHistory() {
    var hisotry_str = get_cookie("post_history");
    var history_list = [];
    if( hisotry_str != null ){
        history_list = hisotry_str.split("|");
    }
    history_list = unique(history_list);
    return history_list;
}

function json_check() {
    var res = true;
    var value = $('[name="request-body"]').val();
    var res = isJson( value );
    if( res == false ){
        res = false;
        $("#show-result").html("#json param format is error");
    }else{
        var con = $("#show-result").text();
        if( con.indexOf("#") >  -1 ){
            $("#show-result").empty();
        }
    }
    return res;
}
$("#post-url").click(function () {
    if( !json_check() ){
        return;
    }
    var data={};
    data.type = $("#post-type").text();
    data.url = $('[name="request-url"]').val();
    data.param = $('[name="request-body"]').val();

    try {
        var history_list = getPostHistory();
        var len = history_list.length;
        if( len > 10 ){
            history_list = history_list( len - 10, len);
        }
        history_list.push(JSON.stringify(data));
        set_cookie("post_history", history_list.join("|"));
    }catch (err){
        console.log(err);
    }
    $("#post-url").button('loading');
    post("/request", data, function (res) {
        show_result(res);
    },function () {
        $("#post-url").button('reset');
    })

});


$(".post-type").click(function () {
    var postType = $(this).text();
    $("#post-type").text( postType );
});
$(".modal-post-type").click(function () {
    var postType = $(this).text();
    $("#modal-post-type").text( postType );
});
$("#save-request-button").click(function () {
    var type = $("#modal-post-type").text( $("#post-type").text() );
    if( type != "get" ){
        $("[name='modal-request-body']").val( $("[name='request-body']").val() );
    }
    $("[name='modal-request-url']").val( $("[name='request-url']").val() );
    if( window.url_model != null && window.url_model != "" ){
        $("[name='modal-post-group']").val( window.url_model.group );
    }
    $("#save-request-modal").modal("show");
});

$("#save-request-modal-confirm").click(function () {
    var data = {};
    data.type = $("#modal-post-type").text();
    data.url = $("[name='modal-request-url']").val();
    data.param = $("[name='modal-request-body']").val();
    data.group = $("[name='modal-post-group']").val();
    data.showName = $("[name='modal-post-name']").val();
    post("/save-request", data, function (res) {
       console.log(res);
    },function () {
        $("#save-request-modal").modal("hide");
    });
});

function post(url, data, callback, complectecall) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: callback,
        complete: complectecall
    });
}

function show_result(res) {
    $("#show-result").html( syntaxHighlight(res) );
}


function syntaxHighlight(json) {
    if( typeof json == 'undefined'){
        return "";
    }
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
