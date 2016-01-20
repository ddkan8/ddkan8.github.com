function Scroll(iSale,fnScroll)
{
	this._Sale=iSale;
	this._scroll=0;
	this._dis=100;
	this._fnScroll=fnScroll;
	this._Timer=null;
}
Scroll.prototype={
	init:function(aObjs)
	{
		var iWinW=document.documentElement.clientWidth;
		var iWinH=document.documentElement.clientHeight;
		this._aObjs=aObjs;
		this._maxLength=this._Sale*this._aObjs.length;
		for(var i=0;i<aObjs.length;i++)
		{
			var oParent=aObjs[i].obj;
			var iAbs=oParent.offsetLeft>0?1:-1;
			for(var j=0;j<aObjs[i].move.length;j++)
			{
				var obj=aObjs[i].move[j].obj;
				var iSpeed=aObjs[i].move[j].speed;
				var iW=document.documentElement.clientWidth>1200?iAbs*document.documentElement.clientWidth:iAbs*1200;
				var iH=document.documentElement.clientHeight>620?document.documentElement.clientHeight:620;
				if(obj.className=="bg")
				{
					obj.iDis=0;	
				}
				else
				{
					obj.iDis=this._dis*iSpeed*iAbs;
					css(obj,"left",obj.offsetLeft+obj.iDis);
					css(obj,"top",obj.offsetTop+Math.abs(obj.iDis));
				}
				obj.iTargetL=-iW-obj.iDis;
				obj.iTargetT=-iH-Math.abs(obj.iDis);
				css(obj,"translateX",0);
				css(obj,"translateY",0);
			}
			
		}
		this.start();
	},
	start:function()
	{
		var _this=this;
		document.onmousewheel =fnWheel;
		if (document.addEventListener) {
			document.addEventListener('DOMMouseScroll',fnWheel, false);
		}
		function fnWheel(ev)
		{
			var ev = ev || event;
			var iScroll=0;
			if (ev.wheelDelta) {
				iScroll = ev.wheelDelta > 0 ? -1 : 1;
			} else {
				iScroll = ev.detail < 0 ? -1 : 1;
			}
			_this.move(iScroll);
		}
		document.onkeydown=function(ev)
		{
			var ev=ev||event;
			switch(ev.keyCode)
			{
				case 38:
				_this.move(-1);
				break;
				case 40:
				_this.move(1);
				break;
			}
		}
	},
	move:function(iScroll)
	{
		
		this._scroll+=iScroll;
		if(this._scroll<0)
		{
			this._scroll=0;
		}
		else if(this._scroll>this._maxLength+this._aObjs.length-1)
		{
			this._scroll=this._maxLength+this._aObjs.length-1;
		}
		else
		{
			if(this._fnScroll)
			{
				this._fnScroll(iScroll);
			}
			this.doMove();
		}
	},
	doMove:function()
	{
		var obj=this._aObjs[Math.floor(this._scroll/(this._Sale+1))];
		var aMove=obj.move;
		var iScale=this._scroll%(this._Sale+1);
		for(var i=0;i<aMove.length;i++)
		{
			var iTargetL=Math.floor(aMove[i].obj.iTargetL/this._Sale*iScale);
			var iTargetT=Math.floor(aMove[i].obj.iTargetT/this._Sale*iScale);
			miaovStartMove(aMove[i].obj,{translateX:iTargetL,translateY:iTargetT},1);
		}
	}
	,
	toMove:function(iTarget){
		var _this=this;
		if(iTarget>0)
		{
			iTarget-=1;
		}
		if(this._Timer)
		{
			clearInterval(this._Timer);
		}
		var iSpeed=(iTarget-_this._scroll)/Math.abs((iTarget-_this._scroll));
		this._Timer=setInterval(function(){
			if(_this._scroll==iTarget)
			{
				clearInterval(_this._Timer);
			}	
			else
			{
				_this.move(iSpeed);
			}
		},24);
	}		
};
