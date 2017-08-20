$(function(){
	$("#search_button").button({
		icons: {
			"primary": 'ui-icon-search'
		}
	});
    
    $('#member, #loginout').hide();
    if($.cookie('user')){
    	$('#member, #loginout').show();
    	$('#reg_a, #login_a').hide();
    	$('#member').html($.cookie('user'));
    }else{
    	$('#member,#loginout').hide();
    	$('#reg_a,#login_a').show();
    }

    $('#loginout').click(function(){
    	$.removeCookie('user');
    	window.location.href = '/jquery-ui/jquery-ui/accordion.html';
    });

	$('#loading').dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		draggable:false,
		closeOnEscape:false,
		width:180,
		height:50,
	}).parent().parent().find('.ui-widget-header').hide();

    $('#reg_a').click(function(){
    	$('#reg').dialog('open');
    });

	$("#reg").dialog({
		autoOpen:false,
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
			$('form').ajaxSubmit({
				url:'add.php',
				type:'POST',
				beforeSubmit:function(formData,jqForm,options){
					$('#loading').dialog('open');
					// alert($('#reg').dialog('widget').html());
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				success:function(responseText,statusTest){
					if(responseText){
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(img/success.gif) no-repeat 20px center').html('数据新增成功！');
						$.cookie('user',$('#user').val());
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							$('#reg').resetForm();
							$('#reg span.star').html('*').removeClass('succ');
							$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #loginout').show();
    						$('#reg_a, #login_a').hide();
    						$('#member').html($.cookie('user'));
						},1000);
					}
				},
			});
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
			$(element).parent().find('span').html('*').removeClass('succ');
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
				remote:{
					url:'is_user.php',
					type:'POST',
				},
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
				remote:'账号已存在!',
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


	$('#login_a').click(function(){
    	$('#login').dialog('open');
    });

	$("#login").dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		width:320,
		height:240,
		buttons:{
			'登陆':function(){
				$(this).submit();
			}
		}
	}).validate({
		
		submitHandler:function(form){
			$('form').ajaxSubmit({
				url:'login.php',
				type:'POST',
				beforeSubmit:function(formData,jqForm,options){
					$('#loading').dialog('open');
					// alert($('#reg').dialog('widget').html());
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success:function(responseText,statusTest){
					if(responseText){
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(img/success.gif) no-repeat 20px center').html('登陆成功！');
						if($('#expires').is(':checked')){
							$.cookie('user',$('#login_user').val(),{
								expires:7,
							});
						}else{
							$.cookie('user',$('#login_user').val());
						}
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #loginout').show();
    						$('#reg_a, #login_a').hide();
    						$('#member').html($.cookie('user'));
						},1000);
					}
				},
			});
		},
		
		showErrors:function(errorMap,errorList){
			
			var errors = this.numberOfInvalids();
			if (errors > 0) {
				$('#login').dialog('option','height',errors*20+240);
			}
			else{
				$('#login').dialog('option','height',240);
			}
			this.defaultShowErrors();
		},
		
		highlight:function(element,errorClass){
			$(element).css('border','solid 1px #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight:function(element,errorClass){
			$(element).css('border','solid 1px #ccc');
			$(element).parent().find('span').html('&nbsp').addClass('succ');
		},
		
		errorLabelContainer:'ol.login_error',
		
		wrapper:'li',
		
		rules:{
			login_user:{
				required:true,
				minlength:2,
			},
			login_pass:{
				required:true,
				minlength:6,
				remote:{
					url:'login.php',
					type:'POST',
					data:{
						login_user:function(){
							return $('#login_user').val();
						},
					},
				},
			},
		},
		messages:{
			login_user:{
				required:'账号不得为空!',
				minlength:$.validator.format('账号不得小于{0}位!'),
			},
			login_pass:{
				required:'密码不得为空!',
				minlength:$.validator.format('密码不得小于{0}位!'),
				remote:'账号或密码错误！',
			},
		}
	});


	$('#tabs').tabs();

	$('#accordion').accordion({
		collapsible:true,
		//disabled:true,
		//event:'mouseover',
		//active:1,
		//active:true,//设置true false一样，使用的前提collapsible:true
		//heightStyle : 'auto',
		//heightStyle : 'content',
		//heightStyle : 'fill',
		//header : 'h3',
		icons : {
			"header": "ui-icon-plus",
			"activeHeader": "ui-icon-minus",
		},
		/*
		create : function (event, ui) {
			//alert('create');
			// alert($(ui.header.get()).html());
			// alert($(ui.panel.get()).html());
		},
		activate : function (event, ui) {
			alert($(ui.newHeader.get()).html());
			alert($(ui.newPanel.get()).html());
			alert($(ui.oldHeader.get()).html());
			alert($(ui.oldPanel.get()).html());
		},
		beforeActivate : function (event, ui) {
			alert($(ui.newHeader.get()).html());
			alert($(ui.newPanel.get()).html());
			alert($(ui.oldHeader.get()).html());
			alert($(ui.oldPanel.get()).html());
		},
		*/
	});

	//$('#accordion').accordion('disable');
	//$('#accordion').accordion('enable');
	
	//alert($('#accordion').accordion('option', 'active'));
	//$('#accordion').accordion('option', 'active', 1);
	
    //切换时触发
	$('#accordion').on('accordionactivate', function (event, ui) {
		alert($(ui.newHeader.get()).html());
		alert($(ui.newPanel.get()).html());
		alert($(ui.oldHeader.get()).html());
		alert($(ui.oldPanel.get()).html());
	});





		
});
