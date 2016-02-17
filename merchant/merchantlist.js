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
	ath.innerHTML="商户编号";
	atr.appendChild(ath);	
	var bth = document.createElement('th');	
	bth.innerHTML="商户名称";
	atr.appendChild(bth);	
	var cth = document.createElement('th');	
	cth.innerHTML="登记日期";
	atr.appendChild(cth);
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
	var atd = document.createElement('td');	
	atd.innerHTML  =op.mcode ;
	newtr.appendChild(atd);
	var btd = document.createElement('td');	
	btd.innerHTML =op.mname ;
	newtr.appendChild(btd);
	var ctd = document.createElement('td');	
	ctd.innerHTML =op.createtime ;
	newtr.appendChild(ctd);
	tbody.appendChild(newtr);
	
	var btr = document.createElement('tr');	
	var dtd = document.createElement('td');	
	dtd.setAttribute("colspan", "3");
	var ndiv = document.createElement('div');	
	ndiv.className ="well";
	var ap = document.createElement('p');	
    ap.innerHTML="<strong>经营地址:</strong>"+op.address+";<strong>联系电话:</strong>"+op.phone+"</p><p><strong>开户银行:</strong>"+op.kfbank+";" +
    		"<strong>银行账号:</strong>"+op.kfbaacount	+"</p><p><strong>账户名:</strong>"+op.accountname+";<strong>邮箱:</strong>"+op.email+"</p>";
	ndiv.appendChild(ap);
    
	var ldiv = document.createElement('div');	
	var a1 = document.createElement('a');	
    a1.setAttribute("class", "btn btn-small btn-default");
    a1.setAttribute("href", "merchant-details.html?"+op.id);
    a1.innerHTML="<span class=\"glyphicon glyphicon-edit\"></span>编辑</a>";
    ldiv.appendChild(a1);   
	
   /**
    var a2 = document.createElement('a');	
    a2.setAttribute("class", "btn btn-small");
    a2.setAttribute("href", "merchant-devices.html?"+op.id);
    a2.innerHTML="<i class=\"icon-inbox\"></i>刷卡POS设备</a>";
    ldiv.appendChild(a2);   
   **/
           
	var a3 = document.createElement('a');	
    a3.setAttribute("class", "btn btn-small btn-warning");
    a3.setAttribute("href", "merchant-settles-contracts.html?"+op.id);
    a3.innerHTML="<span class=\"glyphicon glyphicon-list-alt\"></span>结算细则</a>";
    ldiv.appendChild(a3);   
    
    var a4 = document.createElement('a');	
    a4.setAttribute("class", "btn btn-small btn-danger");
    a4.setAttribute("href", "javascript:susp('"+op.id+"')");
    a4.innerHTML="<span class=\"glyphicon glyphicon-remove\"></span>废弃</a>";
    ldiv.appendChild(a4);   

    var a5 = document.createElement('a');	
    a5.setAttribute("class", "btn btn-small btn-warning");
    a5.setAttribute("href", "account.html?"+op.id);
    a5.innerHTML="<span class=\"glyphicon glyphicon-edit\"></span>账号管理</a>";
    ldiv.appendChild(a5);   
    
    ndiv.appendChild(ldiv);
    dtd.appendChild(ndiv);
    btr.appendChild(dtd);
    tbody.appendChild(btr);  
    return tbody;
  
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

function susp(op){
	if(!confirm("确定废弃该商户？"))
		return;
	$.ajax({
		url:'/sei/transfer/register/merchantsusp',
		type:'POST',
		data:op,		
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var op=eval(msg);
			if(op.status=='1'){					
				alert(op.msg);	
				location.href="merchant-list.html";
			}else{
				alert(op.msg);			
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
	
}

//分页
var start=0;
var total=0;
var pagesize=15;


function searchlist(op,op1){
	
	if(op1==0){
		start=0;
	}
	
	var content=document.getElementById("scontent").value;
	
	
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
	
	
	var url='/sei/transfer/register/listmerchant?&st='+start+'&li='+pagesize;
	$.ajax({
		url:url,
		type:'POST',
		data:content,		
		contentType:'application/json',
		dataType:'json',
		success:function(msg){	
			var dp=eval(msg);
			var op=dp.con;
			total=dp.total;
			start=dp.ne;
			createmain(op,dp.total);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			   alert("出错了，请重试，或本次登陆已失效，需重新登陆！");	
		}
	});
}

Merchantlist={};
Merchantlist.init=function(){	
	$.ajax({
		url:'/sei/transfer/register/listmerchant?&st=0&li='+pagesize,
		type:'POST',
		data:"",		
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
};



