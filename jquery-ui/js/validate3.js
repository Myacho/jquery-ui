$(function() {
	

	$('#reg').validate({

		//onsubmit:false,//取消验证方式提交
		//onfocusout:false,//提交时才验证
		//onkeyup:false,
		//focusInvalid:false,
		//focusCleanup:true,//隐藏错误提示，不能与focusInvalid同用
		//ignoreTitle:true,//禁止读取title
		submitHandler:function(form){
			alert('验证成功，提交中...');
		},
		
		/*
		rules:{
			user:{
				required:true,
				minlength:3,
				//remote:'user.php',
			},
			pass:{
				required:true,
				minlength:6,
				remote:{
					url:'user.php',
					type:'POST',
					dataType:'json',
					data:{
						user:function(){
							return $('#user').val();
						}
					},
				},
				
			},
		},
			
		messages:{
			user:{
				//required:'账号不得为空！',
				//minlength:$.validator.format('账号不得小于{0}位'),
				//remote:'用户名已存在',
			},
			pass:{
				required:'密码不得为空！',
				minlength:$.validator.format('密码不得小于{0}位'),
				remote:'账号或密码不正确',
			},
		},
		*/
	
	});

	//alert($('#reg').valid());
	$('#user').rules('add',{
		required:true,
		minlength:3,
		messages:{
			required:'账号不得为空！',
			minlength:$.validator.format('账号不得小于{0}位'),
		}
	});
	//$('#user').rules('remove');
	//$('#user').rules('remove','minlength min max');
	
	//自定义验证
	$('#code').rules('add',{
		required:true,
		code:true,
		messages:{
			required:'邮编不得为空！',
		},
	});
	$.validator.addMethod('code',function(value,element){
		var tel = /^[0-9]{6}$/;//正则表达式，0-9之间的数字，6位
		return this.optional(element)||(tel.test(value));
	},'请输入正确格式的邮政编码');

});