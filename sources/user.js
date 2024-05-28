/**
 * user用户相关功能通用JS
 */
//默认查询条件
var DefaultSearchObj = {
	status : '1',
	type : '1',
	uid : '',
	name : '',
	groupid : '*',
	phone : '',
	mail : '',
	staffstatus : '02',
	apostlevel : '*',
	apost : '',
	tpost : '*',
	nation: '',
	polity: '',
	major : '',
	grade : '',
    isGraduate: '0'
};
//查询条件
var SearchObj={};
/**
 * 初始化默认查询条件
 */
function defaultSearch(){
	$.each(DefaultSearchObj, function(i,e){
		SearchObj[i]=DefaultSearchObj[i];
	});
}
/**
 * 根据查询结果生成url的get参数 
 */
function makeSearchGet(search, need_escape){
	var getJson = {};
	$.each(search, function(i,e){
		getJson['s_'+i] = need_escape?escape(e):e;
	});
	return getJson;
}
/**
 * 解析url中get参数
 * 以默认DefaultSearchObj作为模版
 */
function parseSearchGet(need_unescape){
	var search = {};
	$.each( DefaultSearchObj, function(key, val){
		var p = getUrlParam('s_'+key, need_unescape, true);
		if( p!==null ) search[key] = p;
		else search[key] = DefaultSearchObj[key];
	});
	return search;
}
/**
 * 打开编辑用户的页面
 */
function fnEditUser(sid){
	if(sid=="") return false;
	var o = makeSearchGet(SearchObj, true);
	o.sid = sid;
	window.location.href = openUrl('user/edit', o);
}
/**
 * 切换启用、冻结状态
 */
function fnStatusUsers(oRow, status){
    if(oRow=="") return false;
    var _string ='';
    if(status =='1'){
        _string = '启用';
    }else{
        _string = '冻结';
    }
    //confirmModal('是否将 '+oRow.NAME+'('+oRow.UID+') 设为'+_string+'?',function(){
        $.ajax({
            url:openUrl('user/save'),
            type: 'post',
            dataType: 'jsonp',
            data:{'sid':oRow.SID,'status':status},
            success: function(data){
                if(data.status){
                    Toast('操作完成', 1, 'top-center', '提示');
                    if(activeDataTable) activeDataTable.fnDraw();
                }else{
                	Toast('请重试', 1, 'top-center', '提示');
                    return false;
                }
            },
            error: function(data, status, e){ 
            	Toast('请重试', 1, 'top-center', '提示');
                return false;
            }
        })
    //},'',false,'确定','取消');
}
/**
 * 删除用户
 */
function fnDelUser(sid){
	if(sid=="") return false;
	confirmModal('删除用户后无法恢复， 是否删除？',function(){
		$.ajax({
			"url":openUrl('user/del'),
			"type":"post",
			"dataType":"jsonp",
			"data":{"sid":sid},
			"success":function(e){
				if(e){
					Toast('删除成功',1,'mid-center','成功');
                    if(activeDataTable) activeDataTable.fnDraw();
				}else{
					Toast('删除失败',2,'mid-center','失败');
					return false;
				}
			},
			"error":function(){}
		})
	},'',false,'确定','取消');
}
/**
 * 管理员修改用户密码
 */
var fnAdminChangePwd = function(){
	var tpl = `
		<div class="modal fade" id="change_user_pwd " tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
			<div class="modal-dialog" role="document"  style="width:50%;margin:1.75rem auto;max-width:none;">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="myModalLabel">修改用户密码</h4>
					</div>
					<div class="modal-body">
						<div class="form-group row">
							<label class="control-label col-md-3">新密码： <span class="required"> * </span> </label>
							<div class="col-md-5">
								<span class="required"></span>
								<input type="text" id="new_password" name="new_password" class="form-control input-height" placeholder="请输入新密码"  />
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">确认新密码： <span class="required"> * </span> </label>
							<div class="col-md-5">
								<span class="required"></span>
								<input type="text" id="new_password2" name="new_password2" class="form-control input-height" placeholder="请再次输入新密码"  />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">修改</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">不修改</button>
					</div>
				</div>
			</div>
		</div>
	`;
	var $dialog, $newPwd, $newPwd2;
	return function(user_sid){
		if( !$dialog ){
			$dialog = $(tpl).appendTo($('body'));
			$newPwd = $dialog.find('#new_password');
			$newPwd2 = $dialog.find('#new_password2');
		}
        $dialog.find('button.btn-info').unbind().click(function(){
            if( $newPwd.val()=='' ){
                $newPwd.siblings('.required').show().text('请输入新密码!');
                return false;
            }else{
                $newPwd.siblings('.required').hide();
            }
            if( $newPwd2.val()=='' ){
                $newPwd2.siblings('.required').show().text('请再次输入新密码!');
                return false;
            }else{
                $newPwd2.siblings('.required').hide();
            }
            if( $newPwd2.val()!=$newPwd.val() ){
                $newPwd2.siblings('.required').show().text('两次输入的新密码不一致!');
                return false;
            }else{
                $newPwd2.siblings('.required').hide();
            }
            $.ajax({
                url: openUrl('user/changePwdByAdmin'),
                type:'POST',
                dataType:'jsonp',
                data:{
                    'usid': user_sid,
                    'pwd': $newPwd.val()
                }
            }).then(re=>{
                Toast('操作完成', 1, 'mid-center', '提示');
            },er=>{
                Toast('操作异常,请重试', 1, 'mid-center', '提示');
            });
        });
		$dialog.on("show.bs.modal",function(){
			$newPwd.val('');
			$newPwd.siblings('.required').hide();
			$newPwd2.val('');
			$newPwd2.siblings('.required').hide();
		}).modal();
	}
}();
/**
 * 查询用户信息
 */
function get_Userinfo( sid, callback ){
	if( sid=='' ) return false;
	$.ajax({
		url:openUrl('user/get_Userinfo'),
		type:'POST',
		dataType:'jsonp',
		data:{"sid":sid},
		success:function(data){
			if( typeof callback == 'function' ) callback(data);
		},
		error:function(err){
			if( typeof callback == 'function' ) callback(data);
		}
	});
}
/**
 * 查询用户信息的数据字典
 */
function get_UsertypeAll( callback, regist_in_group ){
	$.ajax({
		url:openUrl('user/get_UsertypeAll'),
		type:'POST',
		data:{regist_in_group: regist_in_group},
		dataType:'json',
		success:function(data){
			if( typeof callback == 'function' ) callback(data);
		},
		error:function(err){
			if( typeof callback == 'function' ) callback(data);
		}
	});
}