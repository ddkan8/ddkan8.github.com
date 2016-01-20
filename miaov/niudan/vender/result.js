if(!checkBroswer()){
	window.location.href='desktop.html'
}
Request = new Object();
Request = GetRequest();
img_id= Request['img_id'];
text_id = Request['text_id'];

window.onload=function () {
	if(checkBroswer()){
		eventType = "tap";
	}else {
		eventType = "click";
	}
	$('title').html('好神奇的扭蛋机哦！我是'+resource().name[img_id]+'哥哥呵护下的小公主 (๑>◡<๑)');
	$('img.head').attr('src','img/headpic/'+resource().name[img_id]+'.JPG');
	$('.name').html(resource().name[img_id]);
	$('.info').html(resource().text[text_id]);
	$("#return").on(eventType,function(){
		window.location.href="index.html";
	});
}

function init() {
	
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
function GetRequest() {
   var url = location.search; 
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      url = decodeURI(url);
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}