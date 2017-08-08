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
				
			}
		}
	});
	$("#reg").buttonset();
	$("#date").datepicker();
	//$("#reg input[type=title]").tooltip();
	/*
	$("#user").tooltip({
		//disabled:true,
		//content:'改变文本',
		//items: "input",//过滤
		//tooltipClass:'ch',
		//show:false,
		//hide:false,//false关闭淡入淡出效果   slide侧入侧出...
		//track:true,
		position:{
			my:'left center',
			at:'right+5 center'//以my为基准			
		},
		//open:function(e,ui){
		//	alert("打开时触发" + ui.tooltip.length);
		//}		
	});
	*/
	
	$("[title]").tooltip({
		position:{
			my:'left center',
			at:'right+5 center'//以my为基准			
		}
	});
	//$("#pass").tooltip('open');
	$("#user").on('tooltipopen',function(){
		alert("打开时触发");
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
