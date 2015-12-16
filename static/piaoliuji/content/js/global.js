!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
$(function(){
  FastClick.attach(document.body);
  
  // 设置html标签高度为屏幕高度
  // var winH = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  // var winH = document.documentElement.clientHeight;
  // $("#loading, #page-start, #page-maps, .page-level, #mark_ios, #mark_android").css("height",winH);
});
(function() {

    // ************************************************************************
    // Fix window size
    // ************************************************************************
    var scale = {

        _options : {
            sel         : '.page-content',

            slideWidth  : 320,
            slideHeight : 504,

            // Could be 'width' / 'height' / 'auto'
            fixMode     : 'auto'
        },

        _curRatio  : 1,
        _docWidth  : 0,
        _docHeight : 0,

        _calcScaleRatio: function(){

            this._docWidth  = document.documentElement.clientWidth,
            this._docHeight = document.documentElement.clientHeight;

            var ratio = {
                width  : this._docWidth  / this._options.slideWidth,
                height : this._docHeight / this._options.slideHeight
            };

            this._curRatio = ratio[this._options.fixMode] ? ratio[this._options.fixMode] :
                    ratio.width > ratio.height ? ratio.height : ratio.width;

            return this;
        },

        _fixEl: function(){

            var ratio = this._curRatio;

            $(this._options.sel).attr('style', '-webkit-transform:scale(' + ratio + ',' + ratio + ');' +
                    '-webkit-transition:all 0.5s;');

            return this;
        },

        fitWindow: function(){
            return this._calcScaleRatio()._fixEl();
        },

        bindResize: function() {

            // Resize content on 'resize' event
            var resizeTimeoutId = 0,
                that = this;

            $(window).bind('resize', function() {

                resizeTimeoutId && clearTimeout(resizeTimeoutId);

                setTimeout(function() {
                    that.fitWindow();
                }, 1000);
            });

            return this;
        }
    };

    $(function() {

        scale.bindResize();
        scale.fitWindow();

    });
}());
/********加载图片 S*******/
var load = document.getElementById('loading');
var pw = parseInt( $('#pro_div .pro_bg').css('width') );
var imgSources = ['icon_loading.gif', 'bg_startPage.jpg', 'top.png', 'zp.png', 'chuan.png', 'btn_start.png', 'icon_rule.png', 'p1.png', 'p2.png', 'yun1.png', 'yun2.png', 'yun3.png', 'bg_maps.jpg', 'yu1.png', 'yu2.png', 'yu3.png', 'line1.png', 'line2.png', 'line3.png', 'quit_game.png', 'guanka_chuan.png', 'guanka_dt.png', 'guanka_zp.png', 'arrow_txt1.png', 'arrow_txt2.png', 'arrow_txt3.png', 'chuan_top.png', 'dt_top.png', 'zp_top.png', 'btn_rotate.png', 'icon_pass.png', 'dati_suc.png', 'dati_err.png', 'btn_continue.png', 'ly_plate.png', 'bg_dati.png', 'btn_downMhd.png', 'icon_weibo.png', 'icon_qqzone.png', 'icon_weixin.png', 'icon_pity.png', 'icon_wining.png', 'btn_close.png', 'arr.png'];
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
  $('#page-start').css('display', 'block').addClass('active');

  //开始按钮的点击事件
  $('#startgame').click(function(){
    $('#page-start').css('display', 'none').removeClass('active');
    $.LAYER.show({id:'pop-box11',layerContainer:'mark',overlay:{color:'#000',opacity:0.5}});
    initPage02();
  });

  // $('.rule').click(function(){
  //   $.LAYER.show({id:'pop-box11',layerContainer:'mark',overlay:{color:'#000',opacity:0.5}});
  // });
}

