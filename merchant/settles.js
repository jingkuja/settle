//全局变量
var pagesize=15;
var start=0;
var total=0;

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
	var bth = document.createElement('th');	
	bth.innerHTML="协议编号";
	atr.appendChild(bth);	
	var cth = document.createElement('th');	
	cth.innerHTML="协议期间";
	atr.appendChild(cth);
	var dth = document.createElement('th');	
	dth.innerHTML="登记日期";
	atr.appendChild(dth);
	thead.appendChild(atr);
	
	tdiv.appendChild(sdiv);
	sdiv.appendChild(mtable);	
	mtable.appendChild(thead);		
	var tbody=document.createElement("tbody");
	for(var i=0;i<op.length;i++){ 
	  createlist(op[i],tbody);	
	}
	mtable.appendChild(tbody);	
	tdiv.appendChild(createbottom(size));
	mdiv.appendChild(tdiv);
	
	$("table.table-collapsiable tbody > tr:nth-child(2n) > td").hide();
	$("table.table-collapsiable tbody > tr:nth-child(2n+1) > td").on("click",function(event){
		$(this).parent("tr").next().children("td").fadeToggle();
	});	
	
}

function createlist(op,od){
	var tbody=od;
	var newtr = document.createElement('tr');	
	var btd = document.createElement('td');	
	btd.innerHTML =op.contractNum ;
	newtr.appendChild(btd);
	var ctd = document.createElement('td');	
	ctd.innerHTML =op.starttime.substring(0,10)+" 至 "+op.endtime.substring(0,10) ;	
	newtr.appendChild(ctd); 
	var dtd = document.createElement('td');	
	dtd.innerHTML =op.createtime;	
	newtr.appendChild(dtd); 
	tbody.appendChild(newtr);
	
	var btr = document.createElement('tr');		
	var dtd = document.createElement('td');	
	dtd.setAttribute("colspan", "4");
	
	var ndiv = document.createElement('div');	
	ndiv.className ="well";
	var h4 = document.createElement('h4');	
    h4.innerHTML="协议详情详情";
    
    var pg= document.createElement('pg');	
   
    var re="<strong>商户费率:</strong>"+op.rebate
    
    pg.innerHTML=re+"<strong>第三方费率:</strong>"+op.rebatea	    	
   
    var pg1= document.createElement('pg');	
    
   var ti="";
    if(op.paysrvCode=='101')
    	ti="支付宝扫码付"
    if(op.paysrvCode=='201')
        ti="微信被扫⽀支付"
    	
    
    var re1="</br><strong>收单项目名称:</strong>"+op.title+"<strong>支付服务名称:</strong>"+ti
    
    pg1.innerHTML=re1+"<strong>第三方支付账号:</strong>"+op.paysrvAN+"<strong>支付密钥:</strong>"+op.paysrvKey;  
    
    
    var hr= document.createElement('hr');	   
   
    var ldiv= document.createElement('div');	
             
    if(op.status=="1"){                  
        var a2 = document.createElement('a');	
        a2.setAttribute("class", "btn btn-small btn-danger");
        a2.setAttribute("href", "javascript:susp("+op.id+",'0');");
        a2.innerHTML="完全废止&nbsp&nbsp";
        ldiv.appendChild(a2);   
     }   
    
    
   
    
    var a21 = document.createElement('a');	
    a21.setAttribute("class", "btn btn-small btn-default");
    a21.setAttribute("href", "merchant-devices.html?"+op.id+"&"+op.merchantid);
    a21.innerHTML="<span class=\"glyphicon glyphicon-inbox\"></span>终端管理</a>";
    ldiv.appendChild(a21);   

        
    ndiv.appendChild(h4);
    ndiv.appendChild(pg);
    ndiv.appendChild(pg1);
    ndiv.appendChild(hr);
    ndiv.appendChild(ldiv);

	dtd.appendChild(ndiv);
	btr.appendChild(dtd);
	tbody.appendChild(btr);   
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
	sdiv.appendChild(mdiv)
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
	
	
	var url='/sei/transfer/register/listmerchantset?st='+start+'&li='+pagesize;
	$.ajax({
		url:url,
		type:'POST',
		data:content,		
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var dp=eval(msg);
			var op=dp.con;
			total=dp.total
			start=dp.ne;
			createmain(op,dp.total);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
}

function approve(op){
	if(!confirm("确认审核通过该协议！"))
		return;
	document.getElementById("did").value=op;	
	var str = $("#form1").serializeArray(); 
	showdiv();
		$.ajax({
			url:"settlesoper.do?action=approve",
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
				}else{
					alert(op.msg);			
				}
				$("#dt").click();
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
			     hidediv();
				   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
			}
		});	
	//$("#addapproverModal").modal();
}

