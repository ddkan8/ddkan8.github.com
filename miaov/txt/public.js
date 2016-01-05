//处理REM单位核心代码
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
doc.getElementsByTagName("body")[0].style.opacity='1';
if(document.getElementsByTagName('header').length==1)
{
document.getElementsByClassName('Web_Box')[0].className = 'Web_Box pt88';
}
if(document.getElementsByClassName('allchips_tabs_yc').length==1)
{
  document.getElementsByClassName('allchips_tabs_yc')[0].className = 'allchips_tabs_yc mt88';
  }

    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//页面载入所执行函数
$(function() {
    set_sale_today();
	jd_bar();
	//PriceAnimation();
	scrollUp();
	setup_countdowntimer('.countdown');
})
//设置今日特卖宽度
function set_sale_today(){
    var num = $('.sale_today').find('li').length;
    $('.sale_today').find('ul').width((num * 5.15) +0.25 + "rem");
}
//进度条
function jd_bar() {
    var jdt = $('.jd_bar').find('span');
    for (i = 0; i < jdt.length; i++) {
        var num = jdt.eq(i).attr('data-num');
		//小于百分之50 显示红色
        if (num < 50) {
            jdt.eq(i).attr('class', 'red')
        }
		//50%到 80%显示 黄色
        if (num >= 50 && num <= 80) {
            jdt.eq(i).attr('class', 'yellow')
        }
		//大于80%显示绿色
        if (num > 80) {
            jdt.eq(i).attr('class', 'green')
        }
		//达到100% 显示蓝色
        if (num == 100) {
            jdt.eq(i).attr('class', 'blue')
        }
        jdt.eq(i).animate({
            width: num + '%'
        },
        1000);
    }
	
}
//数字超过千位数时用逗号隔开
function addCommas(nStr)
{
 nStr += '';
 x = nStr.split('.');
 x1 = x[0];
 x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
 }
 return x1 + x2;
}
//传递价格动画显示效果
$(function (){
var money = $('.money');
for (i = 0; i < money.length; i++) {
    money[i].timer = null;
    var datato = new Number(money.eq(i).attr('data-to'));
	var speed = new Number(datato / 10);
	var num=new Number(money.eq(i).attr('data-num'));
    PriceAnimation(money.eq(i), datato, speed,num);
}
})

//价格动画显示效果
function PriceAnimation(name, datato, speed,num) {
    var refreshInterval = 100; //刷新间隔0.1秒
    var j = 0;
    name.timer = setInterval(function() {
        j = j + speed
        //alert('每次累加：'+j+'，总数为：'+datato)
        if (j >= datato) {
            clearInterval(name.timer); //关闭定时器
            name.html(addCommas(datato.toFixed(num)));
        } else {
            name.html(addCommas(j.toFixed(num)));
        }
    },
    refreshInterval);
}



//返回顶部
function scrollUp(){
$.scrollUp({
        scrollName:'scrollUp',// 元素ID
        topDistance:'300',// 顶部距离显示元素之前 (px)
        topSpeed:300,// 回到顶部的速度 (ms)
        animation:'fade',// 动画类型Fade, slide, none
        animationInSpeed:200,
        animationOutSpeed:200,
        scrollText:'TOP',// 元素文本
        activeOverlay:false,// 显示scrollUp的基准线，false为不显示, e.g '#00FFFF'
    });
}
//倒计时


function setup_countdowntimer(name) {
    //时间到后回调函数
    function timeisUp() {
        //$(this).html('时间到了')
    }
    for (i = 0; i < $(name).length; i++) {
        $(name).eq(i).attr('id', 'countdown' + i);
		var times = $(name).eq(i).attr('data-countdown'); //获取标签上的时间
        var array = times.split(','); //创建数组
	    
		if(times!='00,00,00')
		{
		$(name).eq(i).countdowntimer({
            hours: array[0],
            minutes: array[1],
            seconds: array[2],
            timeUp: timeisUp,
            timeSeparator: " : "
        });	
		}
		else{
		$(name).eq(i).html('00 : 00 : 00');
		}
		
		
		
		
        
    }
}

//选中切换
function select_switch(name,cls){
$(name).toggleClass(cls);
}


//所有众筹头部选项卡切换
function AllChips(li,id){
$(li).addClass('on').siblings('li').removeClass('on');
$(id).show().siblings('div').hide();
$(window).scrollTop(0);
var offset = $(li).offset();
var li_width=$(li).width();
var gdt_left=$('.phone_gdt').scrollLeft();
$(".phone_gdt").animate({ 
    scrollLeft: offset.left-li_width+gdt_left
  }, 500 );
}

//（我的订单、我的消息）头部选项卡切换
function TabsPublic(li,id,cla)
{
$(li).addClass('on').siblings('li').removeClass('on');
$(id).show().siblings(cla).hide();
}




//滚动加载
function SrollLoad(num,maxnum,url){
	//SrollLoad(起始分页,总分页数,url格式)
    var range = 20; //距下边界长度/单位px  
    var maxnum = maxnum; //设置加载最多次数  
    var num = num;
    loaded = true;
    var totalheight = 0;
    var main = $('#content'); //主体元素
    function Add_Data() {
        var srollPos = $(window).scrollTop();
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
		$('#num').html(num+","+maxnum);
        if (loaded && ($(document).height() - range) <= totalheight && num != maxnum) { 
		    num++;
			loaded=false;
			$.ajax({
              type: 'post',
              url: url+num+'.php',
              dataType: 'html',
			  data:{},
			  param:{pageNo:2},
			  cache:false,
              success: function(data){
				  $('#content').append(data);
				  loaded=true;
			 //判断分页已经累加到总数
			if (num == maxnum) {
            $('#Loading').html('没有更多了');
			 loaded=false;
        }
              },
			  error:function(data){
			//错误提示
			} 			  
            });
        }
        
    }
    $(window).scroll(function() {
        Add_Data()
    })
	}
