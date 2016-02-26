$(function(){
  var winH =$(window).height();
  if(winH<480){
    $('body').addClass('low');
  }
  $(".container").css("height",winH);
  var mySwiper = new Swiper('.swiper-container',{
    mode : 'vertical',
    speed : 300,
    loop: false,
    mousewheelControl:true,
    keyboardControl:true,
    onSlideChangeEnd:function(obj){
      mySwiper.enableMousewheelControl();
      mySwiper.enableKeyboardControl();
    }
  });
  $(".swiper-container").show();
  var start = document.getElementById('start');
  start.addEventListener('click',function(e){
    mySwiper.swipeNext();
    e.preventDefault();
  },false);

});