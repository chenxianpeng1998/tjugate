$(function() {
    get_Userinfo($('input[name=u_sid]').val(), function(data) {
        if (data) {
            $('#username').text(data.name)
            $('#uid').text(data.uid)
            $('.user_mail').text(data.mail)
            $('.user_phone').text(data.phone)
            $('.user_work_phone').text(data.work_phone)

            if (data.image != '') {
                $('#user_img').attr('src', data.image)
            }
            $('.user_identity_no').text(data.identity_no)
            $('.user_type').text(data.type_name)
            $('.user_gender').text(data.gender == '1' ? '男' : data.gender == '2' ? '女' : '')
            $('.user_group').text(data.current_group_name)
            if (data.user_group) {
                $.each(data.user_group, function(i, e) {
                    var _content = '无'
                    if (e.group_content != '') {
                        _content = e.group_content
                    }
                    $('#user_group_ul').append($('<li>').text(e.group_title + ' 内拥有系统角色：' + _content))
                })
            }
            if (data.type == 1) {
                $('#employee_info').show()
                $('.apost').text(data.apost)
                $('.apostlevel').text(data.apostlevel_title)
                $('.degree').text(data.degree_title)
                $('.degreetype').text(data.degreetype_title)
                $('.directortype').text(data.directortype_title)
                $('.fornlang').text(data.fornlang_title)
                $('.diploma').text(data.diploma_title)
                $('.health').text(data.health_title)
                $('.major_grade').text(data.major_grade)
                $('.marry').text(data.marry_title)
                $('.nation').text(data.nation_title)
                $('.polity').text(data.polity_title)
                $('.province').text(data.province_title)
                $('.tpost').text(data.tpost_title)
                $('.staffkind').text(data.staffkind_title)
                $('.staffstatus').text(data.staffstatus_title)
                $('.stafftype').text(data.stafftype_title)
                $('.comments').text(data.comments)
            } else if (data.type == 3) {
                $('#student_info').show()
                $('.grade').text(data.grade)
                $('.polity').text(data.polity)
                $('.major').text(data.major)
                $('.nation').text(data.nation)
            }
        }
    })
    $('#back_user').click(function() {
        window.location.href = openUrl('user/index', makeSearchGet(parseSearchGet(true), true))
    })
})
