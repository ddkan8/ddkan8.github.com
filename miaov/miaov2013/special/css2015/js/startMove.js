function css(obj, attr, value){
	if(!obj)
	{
		return false;
	}
	if(arguments.length==2){
		if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=="translateZ"||attr=="translateX"||attr=="translateY"||attr=="skewY"||attr=="skewX")
		{
			if(! obj.$Transform)
			{
				obj.$Transform={};
			}
			switch(attr)
			{
				case 'scale':
				case 'scaleX':
				case 'scaleY':
				return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
				break;
				default:
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
			}
		}
		var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
		if(attr=='opacity'){
			return Math.round((parseFloat(sCur)*100));
		}
		else{
			return parseInt(sCur);
		}
	}
	else if(arguments.length==3)
	{
		switch(attr){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'translateZ':
			case 'translateX':
			case 'translateY':
			case 'skewY':
			case 'skewX':
			setCss3(obj, attr, value);
			break;
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				if(typeof value=="string")
				{
					obj.style[attr]=value;
				}
				else
				{
					obj.style[attr]=value+'px';
				}
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	}
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}
function setCss3(obj, attr, value)
{
	var sTr="";
	var sVal="";
	var arr=["Webkit","Moz","O","ms",""];
	if(! obj["$Transform"])
	{
		obj["$Transform"]={};
	}
	obj["$Transform"][attr]=parseInt(value);
	for( sTr in obj["$Transform"])
	{
		switch(sTr)
		{
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";	
			break;
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'skewY':
			case 'skewX':
			sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";	
			break;
			case 'translateZ':
			case 'translateX':
			case 'translateY':
			sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";	
			break;
		}
	}
	for(var i=0;i<arr.length;i++)
	{
		obj.style[arr[i]+"Transform"]=sVal;
	}
	
}
var MIAOV_MOVE_TYPE={
	BUFFER: 1,
	FLEX: 2,
	FAST: 3,
	SLOW: 4,
	NORMAL: 5
};
function miaovStartMove(obj, oTarget, iType, fnCallBack, fnDuring){
	var fnMove=null;
	if(obj.timer){
		clearInterval(obj.timer);
	}	
	switch(iType){
		case MIAOV_MOVE_TYPE.BUFFER:
			fnMove=miaovDoMoveBuffer;
			break;
		case MIAOV_MOVE_TYPE.FLEX:
			fnMove=miaovDoMoveFlex;
			break;
	}	
	obj.timer=setInterval(function(){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
		
		var now=(new Date()).getTime();
		obj.lastMove=now;
	}, 20);
	if(!obj.lastMove){
		obj.lastMove=0;
	}
	var now=(new Date()).getTime();
	if(now-obj.lastMove>30){
		fnMove(obj, oTarget, fnCallBack, fnDuring);		
		var now=(new Date()).getTime();
		obj.lastMove=now;
	}
}
function miaovDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring){
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;	
	for(attr in oTarget){
		oTarget[attr]=parseInt(oTarget[attr]);
		cur=css(obj, attr);
		if(oTarget[attr]!=cur){
			bStop=false;
			speed=(oTarget[attr]-cur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			css(obj, attr, cur+speed);
		}
	}
	if(fnDuring)fnDuring.call(obj);	
	if(bStop){
		clearInterval(obj.timer);
		obj.timer=null;		
		if(fnCallBack)fnCallBack.call(obj);
	}
}
function miaovDoMoveFlex(obj, oTarget, fnCallBack, fnDuring){
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;	
	for(attr in oTarget){
		if(!obj.oSpeed)obj.oSpeed={};
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1){
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/7;
			obj.oSpeed[attr]*=0.8;
			
			css(obj, attr, cur+obj.oSpeed[attr]);
		}
	}
	if(fnDuring)fnDuring.call(obj);
	if(bStop){
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}
function stopMove(obj){
	clearInterval(obj.timer);
}
function removeEvent(obj,ev,fn) 
{
	if(obj.removeEventListener)
	{ 
		obj.removeEventListener(ev, fn, false); 
	}
	else 
	{
		obj.detachEvent("on" + ev, fn); 
	}
}
function addEvent(obj,ev,fn)
{
	if (obj.addEventListener)
    {  
		obj.addEventListener(ev, fn, false)            
    }
    else
    {  
		obj.attachEvent("on"+ev, fn);          
    }
}
function getOffsetT(obj)
{ 
	var iTop=0; 
	while(obj)
	{
		iTop+=obj.offsetTop;
		obj=obj.offsetParent	
	} 
	return iTop; 
}
function getOffsetL(obj)
{ 
	var iLeft=0; 
	while(obj)
	{
		iLeft+=obj.offsetLeft;
		obj=obj.offsetParent;	
	} 
	return iLeft; 
} 
function getByClass(obj,sClass)
{
	var aRr=[];
	var aTag=obj.getElementsByTagName('*');
	for(var i=0;i<aTag.length;i++)
	{
		var aClass=aTag[i].className.split(" ");
		for(var j=0;j<aClass.length;j++)
		{
			if(aClass[j]==sClass)
			{
				aRr.push(aTag[i]);
				break;	
			}
		}
	}
	return aRr;
}
function $_id(name)
{
	return document.getElementById(name);
}
