function hidediv(){
	top.window.document.getElementById('light').style.display='none';
	top.window.document.getElementById('fade').style.display='none';
	}
function showdiv(){
	top.window.document.getElementById('light').style.display='block';
	top.window.document.getElementById('fade').style.display='block';
	}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

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



   

    document.getElementById("lacct").innerHTML=decodeURI(getCookie('aname'))+'<span class="caret"></span>';
                  var tc=getCookie('pinfo').split('*');
    document.getElementById("aid").value=tc[0];

    $('#loginform').validate({
	rules: {
		pass:{
			required:true,
			minlength:6
		}
	},
	 messages: {
		pass:{
			required:"该字段不能为空！",
			minlength:jQuery.format("用户密码不能小于{0}个字符") 
		}
	 }
    });


   $("#loginm").bind("click",function(){
	if(!$("#loginform").valid()){
		alert('请检查表单信息！');
		return ;
	}
	
	var pass=document.getElementById("pass").value;
	var trpass=document.getElementById("trpass").value;
	
	if(pass!=trpass){
		alert("重复密码不一致，请重输！");
		return;
	}
		
	var curl="/sei/auth/api/repass";			
  
	var str = $("#loginform").serializeArray(); 
	$.ajax({
		url:curl,
		type:'POST',
		data:JSON.stringify(convertToJson(str)),		
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			hidediv();
			var op=eval(msg);
			if(op.status=='1'){					
				alert(op.msg);
				$("#logint").click();
			}else if(op.status=='2'){
				alert(op.msg);
				location.href="login.html";
			}else{
				alert(op.msg);			
			}			
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
  });	


function outlogin(){		
	$.cookie('pinfo', null,{ path: '/' }); 
	$.cookie('auth', null,{ path: '/' }); 
	location.href="login.html";
}


function cpass(){
     $("#loginModal").modal();
}