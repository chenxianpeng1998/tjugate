var Toast = function(text, type, position, title) {
    if (type == null) type = 1
    if (position == null) position = 'mid-center'
    if (title == null) title = '操作提示信息'

    var _bg = '#3c763d' // 定义颜色
    var _icon = 'success' // 定义图表

    switch (type) {
        case 1:
            _bg = '#6673FC;' // #3c763d
            _icon = 'success'
            break
        case 2:
            _bg = '#6673FC' // #a94442
            _icon = 'error'
            break
        case 3:
            _bg = '#6673FC' // #31708f
            _icon = 'info'
            break
        case 4:
            _bg = '#6673FC' // #8a6d3b
            _icon = 'warning'
            break
    }
    $.toast({
        heading: title,
        text: text,
        position: position,
        loaderBg: _bg,
        icon: 'info',
        hideAfter: 4000,
        stack: 6
    })
}
/**
 * 选择用户
 */
var fnSelectUser = function(fnCallback, oJSON_Selected, blnMulti, title, fniframe) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('select/sel_user', { multi: (blnMulti ? '1' : '0') })
    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }
    // _url+="&selected_id="+_selected_ids+"&selected_name="+_selected_names;
    // _url+="&selected="+_uid;
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')

                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i]
                    _objReturn.push(_oTmp)
                })
            } catch (e) {}
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}

/**
 * 选择用户
 */
var fnSelectGroupUser = function(fnCallback, oJSON_Selected, blnMulti, title, group_sid, fniframe, hasGroup) {
    if (blnMulti == null) blnMulti = false
    if (hasGroup == null) hasGroup = false

    if (group_sid == '') {
        var _url = openUrl('select/userByTree', { multi: (blnMulti ? '1' : '0'), hasGroup: (hasGroup ? '1' : '0') })
    } else {
        var _url = openUrl('select/userByGroupTree', { gid: group_sid, multi: (blnMulti ? '1' : '0'), hasGroup: (hasGroup ? '1' : '0') })
    }

    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }
    // _url+="&selected_id="+_selected_ids+"&selected_name="+_selected_names;
    _url += '&selected=' + _uid
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')
                var _group_sid = $_frame.contents().find('input[name=group_id]').val()
                // var _uid =$_frame.contents().find("input[name=_uid]").val();
                // _uid = _uid.split(',')
                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i]
                    _oTmp.group_sid = _group_sid
                    // _oTmp.uid=_uid[i];
                    _objReturn.push(_oTmp)
                })
            } catch (e) {

            }
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}
/**
 * 选择用户
 */
var fnSelectGroupUserNew = function(fnCallback, oJSON_Selected, blnMulti, title, group_sid, fniframe, hasGroup) {
    if (blnMulti == null) blnMulti = false
    if (hasGroup == null) hasGroup = false

    var _url = openUrl('select/userByGroupTreeNew', { gid: group_sid, multi: (blnMulti ? '1' : '0'), hasGroup: (hasGroup ? '1' : '0') })

    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }
    // _url+="&selected_id="+_selected_ids+"&selected_name="+_selected_names;
    _url += '&selected=' + _uid
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')
                var _group_sid = $_frame.contents().find('input[name=group_id]').val()
                // var _uid =$_frame.contents().find("input[name=_uid]").val();
                // _uid = _uid.split(',')
                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i]
                    _oTmp.group_sid = _group_sid
                    // _oTmp.uid=_uid[i];
                    _objReturn.push(_oTmp)
                })
            } catch (e) {
                console.log(e)
            }
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}

/**
 * 系统角色选择用户
 */
var fnSelectLeaderUser = function(fnCallback, oJSON_Selected, blnMulti, title, group_sid, leader_sid, fniframe) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('group/sel_group_leader', { multi: (blnMulti ? '1' : '0') })
    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }

    var group_sid = $('#group_sid').val()
    _url += '&group_sid=' + group_sid		// 组SID
    _url += '&role=' + leader_sid			// 角色

    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)

        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
        	var _objReturn = []
        	try {
        		var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')

                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i]
                    _objReturn.push(_oTmp)
                })
            } catch (e) {}
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}

