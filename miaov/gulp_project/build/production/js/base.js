$(function(){!function(){function e(){n.offsetLeft<-n.offsetWidth/2&&(n.style.left=0),n.offsetLeft>0&&(n.style.left=-n.offsetWidth/2+"px"),n.style.left=n.offsetLeft+i+"px"}var t=document.getElementById("scroll_cont"),n=t.getElementsByTagName("ul")[0],l=n.getElementsByTagName("li"),o=document.getElementById("btn_prev2"),f=document.getElementById("btn_next2"),i=-10;n.innerHTML+=n.innerHTML,n.style.width=(l[0].offsetWidth+12)*l.length+"px",t.timer=setInterval(e,150),t.onmouseover=function(){clearInterval(t.timer)},t.onmouseout=function(){t.timer=setInterval(e,150)},o.onclick=function(){clearInterval(t.timer),i=-10,t.timer=setInterval(e,150)},f.onclick=function(){clearInterval(t.timer),i=10,t.timer=setInterval(e,150)}}()});