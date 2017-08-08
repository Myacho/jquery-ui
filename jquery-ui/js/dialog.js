$(function(){
	$( "#search_button" ).button();
	/*$("#reg_a").click(function(){
		//创建
		$("#reg").dialog({
			title:"知问注册",
			buttons:{
				'提交':function(){
					alert('正在Ajax提交中..');
				},
				'取消':function(){
					$(this).dialog('close');
				}
			},
			//position:'left top'
			//width:500,//不需要单位
			//height:400,
			//minWidth:300,
			//minHeight:300,
			//maxWidth:800.
			//maxHeight:600,
			//show:true,//淡入淡出  'blind' 'puff' 'slide'
			//hide:true,
			//autoOpen:false,//隐藏
			draggable:false,//不可移动
			resizable:false,//不可调整大小
			modal:true,//对话框外不可操作
			closeText:'关闭',//设置按钮关闭的文字
		});
		//打开
		//$("#reg_a").click(function(){
		//	$("#reg").dialog('open');
		//});
	});
	*/
	
	//得到焦点执行函数
	/*
	$('#reg').dialog({
		focus:function(a,ui){
			alert('注册');
		}
	});
	$('#login').dialog({
		focus:function(a,ui){
			alert('登陆');
		}
	});
	*/
	$('#reg').dialog({
		//只要创建就会被执行
		/*create:function(a,ui){
			alert('创建');
		},*/
		//显示出来才执行
		/*open:function(){
			alert('打开');
		},*/
		//autoOpen:false,
		/*
		close:function(){
			alert('关闭');
		},
		*/
		//这个事件可以做关闭确认的工作
		/*
		beforeClose:function(){
			alert('将要关闭');
			return false;
		},*/
		/*
		drag:function(){
			alert('每次移动都执行');
		},
		drag:function(e,ui){
			alert('top:'+ui.position.top+'\n'+'left:'+ui.position.left);
		},
		dragStart:function(e,ui){
			alert('top:'+ui.position.top+'\n'+'left:'+ui.position.left);
		},
		dragStop:function(e,ui){
			alert('top:'+ui.position.top+'\n'+'left:'+ui.position.left);
		},
		*/
		/*
		resize:function(){
			alert('每次调整大小都执行');
		},
		resize:function(e,ui){
			alert('width:'+ui.size.width+'\n'+'height:'+ui.size.height);
		},
		resizeStop:function(e,ui){
			alert('width:'+ui.size.width+'\n'+'height:'+ui.size.height);
		},
		*/
		autoOpen:true
	});
	$("#reg_a").click(function(){
		$("#reg").dialog("open");
	});
	
	$("#reg").click(function(){
		//关闭对话框
		//$("#reg").dialog("close");
		//销毁对话框
		//$("#reg").dialog("destroy");
	});
	//alert($("#reg").dialog("isOpen"));
	//alert($("#reg").dialog("open"));
	//$("#reg").dialog("open").css('font-size','30px');
	
	//$("#reg").dialog("open");
	//$("#reg").dialog("widget").css('font-size','30px');
	
	//alert($("#reg").dialog("option","title"));
	//alert($("#reg").dialog("option","autoOpen"));
	//$("#reg").dialog("option","title","11");
		
	//将指定对话框置前moveTotop
	
	
	$('#reg').on('dialogclose',function(){
		alert("关闭");
	});
	
	
	
	
	
	
});