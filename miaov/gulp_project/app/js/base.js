$(function() {
  // $dragBln = false;
  // $(".banner_image").touchSlider({
  //   flexible : true,
  //   speed : 200,
  //   btn_prev : $("#btn_prev"),
  //   btn_next : $("#btn_next"),
  //   paging : $(".banner .num a"),
  //   counter : function (e) {
  //     $(".banner .num a").removeClass("active").eq(e.current-1).addClass("active");
  //   }
  // });
  // $(".banner_image").bind("mousedown", function() {
  //   $dragBln = false;
  // })
  // $(".banner_image").bind("dragstart", function() {
  //   $dragBln = true;
  // })
  // $(".banner_image a").click(function() {
  //   if($dragBln) {
  //     return false;
  //   }
  // })
  // timer = setInterval(function() { $("#btn_next").click();}, 5000);
  // $(".banner").hover(function() {
  //   clearInterval(timer);
  // }, function() {
  //   timer = setInterval(function() { $("#btn_next").click();}, 5000);
  // })
  // $(".banner_image").bind("touchstart", function() {
  //   clearInterval(timer);
  // }).bind("touchend", function() {
  //   timer = setInterval(function() { $("#btn_next").click();}, 5000);
  // })

  function getStyle(obj, attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
  }

  (function() {

    var scrollCont = document.getElementById('scroll_cont');
    var oUl = scrollCont.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var btn_prev2 = document.getElementById('btn_prev2');
    var btn_next2 = document.getElementById('btn_next2');
    var speed = -10;

    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = (aLi[0].offsetWidth + 12) * aLi.length + 'px';
    // alert(oUl.style.width)
    function fnMove() {
      if(oUl.offsetLeft < -oUl.offsetWidth/2) {
        oUl.style.left = 0;
      }
      if(oUl.offsetLeft > 0) {
        oUl.style.left = -oUl.offsetWidth/2 + 'px';
      }
      oUl.style.left = oUl.offsetLeft + speed + 'px';
    }
    scrollCont.timer = setInterval(fnMove, 150);

    scrollCont.onmouseover = function() {
      clearInterval(scrollCont.timer);
    };
    scrollCont.onmouseout = function() {
      scrollCont.timer = setInterval(fnMove, 150);
    };

    btn_prev2.onclick = function() {
      clearInterval(scrollCont.timer);
      speed = -10;
      scrollCont.timer = setInterval(fnMove, 150);
    };
    btn_next2.onclick = function() {
      clearInterval(scrollCont.timer);
      speed = 10;
      scrollCont.timer = setInterval(fnMove, 150);
    };

  })();

});
