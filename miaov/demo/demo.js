window.onload = function (){
  var oDiv = document.getElementById('div1');
  var aInput = oDiv.getElementsByTagName('input');
  var aDiv = oDiv.getElementsByTagName('div');
  var iNum = 0;

  for (var i=0; i<aInput.length; i++){
    aInput[i].index = i;
    aInput[i].onclick = function (){
      for (var i=0; i<aInput.length; i++){
        aInput[i].className = '';
        aDiv[i].style.display = 'none';
      }
      this.className = 'active';
      aDiv[this.index].style.display = 'block';
    };
  }
};

