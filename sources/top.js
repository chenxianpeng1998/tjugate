var switchGroups = (function() {
    var tpl = `
	<li>
		<a href="#" data-toggle="modal" data-target="#change_user_group">
			<i class="icon-directions"></i> 身份切换
		</a>
	</li>
	`

    var tplItem = `<tr><td></td><td></td></tr>`

    function doSwitch() {
        if (!checkedGid) return false
        $.ajax({
            url: openUrl('index/setGroup'),
            type: 'POST',
            dataType: 'jsonp',
            data: { 'group_sid': checkedGid },
            success: function(e) {
                window.location.reload()
            },
            error: function(err) {
                Toast('请重试', 2, 'mid-center', '提示')
            }
        })
    }

    var checkedGid = ''
    function showSwitch() {
        checkedGid = ''
        $.ajax({
            url: openUrl('index/getGroup'),
            type: 'POST',
            dataType: 'jsonp',
            success: function(data) {
                if (!data) return false
                var $tbody = $('#change_user_group table tbody').empty()
                $.each(data, function(i, e) {
                    var $item = $(tplItem).appendTo($tbody)
                    $item.css('cursor', 'pointer')
                    $item.find('td:first').text(e.title)
                    $item.find('td:last').text(e.alias)
                    $item.data('sid', e.sid)
                    if (e.checked == '1') {
                        $item.css('background-color', '#dee2e6')
                        checkedGid = e.sid
                    }
                    $item.click(function() {
                        $(this).css('background-color', '#dee2e6')
                        $(this).siblings().css('background-color', 'white')
                        checkedGid = $item.data('sid')
                    })
                })
            },
            error: function(err) {}
        })
    }

    return function(groupCounts) {
        if (!groupCounts || groupCounts <= 1) return false
        var $li = $(tpl).insertBefore($('#header_user_bar ul li:last')).click(function() {
            showSwitch()
        })

        $('#change_user_group .modal-footer button.btn-info').click(function() {
            doSwitch()
        })
    }
}())

var ownerGroupRole = (function() {
    var tpl = `
	<li class="dropdown dropdown-extended dropdown-notification">
		<a id="role-config" href="#" class="dropdown-toggle" ><i class="fa fa-exclamation-circle"></i></a>
	</li>
	`
    var tplTips = `
	<div class="popover fade bs-popover-left show" role="tooltip" id="popover726267" style="will-change: transform;position: absolute;top: 25%;left: -75%;z-index: 10000;font-size:16px;max-width:275px;" x-placement="left">
		<div class="arrow" style="top: 2px;"></div>
		<h3 class="popover-header"></h3>
		<div class="popover-body" style="color:#337dce;">
			您可以在这里设置本部门员工角色权限.
			<button id="popover-hidden" style="background-color: #fff;
				padding: 3px 7px;
				border: 1px dotted #6c757d;
				border-radius: 4px;
				margin-left:10%;color:#337dce;" >不再提醒</button>
		</div>
	</div>
	`
    return function(roles, group) {
        if (!roles || roles.length == 0 || !group) return false
        if ((roles.getIndex('1') > -1 || roles.getIndex('3') > -1)) {
            $(tpl).insertAfter(('#header_home_bar')).click(function() {
                goUrl(openUrl('group/viewOnlyRole', { sid: group, 's_title': '', 's_type': '', 's_alias': '' }))
            })
        }
    }
}())

$(function() {
    function search(text) {
        if (!text) return false
        goUrl(openUrl('search/index', { 'search': escape(text) }))
    }
    $('#global_search .submit').click(function() {
        search($(this).find('input[name=search]').val())
    })
    $('#global_search input[name=search]').on('keydown', function(event) {
        if (event.keyCode == 13) search($(this).val())
    })

    SERV_TJU.ready(function(data) {
        if (!data) return false
        if (data.name) $('#header_user_bar span.username').text('欢迎你, ' + data.name)
        if (data.groups) {
            switchGroups(Object.keys(data.groups).length)
        }
        if (data.roles && data.group) {
            ownerGroupRole(data.roles, data.group)
        }
    })
})
