$(function(){
  if ($(".read-box").size() != 0) {
    //字体初始化
    var sizeInfo = [     
      {"no":0,"size":16,"lineHeight":26},
      {"no":1,"size":18,"lineHeight":28},
      {"no":2,"size":20,"lineHeight":30},
      {"no":3,"size":22,"lineHeight":32},
      {"no":4,"size":24,"lineHeight":34}];
    var sizeNo = 1;
    var cookieSizeNo = getCookie("sizeNo");
    if(cookieSizeNo != ""){
      sizeNo = cookieSizeNo;
      $(".read-content").css({"font-size":sizeInfo[sizeNo].size+"px","line-height":sizeInfo[sizeNo].lineHeight+"px"});
    }
    var dayORnight = getCookie("dayORnight");
    if (dayORnight == "night") {
      $(".m-night").addClass("m-day");
      $("body").addClass("read-black");
    }

    $(".m-fd").click(function(){
      sizeNo ++;
      (sizeNo>4)?sizeNo=4:sizeNo=sizeNo;
      var lineHeight = sizeInfo[sizeNo].lineHeight;
      var size = sizeInfo[sizeNo].size;
      $(".read-content").css({"font-size":size+"px","line-height":lineHeight+"px"});
      addCookie("sizeNo", sizeNo, 30*24);
      if(sizeNo == sizeInfo[sizeInfo.length - 1].no){
        $(this).addClass('gray');
      }else{
        $(".m-fd,.m-sx").removeClass('gray');  
      }
    });
    //缩小
    $(".m-sx").click(function(){
      sizeNo --;
      (sizeNo<0)?sizeNo=0:sizeNo=sizeNo;
      var lineHeight = sizeInfo[sizeNo].lineHeight;
      var size = sizeInfo[sizeNo].size;
      $(".read-content").css({"font-size":size+"px","line-height":lineHeight+"px"});
      addCookie("sizeNo", sizeNo, 30*24);
      if(sizeNo == sizeInfo[0].no){
        $(this).addClass('gray');
      }else{
        $(".m-fd,.m-sx").removeClass('gray');
      }
    });

    $(".m-night").click(function() {
      if ($(".read-black").size() == 0) {
        $("body").addClass("read-black");
        $(this).addClass("m-day");
        addCookie("dayORnight", "night", 30 * 24);
      } else {
        $("body").removeClass("read-black");
        $(this).removeClass("m-day");
        addCookie("dayORnight", "day", 30 * 24);
      }
    });
  }
});

function addCookie(key, value, expiresHours) {
  var cookieString = key + "=" + escape(value);
  if (expiresHours > 0) {
    var date = new Date();
    date.setTime(date.getTime() + expiresHours * 3600 * 1000);
    cookieString = cookieString + ";expires=" + date.toUTCString() + ";path=/";
  }
  document.cookie = cookieString;
}
function getCookie(key) {
  var strCookie = document.cookie;
  var arrayCookie = strCookie.split(";");
  var numCookies = arrayCookie.length;
  for (var i = 0; i < numCookies; i++) {
    var tmpKeyValue = arrayCookie[i].split("=");
    if (key == tmpKeyValue[0].trim()) return unescape(tmpKeyValue[1]);
  }
  return "";
}
