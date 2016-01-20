define(function(require,exports,module){
	
	function fnINews()
	{
		var aA=$("#iNewsList a");
		var aLi=$("#iNewsList li");
		aLi.mouseover(function(){
			aLi.removeClass("active");
			$(this).addClass("active");
			console.log($(this).index());
			return false;
		});
		for(var i=0;i<aA.length;i++)
		{
			var aHtml=aA.eq(i).html().split("");
			for(var j=0;j<aHtml.length;j++)
			{
				aHtml[j]="<span>"+aHtml[j]+"</span>"
			}
			aA.eq(i).html(aHtml.join(""));
		}
		var aSpan=$("#iNewsList span");
		
		for(var i=0;i<aSpan.length;i++)
		{
			aSpan.eq(i).css("left",aSpan.eq(i).position().left+"px");
		}
		aSpan.css("position","absolute");
		var iStartTop=aSpan.position().top;
		var iMinTop=-5;
		var iMaxTop=parseFloat(aSpan.parent().css("height"))-parseFloat(aSpan.css("height"))+5;
		aSpan.mouseover(function(ev){
			var ev=ev||event;
			var iStartY=ev.clientY;
			var obj=$(this);
			this.parentNode.onmousemove=function(ev)
			{
				var iMouseY=ev.clientY;
				var iTop=iStartTop+(iMouseY-iStartY);
				var aSpan=$(this).find("span");
				var iIndex=obj.index();
				aSpan.stop();
				if(iTop<iMinTop || iTop>iMaxTop)
				{
					aSpan.animate({top:iStartTop},500,"elasticOut");
					this.parentNode.onmouseout=null;
					this.parentNode.onmousemove=null;
				}
				else
				{
					for(var i=0;i<aSpan.length;i++)
					{
						if(iMouseY>iStartY)
						{
							var iSpanTop=iTop-Math.abs(i-iIndex);
							if(iSpanTop<iStartTop)
							{
								iSpanTop=iStartTop;
							}
						}
						else if(iMouseY<iStartY)
						{
							var iSpanTop=iTop+Math.abs(i-iIndex);
							if(iSpanTop>iStartTop)
							{
								iSpanTop=iStartTop;
							}
						}
						aSpan.eq(i).css("top",iSpanTop+"px");
					}
				}
				this.parentNode.onmouseout=function()
				{
					aSpan.animate({top:iStartTop},500,"elasticOut");
					this.parentNode.onmouseout=null;
					this.parentNode.onmousemove=null;
				};
			};
		});
	}
	
	exports.fnINews = fnINews;
	
});