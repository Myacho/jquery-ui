$(function(){

	$("#search_button").button({
		icons: {
			"primary": 'ui-icon-search'
		}
	});


	$("#question_button").button({
		icons: {
			"primary": 'ui-icon-lightbulb'
		}
	}).click(function(){
		if ($.cookie('user')) {
			$('#question').dialog('open');
		}else{
			$('#error').dialog('open');
			setTimeout(function(){
				$('#error').dialog('close');
				$('#login').dialog('open');
			},1000);
		}
	});


	$('#error').dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		draggable:false,
		closeOnEscape:false,
		width:180,
		height:50,
	}).parent().find('.ui-widget-header').hide();

	$.ajax({
		url:'show_content.php',
		type:'POST',
		success:function(response,status,xhr){
			var json = ($.parseJSON(response));
			var html = '';
			var arr = [];//存放默认的原始的字符串
			var summary = [];//存放摘要字符串
			//alert(json.length);
			$.each(json,function(index,value){
				//alert(index + value.title);
				html += '<h4>' + value.user + ' 发表于' + value.date + '</h4><h3>' + value.title + '</h3><div class="editor">' + value.content + '</div><div class="bottom"><span class="comment" data-id="' + value.id + '">0条评论</span> <span class="up">收起</span></div><hr noshade="noshade" size="1" /><div class="comment_list"></div>';
			});
			$('.content').append(html);

			$.each($('.editor'),function(index,value){
				arr[index] = $(value).html();
				summary[index] = arr[index].substr(0,200);//从0开始截取200个字符串
				if(summary[index].substring(199,200) == '<' ||summary[index].substring(199,200) == '>'){//从199位开始截取到第200个字符
					summary[index] = replacePos(summary[index],200,'');
				}
				if(summary[index].substring(198,200) == '</' ){
					summary[index] = replacePos(summary[index],200,'') ;
					summary[index] = replacePos(summary[index],199,'');
				}
				if (arr[index].length>200) {
					 summary[index] += '...<span class="down">显示全部</span>';//动态添加的，click只能发生一次，所以通过父节点对他进行委托绑定
					 $(value).html(summary[index]);
				}
				$('.bottom .up').hide();
			});

			//显示全部
		    $.each($('.editor'),function(index,value){
				$(this).on('click','.down',function(){
					$('.editor').eq(index).html(arr[index]);
					$(this).hide();
					$('.bottom .up').eq(index).show();
				});
			});

			//收起
		    $.each($('.bottom'),function(index,value){
				$(this).on('click','.up',function(){
					$('.editor').eq(index).html(summary[index]);
					$(this).hide();
					$('.editor .down').eq(index).show();
				});
			});

			//评论
			$.each($('.bottom'),function(index,value){
				$(this).on('click','.comment',function(){
					if ($.cookie('user')) {
						if (!$('.comment_list').eq(index).has('form').length) {
							$('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="'+$(this).attr('data-id')+'"/><input type="hidden" name="user" value="' + $.cookie('user') + '" /><input type="button" value="发表"/></dd></dl></form>');
						}
						if ($('.comment_list').eq(index).is(':hidden')) {
							$('.comment_list').eq(index).show();
						} else {
							$('.comment_list').eq(index).hide();
						}
						$('.comment_list').eq(index).find('input[type=button]').button().click(function(){
							//alert($('.comment_list').eq(index).find('form').find('textarea').val());
							var _this = this;
							$('.comment_list').eq(index).find('form').ajaxSubmit({
								url:'add_comment.php',
								type:'POST',
								beforeSubmit:function(formData,jqForm,options){
									$('#loading').dialog('open');
									$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('评论发布中...');
									$(_this).button('disable');
								},
								success:function(responseText,statusTest){
									if(responseText){
										$(_this).button('enable');
										$('#loading').css('background','url(img/success.gif) no-repeat 20px center').html('评论发布成功！');
										setTimeout(function(){
											$('#loading').dialog('close');
											$('.comment_list').eq(index).find('form').resetForm();
											//$('.uEditorIframe').contents().find('#iframeBody').html('请输入评论：');
											$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('评论发布中...');
										},1000);
									}
								},
							});
						});
					}else{
						$('#error').dialog('open');
						setTimeout(function(){
							$('#error').dialog('close');
							$('#login').dialog('open');
						},1000);
					}
				});
			});
		},
	});

	$("#question").dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		width:500,
		height:360,
		buttons:{
			'发布':function(){
				$(this).ajaxSubmit({
					url:'add_content.php',
					type:'POST',
					data:{
						user:$.cookie('user'),
						content:$('.uEditorIframe').contents().find('#iframeBody').html(),
					},
					beforeSubmit:function(formData,jqForm,options){
						$('#loading').dialog('open');
						$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('问题发布中...');
						$('#question').dialog('widget').find('button').eq(1).button('disable');
					},
					success:function(responseText,statusTest){
						if(responseText){
							$('#question').dialog('widget').find('button').eq(1).button('enable');
							$('#loading').css('background','url(img/success.gif) no-repeat 20px center').html('问题发布成功！');
							setTimeout(function(){
								$('#loading').dialog('close');
								$('#question').dialog('close');
								$('#question').resetForm();
								$('.uEditorIframe').contents().find('#iframeBody').html('请输入问题描述：');
								$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('问题发布中...');
							},1000);
						}
					},
				});
			}
		}
	});

	$('.uEditorCustom').uEditor();
    
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
    	window.location.href = '/jquery-ui/jquery-ui/comment2.html';
    });

	$('#loading').dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		draggable:false,
		closeOnEscape:false,
		width:180,
		height:50,
	}).parent().find('.ui-widget-header').hide();

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
		icons : {
			"header": "ui-icon-plus",
			"activeHeader": "ui-icon-minus",
		},		
	});


		
});


//替换特殊字符的函数
function replacePos(strObj,pos,replaceText){
	return strObj.substr(0,pos-1) + replaceText +strObj.substring(pos,strObj.length);
}