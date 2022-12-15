var QRUtils = (function() {
    var reqQR = function(app_id, qr_data, $button) {
        if (!app_id) return false
        if ($button) $button.attr('disabled', 'disabled').text($button.attr('ds-loading-title'))
        $.ajax({
            url: openUrl('verifyqr/generate'),
            dataType: 'json',
            type: 'post',
            data: { appid: app_id, data: qr_data },
            success: function(e) {
                if ($button) $button.removeAttr('disabled').text($button.attr('ds-title'))
                showQR(e)
            },
            error: function() {
                if ($button) $button.removeAttr('disabled').text($button.attr('ds-title'))
            }
        })
    }
    var showQR = (function() {
        var tpl = `
		<div class="modal fade" id="dialog_qrcode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-body">
		      	<div class="qr-error" style="margin-top:10%;text-align:center;font-size:40px;">2</div>
		      	<iframe width="100%" class="qr-success" id='aa'></iframe>
		      </div>
		      <div class="modal-footer">
		      <button type="button" class="btn btn-info">刷新</button>
		      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		      </div>
		    </div>
		  </div>
		</div>
		`
        var $modal = $(tpl).appendTo($('body'))

        $modal.find('.modal-content').css('background-image', 'url(\'/upload/bg.jpg\')')
        // $modal.find('.modal-content').css('background', 'red')
        $modal.find('.modal-content').css('background-size', 'cover')

        var $frm = $modal.find('.qr-success').hide()
        var $err = $modal.find('.qr-error').hide()
        return function(data) {
            $modal.on('show.bs.modal', function() {
                $err.hide()
                $frm.hide()
                if (data.status) {
                    $modal.find('.modal-dialog').css('max-width', '95%').css('height', '100%')
                    $modal.find('.modal-content').css('height', '95%')
                    $frm.show().attr('src', openUrl('verifyqr/show', { code: data.content })).css('height', window.innerHeight * 0.8)
                } else {
                    $modal.find('.modal-dialog').css('width', 'auto').css('max-width', '').css('height', 'auto')
                    $modal.find('.modal-content').css({
                        'height': 'auto'
                    })
                    $modal.find('.modal-body').css({
                        'color': '#0a042b'
                    })
                    $err.show().text(data.content)
                }
            }).on('hide.bs.modal', function() {
            }).modal()
            $modal.find('button.btn-info').click(function() {
                $frm.contents()[0].location.reload()
            })
        }
    })()
    var loadList = function(callback) {
        $.ajax({
            url: openUrl('verifyqr/myList'),
            dataType: 'json',
            success: function(e) {
                callback(e)
            },
            error: function() {
                callback()
            }
        })
    }
    var IOTScan = (function() {
        var tpl = `
		<div class="modal fade" id="iot_auth" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document" style="max-width:800px;">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h4 class="modal-title">物化账户授权</h4>
		      </div>
		      <div class="modal-body">
		 			<div class="form-horizontal">
						<div class="form-group row">
							<label class="control-label col-md-3">账户ID： <span class="required"> * </span> </label>
							<div class="col-md-7">
								<input type="text"  class="form-control" name="phy_id" placeholder="请输入物联账户ID">
							</div>
						</div>
						<div class="form-group row">
							<label class="control-label col-md-3">密码：<span class="required"> * </span> </label>
							<div class="col-md-7">
								<input type="password"  class="form-control" name="phy_password" placeholder="请输入物联账户密码">
							</div>
						</div>
		 			</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-info">授权</button>
		        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		      </div>
		    </div>
		  </div>
		</div>
		`

        var $modal = $(tpl).appendTo($('body'))
        var $btn = $modal.find('.btn-info').click(function() {
        	var iotId = $modal.find('input[name=phy_id]').val()
        	var iotPwd = $modal.find('input[name=phy_password]').val()
        	if (iotId == '' || iotPwd == '') {
        		return false
        	}
        	console.log({ uid: iotId, password: iotPwd })
        	$.ajax({
        		url: openUrl('iot/verify'),
                dataType: 'json',
                type: 'post',
                data: { uid: iotId, password: iotPwd },
                success: function(e) {
                    if (e) window.location.href = openUrl('welcome/sweep')
                },
                error: function() {
                }
        	})
        })
        return function(data) {
            $modal.modal()
        }
    })()

    return {
        req: reqQR,
        show: showQR,
        myList: loadList,
        IOTScan: IOTScan
    }
}())
