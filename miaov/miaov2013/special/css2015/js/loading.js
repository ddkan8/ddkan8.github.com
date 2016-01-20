function Loading()
{
	this._obj=$_id("loading");
	this._parent=$_id("windmill");
	this._bg=this._parent.children[0];
	this._progress=this._parent.children[1];
	this._iProgress=0;
	this._deg=0;
	this._iSpeed=-5;
	this._Friction=1;
	this._Timer=null;
	this.rotate();
}
Loading.prototype={
	init:function(obj)
	{
		this._aCss=obj.css;
		this._aImg=obj.img;
		this._length=this._aCss.length+this._aImg.length;
		this.toSpeed();
	},
	rotate:function()
	{
		var _this=this;
		this._Timer=setInterval(function(){
			_this._iSpeed*=_this._Friction
			_this._deg+=_this._iSpeed;
			if(Math.abs(_this._iSpeed)<2)
			{
				clearInterval(_this._Timer);
				_this.toEnd();				
			}
			else
			{
				css(_this._bg,"rotate",_this._deg);
			}
		},24);
	},
	toSpeed:function()
	{
		var _this=this;
		for(var i=0;i<this._aImg.length;i++)
		{
			var aImg=new Image();
			aImg.src=this._aImg[i];
			aImg.onload=function()
			{
				_this._iProgress++;
				if(_this._iProgress==_this._length)
				{
					_this._Friction=0.95;
				}
				_this._progress.innerHTML=Math.floor(_this._iProgress/_this._length*100);
			};
		}
		for(var i=0;i<this._aCss.length;i++)
		{
			var oLink=document.createElement("link");
			oLink.rel="stylesheet";
			oLink.href=_this._aCss[i];
			document.getElementsByTagName("head")[0].appendChild(oLink);
			oLink.onload=function()
			{
				_this._iProgress++;
				if(_this._iProgress==_this._length)
				{
					_this._Friction=0.95;
				}
				_this._progress.innerHTML=Math.floor(_this._iProgress/_this._length*100);
			};
		}
	},
	toEnd:function()
	{
		var oJs=document.createElement("script");
			oJs.src="js/load.js";
			document.body.appendChild(oJs);
			miaovStartMove(this._obj,{top:-this._obj.offsetHeight},1,function(){
			this.style.display="none";
		});	
	}	
};

