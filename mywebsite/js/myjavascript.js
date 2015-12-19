'use strict'
function a2d(a){
	return a*180/Math.PI;	
}
function getPos(obj){
	var l = 0;
	var t = 0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {left:l,top:t};
}
function hoverDir(obj,oEvent){
	var x=getPos(obj).left+obj.offsetWidth/2-oEvent.pageX;
	var y=getPos(obj).top+obj.offsetHeight/2-oEvent.pageY;
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;	
}
function hoverGo(obj){
	var aS=obj.children[0];
	obj.onmouseover=function(ev){
		var oEvent=ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom))return;
		var dir=hoverDir(obj,oEvent)	
		switch(dir){
			case 0:
				aS.style.left='200px';
				aS.style.top=0;
				break;
			case 1:
				aS.style.left=0;
				aS.style.top='200px';
				break;
			case 2:
				aS.style.left='-200px';
				aS.style.top=0;
				break;
			case 3:
				aS.style.left=0;
				aS.style.top='-200px';
				break;	
		}
		startMove(aS,{top:0,left:0})
	};
	obj.onmouseout=function(ev){
		var oEvent=ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo))return;
		var dir=hoverDir(obj,oEvent)	
		switch(dir){
			case 0:
				startMove(aS,{top:0,left:200});
				break;
			case 1:
				startMove(aS,{top:200,left:0});
				break;
			case 2:
				startMove(aS,{top:0,left:-200});
				break;
			case 3:
				startMove(aS,{top:-200,left:0});;
				break;	
		}
	};		
}
window.onload=function(){
	var oUl=document.getElementById('through');
	var aLi=oUl.getElementsByTagName('li');
	
	for(var i=0;i<aLi.length;i++){
		hoverGo(aLi[i]);	
	}	
	
	var oBack = document.getElementById('back');
	var oBox = document.getElementById('box');
	var oCon = document.getElementById('con');
	var oWhe = document.getElementById('wheel_bar');
	var oBar = document.getElementById('bar');
	oBar.onmousedown=function(ev){
		var oEvent = ev||event;
		var disY = oEvent.clientY-oBar.offsetTop;
		document.onmousemove=function(ev){
			var oEvent = ev||event;
			var t = oEvent.clientY-disY;
			changeTop(t);
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;;
			oBar.releaseCapture&&oBar.releaseCapture();
		};
		oBar.setCapture&&oBar.setCapture();
		return false;
	};
	function changeTop(t){
		if(t<0){
			t=0;
		}else if(t>oWhe.offsetHeight-oBar.offsetHeight){
			t = oWhe.offsetHeight-oBar.offsetHeight;
		}
		oBar.style.top = t+'px';
		var scale = t/(oWhe.offsetHeight-oBar.offsetHeight);
		oCon.style.top = (oBox.offsetHeight-oCon.scrollHeight)*scale+'px';
	}
	addWheel(oBack,function(bDir){
		var t = oBar.offsetTop;
		if(bDir){
			t+=10;
		}else{
			t-=10;
		}
		changeTop(t);
	});
	(function(){
		var oRool=document.getElementById('rool');
		var aRool_soon=oRool.getElementsByTagName('li');
		var timer=null;
		var i=aRool_soon.length-1;
		timer=setInterval(function(){
			aRool_soon[i].style.transform='rotateY('+i*360/aRool_soon.length+'deg) translateZ(305px)';
			i--;
			if(i<0){
				clearInterval(timer);	
			}	
		},100)
		
		var timer2 = null;
		var x = 150;
		var y = 0;
		var speedX = 0;
		var speedY = 0;
		var lastX = 0;
		var lastY = 0;
		var bOk = true;
		//aLi[0]走完了才能拖,当aLi[0]走完了就把bOk变成false
		//针对于transition有一个事件
		//transitionend 	当transition结束时
		aRool_soon[0].addEventListener('transitionend',function(){
			bOk=false;
		},false);
		document.onmousedown=function(ev){
			if(bOk==true)return;
			var disX = ev.clientX-y;
			var disY = ev.clientY-x;
			document.onmousemove=function(ev){
				x = ev.clientY-disY;
				y = ev.clientX-disX;
				if(x>=600){
					x=600;
				}else if(x<=-600){
					x=-600;
				}
				oRool.style.transform='perspective(800px) rotateX('+-x/10+'deg) rotateY('+y/10+'deg)';
				speedX = x-lastX;
				speedY = y-lastY;
				lastX = x;
				lastY = y;
				
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				timer2 = setInterval(function(){
					x+=speedX;
					y+=speedY;
					speedX*=0.95;
					speedY*=0.95;
					if(Math.abs(speedX)<1){
						speedX=0;
					}
					if(Math.abs(speedY)<1){
						speedY=0;
					}
					if(speedX==0&&speedY==0){
						clearInterval(timer2);
					}
					if(x>=600)
						x=600
					else if(x<=-600)
						x=-600;
					oRool.style.transform='perspective(800px) rotateX('+-x/10+'deg) rotateY('+y/10+'deg)';
				},30);
			};
			return false;
		};	
	})();
	
};




















