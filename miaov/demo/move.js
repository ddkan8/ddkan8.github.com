// 运动函数
function startMove(obj, json, fn){

  clearInterval(obj.iTimer);

  var iCur = 0;
  var iSpeed = 0;

  obj.iTimer = setInterval(function (){

    var iBtn = true;

    for (var attr in json){

      var iTarget = json[attr];

      if (attr == 'opacity'){
        iCur = Math.round(getStyle(obj, 'opacity') * 100);
      }else{
        iCur = parseInt(getStyle(obj, attr));
      }

      iSpeed = (iTarget - iCur) / 8;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

      if (iCur != iTarget){
        iBtn = false;
        if (attr == 'opacity'){
          obj.style.opacity = (iCur + iSpeed) / 100;
          obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
        }else{
          obj.style[attr] = iCur + iSpeed + 'px';
        }
      }

      if (iBtn){
        clearInterval(obj.iTimer);
        fn && fn.call(obj);
      }

    }

  }, 30);

}

// 抖动函数
function shake(obj, attr, fn){

  if (obj.onOff){return;} // 自定义属性onOff，默认为未定义undefind，为flase，如果为true，跳出函数
  obj.onOff = true;

  var pos = parseInt(getStyle(obj, attr)); // 有隐患，通过上面方法解决

  var arr = []; // 20, -20, 18, -18 ... 0
  var num = 0;

  for (var i=20; i=0; i-=2){
    arr.push(i, -i);
  }
  arr.push(0);

  clearInterval(obj.shake);
  obj.shake = setInterval(function (){

    obj.style[attr] = pos + arr[num] + 'px';
    num++;

    if (num === arr.length){

      clearInterval(obj.shake);
      fn && fn.call(obj);
      // obj.onOff = false; // 链式运动时，回调函数无效，可在每个shake(obj, attr, fn)函数的回调函数fn里加上这句

    }

  }, 50);

}

// 获取真实样式
function getStyle(obj, attr){
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}