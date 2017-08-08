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
	
	$("#reg input[title]").tooltip({
		position:{
			my:'right bottom',
			at:'right+5 bottom'			
		}
	});
	
	var host = ['a','aa','aaa','aaaa','aaaaaa','bb','bbbb'];
	$("#email").autocomplete({
		source:host,
		//disabled:true,
		//minLength:2,
		minLength:0,
		//delay:0,
		//autoFocus:true,
		/*
		position:{
			my:'left center',
			at:'right center'
		}
		*/
		/*
		focus:function(e,ui){
			//alert("获取焦点！");
			//alert(ui.item.label + '-' + ui.item.value);
			ui.item.value = 123;
		},
		*/
		/*
		select:function(){
			alert("选定时执行！");
		},
		*/
		/*
		change:function(){
			alert("改变！");
		},
		*/
		/*
		search:function(){
			alert("搜索完毕！");
		},
		*/
		/*
		response:function(e,ui){
			//alert("搜索完毕！");
			alert(ui.content[0].label + "-" + ui.content[0].value);
		}
		*/
	});
	$("#email").autocomplete('search','');//第二个参数可以是数组里的某个字符，当第二个参数为空时，默认什么都没有，若minLength=0，则显示所有
	$("#email").on('autocompleteopen',function(){
		alert("自动补齐打开！");
	});
	
	
	
	
	
	
	
	
	
	
	
});
