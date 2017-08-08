$(function() {
	$("#search_button").button({
		//disabled:true,
		//label:'搜索',
		icons: {
			"primary": 'ui-icon-search',
   			//"secondary": "ui-icon-triangle-1-s"
		},
       // text:false
	});
	//$("#search_button").button('disable');
	//$("#search_button").button('enable');
	
	/*
	$("#search_button").click(function() {
		alert("");
	});
	
	*/
	$("#reg").dialog({
		buttons:{
			'提交':function(){
				
			}
		}
	});
	//$("#reg").parent().find('button').eq(1).button('disable');
	//$("#reg").dialog('widget').find('button').eq(1).button('disable');
	
	//$("#reg input[type=radio]").button();
	//$("#reg").buttonset();//移动端
	
	//$("#reg input[type=checkbox]").button();
	$("#reg").buttonset();

});