!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
$(function(){
  FastClick.attach(document.body);

  var winH =document.documentElement.clientHeight;
  if(winH<480){
    $('body').addClass('low');
  }
  // $(".bg, #mark_ios, #mark_android").css("height",winH);  
});

/********加载图片 S*******/
var load = document.getElementById('loading');
var pw = parseInt( $('#pro_div .pro_bg').css('width') );
var imgSources = ['icon_loading.gif', 'top.png', 'btm.png', 'bg1.png', 'bg2.png', 'mhd_btn1.png', 'mhd_btn2.png', 'date.png', 'rule_tit.png', 'notice_tit.png', 'true.png', 'false.png', 'lock.png', 'unlock.png', 'icon_qzone.png', 'icon_weixin.png', 'icon_weibo.png', 'bg_pop1.png', 'bg_pop2.png', 'bg_pop3.png', 'icon_close.png'];
var nowload = 0;    //记录当前加载图片的数量
var imgVal = imgSources.length;     //需要加载的图片数量
var imgPath = 'content/img/';
var loadingPage = (function () {
  for (var i = 0; i < imgSources.length; i++) {
    imgSources[i] = (imgPath + imgSources[i]);
  };
  var loadImage = function (path, callback) {
    var img = new Image();
    img.onload = function () {
      img.onload = null;
      callback(path);
      nowload++;
      $('#pro_div .pro').css('width', pw / imgVal * nowload);
    }
    img.src = path;
  }
  var imgLoader = function (imgs, callback) {
    var len = imgs.length, i = 0;
    while (imgs.length) {
      loadImage(imgs.shift(), function (path) {
        callback(path, ++i, len);
      })
    }
  }
  var rateNum = document.getElementById('loading_rate');
  var bar = document.getElementById('bar');
  var percent = 0;
  imgLoader(imgSources, function (path, curNum, total) {
    percent = curNum / total;
    rateNum.innerHTML = Math.floor(percent * 100) + '%';
    if (percent == 1) {
      setTimeout(function () {
        $('#loading').css('display', 'none');
        initPage01();
      }, 500);
    }
  });
})(); /********加载图片 E*******/

function initPage01(){
  $('#page-panel').css('display', 'block').addClass('active');
  GameStart();
}

var Game = {
  index : 0,
  gScore : 0,
  score : 0,
  timer : null,
  levelTxt : $('#levelTxt'),
  globalScoreTxt : $('#globalScore em'),
  scoreTxt : $('#score em'),
  subject : $("#subject"),
  pageItem : $(".pageItem"),
  pageItemChild : ".pageItem dd",
  init : function(){
    this.pageItem.eq(this.index).addClass('cur').show();
    this.levelTxt.text(this.index+1);
  },
  start : function(){
    var _this = this;

    this.subject.on("click", _this.pageItemChild, function (e) {
      e.stopPropagation();      
      
      if($(this).children('span').hasClass('true')){
        _this.score++;
        _this.scoreTxt.text(_this.score);
      }
      _this.clickItem(this);

    });
    
  },
  clickItem : function(ev){
    var _this = ev;
    $(_this).children('span').show();
    this.subject.off("click");
    
    if(this.index < $(this.pageItem).length-1){
      var that = this;
      this.timer = setTimeout(function(){
        $(_this).parents('.pageItem').removeClass('cur').hide();        
        that.subject.on("click", that.pageItemChild, function (e){
          e.stopPropagation();
          if($(this).children('span').hasClass('true')){
            that.score++;
            that.scoreTxt.text(that.score);
          }
          that.clickItem(this);
        });
        
        $(that.pageItem).eq(that.index).addClass('cur').show();
      },500);
      that.index++;
      that.gScore++;
      that.globalScoreTxt.text(that.gScore);
    } else {
      var that = this;
      that.gScore++;
      that.globalScoreTxt.text(that.gScore);
    }
    this.levelTxt.text(this.index+1);
  },
  reset : function(){
    this.index = 0;
    this.score = 0;
    this.gScore = 0;
    this.subject.off("click");
    $(this.pageItemChild).children('span').hide();
  }
};

function GameStart(){   
  Game.reset();
  Game.init();
  Game.start();
}

$('#my-prize').click(function(){
  $.LAYER.show({id:'pop-box1',layerContainer:'mark',overlay:{color:'#000',opacity:0.75}});
});
$('#btn-share').click(function(){
  $.LAYER.show({id:'pop-box3',layerContainer:'mark',overlay:{color:'#000',opacity:0.75}});
});
$('.pop-close,.pop-close2').click(function(){
  $.LAYER.close();
});