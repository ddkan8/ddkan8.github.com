// JavaScript Document

test.clickArea={
	drag:function(option){
		var obj = option.obj,ev = option.ev;
		obj.style.position = 'absolute';
		var downX = ev.clientX;
		var downY = ev.clientY;
		var objleft = downX - obj.offsetLeft;
		var objtop = downY - obj.offsetTop;
		obj.onmousemove = document.onmousemove = function( ev ){
			var ev = ev || event;
			obj.style.left = ev.clientX - objleft + 'px';
			obj.style.top = ev.clientY - objtop + 'px';
		}
		obj.onmouseup = document.onmouseup = function(){
			 obj.onmousemove = document.onmousemove = null;
		}
	},
	backtop:function(){
		$('body,html').scrollTop('0');
	},
	scrollto:function( option ){
		$(option.obj).siblings().removeClass('active');
		$(option.obj).addClass('active');
		$('body,html').animate({scrollTop:$(option.target).offset().top - $(option.obj).data('revised')},10);
	},
	activeclass:function( option ){
		if($(option.obj).hasClass(option.target)){ return false;}
		$(option.obj).addClass(option.target);
		$(option.obj).bind('mouseup',remov);
		function remov(){
			//$(option.obj).removeClass('active');
			test.clickArea.alertp({obj:option.obj});
			$(option.obj).unbind('mouseup',remov);
		}
	},
	leaf:function( option ){
		var _this = $(option.obj);
		
		if(option.target == 'javascript' && $(_this).parent().hasClass('rotate')){
			_this =  $(_this.get(0).parentNode.previousElementSibling).find('.tabMain').eq(0);
		}else if(option.target == 'javascript' && !$(_this).parent().hasClass('rotate')){
			_this =  $(_this.get(0).parentNode.nextElementSibling).find('.tabMain').eq(0);
		}
		
		if(option.target == 'true'){_this = $(option.obj).parent()}
		
		if(option.target == 'sibling' && $(option.obj).data('target')){
			_this = $(option.obj).parents('.bookMain').find('.tabMain').eq(Number($(option.obj).data('target')+1));
		}
		if($(_this).parent().hasClass('rotate')){
			var length = $(_this).parent().nextAll('.paper').length;
			var lengthP = $(_this).parent().prevAll('.paper').length;
			var next = $(_this).parent().nextAll('.paper');
			
			css($(_this).parent().parent().find('.lastPaper').get(0),'translateZ', -((length+1)*3));
			
			for(var i=next.length-1;i>=0;i--){
				tweenMove({
					obj:next.eq(i).get(0),
					oTarget:{rotateY:0,translateX:0,zIndex:(length-i)+1,translateZ:-(i*3)},
					iTime:500,
					iType:'easeBoth',
					fnDuring:function(b,MT,t,d){
						if(t>d/2){
							css($(_this).parent().get(0),'translateZ',0);
							if(!$(_this).parent().hasClass('firstPaper')){
								css($(_this).parent().parent().find('.firstPaper').get(0),'translateZ', -((lengthP+1)*3));
							}
							next.removeClass('rotate');
						}
					}
				});
			}
			
			setTimeout(function(){
				$(_this).parent().prevAll('.paper').each(function(i,v){
					css($(v).get(0),'translateZ',-((i+1)*3));
				});
			},200);
			
		}else{
			if(option.target == 'sibling' && !$(option.obj).data('target')){ return false;}
			var length = $(_this).parent().prevAll('.paper').length;
			var lengthN = $(_this).parent().nextAll('.paper').length;
			
			var prev = $(_this).parent().prevAll('.paper');
			for(var i=prev.length-1;i>=0;i--){
				tweenMove({
					obj:prev.eq(i).get(0),
					oTarget:{rotateY:-180,translateX:12,zIndex:length-i,translateZ:-(i*3)},
					iTime:500,
					iType:'easeBoth',
					fnDuring:function(b,MT,t,d){
						if(t>d/2){
							//css(prev.eq(i).get(0),'translateZ',$(this).css('zIndex'));
							css($(_this).parent().get(0),'translateZ',0);
							css($(_this).parent().parent().find('.lastPaper').get(0),'translateZ', -((lengthN+1)*3));
							prev.addClass('rotate');
						}
					}
				});
			}
			setTimeout(function(){
				$(_this).parent().nextAll('.paper').each(function(i,v){
					css($(v).get(0),'translateZ',-(i+1)*3);
				});
				css($(_this).parent().parent().find('.firstPaper').get(0),'translateZ', -(length*3));
			},200);
		}
	},
	alertm:function( option ){
		$('#mark').remove();
		$('#popup').remove();
		if(document.getElementById('mark')){ return false;}
		var text = document.createElement('div');
		text.className = 'mark';
		text.id = 'mark';
		text.dataset.closem='#mark';
		text.style.height = Math.max(document.documentElement.clientHeight,document.body.scrollHeight) + 'px';
		$('<div class="pop" id="popup" data-stopup="javascript">\
							<div class="close" data-closem="#mark">&nbsp;</div>\
							<div class="message">'+ option.target +'</div>\
							<div class="btn">\
								<div class="confirm" data-closem="#mark">&nbsp;</div>\
								<div class="cancel" data-closem="#mark">&nbsp;</div>\
							</div>\
						</div>').appendTo('body');
		setTimeout(function(){
			document.body.appendChild(text);
			$('#popup').css('marginTop',-($('#popup').outerHeight()/2));
		},10);
	},
	alertp:function( option ){
		$(option.obj).removeClass('active');
		$('#mark').remove();
		$('#popup').remove();
		if(document.getElementById('mark')){ return false;}
		var text = document.createElement('div');
		text.className = 'markpop';
		text.id = 'mark';
		text.dataset.closem='#mark';
		text.style.height = Math.max(document.documentElement.clientHeight,document.body.scrollHeight) + 'px';
		$('<div class="popup" id="popup" data-stopup="javascript">\
							<div class="title">\
								<span>'+ $(option.obj).data('alerttitle') +'</span><em data-closem="#mark">&nbsp;</em>\
							</div>\
							<div class="popupMain">'+ $(option.obj).data('alertcontent') +'<div class="btn">\
									<div class="confirm" data-closem="#mark">&nbsp;</div>\
									<div class="cancel" data-closem="#mark">&nbsp;</div>\
								</div>\
							</div>\
							<div class="bottom">&nbsp;</div>\
						</div>').appendTo('body');
		document.body.appendChild(text);
		setTimeout(function(){
			$('#popup').css('marginTop',-($('#popup').outerHeight()/2));
		},10);
	},
	closem:function( option ){
		$(option.target).animate({opacity:0},100,function(){
			$('#popup').remove();
			$(option.target).remove();
		});
	}
}

test.popup = function( option ){
	var text = document.createElement('div');
        text.className = 'popup';
        text.innerHTML = option;
    document.body.appendChild(text);
	setTimeout(function(){
		remove( text );
	},3000);
}

test.uploding = function( option ){
	if( option && !option.off ){
		remove( s('mask') );
	}
	var mask = document.createElement('div');
	mask.className = 'mask';
	mask.id = 'mask';
	mask.innerHTML = '<div class="loding">&nbsp;</div>';
	document.body.appendChild(mask);
}