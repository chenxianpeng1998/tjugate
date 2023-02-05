function autocheck(vers) {
	$.getJSON({
		url: 'https://app.tjugate.top/update.json',
		type: "get",
		dataType: "json",
		cache: false,
		success: function(data) {
			if (compareVersion(vers, data.version) == -1) {
				{
					document.getElementById('pop_tit').innerHTML = "可用更新";
					document.getElementById('pop_con').innerHTML = "更新版本：" + vers + " → " + data.version +
						"</br>更新内容：" + data.content;
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
						document.getElementById('darkbackground').style.visibility = "hidden";
						document.getElementById('darkbackground').style.opacity = "0";
					}
					close_btn.onclick = function() {
						document.getElementById('darkbackground').style.visibility = "hidden";
						document.getElementById('darkbackground').style.opacity = "0";
					}
					document.getElementById('darkbackground').style.visibility = "visible";
					document.getElementById('darkbackground').style.opacity = "1";
				}
			};
		},
	});
}

function mycheck(vers) {
	$.getJSON({
		url: 'https://app.tjugate.top/update.json',
		type: "get",
		dataType: "json",
		cache: false,
		success: function(data) {
			if (compareVersion(vers, data.version) == 0) {
				document.getElementById('pop_tit_alert').innerHTML = "无可用更新";
				document.getElementById('pop_con_alert').innerHTML = "当前为最新版本！";
				yes_btn_alert.onclick = function() {
					document.getElementById('darkbackground_alert').style.visibility = "hidden";
					document.getElementById('darkbackground_alert').style.opacity = "0";
					window.location.reload();
				}
				document.getElementById('darkbackground_alert').style.visibility = "visible";
				document.getElementById('darkbackground_alert').style.opacity = "1";
			}
			else if (compareVersion(vers, data.version) == 1) {
				document.getElementById('pop_tit_alert').innerHTML = "无可用更新";
				document.getElementById('pop_con_alert').innerHTML = "当前为测试版本！";
				yes_btn_alert.onclick = function() {
					document.getElementById('darkbackground_alert').style.visibility = "hidden";
					document.getElementById('darkbackground_alert').style.opacity = "0";
					window.location.reload();
				}
				document.getElementById('darkbackground_alert').style.visibility = "visible";
				document.getElementById('darkbackground_alert').style.opacity = "1";
			}
			else window.location.reload();
		},
		error: function(msg) {
			document.getElementById('pop_tit_alert').innerHTML = "更新异常";
			document.getElementById('pop_con_alert').innerHTML = "无法连接到服务器！";
			yes_btn_alert.onclick = function() {
				document.getElementById('darkbackground_alert').style.visibility = "hidden";
				document.getElementById('darkbackground_alert').style.opacity = "0";
				window.location.reload();
			}
			document.getElementById('darkbackground_alert').style.visibility = "visible";
			document.getElementById('darkbackground_alert').style.opacity = "1";
		}
	});
};
