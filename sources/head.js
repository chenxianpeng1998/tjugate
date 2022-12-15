window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
    // console.log('错误信息：', errorMessage)
    // console.log('出错文件：', scriptURI)
    // console.log('出错行号：', lineNumber)
    // console.log('出错列号：', columnNumber)
    // console.log('错误详情：', errorObj.toString())
    $.ajax({
        url: window.openUrl('index/reportJsError'),
        type: 'post',
        data: {
            'message': errorMessage,
            'file': scriptURI,
            'line': lineNumber,
            'column': columnNumber,
            'detal': errorObj.toString()
        }
    })
}
Array.prototype.getIndex = function(e) {
    for (let i = 0; i < this.length; i++) {
        if (e == this[i]) return i
    }
    return -1
}
Date.prototype.format = function(formatStr){   
    var str = formatStr;   
    str=str.replace(/y|Y/,this.getFullYear());  
    str=str.replace(/m/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
    str=str.replace(/d/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/H/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/i/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/s/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    return str;   
}
window.SERV_TJU = (function() {
    let maxTry = 3
    let interval = 2000
    let tryCount = 0
    var checkToken = function(callback) {
        if (!$.cookie('td_token')) callback({ status: false })
        tryCount++
        $.ajax({
            url: openUrl('login/token'),
            dataType: 'jsonp',
            data: { time: new Date() },
            success: function(e) {
                callback(e)
            },
            error: function() {
                // 请求失败，再次请求
                if (maxTry < tryCount) callback({ status: false })
                window.setTimeout(function() {
                    checkToken(callback)
                }, interval)
            }
        })
    }

    let readyFuncs = []

    return {
        ready: function(readyFunc) {
            if (typeof readyFunc == 'function') readyFuncs.push(readyFunc)
            return this
        },
        lanuch: function() {
            checkToken(function(e) {
                if (e.status) {
                    if (readyFuncs.length > 0) {
                        for (let i = 0; i < readyFuncs.length; i++) {
                            readyFuncs[i](e.content)
                        }
                    }
                } else {
                    window.location.href = openUrl('login')
                }
            })
        }
    }
}())
function openUrl(path, params, root_path) {
    let _url='';
    if (typeof root_path!='undefined' && root_path!=''){
        _url = root_path + '/' + path
        if(_url.search(/^http(s|):\/\/\S*?\//)==-1){
            _url = window.location.protocol+'//'+_url
        }
    }else{
        _url = _APP_URL_ROOT + '/' + path
    }
    let _p = ''
    let _i = 0
    $.each(params, function(i, e) {
        if (_i == 0) {
            if (_HTTP_REWRITE == '1') {
                _p += '?'
            } else {
                _p += '&'
            }
        } else {
            _p += '&'
        }
        _p += i + '=' + e
        _i++
    })
    _url = _url + _p
    return _url
}
function getUrlParam(name, need_unescape, strict) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return need_unescape ? unescape(r[2]) : r[2]
    else if (strict) return null // 返回参数值
    else return ''
}
function fnRemoveAndSync(removedText, idOfFieldA, idOfFieldB) {
    // 从一个A字段中删除某个内容，并根据其index删除B字段中对应index的值
    let $a = $('#' + idOfFieldA); $b = $('#' + idOfFieldB)
    if ($a.val() == '' || $b.val() == '') return false
    let _a = $a.val().split(',')
    let _b = $b.val().split(',')
    let i = _a.getIndex(removedText)
    if (i == -1) return false
    _a.splice(i, 1)
    _b.splice(i, 1)
    $a.val(_a.join(','))
    $b.val(_b.join(','))
    return true
}
(function() {
    // 为了解决non-passive错误
    if (typeof EventTarget !== 'undefined') {
        const func = EventTarget.prototype.addEventListener
        EventTarget.prototype.addEventListener = function(type, fn, capture) {
            this.func = func
            if (typeof capture !== 'boolean') {
                capture = capture || {}
                capture.passive = false
            }
            this.func(type, fn, capture)
        }
    }
}());
(function() {
    if (!_IS_MOBILE) {
        let lastTime = _SESSION_EXPIRE_TIME
        function clear() {
            lastTime = _SESSION_EXPIRE_TIME
        }
        var timeId = setInterval(() => {
            lastTime--
            if (lastTime <= 0) {
                clearInterval(timeId)
                location.href = openUrl('login')
            }
        }, 1000)
        window.addEventListener('keypress', function() {
            clear()
        })
        window.addEventListener('mousemove', function() {
            clear()
        })
        window.addEventListener('click', function() {
            clear()
        })
    }
})()
$(function() {
    if (((!!window.ActiveXObject || 'ActiveXObject' in window) || navigator.userAgent.indexOf('UCBrowser') > -1) && !$.cookie('broser_error')) {
        $.cookie('broser_error', true)
        alert('提示: 您在使用的浏览器内核版本可能导致浏览异常。\n' + '请安装Chrome(谷歌浏览器）、Firefox（火狐）浏览器')
    }
})
