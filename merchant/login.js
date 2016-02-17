function hidediv(){
	top.window.document.getElementById('light').style.display='none';
	top.window.document.getElementById('fade').style.display='none';
	}
function showdiv(){
	top.window.document.getElementById('light').style.display='block';
	top.window.document.getElementById('fade').style.display='block';
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


function login(){
   	var curl="/sei/auth/api/login";			     	
		var str = $("#form").serializeArray(); 
        showdiv();
		$.ajax({
			url:curl,
			type:'POST',
			data:JSON.stringify(convertToJson(str)),		
			contentType:'application/json',
			dataType:'json',
			success:function(msg,status, xhr){	
				hidediv();
				var op=eval(msg);
				if(op.status=='0'){					
					alert("该账号不存在，请重新登录！");				
				}
				if(op.status=='1'){					
					alert("密码不对，请重新登录！");				
				}
				if(op.status=='2'){	
                     window.location.href="index.html"				
				}
				if(op.status=='3'){		
                    window.location.href="merchantbills.html"				
	            }
                 if(op.status=='4'){					
					alert(op.msg);				
	            }
			
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
			    hidediv();
				   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	

			}
		});
           return false;
}