/**
*选择缔约方
*/
var fnSelectParty = function(fnCallback, oJSON_Selected, blnMulti, title, fniframe) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('select/sel_party', { multi: (blnMulti ? '1' : '0') })
    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')
                var _openbank = $_frame.contents().find('#_openbank').val().split(',')
                var _accounts = $_frame.contents().find('#_accounts').val().split(',')
                var _unify_code = $_frame.contents().find('#_unify_code').val().split(',')
                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i], _oTmp.openbank = _openbank[i], _oTmp.accounts = _accounts[i], _oTmp.unifycode = _unify_code[i]
                    _objReturn.push(_oTmp)
                })
            } catch (e) {

            }
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}

/**
 * 选择组
 */
var fnSelectGroup = function(fnCallback, oJSON_Selected, blnMulti, title) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('select/sel_group', { multi: (blnMulti ? '1' : '0') })
    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }

    // _url+="&selected_id="+_selected_ids+"&selected_name="+_selected_names;
    _url += '&selected=' + _uid
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes').appendTo($(this).find('.modal-body'))

        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')

                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i]
                    _objReturn.push(_oTmp)
                })
            } catch (e) {}

            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}

/**
 * 选择组 带类型的
 */
var fnSelectGroupCategory = function(fnCallback, oJSON_Selected, blnMulti, title) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('select/selGroupWithCategory', { multi: (blnMulti ? '1' : '0') })
    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }

    // _url+="&selected_id="+_selected_ids+"&selected_name="+_selected_names;
    _url += '&selected=' + _uid
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes').appendTo($(this).find('.modal-body'))

        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')

                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i]
                    _oTmp.name = _name[i]
                    _objReturn.push(_oTmp)
                })
            } catch (e) {}

            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}
var fnSelectAllUser = function(fnCallback, oJSON_Selected, blnMulti, title, fniframe) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('select/selToRead', { multi: (blnMulti ? '1' : '0') })

    // 将传入的已选用户列表转化为字符串
    var _uid = ''
    if (!oJSON_Selected) _selected_ids = ''
    else {
        for (var i = 0; i < oJSON_Selected.length; i++) {
            var _u = oJSON_Selected[i].id + ':' + oJSON_Selected[i].name
            _uid == '' ? (_uid = _u) : (_uid += ',' + _u)
        }
    }
    // _url+="&selected_id="+_selected_ids+"&selected_name="+_selected_names;
    // _url+="&selected="+_uid;
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = []
            try {
                var _id = $_frame.contents().find('#_id').val().split(',')
                var _name = $_frame.contents().find('#_name').val().split(',')
                var _group_sid = $_frame.contents().find('input[name=group_sid]').val()

                $.each(_id, function(i) {
                    var _oTmp = {}
                    _oTmp.id = _id[i], _oTmp.name = _name[i]
                    _oTmp.group_sid = _group_sid
                    _objReturn.push(_oTmp)
                })
            } catch (e) {

            }
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}
var fnSelectStudent = function(fnCallback, blnMulti, title, fnOnload, input_params){
    if (blnMulti == null) blnMulti=false;
    let params={};
    if(typeof input_params != 'undefined'){
        try {
            $.each(input_params, (k, v)=>{
                params[k] = v;
            })
        } catch (error) {}
    }
    var _url = openUrl('select/selStudent', params);
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">')
            .attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fnOnload)) {
                return fnOnload($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            let fWin = $_frame[0].contentWindow;
            if(typeof fnCallback == 'function'){
                fnCallback(fWin.formatedSelectUser);
            }
        })
    }).modal()
}
// 获取url中的参数值
var getParam = function(key) {
    var url = window.document.location.href.toString()

    var u = url.split('?')
    var _get = {}

    if (typeof (u[1]) == 'string') {
        u = u[1].split('&')
        for (var i = 0; i < u.length; i++) {
            var j = u[i].split('=')
            _get[j[0]] = j[1]
        }
    }
    return _get[ key ]
}
function loadTips(func) {
    var updateTips = function(e) {
        $('#td_top_message_li').empty()
        if (e.num && e.num > 0) {
            $('#td_top_message_num').show()
		    $('#td_top_message_num').text(isNaN(e.num) ? 0 : e.num)
        } else {
            $('#td_top_message_num').hide()
        }
        $('#td_top_message_title').text('有' + (isNaN(e.num) ? 0 : e.num) + '个新通知')
        if (e.data) {
            $.each(e.data, function(k, v) {
                var _url = openUrl('formdata/open', { sid: v.FORM_DATA_SID, lid: v.LID, mid: v.SID })
                var _li = '<li>' +
						'<a href="javascript:goUrl(\'' + _url + '\');">' +
						'<span class="time" style="max-width:200px;">' + v.CREATE_TIME + '</span>' +
						'<span class="details">' +
							'<span class="notification-icon circle blue-bgcolor">' +
								'<i class="fa fa-comments-o"></i>' +
							'</span>' +
							'<b>' + v.TITLE + '</b>' +
						'</span>' +
					'</a>' +
				'</li>'
                $('#td_top_message_li').append(_li)
            })
        }
    }
    /*
	var updateMenu = function( e ){
		for(key in e.message){
			if(e.message[key]['total']!=0){
				$('#'+key+'-module').addClass('menu-message').text(e.message[key]['total']);
			}

			for(k in e.message[key]['item']){
				if(e.message[key]['item'][k]!=0){
					$('#'+key+'-'+k).addClass('menu-message').addClass('menu-message-sub').text(e.message[key]['item'][k]);
				}
			}
		};
	}
	*/

    $.ajax({
        url: openUrl('message/get_MessageTop', { is_api: 1 }),
        type: 'POST',
        dataType: 'jsonp',
        success: function(e) {
            if (typeof func == 'function') func(e)
            updateTips(e)
            // updateMenu(e);
        },
        error: function(err) {
        }
    })
}
// 获取页面可视高度,兼容
function getClientHeight() {
    var clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    } else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }
    return clientHeight
}

