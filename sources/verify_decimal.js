//验证小数 保留两位 
function clearNoNum(obj)
{		
	//修复第一个字符是小数点 的情况.  
    var first='';  
    if(obj.value !=''&& obj.value.substr(0,1) == '.'){  
        obj.value="";  
    } 
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的       
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");      
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数       
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额      
        obj.value= parseFloat(obj.value);      
    }
}
 	
//将金额类型转为数字类型 
function toNum(str) {  
    return str.replace(/\,|\￥/g, "");  
}
//数字千位符格式化 保留两位小数
function toPrice1(num) {  
    num = parseFloat(toNum(num).replace(/(\.\d{2})\d+$/,"$1")).toFixed(2).toString().split(".");  
    num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");  
    return "$" + num.join(".");;  
} 
//数字千位符格式化
function toThousands(num) {
    var result = '', counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { result = ',' + result; }
    }
    return result;
}
//保留两位小数 
function get_two_float(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100; //round() 
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
 
 
 
  