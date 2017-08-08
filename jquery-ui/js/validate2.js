$(function() {
	
	//设置默认调试模式，所有默认行为都可以在这里设置
	/*
	$.validator.setDefaults({
		debug:true
	});
	*/
	
	$('#reg').validate({
		//debug:true,//调试模式，无法提交了
		submitHandler:function(form){
			//alert(form);
			//当验证成功之后执行，而且阻止了默认行为
			//一般用于ajax提交
			//$('.myerror').hide();
			alert('验证成功，提交中...');
		},
		//ignore:'#pass',//忽略某部分
		/*
		//群组错误提示   html中先添加一个myerror类
		groups:{
			myerror:'user pass',
		},
		focusInvalid:false,
		errorPlacement:function(error,element){
			//alert(element[0]);
			$.each(error, function(index,value) {
				//alert(index + ' ' + $(value).html());
				$('.myerror').html($('.myerror').html() + $(value).html());
			});
		},
		*/
		//群组错误提示可以分开
		/*
		//可以不用
		groups:{
			error_user:'user',
			error_pass:'pass'
		},
		*/
		/*
		errorPlacement:function(error,element){
			error.appendTo('.myerror');
		},
		*/
		
		//errorClass:"abc",//设置错误的类名
		
		//errorElement:'p',//设置错误提示可以换行
		
		//统一包裹错误提示
		//errorLabelContainer:'ol.myerror',
		//wrapper:'li',
		
		//success:'valid',//提交成功后添加一个valid类  valid类本来就有
		//success:'abc',
		success:function(label){
			label.addClass('abc').text('ok');
		},
		
		//高亮显示有错误的元素
		/*
		highlight:function(element,errorClass){
			$(element).css('border','solid 1px red');
		},
		unhighlight:function(element,errorClass){
			$(element).css('border','solid 0px red');
		},*/
		
		//表单提交获取信息
		/*
		invalidHandler:function(event,validator){
			var error = validator.numberOfInvalids();
			if (error) {
				$('.myerror').html('您有' + error + '条错误信息！');
			}
		},
		*/
		//获取错误句柄，不用提交及时获取值
		showErrors:function(errorMap,errorList){
			//alert("");//正确也会执行
			//alert(errorMap);
			//$.each(errorMap, function(index,value) {
				//alert(index + ' ' + value);
			//});
			//alert(errorMap.user);
			//alert(errorList[0].element);
			//alert(errorList[0].message);
			var error = this.numberOfInvalids();
			//alert(error);
			if (error) {
				$('.myerror').html('您有' + error + '条错误信息！');
			}else{
				$('.myerror').hide();
			}
			this.defaultShowErrors();//执行默认错误
		},
		
		rules:{
			user:{
				required:true,
				minlength:3,
				//rangelength:[5,10],
			},
			pass:{
				required:true,
				minlength:6,
			}
		},
			
		messages:{
			user:{
				required:'账号不得为空！',
				minlength:$.validator.format('账号不得小于{0}位'),
			},
			pass:{
				required:'密码不得为空！',
				minlength:$.validator.format('密码不得小于{0}位'),
			}
		}
	
	});

});