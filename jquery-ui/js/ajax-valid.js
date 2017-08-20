$(function() {
     /*
    /*
    //使用ajaxForm方法，会直接实现ajax提交。自动阻止了默认行为，而它提交的默认页面是form控件的action属性的值，提交的方式是method属性的值
	//success:function(){}就是这里的function
	//$('#reg').ajaxForm(function(){
	//	alert('提交成功！');
	//});
	
    
    //js里用了submit（）这个方法时，采用ajaxSubmit()提交
    
    $('#reg').submit(function(){
    	$(this).ajaxSubmit({

    		url:'test1.php',
    		target:'#box',//服务器返回的内容存放在box里
    		type:'GET',
    		dataTye:null,//xml,json,script,默认为null
    		//clearForm:true,//成功提交后清空表单，有初始值也清空
    		//resetForm:true,//成功提交后重置表单，有初始值时回到初始值
    		data:{
    			aaa:'bbb',//提交额外的数据
    		},
    		beforeSubmit:function(formDate,jqForm,options){//提交之前执行，一般用于数据验证
    			//alert(options.url);
    			//alert(jqForm.html());
    			//alert(formDate[0].name);
    			//alert(formDate[0].value);
    			return true;//验证不合法返回false，不让提交
    		},

    		success:function(responseText,statusText){
    			//alert('提交成功！');
    			alert(responseText + "-" + statusText);
    		},
    		error:function(event,errorText,errorType){
    			alert(errorText + "-" + errorType);
    		}
    	});
    	return false;//submit没有阻止默认提交，需要自行阻止
    });
    */
   
   //alert($('#reg').formSerialize());//表单序列化
   //alert($('#reg #user').fieldSerialize());//序列化字段
   //alert($('#reg #user').fieldValue());//得到某个字段的value值
   //alert($('#reg').resetForm());//重置表单
   alert($('#reg #user').clearFields());//清空某个字段

});