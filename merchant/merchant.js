
function convertToJson(formValues) {
    var result = {};
    for(var formValue,j=0;j<formValues.length;j++) {
    formValue = formValues[j];
    var name = formValue.name;
    var value = formValue.value;
    if (name.indexOf('.') < 0) {
    result[name] = value;
    continue;
    } else {
    var simpleNames = name.split('.');
    // 构建命名空间
    var obj = result;
    for ( var i = 0; i < simpleNames.length - 1; i++) {
    var simpleName = simpleNames[i];
    if (simpleName.indexOf('[') < 0) {
    if (obj[simpleName] == null) {
    obj[simpleName] = {};
    }
    obj = obj[simpleName];
    } else { // 数组
    // 分隔
    var arrNames = simpleName.split('[');
    var arrName = arrNames[0];
    var arrIndex = parseInt(arrNames[1]);
    if (obj[arrName] == null) {
    obj[arrName] = []; // new Array();
    }
    obj = obj[arrName];
    multiChooseArray = result[arrName];
    if (obj[arrIndex] == null) {
    obj[arrIndex] = {}; // new Object();
    }
    obj = obj[arrIndex];
    }
    }
 
    if(obj[simpleNames[simpleNames.length - 1]] ) {
    var temp = obj[simpleNames[simpleNames.length - 1]];
    obj[simpleNames[simpleNames.length - 1]] = temp;
    }else {
    obj[simpleNames[simpleNames.length - 1]] = value;
    }
 
    }
    }
    return result;
}

function hidediv(){

	top.window.document.getElementById('light').style.display='none';
	top.window.document.getElementById('fade').style.display='none';
	}
function showdiv(){
	top.window.document.getElementById('light').style.display='block';
	top.window.document.getElementById('fade').style.display='block';

	}


Merchant={};
Merchant.init=function(){
	var url=document.URL;
	var urlvalue="";
	try{
	var urlvalues=url.split("?");
	 urlvalue=urlvalues[1];
	document.getElementById("userid").value=urlvalue;
	}catch (e) {
		// TODO: handle exception
	}
	
	   if(typeof(urlvalue)!="undefined"){ 
		   document.getElementById('merchtNum').setAttribute("readOnly",true);
		   
	    }	
	
    if(typeof(urlvalue)!="undefined"){ 
	$.ajax({
		url:"/sei/transfer/register/getmerchant?userid="+urlvalue,
		type:'get',
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var op=eval(msg);
			try{
			if(op.status=='1'){					
				alert(op.msg);	
				return;
			}}catch (e) {
			}			
			document.getElementById("merchtNum").value=op.mcode;		
			document.getElementById("merchtTilte").value=op.mname;				
			document.getElementById("merchtAddress").value=op.address;				
			document.getElementById("merchtPhone").value=op.phone;				
			document.getElementById("merchtBankTitle").value=op.kfbank;				
			document.getElementById("merchtBankNum").value=op.kfbaacount;	
			document.getElementById("email").value=op.email;	
			document.getElementById("transign").value=op.transign;	
			document.getElementById("tplate").value=op.tplate;				
			document.getElementById("accountname").value=op.accountname;				


		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
	}
		
	$('#form').validate({
		rules: {
			merchtNum:{
				required:true,
				maxlength:6,
				minlength:6
			},
			transign:{
				//required:true
			},
			email:{
				email:true
			},
			merchtTilte:{
				required:true,
				maxlength:64
			},
			merchtAddress:{
				//required:true,
				maxlength:128
			},
			merchtPhone:{
				//required:true,
				maxlength:32
			},
			merchtBankTitle:{
				//required:true,
				maxlength:64
			},
			accountname:{
				//required:true,
				maxlength:64
			},
			tplate:{
				required:true
			},
			merchtBankNum:{
				//required:true,
				maxlength:32
			}
		},
		messages: {
			accountname:{
				//required:"账户名称不能为空！",
				maxlength:jQuery.format("账户名称不能大于{0}个字符") 
			},	
			tplate:{
				required:"装账模板不能为空！"
			},	
			merchtNum:{
				required:"商户编号不能为空！",
				maxlength:jQuery.format("商户编号不能大于{0}个字符") ,
				minlength:jQuery.format("商户编号不能小于{0}个字符") 

			},	
			transign:{
				required:"请选择转账模式！"
			},
			email:{
				email:"邮件格式不正确！"
			},
			merchtTilte:{
				required:"商户名称不能为空!",
				maxlength: jQuery.format("商户名称不能大于{0}个字符") 
			},
			merchtAddress:{
				//required:"商户经营地址不能为空!",
				maxlength: jQuery.format("商户经营地址不能大于{0}个字符") 
			},
			merchtPhone:{
				//required:"商户联系电话不能为空!",
				maxlength: jQuery.format("商户联系电话不能大于{0}个字符") 
			},
			merchtBankTitle:{
				//required:"商户开户银行不能为空!",
				maxlength: jQuery.format("商户开户银行不能大于{0}个字符") 
			},
			merchtBankNum:{
				//required:"商户银行账号不能为空!",
				maxlength: jQuery.format("商户银行账号不能大于{0}个字符") 
			}
		}
	});
	
	
	$("#submit").bind("click",function(){
		if(!$("#form").valid()){
			alert('请检查表单信息！');
			return ;
		}

		var url="/sei/transfer/register/merchant";
	    if(typeof(urlvalue)!="undefined"){ 
	    	url="/sei/transfer/register/merchantupdate";
	    }	
		
		
        var str = $("#form").serializeArray(); 
        showdiv();
		$.ajax({
			url:url,
			type:'POST',
			data:JSON.stringify(convertToJson(str)),		
			contentType:'application/json',
			dataType:'json',
			success:function(msg){	
				hidediv();
				var op=eval(msg);
				if(op.status=='1'){					
					alert(op.msg);	
					location.href="merchant-list.html";
				}else{
					alert(op.msg);			
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
			     hidediv();
				   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
			}
		});
	});
	
};