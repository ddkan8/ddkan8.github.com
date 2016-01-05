window.onload = function (){
  var tab = new Tab('div1');
  tab.init(); // 初始化程序
  var tab2 = new Tab('div2');
  tab2.init(); // 初始化程序
  tab2.autoPlay();
};

function Tab(id){
  this.oParent = document.getElementById(id);
  this.aInput = this.oParent.getElementsByTagName('input');
  this.aDiv = this.oParent.getElementsByTagName('div');
  this.iNum = 0;
  this.timer = null;
  this.flag = false;

  this.init;
}

Tab.prototype = {
  init : function (){
    var _this = this;

    for (var i=0; i<this.aInput.length; i++){
      this.aInput[i].index = i;
      this.aInput[i].onclick = function (){
        _this.iNum = this.index;
        _this.change(this);
      };
    }

    this.oParent.onmouseover = function (){
      _this.stop();
    };

    this.oParent.onmouseout = function (){
      if (_this.flag) {
        _this.autoPlay();
      }
    };
  },
  change : function (obj){
    for (var i=0; i<this.aInput.length; i++){
      this.aInput[i].className = '';
      this.aDiv[i].style.display = 'none';
    }
    obj.className = 'active';
    this.aDiv[this.iNum].style.display = 'block';
  },
  autoPlay : function (){
    var _this = this;
    this.flag = true;

    if (this.flag){
      this.timer = setInterval(function (){
        if (_this.iNum == _this.aInput.length - 1){
          _this.iNum = 0;
        }else{
          _this.iNum++;
        }
        _this.change(_this.aInput[_this.iNum]);
      }, 2000);
    }
  },
  stop : function (){
    clearInterval(this.timer);
  }
};