//全局变量
var pagesize=5;
var start=0;
var total=0;
var merid=0;

function backup(){	
	location.href="merchant-settles-contracts.html?"+urlvalue;	
}

function tosete(){
	var url=document.URL;
	var urlvalue="";
	try{
		var urlvalues=url.split("?");
		var urlvalues1=urlvalues[1].split("&");
		urlvalue=urlvalues1[1];		
	}catch (e) {
		// TODO: handle exception
	}	
	location.href="merchant-settles-contracts.html?"+urlvalue;	
}

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

//构造页面列表
function createmain(op,size){
	var mdiv=document.getElementById("listcontent");
    mdiv.innerHTML="";
    
	var tdiv=document.createElement("div");
	tdiv.setAttribute("class", "row-fluid");
    
	var sdiv=document.createElement("div");
	sdiv.setAttribute("class", "col-md-9 col-md-offset-1");
	var mtable=document.createElement("table");
	mtable.setAttribute("class", "table table-striped table-collapsiable");
	
	
	var thead=document.createElement("thead");
	var atr = document.createElement('tr');		
	var ath = document.createElement('th');	
	ath.innerHTML="POS编号";
	atr.appendChild(ath);		
	var cth = document.createElement('th');	
	cth.innerHTML="登记日期";
	atr.appendChild(cth);	
		
	var dth = document.createElement('th');	
	dth.setAttribute("colspan","");
	dth.innerHTML="操作";
	atr.appendChild(dth);	

	
	thead.appendChild(atr);
	
	
	tdiv.appendChild(sdiv);
	sdiv.appendChild(mtable);	
	mtable.appendChild(thead);		
	var tbody=document.createElement("tbody");
	mtable.appendChild(tbody);
	for(var i=0;i<op.length;i++){ 
	tbody.appendChild(createlist(op[i]));	
	}
	tdiv.appendChild(createbottom(size));
	mdiv.appendChild(tdiv);
}

function createlist(op){
	
	var newtr = document.createElement('tr');	
	var atd = document.createElement('td');	
	atd.innerHTML  =op.posnum ;
	newtr.appendChild(atd);
	var ctd = document.createElement('td');	
	ctd.innerHTML =op.createtime ;
	newtr.appendChild(ctd); 	
	
	var etd = document.createElement('td');	
	etd.innerHTML ="<a href=\"javascript:susp("+op.id+",'0');\" class=\"btn btn-small btn-warning\"><span class=\"glyphicon glyphicon-off\"></span>注销</a>" ;
	newtr.appendChild(etd); 
	
    return newtr;
  
}

function createbottom(op){
var sdiv=document.createElement("div");
	sdiv.setAttribute("class", "col-md-9 col-md-offset-1");
	var mdiv=document.createElement("nav");;
		
	var ul=document.createElement("ul");
	ul.setAttribute("class", "pagination");
	mdiv.appendChild(ul);

	var lis=document.createElement("li");
	lis.innerHTML="<a href=\"#\" onclick=\"searchlist(0,-"+pagesize+")\"><span aria-hidden=\"true\">&laquo;</span></a>";
	ul.appendChild(lis);
	    var n1 = Math.floor(op/pagesize);
	    if(op%pagesize>=1){
	    	n1+=1;    	
	    }
	var current=start/pagesize+1;
	var cs=1;
	var cn=n1;
	var ns=false;
	var nn=false;
	if(n1>5){
		cn=5;
		if((current-3)>=1){
			ns=true;	
			cs=current-2;
			cn=cs+4;		
		}else{
			cs=1;
		}
		
		
		if((current+3)<n1){
			nn=true;	
		}else{
			cn=n1;		
		}	
	}
	
	if(ns){
		var lic=document.createElement("li");
		lic.innerHTML="<a href=\"#\" >...</a>";	
		ul.appendChild(lic);
	 }
	 
	for(var i=cs;i<=cn;i++){
		var lic=document.createElement("li");
		if(current==i){
			lic.innerHTML="<a href=\"#\" onclick=\"searchlist("+i+","+pagesize+")\"><b><font color=\"#8E2323\">"+i+"</font></b></a>";
		}else{
		lic.innerHTML="<a href=\"#\" onclick=\"searchlist("+i+","+pagesize+")\">"+i+"</a>";
		}	
		ul.appendChild(lic);
	}
	
	if(nn){
		var lic=document.createElement("li");
		lic.innerHTML="<a href=\"#\" >...</a>";	
		ul.appendChild(lic);
	}
	
	var lin=document.createElement("li");
	lin.innerHTML="<a href=\"#\" onclick=\"searchlist(0,"+pagesize+")\"><span aria-hidden=\"true\">&raquo;</span></a>";
	ul.appendChild(lin);
	sdiv.appendChild(mdiv);
     return sdiv;
}

