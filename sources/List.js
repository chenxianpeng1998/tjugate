/**
 * 列表js
 */
// 进入起草申请编辑页面
var fnEditApply = function(document_id) {
    if (!document_id) return false
    window.location.href = openUrl('formdata/edit', { sid: document_id })
    return true
}

// 删除起草申请
var fnDelApply = function(document_id, design_id) {
    if (!document_id || !design_id) return false
    var CONST_MSG = {
        del_confirm_title: '是否确认删除此申请，删除后数据无法恢复？',
        del_confirm_yes: '删除',
        del_confirm_no: '不删除'
    }
    confirmModal(CONST_MSG.del_confirm_title, function() {
        // 确认
    	$.ajax({
            type: 'POST',
            dataType: 'jsonp',
            url: openUrl('formdata/del'),
            data: { sid: document_id },
            success: function(data) {
                window.location.href = openUrl('list/draft', { sid: design_id })
            }
        })
    }, function() {
        // 取消

    }, false, CONST_MSG.del_confirm_yes, CONST_MSG.del_confirm_no)

    return true
}

// 作废起草申请
var fnTrashApply = function(document_id) {
    if (!document_id) return false
    var CONST_MSG = {
        del_confirm_title: '是否确认作废此申请，作废后数据无法恢复？',
        del_confirm_yes: '作废',
        del_confirm_no: '不作废'
    }
    confirmModal(CONST_MSG.del_confirm_title, function() {
        // 确认
    	$.ajax({
            type: 'POST',
            dataType: 'jsonp',
            url: openUrl('formdata/trash'),
            data: { sid: document_id },
            success: function(data) {
                window.location.reload()
            }
        })
    }, function() {
        // 取消

    }, false, CONST_MSG.del_confirm_yes, CONST_MSG.del_confirm_no)

    return true
}

// 查看个人的申请
var fnApplyPersonal = function(document_id, list_id, pointer, status) {
    if (!document_id) return false

    if (!pointer) pointer = ''

    if (status == '0') {
    	window.location.href = openUrl('formdata/edit', { sid: document_id, pointer: pointer })
    } else window.location.href = openUrl('formdata/open', { sid: document_id, lid: list_id, pointer: pointer })
    return true
}

// 管理员维护数据
var fnAdminForm = function(document_id, list_id, pointer, status, need_blank) {
    if (!document_id) return false
    // if (!pointer) pointer = getUrlParam('pointer');
    if (!pointer) pointer = ''
    if (need_blank) window.open(openUrl('admin', { did: document_id, pointer: pointer }))
    else window.location.href = openUrl('admin', { did: document_id, pointer: pointer })
    return true
}
// 撤销已经发布的数据
var fnBackDraft = function(document_id, list_id) {
    if (!document_id) return false

    confirmModal(CONST_MSG.back_to_draft, function() {
        // 确认
    	$.ajax({
            type: 'POST',
            dataType: 'jsonp',
            url: openUrl('formdata/backDraft'),
            data: { sid: document_id, lid: list_id },
            success: function(data) {
                window.location.href = openUrl('list/draft', { sid: getParam('sid') })
            }
        })
    }, function() {
        // 取消

    }, false, CONST_MSG.back_confirm_yes, CONST_MSG.back_confirm_no)

    return true
}

// 续假
var fnUpdateLeave = function(did, lid) {
    if (did == '') return false
    $('.confirm-operation').attr('leaveId', did)

    confirmModal('确定要进行续假?', function() {
        document_id = $('.confirm-operation').attr('leaveId')
        $.ajax({
            type: 'get',
            data: { did: document_id, status: '2', record: '' },
            url: openUrl('leave/renewLeave'),
            dataType: 'jsonp',
            success: function(xhr) {
                if (xhr.status) {
                    const _url = openUrl('formdata/edit', { sid: xhr.result })
                    location.href = _url
                } else {
                    Toast(xhr.prompt, 1, 'mid-center', '提示')
                }
            },
            error: function(xhr) {
                Toast(xhr.prompt, 1, 'mid-center', '提示')
            }
		 })
    }, function() {})
}

