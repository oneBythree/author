export {
    localParam, getJson, postForm, postJson
};

const $ = window.$;

const TimeUtils = {
  zhMinDate: function(){

  }
};

$.ModuleTip = function(options) {
    var $mTip = $('.m-tip');
    var opt = $.extend({ 'txt': '提示', 'timer': 2000, 'dir': '' }, options);
    var str = '<div class="m-tip">' + opt.txt + '</div>';

    if ($mTip.hasClass('m-tip')) {
        return false;
    }
    $(document.body).append(str);
    Dir($mTip, opt.dir);
    $mTip.fadeIn();

    $mTip.delay(opt.timer).fadeOut().queue(function() {
        $(".m-tip").remove();
    });
    if (typeof(opt.callback) == 'function') {
        var _a = opt.callback;
        _a();
    }
};

function Dir(ele, dir) {
    var winH = $(window).height();
    var winW = $(window).width();
    var itemH = ele.height();
    var itemW = ele.outerWidth();
    var centerLeft = (winW - itemW) / 2;
    switch (dir) {
        case 'center':
            ele.css({ 'top': winH * .5 - (itemH / 2), 'left': centerLeft });
            break;
        case 'top':
            ele.css({ 'top': '.4rem', 'left': centerLeft });
            break;
        default:
            ele.css({ 'bottom': '.4rem', 'left': centerLeft });
            break;
    }
}


/**
 * [moduleConfirm 对话框]
 * @param  {[type]} option ['contenTxt': '内容文字',
        'isCancel': 是否有取消,
        'isHtml': 是否是html,
        'okTxt': '确认按钮文字',
        'cancelTxt': '退出按钮文字',
 * @return {[type]}        [description]
 */
$.moduleConfirm = function(option) {
    var opt = $.extend({
        'contenTxt': '对话框',
        'isCancel': true,
        'isHtml': false,
        'okTxt': '确认',
        'cancelTxt': '退出',
    }, option);
    var str = '';
    var str2 = '';
    var str3 = '';
    if (opt.okTxt == undefined || opt.contenTxt == undefined) {
        return false;
    }
    if (opt.isCancel) {
        str2 = '<a href="javascript:;" class="confirm-btn-cancel">' + opt.cancelTxt + '</a>' +
            '<a href="javascript:;" class="confirm-btn-ok">' + opt.okTxt + '</a>';
    } else {
        str2 = '<a href="javascript:;" class="confirm-btn-ok">' + opt.okTxt + '</a>';
    }
    if (opt.isHtml) {
        str3 = opt.contenTxt;
    } else {
        str3 = '<div class="confirm-content-h1">' + opt.contenTxt + '</div>';
    }
    str = '<div class="m-confirm">' + '<div class="confirm-style">' + str3 + '<div class="confirm-footer">' + str2 + '</div>' +
        '</div>' +
        '</div>';
    $(document.body).append(str);
    var $confirm = $('.confirm-style');
    $confirm.css({
        'marginTop': -$confirm.height() / 2,
        'marginLeft': -$confirm.width() / 2
    });
    $(document).on('click', function(e) {
        if ($(e.target).hasClass('m-confirm')) {
            $("div.m-confirm").remove();
        }
    });
    $('.confirm-btn-cancel').click(function() {
        $("div.m-confirm").remove();
    });
    $('.confirm-btn-ok').click(function() {

        if (typeof(opt.callback) == 'function') {
            var _a = opt.callback;
            _a();
        }
        $("div.m-confirm").remove();
    })
};


/**
 * [getJson description]
 * @param  {[type]} url  [接口地址]
 * @param  {[type]} func [回调函数]
 * @return {[type]}      [description]
 */
function getJson(url, func, beforeSend, complete) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        beforeSend: function() {
            if (beforeSend && typeof(beforeSend) == "function") {
                beforeSend();
            }
        },
        success: function(data) {
            if (data["codee"] == 1) {
                func(data);
            } else {
                $.ModuleTip({ 'txt': data["message"] });
            }
        },
        complete: function() {
            if (complete && typeof(complete) == "function") {
                complete();
            }
        },
        error: function(data) {
            $.ModuleTip({ 'txt': '其他错误' });
        }
    });
}


function postJson(url, func, beforeSend, complete, force) {
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        beforeSend: function() {
            if (beforeSend && typeof(beforeSend) == "function") {
                beforeSend();
            }
        },
        success: function(data) {
            if (typeof(force) == "boolean" && force) {
                func(data);
                return
            }
            if (data["codee"] == 1){
                func(data);
            } else {
                $.ModuleTip({ 'txt': data["message"] });
            }
        },
        complete: function() {
            if (complete && typeof(complete) == "function") {
                complete();
            }
        },
        error: function(data) {
            $.ModuleTip({ 'txt': '其他错误' });
        }
    })
}

//提交form表单
function postForm(url, data, func) {
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(data) {
            if (data["codee"] == 1) {
                func(data);
            } else {
                $.ModuleTip({ 'txt': data["message"] });
            }
        },
        error: function(data) {
            $.ModuleTip({ 'txt': JSON.stringify(data) });
        }
    });
}


//获取哈希值
function localParam(search:string) {
    var search = search || window.location.search;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    };
    return (fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")));
}


//模仿hover事件
document.addEventListener("touchstart", function() {}, true);
