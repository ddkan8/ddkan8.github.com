!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
$(function(){
  FastClick.attach(document.body);

  // var winH =document.documentElement.clientHeight;
  // if(winH<480){
  //   $('body').addClass('low');
  // }
  // $(".box").css("height",winH);  


  loadData();

  var da = [];
  var level = 10;

  var Game = {
    index : 0,
    len : 0,
    succNum : 0,
    gSuccNum : 3,
    flag : true,
    da2 : [],

    init : function(){
      var oBox = document.getElementById('box');
      var aBoxItem = oBox.getElementsByTagName('div');

      aBoxItem[this.index].style.display = '';
      this.start();
    },
    start : function(){

      var _this = this;

      var oBox = document.getElementById('box');
      var aBoxItem = oBox.getElementsByTagName('div');
      var oUl1 = aBoxItem[this.index].getElementsByTagName('ul')[0];
      var oUl2 = aBoxItem[this.index].getElementsByTagName('ul')[1];
      var aLi1 = oUl1.getElementsByTagName('li');
      var aLi2 = oUl2.getElementsByTagName('li');

      if(this.flag){
        this.flag = false;

        for(var i=0; i<aLi1.length; i++){
          aLi1[i].num = i;
          aLi1[i].onoff = true;

          aLi1[i].onclick = function(){
            _this.aLiClick1(this, aLi2.length);
          };
        }

        for(var i=0; i<aLi2.length; i++){
          aLi2[i].onoff = false;

          aLi2[i].onclick = function(){
            _this.aLiClick2(this, aLi1);
          };
        }

        $("#box-btn").click(function(){

          $(this).hide();
          $(this).off('click'); 
          _this.len = 0;
          _this.flag = true;
                     
          if(_this.da2.toString() == da[_this.index].toString()){
            _this.succNum++;
            $('.succNum').html(_this.succNum);
          }

          if(_this.succNum == _this.gSuccNum){
            
            $('.succNum').html(_this.succNum);
            aBoxItem[_this.index].style.display = 'none';
            _this.index++;
            // console.log('答对三题');
            $('#main').css('display', 'none');
            $('#end').css('display', 'block');
            $('#succBox').css('display', 'block');
            $('#failBox').css('display', 'none');

          }else{

            if(_this.index < level-1){

              aBoxItem[_this.index].style.display = 'none';
              _this.index++;
              _this.init();

            }else{

              aBoxItem[_this.index].style.display = 'none';
              _this.index++;
              // console.log('没有答对三题');
              $('#main').css('display', 'none');
              $('#end').css('display', 'block');
              $('#succBox').css('display', 'none');
              $('#failBox').css('display', 'block');

            }

          }
  
          _this.da2 = [];

        });

      }

    },
    end : function(){

    },
    reset : function(){
      this.index = 0;
      this.len = 0;
      this.succNum = 0;
      this.flag = true;
      this.da2 = [];
      $('.succNum').html(this.succNum);
    },
    aLiClick1 : function(that, aLi2){
      var that = that;

      var oBox = document.getElementById('box');
      var aBoxItem = oBox.getElementsByTagName('div');    
      var oUl2 = aBoxItem[this.index].getElementsByTagName('ul')[1];    
      var aLi2 = oUl2.getElementsByTagName('li');

      if(this.len < aLi2.length&&that.onoff){

        that.className = 'on';

        aLi2[this.len].innerHTML = that.innerHTML;
        aLi2[this.len].num = that.num;
        aLi2[this.len].onoff = true;

        this.da2.push(that.innerHTML);

        that.onoff = false;
        this.len++;
      }
      if(this.len === aLi2.length){
        if(this.da2.toString() == da[this.index].toString()){
          $(aBoxItem[this.index]).find('.succ').show();
        }else{
          $(aBoxItem[this.index]).find('.fail').show();
        }
        $("#box-btn").show();
     
      }
    },
    aLiClick2: function(that, aLi1){
      var _this = this;
      var that = that;

      var oBox = document.getElementById('box');
      var aBoxItem = oBox.getElementsByTagName('div');
      var oUl1 = aBoxItem[this.index].getElementsByTagName('ul')[0];
      var oUl2 = aBoxItem[this.index].getElementsByTagName('ul')[1];
      var aLi1 = oUl1.getElementsByTagName('li');

      if(that.onoff){
        this.len--;
       
        var ind = $(that).index();
        this.da2.splice(ind, 1);

        that.innerHTML = '';
        aLi1[that.num].className = '';
        aLi1[that.num].onoff = true;
        that.onoff = false;
        $(oUl2).append(that);
        
        $(aBoxItem[this.index]).find('.succ').hide();
        $(aBoxItem[this.index]).find('.fail').hide();
        $("#box-btn").hide();

      }
    }
  };

  function GameStart(){
    Game.reset();
    Game.init();
    Game.start();
  }

  function loadData(){

    $.ajax({
      type: 'get',
      url: 'js/qa.json',
      dataType: 'json',
      success: function(responseText){

        getData(responseText, da, level);
          
      },
      error: function(){

      },
      complete: function(){

        GameStart();

      }
    });
  }

  function getData(responseText, da, level){
    
    document.getElementById('box').innerHTML='';
    da.length = 0;

    var data = getArrayItems(responseText,level);

    var aDiv = '';

    for(var i=0; i<data.length; i++){

      var arrQue = '', arrAns = '', aBox = '', aLi = '', aLi2 = '';
      var da2 = [];

      arrQue = data[i].que;
      arrAns = data[i].ans;

      for(var j=0; j<arrQue.length; j++){
        aLi += '<li>'+arrQue[j]+'</li>';
      }

      for(var j=0; j<arrAns.length; j++){
        da2.push(arrAns[j]);
        aLi2 += '<li></li>';
      }

      /*
        对错图标的动态位置
        135=(86+22)/40/2*100  
        --> li的宽度+li的margin值，/40转换成rem,/2取一半，*100最后再/100 JS小数点计算问题 28往右偏移位置
      */
      var mLeft = (arrAns.length*115+24)/100 + 'rem';

      da.push(da2);

      aBox += '<ul class="que">'+aLi+'</ul>';
      aBox += '<p class="tips">提示：'+ data[i].tip +'</p>';
      aBox += '<ul class="ans flex flex-ac flex-pc">'+aLi2+'</ul>';
      aBox += '<p class="succ" style="margin-left:'+mLeft+';display:none"></p>';
      aBox += '<p class="fail" style="margin-left:'+mLeft+';display:none"></p>';

      aDiv += '<div id="box-item'+i+'" class="box-item" style="display:none">'+aBox+'</div>';
    }
      
    aDiv += '<p id="box-btn" class="btns" style="display:none">下一题</p>';
    $("#box").append(aDiv);

  }

  //从一个给定的数组arr中,随机返回num个不重复项
  function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
      temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if (temp_array.length>0) {
        //在数组中产生一个随机索引
        var arrIndex = Math.floor(Math.random()*temp_array.length);
        //将此随机索引的对应的数组元素值复制出来
        return_array[i] = temp_array[arrIndex];
        //然后删掉此索引的数组元素,这时候temp_array变为新的数组
        temp_array.splice(arrIndex, 1);
      } else {
        //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
        break;
      }
    }
    return return_array;
  }

  $('#resetBtn').click(function(){
    loadData();
    $('#end').css('display', 'none');
    $('#main').css('display', 'block');
  });

});

/********加载图片 S*******/
var load = document.getElementById('loading');
var pw = parseInt( $('#pro_div .pro_bg').css('width') );
var imgSources = ['bg.png', 'bg_index.png', 'top_index.png', 'icon_book.png', 'logo.png', 'btn.png', 'top.png', 'bg_zi.png', 'succ.png', 'fail.png', 'gx.png', 'kx.png', 'split.png'];
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
      }, 500);
    }
  });
})(); /********加载图片 E*******/

function initPage01(){
  $('#startBtn').css('display', 'block');
  $('#startBtn').click(function(){
    $('#start').css('display', 'none');
    $('#main').css('display', 'block');
  });
}
