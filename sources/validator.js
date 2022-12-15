if(jQuery.validator){
	/*=====================自定义===========================*/	
	//字母数字
	jQuery.validator.addMethod("letnum", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
	}, "只能包括英文字母和数字");
	//不能为空
	jQuery.validator.addMethod("isEmpty", function(value, element) {
		var tel = /^[^ ]/;
		return this.optional(element) || tel.test(value);
	}, "内容起始不能为空格");	
	// 手机号码验证 
	jQuery.validator.addMethod("isMobile", function(value, element) { 
	  var length = value.length; 
	  var mobile = /^1[3|4|5|8][0-9]\d{4,8}$/; 
	  return this.optional(element) || (length == 11 && mobile.test(value)); 
	}, "请正确填写您的电话号码."); 
	// 传真验证 
	jQuery.validator.addMethod("isfax", function(value, element) { 
	  var mobile = /^([0-9]{2,3}-)?([0-9]{3,4}-)?([0-9]{7,8})$/; 
	  return this.optional(element) || (mobile.test(value)); 
	}, "请正确填写你的传真号码."); 
	// 身份证号码验证 
	jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
	  return this.optional(element) || /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);     
	}, "请正确输入您的身份证号码"); 
	// 验证QQ号
	 jQuery.validator.addMethod("qq", function(value, element) {
		 var tel = /^[1-9]\d{4,10}$/;
		 return this.optional(element) || (tel.test(value));
	 }, "QQ号码格式错误");
	 //微信
	 jQuery.validator.addMethod("wx", function(value, element) {
		 var tel = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
		 return this.optional(element) || (tel.test(value));
	 }, "微信号码格式错误");
	 
	 
	
}