function dtime(op,op1,op2){
	document.getElementById("eid").value=op;
	document.getElementById("htime").value=op1;
	document.getElementById("sstime").value=op2;
	$("#timedelayModal").modal();
}


function susp(op,op1){	
   if(!confirm('确定操作吗？'))
	return;
	showdiv();
	$.ajax({
		url:"/sei/transfer/register/setsusp?cid="+op,
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



Settles={};
Settles.init=function(){
	
	var url=document.URL;
	var urlvalue="";
	try{
	var urlvalues=url.split("?");
	 urlvalue=urlvalues[1];		
	document.getElementById("mid").value=urlvalue;
	}catch (e) {
		// TODO: handle exception
	}
	   
	$.ajax({
		url:'/sei/transfer/register/listmerchantset?st=0&li='+pagesize,
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
		url:"/sei/transfer/register/getmerchant?userid="+urlvalue,
		type:'get',
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var op=eval(msg);
			try{			
				document.getElementById("mname").innerHTML="<strong>商户:</strong>"+op.mname;		
			}catch (e) {
			
			}								
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	});
	

	
	
	$('#form').validate({
		rules: {
			/**
			contractNum:{
				required:true,
				maxlength:32
			},
			*/
			xytype:{
				required:true
			},
			title:{
				required:true,
				maxlength:16
			},
			paysrvCode:{
				required:true
			},
			paysrvAN:{
				required:true,
				maxlength:32
			},
			paysrvKey:{
				required:true,
				maxlength:64
			},
			reservation:{
				required:true
			},			
			rebate:{
				required:true,
				number:true
			},		
			rebatea:{
				required:true,
				number:true
			},	
			
		},
		messages: {
			/*
			contractNum:{
				required:"协议编号不能为空！",
				maxlength:jQuery.format("协议编号不能大于{0}个字符") 
			},	*/
			
			title:{
				required:"收单项目名称不能为空！",
				maxlength:jQuery.format("协议编号不能大于{0}个字符") 
			},	
			xytype:{
				required:"协议类型！"
			},
			paysrvCode:{
				required:"第三方不能为空！"
			},	
			paysrvAN:{
				required:"支付注册账号不能为空！",
				maxlength:jQuery.format("支付注册账号不能大于{0}个字符") 
			},
			paysrvKey:{
				required:"支付密钥不能为空！",
				maxlength:jQuery.format("支付密钥不能大于{0}个字符") 
			},
			rebate:{
				required:"费率不能为空！",
				number:"只能填入数字"
			},
			rebatea:{
				required:"支付宝费率不能为空！",
				number:"只能填入数字"
			},							
			reservation:{
				required:"协议期间不能为空！"
			}
		}
	});
	
	$('#form2').validate({
		rules: {
			dtime:{
				required:true,
				digits:true
			}		
		},
		messages: {
			dtime:{
				required:"延长时间不能为空！",
				digits:"只能填入数字"
			}				
		}
	});
	
	$("#submit").bind("click",function(){

		if(!$("#form").valid()){
			alert('请检查表单信息！');
			return ;
		}
			
     // if(document.getElementById("cid").value!=""){  	  
    	  //curl="merdevoperate?action=update";	
    //  }			
		var str = $("#form").serializeArray(); 
		showdiv();
		$.ajax({
			url:"/sei/transfer/register/merchantset",
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
					//document.getElementById("contractNum").value="";
					document.getElementById("rebate").value="";
					document.getElementById("rebatea").value="";
				}else{
					alert(op.msg);			
				}

			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
			    hidediv();
				alert("出错了，本次操作已失效，请点击放弃后，重新操作！");	
			}
		});
	});	
	
	$("#sube").bind("click",function(){

		if(!$("#form2").valid()){
			alert('请检查表单信息！');
			return ;
		}
			
		var str = $("#form2").serializeArray(); 
		showdiv();
		$.ajax({
			url:"settlesoper.do?action=dtime",
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
					$("#et").click();
				}else{
					alert(op.msg);			
				}
				document.getElementById("dtime").value="";
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
			    hidediv();
				alert("出错了，本次操作已失效，请点击放弃后，重新操作！");	
			}
		});
	});	
	
	$("#subm").bind("click",function(){

		if(document.getElementById('approver').value==""){
			alert('请填写审核人！');
			return ;
		}
		var str = $("#form1").serializeArray(); 
		showdiv();
			$.ajax({
				url:"settlesoper.do?action=approve",
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
					}else{
						alert(op.msg);			
					}
					$("#dt").click();
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
				     hidediv();
					alert("出错了，请重试!");	
				}
			});	
  
	});	
};