function GoToUrl(url){
window.location.href=url;
}

//城市选择
//打开选择所在地区
function OpenWhereArea(){
$('.Web_Box,.SelectAddress').toggle();
$('#Downtown,#area').hide();
$('#province').show();
setProvince();
}
function CloseWhereArea(){
$('.Web_Box,.SelectAddress').toggle();
clearProvince();
}

//选中切换
//harry
function select_switch(name,cls){
	$(name).toggleClass(cls);
	if($(name).hasClass(cls)) {
		$("#araIsdefault").val("1");
	} else {
		$("#araIsdefault").val("0");
	}
}


//所有众筹头部选项卡切换
function AllChips(li,id){
$(li).addClass('on').siblings('li').removeClass('on');
$(id).show().siblings('div').hide();
$(window).scrollTop(0);
}

function toCenter(li) {
	var offset = $(li).offset();
	var li_width=$(li).width();
	var gdt_left=$('.phone_gdt').scrollLeft();
	var scrollleft = offset.left-li_width+gdt_left;
	$(".phone_gdt").animate({ 
	    scrollLeft: offset.left-li_width+gdt_left
	  }, 500 );
}

//滚动加载
function SrollLoad(num,maxnum,url){
	//SrollLoad(起始分页,总分页数,url格式)
    var range = 20; //距下边界长度/单位px  
    var maxnum = maxnum; //设置加载最多次数  
    loaded = true;
    var totalheight = 0;
    var main = $('#content'); //主体元素
    var loading = $('#Loading');
    
    function Add_Data() {
        var srollPos = $(window).scrollTop();
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
//		$('#num').html(num+","+maxnum);
        if (loaded && ($(document).height() - range) <= totalheight && num != maxnum) { 
			loaded=false;
			loading.html('加载中');
			$.ajax({
              type: 'post',
              url: url,
			  data:{'pageNo':num},
			  cache:false,
			  dataType: 'json',
              success: function(data){
            	  		   appendObjs(data);
	            	  	   num++;
	            	  	   loaded=true;
							 //判断分页已经累加到总数
						   if (num == maxnum) {
							   loading.html('没有更多了');
						   	   loaded=false;
					       } else {
					    	   loading.html('');
					       }
              		   },
			  error:function(data){
				  //错误提示
				  $('#Loading').html('加载失败');
				  loaded=true;
			  } 			  
            });
        }
    }
    $(window).scroll(function() {
        Add_Data()
    })
	}

function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	};
};

function loadImg(imgs) {
	if(!imgs.length) {
		return;
	}
	
	i = imgs.length;
	var img = null;
	for(--i; i>=0; i--) {
		img = $(imgs[i]);
		if(getScroll().top - img.height() < img.offset().top && img.offset().top < getScroll().top + $(window).height()) {
			img.attr("src", img.attr("dsrc"));
			imgs.splice(i, 1);
		}
	}
};
$(function (){
	var province;
	var Downtown;
	var area;
	var provinceId;
	
	
	//省	
	$('#province li').click(function (){
	
	province=$(this).text();
	$(this).removeClass('on').addClass('on').siblings('li').removeClass('on');
	$('#province').hide();
	
	provinceId=$(this).attr('id');
	
	//$("#araProvinceId").val(provinceId);
	//$("#araProvinceName").val(province);
	getDowntownOrAreaById(provinceId, true, province);//harry
	//$('#Downtown,.PreviousStep').show();
	
	})
//市
$('#Downtown li').click(function (){
Downtown=$(this).text();
$(this).addClass('on').siblings('li').removeClass('on');
$('#Downtown').hide();
$('#area').show();
})
//区
$('#area li').click(function (){
area=$(this).text();
$(this).addClass('on').siblings('li').removeClass('on');
$('.SelectAddress,.PreviousStep').hide();
$('.Web_Box').show();
$('#WhereArea').val($.trim(province)+$.trim(Downtown)+$.trim(area))
})
//上一步
$('.PreviousStep').click(function (){
$('.SelectAddress .con:visible').prev('.con').show().siblings('.con').hide();
if($('#province').is(":visible")){
$(this).hide();
}
})
})

//公用弹窗
function OpenPop(id,title,text) {
    $(id).show();
	$('#title').html(title);
	$('#text').html(text);
    $(document).bind('touchmove',
    function(event) {
		event.preventDefault();
    });
}

function ClosePop(id) {
    $(id).hide();
    $(document).unbind('touchmove');
}


//模拟下拉框
function SelectData(id){
	var text=$(id).val();
	$(id).next('.text').html(text);
}

//模拟下拉框2
function SelectData2(id,id2){
	var text=$(id).val();
	$(id2).val(text);
}
//验证码倒计时
var yznum=null;
var timer='';
function yzm(){
	yznum=60;
	$('.yzm').attr('class','yzm_djs');
	$('.yzm_djs').attr('disabled',true);
	djs();
	timer=setInterval(djs,1000);
}


function djs(){
	if(yznum<0)
	{
		clearInterval(timer);
		$('.yzm_djs').removeAttr('disabled');
		$('.yzm_djs').attr('class','yzm');
		$('.yzm').html('重新获取');
	}
	else
	{
		$('.yzm_djs').html(yznum+'秒再获取');
		yznum--;
	}
}
	
	
	
	


