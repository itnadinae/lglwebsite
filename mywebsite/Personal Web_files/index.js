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
				aS.style.left=aS.offsetWidth+'px';
				aS.style.top=0;
				break;
			case 1:
				aS.style.left=0;
				aS.style.top=aS.offsetWidth+'px';
				break;
			case 2:
				aS.style.left=-aS.offsetWidth+'px';
				aS.style.top=0;
				break;
			case 3:
				aS.style.left=0;
				aS.style.top=-aS.offsetWidth+'px';
				break;	
		}
		move(aS,{top:0,left:0})
	};
	obj.onmouseout=function(ev){
		var oEvent=ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo))return;
		var dir=hoverDir(obj,oEvent)	
		switch(dir){
			case 0:
				move(aS,{top:0,left:aS.offsetWidth});
				break;
			case 1:
				move(aS,{top:aS.offsetWidth,left:0});
				break;
			case 2:
				move(aS,{top:0,left:-aS.offsetWidth});
				break;
			case 3:
				move(aS,{top:-aS.offsetWidth,left:0});;
				break;	
		}
	};		
}
window.onload=function(){
//吸顶条//回到顶部  //进度条
	var oCeil=document.getElementById('ceil');
	var oCeil_top=oCeil.offsetTop;
	var aNavBtn=oCeil.getElementsByTagName('li');
  var oTop=document.getElementById('top');
  var oHeader=document.getElementById('header');
  var oCont=document.getElementById('content');
  var oBar=document.getElementById('bar');
  var oBartext=document.getElementById('bar_text');
  var oBig_box=document.getElementById('big_box');
  var oBig_box1=document.getElementById('big_box1');
  var oBig_box2=document.getElementById('big_box2');
  var oToptop=document.documentElement.clientHeight;
  var timer=null;
  var now=1;
  var total=18;
  for(var i=1;i<total;i++)
  {
    var oImg=new Image();
    oImg.src='images/'+i+'.jpg';
    oImg.onload=function(){
      now++;
      var scale=Math.floor(now/total*100);
      oBar.style.width=scale+'%';
      oBartext.innerHTML=scale+'%';
      if(now==total){
        move(oBig_box,{opacity:0},{duration:1000,complete:function(){
          oBig_box.style.display='none';
          move(oBig_box1,{width:1366,opacity:0},{duration:600,complete:function(){
              oBig_box1.style.display='none';
                move(oBig_box2,{width:1366},{duration:600,complete:function(){
                  move(oBig_box2,{opacity:0},{duration:1200,complete:function(){
                      oBig_box2.style.display='none';
                      oTop.style.display='block';
                          move(oHeader,{opacity:1,marginTop:0},{duration:1000,easing:Tween.Elastic.easeOut});
                          move(oCont,{opacity:1,marginTop:0},{duration:1000,easing:Tween.Elastic.easeOut,complete:function(){
                          move(oTop,{right:10},{duration:200,complete:function(){
                          move(oTop,{top:oToptop-80},{duration:1500,easing:Tween.Elastic.easeOut,complete:function(){
                          move(oTop,{width:60,height:60,lineHeight:60},{duration:200,easing:Tween.Elastic.easeOut});
                          }})
                          }})
                          }});
                  }});
                }})

          }})
        }})
      }
    };
  }


  oTop.onclick=function(){
   scrollmove(0,2000)
  };
	var oTapNow=0;
	window.onresize=window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop|| document.body.scrollTop;
		if(scrollTop>oCeil_top+38)
		{
			oCeil.style.position='fixed';
			oCeil.style.zIndex=100;
			oCeil.style.background="#fff";
		}
		else{
			oCeil.style.position='';

			}
		if(scrollTop<498){
			smailTap(0);
		}
		else if(scrollTop>=498&&scrollTop<810){
			smailTap(1);
		}
		else if(scrollTop>=810&&scrollTop<1410){
			smailTap(2);
		}
		else if(scrollTop>=1410&&scrollTop<1780){
			smailTap(3);
		}
		else if(scrollTop>=1780){
			smailTap(4);
		}
	};
//轮播图
	var oCon_fir=document.getElementById('con_fir');
	var aImg=oCon_fir.getElementsByTagName('li');
	var oLeft=document.getElementById('left');
	var oRight=document.getElementById('right');
	var iNow=0;
	var n=0;
	oCon_fir.onmouseover=function(){
		move(oLeft,{opacity:1});
		move(oRight,{opacity:1});
		clearInterval(timer);
	};
	oCon_fir.onmouseout=function(){
		move(oLeft,{opacity:0});
		move(oRight,{opacity:0});
		timer=setInterval(function(){
			iNow++;
			if(iNow==aImg.length)iNow=0;
			n=iNow;
			next(iNow);
		},4000)
	};
	timer=setInterval(function(){
		iNow++;
		if(iNow==aImg.length)iNow=0;
		n=iNow;
		next(iNow);
	},4000)
	oLeft.onclick=function(){
		n--;
		if(n<0)n=aImg.length-1;
		document.title=n;
		next(n);
	};
	oRight.onclick=function(){
		n++;
		if(n>aImg.length-1)n=0;
		document.title=n;
		next(n);
	};
	function next(iNow){
		for(var i=0;i<aImg.length;i++){
			move(aImg[i],{opacity:0},{duration:800})
		}
		move(aImg[iNow],{opacity:1},{duration:1000})
	};
