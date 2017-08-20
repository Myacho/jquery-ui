$(function(){
	$("#search_button").button({
		icons: {
			"primary": 'ui-icon-search'
		}
	});
	$("#reg").dialog({
		autoOpen:true,
		modal:true,
		resizable:false,
		width:320,
		height:340,
		buttons:{
			'提交':function(){
				$(this).submit();
			}
		}
	}).buttonset().validate({
		
		submitHandler:function(form){
			alert('验证成功，提交中...');
		},
		
		showErrors:function(errorMap,errorList){
			
			var errors = this.numberOfInvalids();
			if (errors > 0) {
				$('#reg').dialog('option','height',errors*20+340);
			}
			else{
				$('#reg').dialog('option','height',340);
			}
			this.defaultShowErrors();
		},
		
		highlight:function(element,errorClass){
			$(element).css('border','solid 1px #630');
		},
		unhighlight:function(element,errorClass){
			$(element).css('border','solid 1px #ccc');
			$(element).parent().find('span').html('&nbsp').addClass('succ');
		},
		
		errorLabelContainer:'ol.reg_error',
		
		wrapper:'li',
		
		rules:{
			user:{
				required:true,
				minlength:2,
			},
			pass:{
				required:true,
				minlength:6,
			},
			email:{
				required:true,
				email:true,
			},
			date:{
				date:true,
			}
		},
		messages:{
			user:{
				required:'账号不得为空!',
				minlength:$.validator.format('账号不得小于{0}位!'),
			},
			pass:{
				required:'密码不得为空!',
				minlength:$.validator.format('密码不得小于{0}位!'),
			},
			email:{
				required:'邮箱不得为空!',
				email:'请输入正确格式的邮箱',
			},
		}
	});

	$("#date").datepicker({
		changeMonth:true,
		changeYear:true,
		yearSuffix:' ',
		maxDate:0,
		yearRange:'1950:2020',
	});

	
	$("#email").autocomplete({
		delay:0,
		autoFocus:true,
		source:function(request,response){
			//获取用户输入的内容
			//alert(request.term);
			//绑定数据源 不会根据关键字过滤无关结果
			//response['a','aa','aaaa','bb'];
			var hosts = ['qq.com','126.com','163.com','263.com','sina.com','gmail.com','hotmail.com'],
			    term = request.term,//获取用户输入的内容
			    name = term,//邮箱的用户名           aa@qq.com   aa为用户名，qq.com为域名
			    host = '',//邮箱的域名
			    ix = term.indexOf('@'),//@的位置
			    result = [];//最终呈现的邮箱列表
			//alert(ix);
			
			result.push(term);
			
			//当有@的时候，重新分配用户名和域名
			if (ix > -1) {
				name = term.slice(0,ix);
				host = term.slice(ix + 1);
			}
						
			//测试
			//alert(name);
			//alert(host);
			
			if (name) {
				//如果用户已经输入@和后面的域名，那么久找到相关的域名提示，比如bbs@1,就提示bbs@126.com,bbs@163.com
				//如果用户还没输入@和后面的域名，就把所有的域名都提示出来
				/*
				var findedHosts = [];
				if (host) {
					findedHosts = $.grep(hosts,function(value,index){
						//alert(value);//测试
						//alert(value.indexOf(host));
						return value.indexOf(host) > -1;
					});
				}
				else{
					findedHosts = hosts;
				}
				
				var findedResult = $.map(findedHosts, function(value,index) {
					return name + '@' + value;
				});
				*/
				
				var findedHosts = (host ? findedHosts = $.grep(hosts,function(value,index){
						return value.indexOf(host) > -1;
					}) : hosts), findedResult = $.map(findedHosts, function(value,index) {
					return name + '@' + value;
				});
				
				
				
				
				result = result.concat(findedResult);
			}
			
			
			response(result);
			
		}
	});
		
});
