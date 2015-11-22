/**
 * 获取元素的真实属性值
 * obj 要获取的元素名称
 * attr 要获取的属性名称
 * return 属性值
 */
function getStyle(obj, attr){
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/**
 * 获取元素距左边和上边的距离
 * obj 要获取的元素名称
 * return json集合 getPos(obj).left getPos(obj).top
 */
function getPos(obj){
  var pos = {left : 0, top : 0};
  while(obj){
    pos.left += obj.offsetLeft;
    pos.top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return pos;
}

/**
 * 模拟字符串函数indexOf()，获取某个值在数组中的索引位置
 * arr 要判断的数组
 * v 要判断的某个值
 * return 某个值在数组中的索引位置i，没有为-1
 */
function arrIndexOf(arr, v){
  for(var i=0; i<arr.length; i++){
    if(arr[i] == v){
      return i;
    }
  }
  return -1;
}

/**
 * 获取指定类名的元素集合
 * parent 要获取指定类名的父元素
 * tagName 要获取父元素下的指定元素
 * className 要获取的类名称
 * return 指定父元素下的指定子元素并含有指定类名称的集合
 */
function getClass(parent, tagName, className){
  var aEls = parent.getElementsByTagName(tagName),
      arr = [];
  for(var i=0; i<aEls.length; i++){
    var arrClassName = aEls[i].className.split(' ');
    var _index = arrIndexOf(arrClassName, className);
    if(_index != -1){
      arr.push(aEls[i]);
    }
  }
  return arr;
}

/**
 * 添加类名
 * obj 要添加类名的元素
 * className 要添加的类名称
 */
function addClass(obj, className){
  if(!obj.className){
    obj.className = className;
  }else{
    var arrClassName = obj.className.split(' ');
    var _index = arrIndexOf(arrClassName, className);
    if(_index == -1){
      obj.className += ' ' + className;
    }
  }
}

/**
 * 移除类名
 * obj 要移除类名的元素
 * className 要移除的类名称
 */
function removeClass(obj, className){
  if(obj.className){
    var arrClassName = obj.className.split(' ');
    var _index = arrIndexOf(arrClassName, className);
    if(_index != -1){
      obj.className = arrClassName.splice(_index, 1).join(' ');
    }
  }
}
