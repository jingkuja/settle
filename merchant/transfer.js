//全局变量
var tid=0;
var pagesize=15;
var start=0;
var total=0;

//构造页面列表
function createmain(op,size){
	var mdiv=document.getElementById("listcontent");
    mdiv.innerHTML="";
    
	var tdiv=document.createElement("div");
	tdiv.setAttribute("class", "row-fluid");
    
	var sdiv=document.createElement("div");
    sdiv.setAttribute("class", "col-md-10 col-md-offset-1");
    var mtable=document.createElement("table");
	mtable.setAttribute("class", "table table-striped table-collapsiable");
	
	var thead=document.createElement("thead");
	var atr = document.createElement('tr');		
	var ath = document.createElement('th');	
	ath.innerHTML="协议编号";
	atr.appendChild(ath);	
	var bth = document.createElement('th');	
	bth.innerHTML="商户名称";
	atr.appendChild(bth);	
	var hth = document.createElement('th');	
	hth.innerHTML="交易类型";
	atr.appendChild(hth);
	thead.appendChild(atr);
	var cdth = document.createElement('th');	
	cdth.innerHTML="清分日期";
	atr.appendChild(cdth);
	var cth = document.createElement('th');	
	cth.innerHTML="交易时间";
	atr.appendChild(cth);
	var dth = document.createElement('th');	
	dth.innerHTML="交易金额";
	atr.appendChild(dth);
	var eth = document.createElement('th');	
	eth.innerHTML="支付手续费";
	atr.appendChild(eth);
	var fth = document.createElement('th');	
	fth.innerHTML="合约手续费";
	atr.appendChild(fth);
	var gth = document.createElement('th');	
	gth.innerHTML="划账金额";
	atr.appendChild(gth);
	var gtth = document.createElement('th');	
	gtth.innerHTML="手续费收入";
	atr.appendChild(gtth);

	
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

}

function createlist(op,od){
	var tbody=od;
	var newtr = document.createElement('tr');	
	var atd = document.createElement('td');	
	var cg =op.payCode.substring(2,5);	
	if(cg=='101')
	atd.innerHTML  =op.payCode+"(支付宝)";	
	if(cg=='201')
	atd.innerHTML  =op.payCode+"(微信)";	
	if(cg=='301')
	atd.innerHTML  =op.payCode+"(翼支付)";	
	if(cg=='401')
	atd.innerHTML  =op.payCode+"(银商虚拟卡)";	
	if(cg=='402')
	atd.innerHTML  =op.payCode+"(银商零售卡)";	
	if(op.payCode.length<12)
	atd.innerHTML  =op.payCode+"(建行pos)";	
	
	newtr.appendChild(atd);
	var btd = document.createElement('td');	
	btd.innerHTML =op.mname ;
	newtr.appendChild(btd);
	
	var gtd = document.createElement('td');	
	if(op.tradetype=='pay')	
		gtd.innerHTML ='支付' ;
	else if(op.tradetype=='refund')	
		gtd.innerHTML ='退款' ;	
	newtr.appendChild(gtd);
		
	var cdtd = document.createElement('td');	
	cdtd.innerHTML =op.createtime.substring(0,10);	
	newtr.appendChild(cdtd); 
	var ctd = document.createElement('td');	
	ctd.innerHTML =op.tradetime;	
	newtr.appendChild(ctd); 
	var dtd = document.createElement('td');	
	dtd.innerHTML =op.sum;	
	newtr.appendChild(dtd); 	
	var etd = document.createElement('td');	
	etd.innerHTML =op.fee;	
	newtr.appendChild(etd); 
	
	var fftd = document.createElement('td');	
	fftd.innerHTML =op.mfee;	
	newtr.appendChild(fftd); 
	
	var ftd = document.createElement('td');	
	ftd.innerHTML =op.transfermer;	
	newtr.appendChild(ftd); 
	var fdtd = document.createElement('td');	
	fdtd.innerHTML =op.income;	
	newtr.appendChild(fdtd); 
	
	od.appendChild(newtr);
	
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

function detaillist(){
	var tc=	document.getElementById("acquiredate").value;
	var dc=	document.getElementById("acquiredate1").value;

	if(tc==""||dc==""){
		alert("请选择清分日期区间!");
		return;
	}
	if(dc<tc){
		alert("清分结束日期不能小于于开始日期!");
		return;
	}
	if(!confirm("确认导出清分日期为"+tc+"-"+dc+"的支付明细单？"))
		return;
	location.href='/sei/settle/api/detailbills?sdate='+tc+'&edate='+dc;			
}


function translistl(){
	var tc=	document.getElementById("acquiredate").value;
	var dc=	document.getElementById("acquiredate1").value;

	if(tc==""||dc==""){
		alert("请选择清分日期区间!");
		return;
	}
	if(dc<tc){
		alert("清分结束日期不能小于于开始日期!");
		return;
	}
	if(!confirm("确认导出转账清分日期为"+tc+"-"+dc+"的公对公账单？"))
		return;
	location.href='/sei/settle/api/tranl?acquiredate='+tc+'&edate='+dc;				
  }

function transliste(){
	var tc=	document.getElementById("acquiredate").value;
	var dc=	document.getElementById("acquiredate1").value;

	if(tc==""||dc==""){
		alert("请选择清分日期区间!");
		return;
	}
	if(dc<tc){
		alert("清分结束日期不能小于于开始日期!");
		return;
	}
	if(!confirm("确认导出转账清分日期为"+tc+"-"+dc+"的代发代扣账单？"))
		return;
	location.href='/sei/settle/api/trane?acquiredate='+tc+'&edate='+dc;				
  }

function translist(){
var rc=	document.getElementById("acquiredate").value;
if(rc==""){
	alert("请选择清分日期!");
	return;
}
if(rc!=""){
	if(!confirm("确认批量转账清分日期为"+rc+"的账单？"))
		return;
	}

var a1 = document.createElement("A");
a1.target = "_blank";
a1.href ='/sei/settle/api/tranl?acquiredate='+rc;	
document.body.appendChild(a1);
a1.click();
setTimeout(function() { a1.parentNode.removeChild(a1); }, 50);

var a2 = document.createElement("A");
a2.target = "_blank";
a2.href = '/sei/settle/api/trane?acquiredate='+rc;	
document.body.appendChild(a2);
a2.click();
setTimeout(function() { a2.parentNode.removeChild(a2); }, 50);
}


function searchlist(op,op1){
	if(op1==0){
		start=0;
	}		
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
	
	var str = $("#form").serializeArray(); 
	$.ajax({
		url:'/sei/settle/api/listbills?st='+start+'&li='+pagesize,
		type:'POST',
		data:JSON.stringify(convertToJson(str)),		
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
	
}

function reset(){
	document.getElementById("mname").value="";
	document.getElementById("acquiredate").value="";
	document.getElementById("acquiredate1").value="";
}


TF={};
TF.init=function(){
	var str = $("#form").serializeArray(); 
	$.ajax({
		url:'/sei/settle/api/listbills?st=0&li='+pagesize,
		type:'POST',
		data:JSON.stringify(convertToJson(str)),		
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