function initPage02(){
  var level = 0;
  $('#page-maps').css('display', 'block').addClass('active');

  $('.guanka_chuan').one("webkitAnimationEnd",function(){
    $('.guanka_chuan').addClass('on');
  });

  // 海贼船 点击事件
  $(document.body).delegate('.guanka_chuan', 'click', function() {
    if($(this).hasClass('off')){
      return false;
    }
    $('#page-level-1').css('display', 'block').addClass('active');
    $('#page-level-1 .item').addClass('on');
    $('#page-level-1 .item li').removeClass('active');

    $('#page-level-1 .item li').click(function(){
      $(this).addClass('active');
      $('#page-level-1 .item li').off("click");

      if($(this).children('div.tit').children('span').hasClass('dati_suc')){
        $(this).parents().siblings('.pass').addClass('active');
        $(this).parents().siblings('.btn_continue').addClass('show');
        level++;
      }else{
        $.LAYER.show({id:'pop-box5',layerContainer:'mark',overlay:{color:'#000',opacity:0.5}});

        var _this = $(this);
        $('.btn-close').click(function(){
          console.log(_this)
          _this.parents('.page-level').css('display', 'none').removeClass('active');
        });
      }
    });

    $('#page-level-1 .btn_continue').click(function(){
      $(this).parent('.page-level').css('display', 'none').removeClass('active');
      $('.guanka_chuan').removeClass('on').addClass('off');
      $('.guanka_dt').addClass('on');
    });
  });

  // 悬疑灯塔 点击事件
  $(document.body).delegate('.guanka_dt', 'click', function() {
    if($(this).hasClass('off')){
      return false;
    }
    $('#page-level-2').css('display', 'block').addClass('active');
    $('#page-level-2 .item').addClass('on');
    $('#page-level-2 .item li').removeClass('active');

    $('#page-level-2 .item li').click(function(){
      $(this).addClass('active');
      $('#page-level-2 .item li').off("click");

      if($(this).children('div.tit').children('span').hasClass('dati_suc')){
        $(this).parents().siblings('.pass').addClass('active');
        $(this).parents().siblings('.btn_continue').addClass('show');
        level++;
      }else{
        $.LAYER.show({id:'pop-box5',layerContainer:'mark',overlay:{color:'#000',opacity:0.5}});

        var _this = $(this);
        $('.btn-close').click(function(){
          _this.parents('.page-level').css('display', 'none').removeClass('active');
        });
      }
    });

    $('#page-level-2 .btn_continue').click(function(){
      $(this).parent('.page-level').css('display', 'none').removeClass('active');
      $('.guanka_dt').removeClass('on').addClass('off');
      $('.guanka_zp').addClass('on');
    });
  });
  
  // 运气大陆 点击事件
  $(document.body).delegate('.guanka_zp', 'click', function() {
    if(level === 2){
      $('#page-level-3').css('display', 'block').addClass('active');
    }else{
      $.LAYER.show({id:'pop-box3',layerContainer:'mark',overlay:{color:'#000',opacity:0.5}});
    }
    
  });  

}

// 返回游戏
$('.btn-return').click(function(){
  $(this).parent('.page-level').css('display', 'none').removeClass('active');
});
// 弹层关闭按钮
$('.btn-close').click(function(){
  $.LAYER.close();
});
// 退出游戏
$('#quitgame').click(function(){
  $.LAYER.show({id:'pop-box9',layerContainer:'mark',overlay:{color:'#000',opacity:0.5}});
});

/********转盘*******/
$(function(){
    var timeOut = function(){  //超时函数
        $("#lotteryImg").rotate({
            angle:0, 
            duration: 10000, 
            animateTo: 2188,  //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
            callback:function(){
                alert('网络超时')
            }
        }); 
    }; 
    var rotateFunc = function(awards,angle,text){  //awards:奖项，angle:奖项对应的角度，text:提示文字
        $('#lotteryImg').stopRotate();
        $("#lotteryImg").rotate({
            angle:0, 
            duration: 5000, 
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                alert(text)
            }
        }); 
    };
    
    $("#lottery_star div").rotate({ 
       bind: 
         { 
            click: function(){
                var time = [0,1];
                    time = time[Math.floor(Math.random()*time.length)];
                if(time==0){
                    timeOut(); //网络超时
                }
                if(time==1){
                    var data = [1,2,3,0]; //返回的数组
                        data = data[Math.floor(Math.random()*data.length)];
                    if(data==1){
                        rotateFunc(1,60,'恭喜您抽中的一等奖')
                    }
                    if(data==2){
                        rotateFunc(2,120,'恭喜您抽中的二等奖')
                    }
                    if(data==3){
                        rotateFunc(3,180,'恭喜您抽中的三等奖')
                    }
                    if(data==0){
                        var angle = [240,300];
                            angle = angle[Math.floor(Math.random()*angle.length)]
                        rotateFunc(0,angle,'很遗憾，这次您未抽中奖')
                    }
                }
            }
         } 
       
    });
    
});

function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return "android";
  }else if(bIsIphoneOs || bIsIpad){
    return "ios";
  }else {
    return "pc";
  }
}

$(function(){
  $('#share-frends').click(function(){
    if(browserRedirect() == "android"){
      $('#mark_android').show();
    }
    if(browserRedirect() == "ios"){
      $('#mark_ios').show();
    }
  });
});