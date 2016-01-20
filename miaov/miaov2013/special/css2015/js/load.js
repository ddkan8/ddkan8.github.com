// JavaScript Document
function toScroll()
{
	var oNav=$_id("nav");
	var aNav=oNav.getElementsByTagName("p");
	var oPageTab=$_id("pageTab");
	var aPageTab=oPageTab.getElementsByTagName("a");
	var iMixH=60;
	var iOld=-1;
	var iPageNub=0;
	var bToPage=true;
	var oPageTimer=null;
	var oScroll=new Scroll(5,function(iScroll){
		var iNow=parseInt(this._scroll/(this._Sale+1));
		var iScale=this._scroll%(this._Sale+1);
		if(iScroll>0)
		{
			iOld=iNow-1;
		}
		else
		{
			iOld=iNow;	
		}
		if(this._scroll/(this._Sale+1)>=0.5)
		{
			iPageNub=iNow+1;
		}
		else
		{
			iPageNub=iNow
		}
		for(var i=0;i<aPageTab.length;i++)
		{
			aPageTab[i].className="";
		}
		aPageTab[iPageNub].className="active";
		if(bToPage && this._scroll==5)
		{
			clearTimeout(oPageTimer);
			oPageTimer=setTimeout(function(){
				toPage.move(0);
				bToPage=false;
			},500);
			
		}
		if(Math.abs(this._scroll-5)>=5 && !bToPage)
		{
			clearTimeout(oPageTimer);
			toPage.move(0);
			bToPage=true;
		}
		
		if(iNow>=0)
		{
			var oBj=aNav[iNow];
			var aSpan=oBj.getElementsByTagName("span");
			oBj.className="active";
			if(iScroll>0)
			{
				aSpan[0].style.height=(32+(iScale/this._Sale)*28)+"px";
				aSpan[0].style.width=(142+(iScale/this._Sale)*33)+"px";
				aSpan[1].style.opacity=1-iScale/this._Sale;
				for(var i=2;i<aSpan.length;i++)
				{
					aSpan[i].style.opacity=iScale/this._Sale;
				}
			}
			else
			{
				aSpan[0].style.height=(32+(1-iScale/this._Sale)*28)+"px";
				aSpan[0].style.width=(142+(1-iScale/this._Sale)*33)+"px";
				aSpan[1].style.opacity=iScale/this._Sale;
				for(var i=2;i<aSpan.length;i++)
				{
					aSpan[i].style.opacity=1-iScale/this._Sale;
				}
			}
		}
		if(iOld>=0)
		{
			var oBjPrev=aNav[iOld];
			var aSpanPrev=oBjPrev.getElementsByTagName("span");
			oBjPrev.className="";
			if(iScroll>0)
			{
				aSpanPrev[0].style.height=(32+(1-iScale/this._Sale)*28)+"px";
				aSpanPrev[0].style.width=(142+(1-iScale/this._Sale)*33)+"px";
				aSpanPrev[1].style.opacity=iScale/this._Sale;
				for(var i=2;i<aSpanPrev.length;i++)
				{
					aSpanPrev[i].style.opacity=1-(iScale/this._Sale);
				}
			}
			else
			{
				aSpanPrev[0].style.height=(32+(iScale/this._Sale)*28)+"px";
				aSpanPrev[0].style.width=(142+(iScale/this._Sale)*33)+"px";
				aSpanPrev[1].style.opacity=1-iScale/this._Sale;
				for(var i=2;i<aSpanPrev.length;i++)
				{
					aSpanPrev[i].style.opacity=iScale/this._Sale;
				}
			}
		}
	});
	oScroll.init([
		{
			obj:$_id('page2'),
			move:[
				{obj:$_id('page2Bg'),speed:0},
				{obj:$_id('bImg1'),speed:2},
				{obj:$_id('bTitle'),speed:3},
				{obj:$_id('bMark'),speed:4},
				{obj:$_id('bCurriculum'),speed:5},
				{obj:$_id('bImg2'),speed:6},
				{obj:$_id('bImg3'),speed:7},
				{obj:$_id('bImg4'),speed:8},
				{obj:$_id('bImg5'),speed:9},
				{obj:$_id('bImg6'),speed:10},
				{obj:$_id('bImg7'),speed:11},
				{obj:$_id('bImg8'),speed:12},
				{obj:$_id('bImg9'),speed:0},
				{obj:$_id('bImg10'),speed:0.5},
				{obj:$_id('bImg11'),speed:1},
				{obj:$_id('bImg12'),speed:0}
			]	
		},
		{
			obj:$_id('page3'),
			move:[
				{obj:$_id('page3Bg'),speed:0},
				{obj:$_id('cImg1'),speed:2},
				{obj:$_id('cImg2'),speed:3},
				{obj:$_id('cImg3'),speed:4},
				{obj:$_id('cImg4'),speed:5},
				{obj:$_id('cText'),speed:6},
				{obj:$_id('cTitle'),speed:7},
				{obj:$_id('cVideo'),speed:8},
				{obj:$_id('cTitle2'),speed:9},
				{obj:$_id('cMark'),speed:10},
				{obj:$_id('cImg5'),speed:11},
				{obj:$_id('cImg6'),speed:12},
				{obj:$_id('cImg7'),speed:0},
				{obj:$_id('cImg8'),speed:0.5}
			]	
		},
		{
			obj:$_id('page4'),
			move:[
				{obj:$_id('page4Bg'),speed:0},
				{obj:$_id('dImg1'),speed:2},
				{obj:$_id('dImg2'),speed:3},
				{obj:$_id('dImg3'),speed:4},
				{obj:$_id('dImg4'),speed:5},
				{obj:$_id('dText'),speed:6},
				{obj:$_id('dText2'),speed:7},
				{obj:$_id('dMark'),speed:8},
				{obj:$_id('dImg5'),speed:9},
				{obj:$_id('dImg6'),speed:10},
				{obj:$_id('dImg7'),speed:12},
				{obj:$_id('dImg8'),speed:0}
			]	
		}
		,
		/*{
			obj:$_id('page5'),
			move:[
				{obj:$_id('page5Bg'),speed:0},
				{obj:$_id('eImg1'),speed:2},
				{obj:$_id('eImg2'),speed:3},
				{obj:$_id('eImg3'),speed:4},
				{obj:$_id('eImg4'),speed:5},
				{obj:$_id('eImg5'),speed:9},
				{obj:$_id('eImg6'),speed:10},
				{obj:$_id('eImg7'),speed:12},
				{obj:$_id('eImg8'),speed:0},
				{obj:$_id('eImg9'),speed:2},
				{obj:$_id('eImg10'),speed:2},
				{obj:$_id('eText'),speed:2},
				{obj:$_id('eText2'),speed:4}
			]	
		}
		,*/
		{
			obj:$_id('page6'),
			move:[
				{obj:$_id('page6Bg'),speed:0},
				{obj:$_id('fImg1'),speed:2},
				{obj:$_id('fImg2'),speed:3},
				{obj:$_id('fImg3'),speed:4},
				{obj:$_id('fText'),speed:5},
				{obj:$_id('fImg4'),speed:9},
				{obj:$_id('fImg5'),speed:10},
				{obj:$_id('fImg6'),speed:12}
			]	
		}
		,
		{
			obj:$_id('page7'),
			move:[
				{obj:$_id('page7Bg'),speed:0},
				{obj:$_id('gImg1'),speed:2},
				{obj:$_id('gImg2'),speed:3},
				{obj:$_id('gImg3'),speed:4},
				{obj:$_id('gText'),speed:5},
				{obj:$_id('gImg4'),speed:9},
				{obj:$_id('gImg5'),speed:10},
				{obj:$_id('gImg6'),speed:12}
			]	
		}
	]);
	css($_id('page2Bg'),"skewY",-15);
	css($_id('page3Bg'),"skewY",15);
	css($_id('page4Bg'),"skewY",15);
	css($_id('page5Bg'),"skewY",-15);
	css($_id('page6Bg'),"skewY",15);
	css($_id('page7Bg'),"skewY",15);
	return oScroll;
}
function toNav(oScroll)
{
	var oNav=$_id("nav");
	var aNav=oNav.getElementsByTagName("p");
	var oPageTab=$_id("pageTab");
	var aPageTab=oPageTab.getElementsByTagName("a");
	$_id("logo").onclick=function()
	{
		oScroll.toMove(0);
	}
	for(var i=0;i<aPageTab.length;i++)
	{
		(function(a){
			aPageTab[a].onclick=function()
			{
				oScroll.toMove((oScroll._Sale+1)*(a));
			};
		})(i);
	}
	for(var i=0;i<aNav.length;i++)
	{
		(function(a){
			aNav[a].onclick=function()
			{
				oScroll.toMove((oScroll._Sale+1)*(a+1));
			};
		})(i);
	}
}
function toReSize()
{
	var oReSize=new Resize($_id('wrap'),1200,620,$_id('scrollX'),$_id('scrollXBar'),$_id('scrollY'),$_id('scrollYBar'));
	return oReSize;
}
var oNowTime={year:2016,month:2,date:29};
function aDate(oNowTime)
{
	var oParent=$_id("page1Date");
	var aChild=oParent.children;
	var oDate=new Date();
	var oTargetDate=new Date(oNowTime.year,oNowTime.month-1,oNowTime.date,9,30,0);
	/*oTargetDate.setFullYear(oNowTime.year);
	oTargetDate.setMonth(oNowTime.month-1);
	oTargetDate.setDate(oNowTime.date);
	oTargetDate.setHours(0);
	oTargetDate.setMinutes(0);
	oTargetDate.setSeconds(0);*/
	var iNowTime=oDate.getTime();
	var oTargetDate=oTargetDate.getTime();
	var iTime=oTargetDate-iNowTime;
	var aTime=[];
	var iSec=parseInt(iTime/1000)%60;
	var iMin=parseInt(iTime/1000/60)%60;
	var iHours=parseInt(iTime/1000/60/60)%24;
	var iDay=parseInt(iTime/1000/60/60/24);
	var oDay=this.tab(aChild[0],iDay+1);
	var oHours=this.tab(aChild[1],iHours+1,23,oDay);
	var oMin=this.tab(aChild[2],iMin+1,59,oHours);
	var oSec=this.tab(aChild[3],iSec+1,59,oMin);
	var oTimer=null;
	oTimer=setInterval(function(){
		var bOFF=oSec.move();
		if(!bOFF)
		{
			clearInterval(oTimer);
		}
	},1000);
	
}
aDate.prototype=
{
	tab:function(oParent,iTime,iMax,next)
	{
		var oBj=new Object();
		oBj.aNow=getByClass(oParent,"now");
		oBj.aPerv=getByClass(oParent,"perv");
		oBj.oCartoon=getByClass(oParent,"Cartoon")[0];
		oBj.iTime=iTime;
		oBj.next=next;
		oBj.iMax=iMax;
		oBj.oCartoon.parent=oBj;
		css(oBj.oCartoon,"rotateX",0);
		oBj.move=function(next)
		{
			this.iTime--;
			if(this.iTime<0)
			{
				if(this.next && this.next.move())
				{
					this.iTime=this.iMax;
				}
				else
				{
					 return false;
				}
			}
			for(var i=0;i<this.aNow.length;i++)
			{
				var oTime=getByClass(this.aNow[i],"time")[0];
				oTime.innerHTML=this.iTime;
			}
			miaovStartMove(this.oCartoon,{rotateX:-180},1,function(){
				for(var i=0;i<this.parent.aPerv.length;i++)
				{
					var oTime=getByClass(this.parent.aPerv[i],"time")[0];
					oTime.innerHTML=this.parent.iTime;
				}
				css(this,"rotateX",0);
			});
			return true;
		};
		oBj.move();	
		return oBj;
	}	
};
(function()
{
	toPage=new ToPage();
	var oScroll=toScroll();
	var oReSize=toReSize();
	var aBg=getByClass($_id("wrap"),'bg');
	addEvent(window,"resize",function(){
		var aObjs=oScroll._aObjs;
		for(var i=0;i<aObjs.length;i++)
		{
			var oParent=aObjs[i].obj;
			var iAbs=oParent.offsetLeft>0?1:-1;
			for(var j=0;j<aObjs[i].move.length;j++)
			{
				var obj=aObjs[i].move[j].obj;
				var iW=document.documentElement.clientWidth>1200?iAbs*document.documentElement.clientWidth:iAbs*1200;
				var iH=document.documentElement.clientHeight>620?document.documentElement.clientHeight:620;
				obj.iTargetL=-iW-obj.iDis;
				obj.iTargetT=-iH-Math.abs(obj.iDis);
			}
			
		}
		oScroll.doMove();	
	});
	var oDate=new aDate(oNowTime);
	toVideo();
	toflexagon();
	toNav(oScroll);
	ContactMe();
})();