/**
 * 拼接出草稿状态文件的标题链接
 */
var fnDraftListTitle = function(title, form_sid) {
    var max_length = 20
    if (title.length > max_length) title = title.substring(0, max_length) + '...'

    var $a = $('<a href="#"></a>').addClass('td-mobile-title')
    $a.attr('title', title).text(title)
    $a.click(function() {
        fnEditApply(form_sid)
    })
    return $a
}

/**
 * 拼接出流程中状态文件的标题链接
 */
var fnProcessListTitle = function(title, form_sid, list_id, pointer = '') {
    var max_length = 50
    if (title.length > max_length) title = title.substring(0, max_length) + '...'

    var $a = $('<a href="#"></a>').addClass('td-mobile-title')
    $a.attr('title', title).text(title)
    $a.click(function() {
        if (typeof list_id !== undefined && list_id != '') {
        	fnApplyPersonal(form_sid, list_id, pointer)
        } else {
        	fnApplyPersonal(form_sid, ' ', pointer)
        }
    })
    return $a
}

/**
 * 拼接出转阅文件的标题连接
 */
var fnToReadListTitle = function(title, form_sid, pointer = '') {
    var max_length = 50
    if (title.length > max_length) title = title.substring(0, max_length) + '...'
    var $a = $('<a href="#"></a>').addClass('td-mobile-title').text(title).click(function() {
        fnReadApply(form_sid, pointer)
    })
    return $a
}
var fnReadApply = function(form_sid, pointer) {
    window.location.href = openUrl('formdata/toRead', { sid: form_sid, pointer: pointer })
}
/**
 * 拼接出转学习文件的标题连接
 */
var fnToLearnListTitle = function(title, form_sid, pointer = '') {
    var max_length = 50
    if (title.length > max_length) title = title.substring(0, max_length) + '...'
    var $a = $('<a href="#"></a>').addClass('td-mobile-title').text(title).click(function() {
        fnLearnApply(form_sid, pointer)
    })
    return $a
}
var fnLearnApply = function(form_sid, pointer) {
    window.location.href = openUrl('formdata/toLearn', { sid: form_sid, pointer: pointer })
}
/**
 * 格式化最新操作
 * 返回html
 */
var fnFormatLog = function(title, max_length) {
    if (max_length == null) max_length = 55
    var formated = fnFormatLogString(title, max_length)

    return '<p class="td-mobile-title" title="' + formated + '">' + formated + '</p>'
}
/**
 * 格式化最新操作
 * 返回字符串
 */
function fnFormatLogString(title, max_length) {
    var formated = ''

    var reg = /\[[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d\]/
    var match = title.match(reg)
    if (!match) return title
    var timeString = match[0].substring(1, match[0].length - 1)
    var time = new Date(timeString)
    var now = new Date()

    var diff = (now - time) / 1000
    if (diff < 60) formated = '刚刚'
    else if (diff < 3600) formated = Math.floor(diff / 60) + '分钟前'
    else if (diff < (3600 * 24)) formated = Math.floor(diff / 3600) + '小时前'
    else if (diff < (3600 * 24 * 7)) formated = Math.floor(diff / 3600 / 24) + '天前'
    else formated = timeString.split(' ')[0]

    var title1 = title.replace('[' + timeString + ']', '[' + formated + ']')
    if (!max_length) return title1
    else return fnFormatTitleString(title1, max_length)
}
/**
 * 格式化标题
 * 返回html
 */
var fnFormatTitle = function(title, max_length) {
    return '<p class="td-mobile td-mobile-title">' + fnFormatTitleString(title, max_length) + '</p>'
}
/**
 * 格式化文件标题
 * 返回字符串
 */
var fnFormatTitleString = function(title, max_length) {
    var shortTitle = title
    if (!max_length) max_length = 20

    if (title && title.length > max_length) return title.substring(0, max_length) + '...'
    else return title
}
