function autocheck(vers){
		$.getJSON({
			url: 'https://tjugateapp.z7.web.core.windows.net/update.json',
			type: "get",
			dataType: "json",
			cache:false,
			success: function(data){
				if(compareVersion(vers, data.version)==-1){
					var r=confirm("有可用更新："+vers+"→"+data.version+"\n是否下载更新？")
					if (r==true)
						{
							    function plusReady(){
    						    	plus.webview.create(data.link,'downapk',{
										backButtonAutoControl:'close',
										height:'0px',
										width:'0px',
										opacity:0
									});
									plus.webview.show('downapk');
									plus.webview.hide('downapk');
    							}
								if(window.plus){
									plusReady();
								}else{
									document.addEventListener('plusready',plusReady,false);
								}
						}
				};
			},
		});
}
function mycheck(vers){
		$.getJSON({
			url: 'https://tjugateapp.z7.web.core.windows.net/update.json',
			type: "get",
			dataType: "json",
			cache:false,
			success: function(data){
				if(compareVersion(vers, data.version)==0) alert("当前为最新版本！");
				if(compareVersion(vers, data.version)==1) alert("当前为测试版本！");
				window.location.reload();
			},
			error: function(msg){
				alert("更新服务器连接异常！");
				window.location.reload();
			}
		});
	};
