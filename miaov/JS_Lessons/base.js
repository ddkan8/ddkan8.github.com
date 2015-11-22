/**
 * ��ȡԪ�ص���ʵ����ֵ
 * obj Ҫ��ȡ��Ԫ������
 * attr Ҫ��ȡ����������
 * return ����ֵ
 */
function getStyle(obj, attr){
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/**
 * ��ȡԪ�ؾ���ߺ��ϱߵľ���
 * obj Ҫ��ȡ��Ԫ������
 * return json���� getPos(obj).left getPos(obj).top
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
 * ģ���ַ�������indexOf()����ȡĳ��ֵ�������е�����λ��
 * arr Ҫ�жϵ�����
 * v Ҫ�жϵ�ĳ��ֵ
 * return ĳ��ֵ�������е�����λ��i��û��Ϊ-1
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
 * ��ȡָ��������Ԫ�ؼ���
 * parent Ҫ��ȡָ�������ĸ�Ԫ��
 * tagName Ҫ��ȡ��Ԫ���µ�ָ��Ԫ��
 * className Ҫ��ȡ��������
 * return ָ����Ԫ���µ�ָ����Ԫ�ز�����ָ�������Ƶļ���
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
 * ��������
 * obj Ҫ����������Ԫ��
 * className Ҫ���ӵ�������
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
 * �Ƴ�����
 * obj Ҫ�Ƴ�������Ԫ��
 * className Ҫ�Ƴ���������
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