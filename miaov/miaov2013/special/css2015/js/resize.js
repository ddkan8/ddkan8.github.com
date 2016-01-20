function Resize(oBox,iMinW,iMinH,sX,sXB,sY,sYB)
{
	var _this=this;
	this._box=oBox;
	this._iMinW=iMinW;
	this._iMinH=iMinH;
	this._sX=sX;
	this._sXB=sXB;
	this._sY=sY;
	this._sYB=sYB;
	addEvent(window,"resize",function(){_this.test();});
	this.test();
	this.scrollLeft();
	this.scrollTop();
}
Resize.prototype={
	test:function()
	{
		if(this._iMinW>this.getWh().w)
		{
			this._sXB.style.width=parseInt(this.getWh().w/this._iMinW*100)+"%";
			this._sX.style.display="block";
			css(this._box,"width",this._iMinW);
		}
		else
		{
			this._sX.style.display='none';
			this._box.style.width="100%";
			
		}
		css(this._box,"left",0);
		if(this._iMinH>this.getWh().h)
		{
			this._sYB.style.top="0px";
			this._sYB.style.height=parseInt(this.getWh().h/this._iMinH*100)+"%";
			css(this._box,"height",this._iMinH);
			this._sY.style.display="block";
		}
		else
		{
			this._sY.style.display='none';
			this._box.style.height="100%";
		}
		css(this._box,"top",0);
	}
	,
	scrollLeft:function()
	{
		var _this=this;
		addEvent(_this._sXB,"mousedown",startDrag);
		function startDrag(ev)
		{
			var ev = ev || event;
			var disX = ev.clientX;
			var disL=getOffsetL(_this._sXB);
			var iMaxLeft= _this.getWh().w-_this._sXB.offsetWidth;
			addEvent(document,"mousemove",doDrag);
			function doDrag(ev)
			{
				var ev = ev || event;
				var L = disL+(ev.clientX - disX);
				if (L < 0) {
					L = 0;
				} else if (L > iMaxLeft) {
					L = iMaxLeft;
				}
				var iScale = L / iMaxLeft;
				css(_this._sXB,"left",L);
				css(_this._box,"left",(_this.getWh().w-_this._iMinW)*iScale);
			}
			addEvent(document,"mouseup",endDrag);
			function endDrag()
			{
				removeEvent(document,"mousemove",doDrag);
				removeEvent(document,"mouseup",endDrag);
			}
		}
		
	},
	scrollTop:function()
	{
		var _this=this;
		addEvent(_this._sYB,"mousedown",startDrag);
		function startDrag(ev)
		{
			var ev = ev || event;
			var disX = ev.clientY;
			var disT=getOffsetT(_this._sYB);
			var iMaxTop= _this.getWh().h-_this._sYB.offsetHeight;
			addEvent(document,"mousemove",doDrag);
			function doDrag(ev)
			{
				var ev = ev || event;
				var T = disT+(ev.clientY - disT);
				if (T < 0) {
					T = 0;
				} else if (T > iMaxTop) {
					T = iMaxTop;
				}
				var iScale = T / iMaxTop;
				css(_this._sYB,"top",T);
				css(_this._box,"top",(_this.getWh().h-_this._iMinH)*iScale);
			}
			addEvent(document,"mouseup",endDrag);
			function endDrag()
			{
				removeEvent(document,"mousemove",doDrag);
				removeEvent(document,"mouseup",endDrag);
			}
		}
	},
	getWh:function()
	{
		return {w:document.documentElement.clientWidth,h:document.documentElement.clientHeight};
	}
}