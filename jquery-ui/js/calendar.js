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
	$("#date").datepicker({
		dateFormat:'yy-mm-dd',
		//dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
		//dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
		//dayNamesMin: [ "Su","Mo","Tu","We","Th","Fr","Sa" ],
		//dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		//dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		monthNames: [ "一月","二月","三月","四月","五月","六月",
		"七月","八月","九月","十月","十一月","十二月" ],
		monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
		"七月","八月","九月","十月","十一月","十二月" ],//用于下拉框
		//altField:'#abc',//为日期选择器指定input
		//altFormat:'dd/mm/yy',
		//appendText:'日历',
		showWeek:true,
		weekHeader:'周',
		firstDay:1,//指定一周开始的日子   默认为0
		//disabled:true,//禁用日历
		//numberOfMonths:3,//显示月份的个数
		//numberOfMonths:[3,2],
		showOtherMonths:true,
		selectOtherMonths:true,
		changeMonth:true,
		changeYear:true,
		//isRTL:true,
		//autoSize:true,//在没有CSS的情况下自动调节成适合日期大小的
		//showOn:'both',//也可设置button
		//buttonText:'按钮',
		//buttonImage:'img/xx.png',
		//buttonImageOnly:true,
		showButtonPanel:true,
		closeText:'关闭',
		currentText:'今天dd',
		//nextText:'下个月mm',
		//prevText:'上个月mm',
		navigationAsDateFormat:true,
		//yearSuffix:'年',
		//showMonthAfterYear:true,
		
		//日期限制的优先级min和max最高
		maxDate:0,///当前日期之后0天   '1m'一个月   '1w'一周
		//minDate:-1,
		hideIfNoPrevNext:true,//隐藏按钮
		yearRange:'1950:2020',//年份的限制
		//defaultDate:-1,//预设默认的选定日期，默认今天
		//gotoCurrent:false,
		//showAnim:true,//默认fadeIn
		//duration:1000,
		/*
		beforeShow:function(){
			alert('日历显示之前被调用');
		},
		beforeShowDay:function(date){
			//1号被禁用
			if (date.getDate()==1) {
				return [false,"a","不能选择1号"];//返回数组   ?？?？?？？？？？？？？？？？？
			}
			else{
				return [true];
			}
		},
		onChangeMonthYear:function(year,month,inst){
			//alert('日历中年份或月份改变时激活');
			//alert(month);
			//alert(year);
			alert(inst.id);
		},
		onSelect:function(dateText,inst){
			alert(dateText);
		},
		onClose:function(dateText,inst){
			alert(dateText);
		},
		*/	
	});
	//alert($('#date').datepicker('getDate').getFullYear());
	//$('#date').datepicker('setDate','2014-5-7');
	
	
	
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
