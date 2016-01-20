if(!checkBroswer()){
	window.location.href='desktop.html'
}
window.onload=function () {
	SHAKE_THRESHOLD = 3000;
	last_update = 0;
	x = y = z = last_x = last_y = last_z = 0;
	isFirst = 1 ;
	init();
	
	if(checkBroswer()){
		eventType = "tap";
	}else {
		eventType = "click";
	}
	$("#btn").on(eventType,function(){
		start();
	});
}

function init() {
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler, false);
	} else {
		alert('not support mobile event');
	}
}
function deviceMotionHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity;
	var curTime = new Date().getTime();
	if ((curTime - last_update) > 100) {
		var diffTime = curTime - last_update;
		last_update = curTime;
		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;
		var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

		if (speed > SHAKE_THRESHOLD) {
			start();
		}
		ast_x = x;
		last_y = y;
		last_z = z;
	}
}
function start() {
	if(isFirst){
		isFirst=0;
//		document.getElementById("audio").load();
		$('.start').css('display','none');
		$('.stick').addClass('rotate');
		$('.stick').addClass('in');
		$('.stick').animate({},400,function(){
//			document.getElementById("audio").play();
			$('.egg_left').addClass('swing_right');
			$('.egg_left').addClass('in');
			$('.egg_right').addClass('swing_left');
			$('.egg_right').addClass('in');
			$('.mac').addClass('shake_y');
			$('.mac').addClass('in');
		});
		setTimeout(function(){
			$('.egg_down').addClass('down');
			$('.egg_down').addClass('in');
		},1050);
		setTimeout(function(){
			$('.egg_down').css('display','none');
			modalShow();
		},2000);
		setTimeout(function(){
			redir();
		},3300);
	}
}

function redir(){
	var img_id,text_id;
	img_id=parseInt(Math.random()*139);
	text_id = parseInt(Math.random()*35);
	var str = 'result.html?img_id='+img_id+'&text_id='+text_id;
	str = encodeURI(str);
	window.location.href=str;
	
}

function checkBroswer(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsMobile = !!sUserAgent.match(/applewebkit.*mobile.*/); //是否为移动终端
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsMobile) {
        return true;
    } else {
        return false;
    }
}

function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
 }