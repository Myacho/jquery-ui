$(function() {
	$('#reg').validate({
		rules:{
			user:{
				required:true,
				minlength:2,
			},
			email:{
				required:true,
				email:true,
			},
			url:{
				url:true,
			},
			date:{
				date:true,//chrome不支持
			},
			dateISO:{
				dateISO:true,//只管格式，chrome支持
			},
			number:{
				number:true,//负数，小数
			},
			digits:{
				digits:true,//正整数
			},
			creditcard:{
				creditcard:true,//正整数  要引入additional-methods.min.js
			},
            notpass:{
            	equalTo:'#pass',
            },
            min:{
            	 required: true,
     			 min: 13
            },
            range:{
            	range:[5,10],
            },
            rangelength:{
            	rangelength:[5,10],
            }
            
            
			
		},
		
		
		
		messages:{
			user:{
				required:'账号不得为空',
				minlength:'账号不得小于2位',
			},
		}
		
		
		
		
		
	});

});