function ToPage()
{
	var _this=this;
	this.oPage=$_id("bCurriculum");
	this.aPage=this.oPage.children;
	for(var i=0;i<this.aPage.length-1;i++)
	{
		var oNub=getByClass(this.aPage[i],"number")[0];
		this.aPage[i].index=oNub.index=i;
		this.aPage[i].style.zIndex=this.aPage.length-i;
		css(this.aPage[i],"rotateY",0);
		oNub.bOff=true;
		oNub.onclick=function()
		{
			_this.move(this.index);
		};
	}
}
ToPage.prototype.move=function(index)
{
	var oNub=getByClass(this.aPage[index],"number")[0];
	if(oNub.bOff)
	{
		for(var i=0;i<=index;i++)
		{
			getByClass(this.aPage[i],"number")[0].bOff=false;
			miaovStartMove(this.aPage[i],{rotateY:-180},1,function()
			{},function(){
				var iDeg=css(this,"rotateY");
				if(Math.abs(iDeg)>=90)
				{	
					this.style.zIndex=this.index;
				}
			});
		}
	}
	else
	{
		for(var i=this.aPage.length-2;i>=index;i--)
		{
			getByClass(this.aPage[i],"number")[0].bOff=true;
			miaovStartMove(this.aPage[i],{rotateY:0},1,function()
			{},function(){
				var iDeg=css(this,"rotateY");
				if(Math.abs(iDeg)<=90)
				{	
					
					this.style.zIndex=this.parentNode.children.length-this.index;
					
				}
			});
		}
	}
};
function toVideo()
{
	var oMenu=document.getElementById("cVideoCMenu");
	var aMenu=oMenu.getElementsByTagName("li");
	var iNow=0;
	var aVideo=document.getElementById("cVideos").getElementsByTagName("embed");
	for(var i=0;i<aMenu.length;i++)
	{
		(function(a){
			aMenu[a].onclick=function()
			{
				aMenu[iNow].className="";
				aVideo[iNow].className="";
				iNow=a;
				this.className="active";
				aVideo[iNow].className="active";
			};
		})(i);
	}
}
function toflexagon()
{
	var ofText=$_id("gText");
	var aDiv=ofText.getElementsByTagName("div");
	var aArticle=ofText.getElementsByTagName("article");
	var iNow=Math.floor(aArticle.length/2);
	aArticle[iNow].className="active";
	for(var i=0;i<aArticle.length;i++)
	{
		aArticle[i].index=i;
		aArticle[i].onmouseover=function()
		{
			aArticle[iNow].className="";
			iNow=this.index;
			aArticle[iNow].className="active";
			toStart();
		};
	}
	function toStart()
	{
		var iDeg=75;
		var iZ=Math.round(Math.sin(iDeg*Math.PI/180)*aArticle[0].offsetWidth);
		var iW=Math.cos(iDeg*Math.PI/180)*aArticle[0].offsetWidth;
		var iNowW=0;
		for(var i=1;i<iNow;i++)
		{
			if(i%2)
			{
				css(aDiv[i],"rotateY",-2*iDeg);
			}	
			else
			{
				css(aDiv[i],"rotateY",2*iDeg);
			}
		}
		iNowW=iW*iNow+aArticle[0].offsetWidth/2;
		iNowW=ofText.offsetWidth/2-iNowW;
		css(aDiv[0],"translateX",iNowW);
		if(iNow==0)
		{
			css(aDiv[0],"translateZ",0);
			
			css(aDiv[iNow],"rotateY",0);	
			css(aDiv[iNow+1],"rotateY",iDeg);
		}
		else
		{
			if(iNow%2)
			{
				css(aDiv[0],"translateZ",iZ);
				
				css(aDiv[iNow],"rotateY",-iDeg);
				css(aDiv[iNow+1],"rotateY",-iDeg);
			}
			else
			{
				css(aDiv[0],"translateZ",0);
				css(aDiv[iNow],"rotateY",iDeg);
				css(aDiv[iNow+1],"rotateY",iDeg);
			}
			css(aDiv[0],"rotateY",iDeg);
		}
		iDeg=-iDeg;
		for(i=iNow+2;i<aDiv.length;i++)
		{
			if(i%2)
			{
				css(aDiv[i],"rotateY",-2*iDeg);
			}	
			else
			{
				css(aDiv[i],"rotateY",2*iDeg);
			}
		}
		
	}
	toStart();
}
function ContactMe()
{
	var oContactMe=document.getElementById("ContactMe");
	var oMore=document.getElementById("ContactMeMore");
	var oContent=oMore.children[0];
	var oH2=oContactMe.children[0];
	var oTimer=null;
	oContactMe.onmouseover=function()
	{
		clearTimeout(oTimer);
		oH2.style.color="#fff";
		miaovStartMove(oMore,{opacity:100},1,function(){
			miaovStartMove(oContactMe,{width:205},2);
			miaovStartMove(oMore,{width:100},2);
			miaovStartMove(oContent,{opacity:100},1);
			oH2.style.color="#f06b86";
		});
	};
	oContactMe.onmouseout=function()
	{
		oTimer=setTimeout(function(){
			oH2.style.color="#f06b86";
			miaovStartMove(oContent,{opacity:0},1);
			miaovStartMove(oContactMe,{width:62},1);
			miaovStartMove(oMore,{opacity:0,width:0},1);
		},100)
	};
}
