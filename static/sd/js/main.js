!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
$(function(){
  FastClick.attach(document.body);

  (function(){
    var flag = 0,
        level = 0,
        arrTips = [
                   '最期待的礼物，会在哪里呢？',
                   '圣诞节就是暖洋洋的红色呢。',
                   '圣诞老人一定悄悄的到这里来过~',
                   '找了这么久，你一定饿了吧~'
                  ],
        arrHead = [
        {
          aTxt : '麋鹿少女',
          aNa : '女神',
          aHd : [
            'img/girl1.jpg', 'img/girl2.jpg', 'img/girl3.jpg', 'img/girl4.jpg', 'img/girl5.jpg'
          ],
          aName : [
            'Angelababy', '杨幂', '范冰冰', '汤唯', '赵丽颖'
          ]
        },
        {
          aTxt : '圣诞老人',
          aNa : '男神',
          aHd : [
            'img/boy1.jpg', 'img/boy2.jpg', 'img/boy3.jpg', 'img/boy4.jpg', 'img/boy5.jpg'
          ],
          aName : [
            '吴彦祖', '李易峰', '鹿晗', '彭于晏', '金城武'
          ]
        }
        ];

    function playsound(){
      
      var audio = document.getElementById('bgmusic');
      var cardsound = $('#cardsound');
      cardsound.addClass('on');
      audio.play();
      
      cardsound.click(function(){
        if(audio.paused){
          cardsound.addClass('on');
          audio.play();
        }else{
          cardsound.removeClass('on');
          audio.pause();
        }
      });
    } 

    /********加载图片 S*******/
    var load = document.getElementById('loading');
    var pw = parseInt( $('#pro_div .pro_bg').css('width') );
    var imgSources = ['bg_index.png', 'icon_music.png', 'bg_shred.png', 'shred1.png', 'shred2.png', 'shred3.png', 'shred4.png', 'big_shred.png', 'big_shred1.png', 'big_shred2.png', 'big_shred3.png', 'big_shred4.png', 'bg_dialog.png', 'bg_dialog2.png', 'bg_btn.png', 'bg_btn2.png', 'bg_main1.png', 'bg_main2.png', 'bg_main3.png', 'bg_main4.png', 'bg_sel.png', 'bg_end.jpg', 'bg_head.png', 'stocking.png', 'book.png', 'santa_hat.png', 'turkey.png', 'clockface.png', 'dot.png', 'flame.png', 'fuego.png', 'fuego2.png', 'fuego3.png', 'halo.png', 'hourhand.png', 'minhand.png', 'sechand.png', 'wood.png', 'qrcode.png', 'star1.png', 'star2.png', 'star3.png', 'boy.png', 'girl.png', 'boy1.jpg', 'boy2.jpg', 'boy3.jpg', 'boy4.jpg', 'boy5.jpg', 'girl1.jpg', 'girl2.jpg', 'girl3.jpg', 'girl4.jpg', 'girl5.jpg', 'tips_android.png', 'tips_ios.png'];
    var nowload = 0;    //记录当前加载图片的数量
    var imgVal = imgSources.length;     //需要加载的图片数量
    var imgPath = 'img/';
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
            playsound();
            //showLevel1()
          }, 500);
        }
      });
    })(); /********加载图片 E*******/

    function initPage01(){

      $("canvas.snow1").let_it_snow({
        windPower: 3,
        speed: 1,
        count: 100,
        size: 0,
      });

      var timer = null;

      $('#wrap').css('display', 'block');
      $('#start').addClass('active').css('display', 'block');
      clearTimeout(timer);
      timer = setTimeout(function(){
        $('.btn_start').click(function(){
          $('.dialog_index').css('display', 'block');
        });
      }, 11600);

      $('.btn_boy').click(function(){
        clearTimeout(timer);
        flag = 0;
        showLevel1();
      });

      $('.btn_girl').click(function(){
        clearTimeout(timer);
        flag = 1;
        showLevel1();
      });
    }

    function showLevel1(){
      $("canvas.snow2").let_it_snow({
        windPower: 3,
        speed: 1,
        count: 100,
        size: 0,
      });
      $('#start').find('canvas').removeClass('snow1');
      $('#start').removeClass('active').css('display', 'none');
      $('#main').css('display', 'block');
      setLevel();
    }

    function setLevel(){
      var timer = null;
      clearTimeout(timer);

      if(level === 0){
        level++;
        $('#level'+level).addClass('active').css('display', 'block');
      }else if(level >= 4){       
        showResult();
      }else{
        $('#level1').find('canvas').removeClass('snow2');
        timer = setTimeout(function(){
          $('#level'+level).removeClass('active').css('display', 'none');
          level++;
          $('#level'+level).addClass('active').css('display', 'block');
        }, 1400);
      }      
    }

    function showResult(){
      $('.shred_top, .shred_box').addClass('on');

        setTimeout(function(){
          $('#main').css('display', 'none');
          $('#end').css('display', 'block');
          selectBox();
        }, 8000);
      
    }

    function selectBox(){
      if(flag === 0){
        $('.box_girl').addClass('active').css('display', 'block');
      }else{
        $('.box_boy').addClass('active').css('display', 'block');
      }
      $('.bg_base').click(function(){
        var _this = $(this);
        clearTimeout(_this.timer);
        _this.addClass('on').unbind('click');
        _this.timer = setTimeout(function(){
          _this.removeClass('active').css('display', 'none');
          showEndResult();
        }, 1500);
      });
    }

    function showEndResult(){
      $('.end_result').addClass('active').css('display', 'block');

      var len = arrHead[flag].aHd.length;
      var num = Math.floor(Math.random()*len);

      $('.head').append('<img src="'+ arrHead[flag].aHd[num] +'" alt="">');
      $('.dialog_endresult').find('.txt').html('WOW，你的'+ arrHead[flag].aTxt +'是'+ arrHead[flag].aName[num] +'！');
      document.title = 'WOW，你的'+ arrHead[flag].aTxt +'是'+ arrHead[flag].aName[num] +'！';
      $('.dialog_endresult').find('.btn_share1').html('去晒我的' + arrHead[flag].aNa);
      $('.dialog_endresult').find('.btn_share2').html('让朋友勾搭' + arrHead[flag].aNa);
    
    }

    function setTime(){
      setInterval( function() {
        var seconds = new Date().getSeconds();
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";
        $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});   
      }, 1000 );
      setInterval( function() {
        var hours = new Date().getHours();
        var mins = new Date().getMinutes();
        var hdegree = hours * 30 + (mins / 2);
        var hrotate = "rotate(" + hdegree + "deg)";
        $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
      }, 1000 );
      setInterval( function() {
        var mins = new Date().getMinutes();
        var mdegree = mins * 6;
        var mrotate = "rotate(" + mdegree + "deg)";
        $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
      }, 1000 );
    }
    setTime();

    $('.box').each(function(index){
      $(this).click(function(){
        var _this = $(this);
        clearTimeout(_this.timer);
        _this.addClass('on');
        _this.timer = setTimeout(function(){
          _this.removeClass('on');
        }, 600);
        _this.find('.tips').addClass('on').html(arrTips[index]);
      });
    });
    

    var shredLi = $(".shred_top").find('li');
    $(".item").each(function(index){
      $(this).click(function(event){
        event.stopPropagation();
        var item = $(this);
        var img = item.parent().find('img').attr('src');
        var flyer = $('<img class="flyer" src="'+img+'">');
        var offset = shredLi.eq(index).offset();
        item.unbind('click');
        $('.box').eq(index).unbind('click');
        flyer.fly({
          start: {
            left: event.pageX-30,
            top: event.pageY-30
          },
          end: {
            left: offset.left+20,
            top: offset.top+20,
            width: 0,
            height: 0
          },
          onEnd: function(){
            this.destory();
            shredLi.eq(index).addClass('on').append('<img src="'+img+'">');
            setLevel();
          }
        });
      });
    });

    function browser() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs) {
        return "ios";
      } else if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid) {
        return "android";
      } else if (bIsCE || bIsWM) {
        return "wp";
      } else {
        return "pc";
      }
    }

    function ShareFriend() {
      if (browser() == 'ios') {
        $("#mark_ios").show();
      }
      if (browser() == 'android') {
        $("#mark_android").show();
      }
    }

    $('.btn_share1').click(function(){
      ShareFriend();
    });

    $('.btn_share2').click(function(){
      ShareFriend();
    });

    $('#mark_ios').click(function(){
      $(this).hide();
    });

    $('#mark_android').click(function(){
      $(this).hide();
    });

  })();
  
});