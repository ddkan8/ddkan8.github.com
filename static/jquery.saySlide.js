(function($){
	$.fn.saySlide=function(options){
		var defaults={
			autoTime:5000,//自动播放时间间隔
			speed:200,//切换速度
			autodir:'left',//自动播放方向
			isTitle:false,//是否显示标题
			isLink:false,//是否使用链接
			isBlank:true,//是否在新窗口打开链接
			isHandles:true,//是否显示左右按钮,默认上下方向不显示
			isBottombg:true,//是否显示底部半透明背景,该设置只有在isTitle为false生效
			defaultColor:"#999999",//定义底部按钮默认颜色
			activeColor:"#ffffff"//定义底部按钮激活状态颜色
		};
		var options=$.extend(defaults,options);
		var n=t=k=0,m,$bottom_btn='';
		var $stitle=new Array(),$slink=new Array();
		$d_c=options.defaultColor;
		$a_c=options.activeColor;
		$autodir=options.autodir;
		$count=$(this).addClass("saySlide").find("div").length;
		$divimg=$(this).html();
		$(this).html("<div id=\"saySlide-box\">"+$divimg+"</div>");
		$handles=options.isHandles==true?"<div class=\"sayHandles sayHandles-l sayHandles-default-left\" id=\"goleft\"></div><div class=\"sayHandles sayHandles-r sayHandles-default-right\" id=\"goright\"></div>":'';
		$bottom_bg="<div class=\"saySlide-opacity-bg\"></div>";
		for(i=0;i<$count;i++){ $bottom_btn+="<li style=\"background:"+$d_c+"\"></li>"; }//根据图片的数量增加右下角按钮
		$bottom_btn="<ul id=\"saySlide-bottom-btn\">"+$bottom_btn+"</ul>"
		$(this).append($handles+$bottom_btn);
		//缓存变量
		$box=$("#saySlide-box");
		$boxdiv=$box.find("div");
		$boximg=$boxdiv.find("img");
		$bottom_btn_li=$("#saySlide-bottom-btn li");
		$boxdiv.find("img").each(function(x){
			$stitle[x]=$(this).attr("stitle");//将标题放入数组中
			$slink[x]=$(this).attr("slink");//将连接放入数组中
		});
		if(options.isBottombg==true){$(this).append($bottom_bg);}//是否显示底部半透明背景
		
		if(options.isTitle==true){
			$(this).append("<div id=\"saySlide-title\">"+$stitle[0]+"</div>");
		}
		if(options.isLink==true){
			$target=options.isBlank==true?"_blank":"_self";
			$boximg.each(function(a){
				$(this).wrap("<a href=\""+$slink[a]+"\" target='"+$target+"'></a>");
			});
		}
		$bottom_btn_li.eq(0).css("background",$a_c);
		$box_width=$(this).width();//获得容器的高度
		$box_height=$(this).height();//获得容器的宽度
		$box.css({width:$box_width,height:$box_height});//设置saySlide-box的宽高
		$handles_top=($box_height-119)/2;
		$(this).find(".sayHandles").css("top",$handles_top);
		//如果不显示标题,则将底部按钮居中对齐
		if(options.isTitle!=true){
			$bottom_btn_width=$("#saySlide-bottom-btn").width();
			$bottom_btn_left=($box_width-$bottom_btn_width)/2;
			$("#saySlide-bottom-btn").css("left",$bottom_btn_left);
		}
		
		$box.find("div:not(:first)").hide();//隐藏非第一张图片
		if($autodir=='left'||$autodir=='right'||$autodir=='fade'){
			$(this).find(".sayHandles").show();
		}
		//点击左右按钮
		$("#goleft").click(function(){
			$handles_l=$autodir=='fade'?'fade':'right';
			$.auto_play($handles_l,'change_dir');
		});
		$("#goright").click(function(){
			$handles_l=$autodir=='fade'?'fade':'left';
			$.auto_play($handles_l,'');
		});
		t=setInterval("$.auto_play('"+$autodir+"')",options.autoTime+options.speed);
		//鼠标经过saySlide时
		$(this).hover(function(){
			clearInterval(t);
			$(this).find(".sayHandles-l").addClass("sayHandles-active-left").end().find(".sayHandles-r").addClass("sayHandles-active-right");
		},function(){
			t=setInterval("$.auto_play('"+$autodir+"')",options.autoTime+options.speed);
			$(this).find(".sayHandles-l").removeClass("sayHandles-active-left").end().find(".sayHandles-r").removeClass("sayHandles-active-right");
		});
		//点击底部按钮
		$bottom_btn_li.each(function(g){
			$(this).click(function(){
				if(g!=n)//防止按钮连续点击第二次及以上出现问题
				$.auto_play(options.autodir,'',g);
			});
		})
		//自定义函数
		$.extend({auto_play:function(dir,t,g){
			k=n;
			n=isNaN(g)?n:(g-1);
			m=isNaN(g)?n:k;
			switch(dir){
				case 'right':
					if(t=='change_dir'){
						n=n==0?$count-1:--n;					
					}else{
						n=n==$count-1?0:++n;
					}
					$pos_dir='left';
					$pos_val=-$box_width;
					break;
				case 'left':
					n=n==$count-1?0:++n;
					$pos_dir='left';
					$pos_val=$box_width;
					break;
				case 'top':
					n=n==$count-1?0:++n;
					$pos_dir='top';
					$pos_val=$box_height;
					break;
				case 'bottom':
					n=n==$count-1?0:++n;
					$pos_dir='top';
					$pos_val=-$box_height;
					break;
				case 'fade':
					if(t=='change_dir'){
						n=n==0?$count-1:--n;					
					}else{
						n=n==$count-1?0:++n;
					}
					$pos_dir='fade';
					break;
			}
			$boxdiv.css({"z-index":0});
			$boxdiv_now=$boxdiv.eq(n);
			if($pos_dir=='fade'){
				$boxdiv_now.css({top:"0",left:"0",display:"none","z-index":1}).fadeIn(options.speed,function(){
					$boxdiv.eq(m).css({display:"none"});
				});
			}else{
				$boxdiv_now.css($pos_dir,$pos_val).css({display:"block","z-index":1}).animate({left:0,top:0},options.speed,'swing',function(){
					$boxdiv.eq(m).css({display:"none"});
				});
			}
			if(options.isTitle==true){$("#saySlide-title").html($stitle[n])};
			$bottom_btn_li.css("background",$d_c).eq(n).css("background",$a_c);
		}});
	}
})(jQuery);
// $(document).ready(function () {
//   $("#saySlide").saySlide({ isTitle: true, isBottombg: true, autodir: 'left' });
// });