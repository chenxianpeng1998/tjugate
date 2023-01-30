function autocheck(vers) {
	$.getJSON({
		url: 'https://tjuapk.z7.web.core.windows.net/update.json',
		type: "get",
		dataType: "json",
		cache: false,
		success: function(data) {
			if (compareVersion(vers, data.version) == -1) {
				{
					document.getElementById('pop_tit').innerHTML = "可用更新";
					document.getElementById('pop_con').innerHTML = "有可用更新：" + vers + "→" + data.version +
						"\n是否下载更新？";
					yes_btn.onclick = function() {
						function plusReady() {
							plus.webview.create(data.link, 'downapk', {
								backButtonAutoControl: 'close',
								height: '0px',
								width: '0px',
								opacity: 0
							});
							plus.webview.show('downapk');
							plus.webview.hide('downapk');
						}
						if (window.plus) {
							plusReady();
						} else {
							document.addEventListener('plusready', plusReady, false);
						}
						document.getElementById('darkbackground_alert').style.display = "none";
					}
					close_btn.onclick = function() {
						document.getElementById('darkbackground_alert').style.display = "none";
					}
					document.getElementById('darkbackground_alert').style.display = "block";
				}
				var r = confirm("有可用更新：" + vers + "→" + data.version + "\n是否下载更新？")
				if (r == true) {
					function plusReady() {
						plus.webview.create(data.link, 'downapk', {
							backButtonAutoControl: 'close',
							height: '0px',
							width: '0px',
							opacity: 0
						});
						plus.webview.show('downapk');
						plus.webview.hide('downapk');
					}
					if (window.plus) {
						plusReady();
					} else {
						document.addEventListener('plusready', plusReady, false);
					}
				}
			};
		},
	});
}

function mycheck(vers) {
	$.getJSON({
		url: 'https://tjuapk.z7.web.core.windows.net/update.json',
		type: "get",
		dataType: "json",
		cache: false,
		success: function(data) {
			if (compareVersion(vers, data.version) == 0) {
				document.getElementById('pop_tit_alert').innerHTML = "无可用更新";
				document.getElementById('pop_con_alert').innerHTML = "当前为最新版本！";
				yes_btn_alert.onclick = function() {
					document.getElementById('darkbackground_alert').style.display = "none";
					window.location.reload();
				}
				document.getElementById('darkbackground_alert').style.display = "block";
			};
			if (compareVersion(vers, data.version) == 1) {
				document.getElementById('pop_tit_alert').innerHTML = "无可用更新";
				document.getElementById('pop_con_alert').innerHTML = "当前为测试版本！";
				yes_btn_alert.onclick = function() {
					document.getElementById('darkbackground_alert').style.display = "none";
					window.location.reload();
				}
				document.getElementById('darkbackground_alert').style.display = "block";
			};
			window.location.reload();
		},
		error: function(msg) {
			document.getElementById('pop_tit_alert').innerHTML = "更新异常";
			document.getElementById('pop_con_alert').innerHTML = "无法连接到服务器！";
			yes_btn_alert.onclick = function() {
				document.getElementById('darkbackground_alert').style.display = "none";
				window.location.reload();
			}
			document.getElementById('darkbackground_alert').style.display = "block";
		}
	});
};