//选项卡

	var bFlog=true;
	for(var i=0;i<aNavBtn.length;i++){
		(function(index){
			aNavBtn[i].onclick=function(){
				oTapNow=index;
				Tap(oTapNow);
			};
		})(i);
	};
	function smailTap(now){
		for(var i=0;i<aNavBtn.length;i++){
			aNavBtn[i].className="";
			aNavBtn[i].style.opacity=1;
		};
		aNavBtn[now].style.opacity=0;
		aNavBtn[now].className="active";
		move(aNavBtn[now],{opacity:1},{duration:600});
	};
	function Tap(oTapNow){
		if(!bFlog){
			return;
		}
		bFlog=false;
	smailTap(oTapNow)
		if(oTapNow!=0){
			oCeil.style.position='fixed';
		}
		switch (oTapNow){
			case 0:
				scrollmove(0,800)
					break;
			case 1:
				scrollmove(498,800);
					break;
			case 2:
				scrollmove(810,800);
					break;
			case 3:
				scrollmove(1410,800);
					break;
			case 4:
				scrollmove(1780,800);
		};
	};
	function scrollmove(target,time,complete)
	{
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var start=scrollTop;
		var count=Math.floor(time/30);
		var n=0;
		var timer=null;
		var discollTop=target-start;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			if(window.navigator.userAgent.toLowerCase().indexOf('chrome')!=-1)
			{
				document.body.scrollTop=start+discollTop*(1-a*a*a);
			}
			else{

				document.documentElement.scrollTop=start+discollTop*(1-a*a*a);
			}

			if(n==count){
				bFlog=true;
				clearInterval(timer);
				complete&&complete();
			};
		},30)
	};
	// 图片拖一下
	var oSkil=document.getElementById('skill');
	var aSkill=oSkil.getElementsByTagName('li');
	var aPos=[];
	for(var i=0;i<aSkill.length;i++){
		aPos.push({
			left:aSkill[i].offsetLeft,
			top:aSkill[i].offsetTop
		});
	};

	for(var i=0;i<aSkill.length;i++){
		aSkill[i].style.position='absolute';
		aSkill[i].style.left=aPos[i].left+'px';
		aSkill[i].style.top=aPos[i].top+'px';
		aSkill[i].style.margin='0';
	};
	for(var i=0;i<aSkill.length;i++){
		Drag(aSkill[i]);
		aSkill[i].index=i;
	};
	var zIndex=10;
	function Drag(obj){
		obj.onmousedown=function(ev){
			zIndex++;
			var oEvent=ev||event;
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;
			obj.style.zIndex=zIndex;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var left=oEvent.clientX-disX;
				var top=oEvent.clientY-disY;
				obj.style.left=left+'px';
				obj.style.top=top+'px';
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				obj.releaseCapture && obj.releaseCapture();

				var oNear=findNear(obj);
				if(oNear){
					move(obj, aPos[oNear.index],{easing:Tween.Elastic.easeOut});
					move(oNear, aPos[obj.index],{easing:Tween.Elastic.easeOut});
					var tmp=obj.index;
					obj.index=oNear.index;
					oNear.index=tmp;
				}
				else{
					move(obj, aPos[obj.index],{easing:Tween.Elastic.easeOut});
				}
			};
			obj.setCapture && obj.setCapture();
			return false;
		};
	};

	function findNear(obj){
		var nMin=9999;
		var nMinIndex=-1;
		for(var i=0;i<aSkill.length;i++){
			if(obj==aSkill[i]) continue;
			if(collTest(obj,aSkill[i]))
			{
				var dis=getDis(obj,aSkill[i]);
				if(dis<nMin){
					nMin=dis;
					nMinIndex=i;
				}
			}
		};
		return aSkill[nMinIndex];
	};
	function getDis(obj1,obj2){
		var l1=obj1.offsetLeft+obj1.offsetWidth/2;
		var l2=obj2.offsetLeft+obj2.offsetWidth/2;
		var a=l1-l2;
		var t1=obj1.offsetTop+obj1.offsetHeight/2;
		var t2=obj2.offsetTop+obj2.offsetHeight/2;
		var b=t1-t2;
		return Math.sqrt(a*a+b*b);
	};
	function collTest(obj1,obj2)
	{
		var l1=obj1.offsetLeft;
		var t1=obj1.offsetTop;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var b1=obj1.offsetTop+obj1.offsetHeight;

		var l2=obj2.offsetLeft;
		var t2=obj2.offsetTop;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var b2=obj2.offsetTop+obj2.offsetHeight;
		if (t2>b1 || l1>r2 || t1>b2 || l2>r1)
		{
			return false;
		}
		else
		{
			return true;
		}
	};
	//第四部分划出来的块
	var oUl=document.getElementById('through');
	var aLi=oUl.getElementsByTagName('li');
	
	for(var i=0;i<aLi.length;i++){
		hoverGo(aLi[i]);	
	}	
// 第五部分
var oBtnbox=document.getElementById('poitn');
var aBtnclick=oBtnbox.getElementsByTagName('li');
var aBtnspan=oBtnbox.getElementsByTagName('span');
var oContbox=document.getElementById('con_box');
var aCont=oContbox.getElementsByTagName('li');
var w=aCont.length*aCont[0].offsetWidth;
var wli=aCont[0].offsetWidth;
oContbox.style.width=w+'px'
for(var i=0;i<aBtnclick.length;i++){
	(function (index){
		aBtnclick[i].onclick=function(){
				for(var i=0;i<aBtnclick.length;i++){
					aBtnclick[i].className='';
					aBtnspan[i].className='';
				}
				aBtnclick[index].className='active';
				aBtnspan[index].className='active';

				move(oContbox,{left:-index*wli},{duration:800})
		};
	})(i);
}
};
