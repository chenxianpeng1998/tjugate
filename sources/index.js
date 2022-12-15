$(function(){
	SERV_TJU.ready(function( data ){
		window.showQr = function(){
			if( !QRUtils ) return false;
			QRUtils.req( '6f51cadcfb9f06a7fed19b7418acc4a8', '' );
		}
		window.IOTScan = function(){
			QRUtils.IOTScan();
		}
		window.showQrBDRS = function(){
			if( !QRUtils ) return false;
			QRUtils.req( '52a481d221649268560e7ed6e7d4577b', '' );
		}
		window.showQrNewBDRS = function(){
			if( !QRUtils ) return false;
			QRUtils.req( '699f81d2d79d5dfabb1fd4d790b93834', '' );
		}
	});
})