function searchlist(op,op1){
	
	if(op1==0){
		start=0;
	}
	
	var content=document.getElementById("mid").value;
	
	
	if(op>0){		
		start=(op-1)*pagesize;		
	}else{
	 start+=op1;
	}
				
	
	if(start<0){
		start=0;
		return;
	}
	
	
    var n1 = Math.floor(total/pagesize);
    if(total%pagesize>=1){
    	n1+=1;    	
    }
	

    if(start>=total&&total>0){
		start=pagesize*(n1-1);
		return;
	}
	
	
	var url='/sei/transfer/register/listmerchantdev?st='+start+'&li='+pagesize;
	$.ajax({
		url:url,
		type:'POST',
		data:content,		
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var dp=eval(msg);
			total=dp.total;
			var op=dp.con;
			start=dp.ne;
			createmain(op,dp.total);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
}

function susp(op,op1){	
	 if(!confirm('确定操作吗？'))
			return;
    showdiv();
	$.ajax({
		url:"/sei/transfer/register/devsusp?cid="+op,
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			hidediv();
			var op=eval(msg);
			if(op.status=='1'){					
				alert(op.msg);	
				searchlist(0,0);
			}else{
				alert(op.msg);			
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		     hidediv();
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
}

function editp(op){	
	
	$.ajax({
		url:'merdevoperate.do?action=getmer&mid='+op,
		type:'get',
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var dp=eval(msg);
			try{
				if(dp.status=='1'){					
					alert(dp.msg);	
					return;
				}}catch (e) {
				}		
		document.getElementById("deviceNum").value=dp.deviceNum;
		document.getElementById("posnum").value=dp.posnum;
		document.getElementById("cid").value=dp.id;
		if(dp.isUer=='1'){
			document.getElementById("iu").checked=true;
		}else{
			document.getElementById("iu").checked=false;

		}
		    $("#addDeviceModal").modal();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
	
}


MerchantDevice={};
MerchantDevice.init=function(){
	var url=document.URL;
	var urlvalue="";
	try{
	var urlvalues=url.split("?");
	var urlvalues1=urlvalues[1].split("&");
	urlvalue=urlvalues1[0];		 
	document.getElementById("mid").value=urlvalue;
	}catch (e) {
		// TODO: handle exception
	}
	   
	$.ajax({
		url:'/sei/transfer/register/listmerchantdev?st=0&li='+pagesize,
		type:'POST',
		data:urlvalue,		
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var dp=eval(msg);
			var op=dp.con;
			start=dp.ne;
			total=dp.total;
			createmain(op,dp.total);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
	
	
	$.ajax({
		url:"/sei/transfer/register/getset?userid="+urlvalue,
		type:'get',
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var op=eval(msg);
			try{			
				document.getElementById("mname").innerHTML="<strong>协议号:</strong>"+op.num;		
			}catch (e) {
			
			}								
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	});
	
	
	$('#form').validate({
		rules: {
			posnum:{
				required:true,
				maxlength:32
			},
			deviceNum:{
				required:true,
				maxlength:16
			}
			
		},
		messages: {
			posnum:{
				required:"pos编号不能为空！",
				maxlength:jQuery.format("pos编号不能大于{0}个字符") 
			},
			deviceNum:{
				required:"设备编号不能为空!",
				maxlength: jQuery.format("设备编号不能大于{0}个字符") 
			}
		}
	});
	
	$("#submit").bind("click",function(){
		if(!$("#form").valid()){
			alert('请检查表单信息！');
			return ;
		}
			
		var curl="/sei/transfer/register/merchantdev";			     	
		var str = $("#form").serializeArray(); 
        showdiv();
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
					searchlist(0,0);
					$("#mt").click();
				}else{
					alert(op.msg);			
				}
				document.getElementById("cid").value="";
				document.getElementById("posnum").value="";
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
			    hidediv();
				   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
				document.getElementById("cid").value="";

			}
		});
	});	
};