/**
 * 选择会议室
 */
this.fnSelectMeetRoom = function(fnCallback, oJSON_Selected, blnMulti, title, fniframe) {
    if (blnMulti == null) blnMulti = false
    var _url = openUrl('meetingroom/screenMeetRoom')
    $('#common-select').unbind('show.bs.modal').on('show.bs.modal', function() {
        $(this).find('iframe[name=_content]').remove()
        // 设置提示框标题
        if (title) $(this).find('.modal-title').text(title)
        var $_frame = $('<iframe name="_content">').attr('src', _url).css('width', '100%').css('border', 'none').css('height', '100%').attr('scrolling', 'yes')
        $_frame.appendTo($(this).find('.modal-body'))
        $_frame.on('load', function() {
            if ($.isFunction(fniframe)) {
                return fniframe($_frame)
            }
        })
        // 设置确定按钮功能
        $(this).find('.btn-success').unbind('click').click(function() {
            var _objReturn = {}
            try {
                const _output_data = $_frame.contents().find('#output_data').text()
                // _objReturn.push({ 'id': _id, 'name': _name ,'floor':_floor,'room':_room,'meetingroom':_meetingroom,'title':_title,'datetime':_date_time,'appo_status':_appo_status})
                _objReturn = JSON.parse(_output_data)
                if (_objReturn.SID) {
                    _objReturn.TIME = $_frame[0].contentWindow.getTimes()
                }
            } catch (e) { }
            if ($.isFunction(fnCallback)) {
                return fnCallback(_objReturn)
            } else return true
        })
    }).modal()
}
var formDataExit = {
    needTips: false,
    confirmCall: null,
    denyCall: null
}
function goUrl(url) {
    if (formDataExit.needTips) {
        confirmModal('页面即将跳转。您有未保存的工作，是否保存？', function() {
            try {
                if (typeof formDataExit.confirmCall == 'function') {
                    formDataExit.confirmCall(function() {
                        window.location.href = url
                    })
                } else window.location.href = url
            } catch (e) {
                window.location.href = url
            }
        }, function() {
            window.location.href = url
        }, false, '保存', '不保存')
    } else window.location.href = url
}
