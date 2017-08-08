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
