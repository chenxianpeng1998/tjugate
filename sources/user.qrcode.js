$(function(){
	SERV_TJU.ready(function(){
		if(QRUtils){
			var $list = $('#qrcodes');
			var fnDraw = function(){
				var tpl = `
				<div class="row">
					<div class="col-12">
						<h3></h3>
						<p></p>
						<button type="button" class="btn btn-info" ds-title="获取二维码" ds-loading-title="获取中,请稍候..."></button>
						<hr style="margin-bottom:0px">
					</div>
				</div>
				`;
				return function( data ){
					$list.empty();
					if( data.length==0 ){
						var $item = $(tpl).appendTo($list);
						$item.find('h3').text('无可用二维码');
						$item.find('p').remove();
						$item.find('button').remove();
					}else{
						$.each( data, function(i, d){
							var $item = $(tpl).appendTo($list);
							$item.find('h3').text(d.title);
							if(!d.status){
								$item.find('p').text(d.content);
								$item.find('button').remove();
							}else{
								$item.find('p').text(d.content);
								var $btn = $item.find('button').data('qr_appid', d.appid).data('qr_color', d.color).data('qr_data', d.data).click(function(){
									QRUtils.req( $(this).data('qr_appid'), $(this).data('qr_data'), $(this) );
								})
								$btn.text($btn.attr('ds-title'));
							}
						} );
					}
				}
			}();
			QRUtils.myList(function( list ){
				if(list) fnDraw(list);
			});			
		}	
	});
	$('#backToTop').click(function(){
		window.location.href = 'main.html';
	});
})