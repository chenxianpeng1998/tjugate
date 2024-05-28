// 添加弹窗
var _saveUserOpinion = function(sid = '') {
     $('#user_opinion_modal').unbind('show.bs.modal').on('show.bs.modal', function() {
         if (sid == '') {
             $('input[name=user_text]').val('')
         }
         $(this).find('#btn_save_user_opinion_modal').unbind('click').click(function() {
             var _text = $('input[name=user_text]').val()
             var _u_sid = $('input[name=u_sid]').val()
             if (_text == '') {
                 Toast('意见不能为空', 1, 'mid-center', '提示')
                 return false
             }
             $.ajax({
                url: openUrl('user/opinoin_save'),
                type: 'POST',
                dataType: 'jsonp',
                data: { 'sid': sid, 'u_sid': _u_sid, 'text': _text },
                success: function(data) {
                    if (data.status) {
                             Toast('操作成功', 1, 'mid-center', '提示')
                        _getUserOpinion()
                             $('#btn_close_user_opinion_modal').click()
                    }
                },
                error: function(err) {}
             })
         })
     }).modal()
}
var _saveUserMailPhone = function(title, key, value, callback) {
     $('#user_mail_phone').unbind('show.bs.modal').on('show.bs.modal', function() {
         let $this = $(this);
         $this.find('.modal-title').text(title);
         $this.find('.modal-body input').val(value);
         $this.find('.modal-label').text(title);
         $this.find('.btn-success').unbind('click').click(function() {
            let val = $this.find('.modal-body input').val();
            let data={};
            if(key=='mail'){
                if(!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val))){
                    Toast('请填写格式正确的邮箱', 1, 'mid-center', '提示');
                    return false;
                }
            }else if(key=='phone'){
                if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(val))){
                    Toast('请填写格式正确的11位手机号', 1, 'mid-center', '提示');
                    return false;
                }
            }else if(key=='workPhone'){
                if(!(/([0-9]{3,4}-)?[0-9]{7,8}/.test(val))){
                    Toast('请填写格式正确的工作电话', 1, 'mid-center', '提示');
                    return false;
                }
            }else return false;
            data[key]=val;
            $.ajax({
                url: openUrl('user/setMyInfo'),
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(data) {
                    Toast('操作成功', 1, 'mid-center', '提示');
                    if(typeof callback =='function') callback(data, val);
                    $this.modal('hide');
                }
            })
         })
     }).modal();
}
var _delUserOpinino = function(sid) {
    if (sid == '') return false
    confirmModal('删除个人意见后无法恢复， 是否删除？', function() {
        $.ajax({
            'url': openUrl('user/opinion_del'),
            'type': 'post',
            'dataType': 'jsonp',
            'data': { 'sid': sid },
            'success': function(e) {
                if (e) {
                    Toast('删除成功', 1, 'mid-center', '成功')
                    _getUserOpinion()
                } else {
                    Toast('删除失败', 2, 'mid-center', '失败')
                    return false
                }
            },
            'error': function() {}
        })
    }, '', false, '确定', '取消')
}
var _getUserOpinion = function() {
    var _u_sid = $('input[name=u_sid]').val()
    if (_u_sid == '') return false
    $.ajax({
        url: openUrl('user/opinoin_all'),
        type: 'POST',
        dataType: 'jsonp',
        data: { 'u_sid': _u_sid },
        success: function(data) {
            if (data) {
                $('#user_opinion_tbody').html('')
                $.each(data, function(i, e) {
                    $('#user_opinion_tbody').append($('<tr>').append($('<td>').text(e.text)).append($('<td>').append(
                        $('<button>').addClass('btn').addClass('btn-primary').addClass('btn-xs').append($('<i>').addClass('fa').addClass('fa-pencil').text('编辑')).click(function() {
                            $('input[name=user_text]').val(e.text)
                            _saveUserOpinion(e.sid)
                        })
                    ).append(
                        $('<button>').addClass('btn').addClass('btn-danger').addClass('btn-xs').append($('<i>').addClass('fa').addClass('fa-trash-o').text('删除')).click(function() {
                            _delUserOpinino(e.sid)
                        })
                    )))
                })
            } else {
                $('#user_opinion_tbody').html('')
            }
        },
        error: function(err) {}
    })
}
$(function() {
    var tag = getUrlParam('t');
    if( tag>0 ){
        try {
            $($('.nav-tabs .nav-item').eq(tag-1)).find('a').click();
            $('.page-container').scrollTo('1024');   
        } catch (error) {
            
        }
    }
    _getUserOpinion()
    $('#add_user_opinion').click(function() {
        var _u_sid = $('input[name=u_sid]').val()
        $.ajax({
            url: openUrl('user/opinion_num'),
            type: 'POST',
            dataType: 'jsonp',
            data: { 'u_sid': _u_sid },
            success: function(num) {
                if (num < 5) {
                    _saveUserOpinion()
                } else {
                     Toast('个人意见最多只能添加5条', 1, 'mid-center', '提示')
                     return false
                }
            },
            error: function(err) {}
        })
    })
    
    var checkValidPwd = function( $ipt ){
        if ( !/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-zA-Z]|[0-9]){6,}$/.test($ipt.val()) ) {
            $ipt.siblings('.required').show().text('密码格式要求数字与字母混合，并且长度至少6位!')
            return false
        } else {
            $ipt.siblings('.required').hide()
            return true
        }
    }
    var $newPwd = $('#new_password').val('').on('keyup', function(){
        checkValidPwd($(this));
    }).change(function(){
        checkValidPwd($(this));
    })
    var $newPwd2 = $('#new_password2').val('').on('keyup', function(){
        checkValidPwd($(this));
    }).change(function(){
        checkValidPwd($(this));
    })
    $('#change_password_form').submit(function() {
        if( !checkValidPwd($newPwd) || !checkValidPwd($newPwd2) ) return false;
        else if($newPwd2.val() != $newPwd.val()) {
            $newPwd2.siblings('.required').show().text('两次输入的密码不一致!')
            return false
        } else {
            $newPwd2.siblings('.required').hide()
        }
        $.ajax({
            url: openUrl('user/changePwd'),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                'new_pwd': $newPwd.val()
            },
            success: function(num) {
                if (!num) {
                    Toast('请重试', 1, 'mid-center', '提示')
                } else {
                    Toast('修改成功', 1, 'mid-center', '提示')
                    $newPwd.val('')
                    $newPwd2.val('')
                }
                return true
            },
            error: function(err) {
                Toast('请重试', 1, 'mid-center', '提示')
                return false
            }
        })
        return false
    })
    
    
    
    $('.edit-user-info').click(function(){
        let $this = $(this);
        let value = $this.parent().siblings().text();
        let title = $this.parents('.list-group-item').find('b').text();
        _saveUserMailPhone(title, $this.attr('_type'), value, function(ret, newValue){
            if(ret) $this.parent().siblings().text(newValue);
        });
    });
})
