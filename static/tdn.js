;(function(window,undefined){
    var tdn=function (selector,context){
        return new tdn.prototype.init(selector,context);
    };
    if(!String.prototype.trim){
        String.prototype.trim = function(){
            var str = this;
            var res = /(^\s*)|(\s*$)/g;
            str = str.replace(res,'');
            return str;
        };
    }
    function toArray(arr1){
        var arr =[];
        for(var i=0;i<arr1.length;i++){
            arr.push(arr1[i]);
        }
        return arr;
    }
    function bindEvent(obj,evType,fn){
        if(obj.addEventListener){
            obj.addEventListener(evType,fn,false);
        }else{
            obj.attachEvent('on'+evType,function(){
                fn.call(this);
            });
        }
    }
    function unBindEvent(obj,evType,fn){
        if(obj.removeEventListener){
            obj.removeEventListener(evType,fn,false);
        }else{
            obj.detachEvent('on'+evType,function(){
                fn.call(this);
            });
        }
    }
    tdn.fn=tdn.prototype={
        constructor : tdn,
        init: function(selector,context){
            this.elements = [];
            if(typeof selector ==='string'){
                var s = selector.trim();
                switch(s.charAt(0)){
                    case '#':
                    this.elements.push(document.getElementById(s.substring(1)));
                    break;
                    case '.':
                    this.elements=getByClass(s.substring(1));
                    break;
                    default:
                    this.elements=toArray(document.getElementsByTagName(s));
                    break;
                }
            }else if(typeof selector ==="function"){
                bindEvent(window,"load",selector);
            }else if(typeof selector ==="object"){
                if(selector instanceof Array){
                    this.elements = selector;
                }else{
                    this.elements.push(selector);
                }
                
            }
            return this;
        },
        length: function(){
            return this.elements.length;
        }
        ,css: function(attr,val){
            var elem = this.elements,i=0,j,o;
            if(arguments.length===1){
                if(typeof attr === 'string'){//获取
                        attr = pfs(attr);
                      return  getStyle(elem[0],attr);
  
                }else if(attr instanceof Object){//设置（{attr:val,attr:val,...}）
                    for( j in attr){
                        o =  pfs(j);
                        if(!tdn.cssNumber[j]){attr[j]+="px"}
                        for( i=0;i<elem.length;i++){
                            elem[i].style[o]=attr[j];
                        } 
                    }
                }               
            }else if(arguments.length===2&&(typeof attr==='string')){//设置（attr,val）
                for(i=0;i<elem.length;i++){
                    attr = pfs(attr);
                    if(!tdn.cssNumber[attr]){val+="px"}
                     elem[i].style[attr]=val+"px";
                } 
            }
            return this;
        },
        html: function(val){
            var elem = this.elements;
            if(val){
                for(var i=0;i<elem.length;i++){
                    elem[i].innerHTML = val;
                }    
            }else{
              return  elem[0].innerHTML;
            }
            return this;
        },
        hide: function(){            
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                elem[i].style.display="none";
             }
            return this;
        },
        show: function(){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                elem[i].style.display="";
             }
            return this;
        },
        on: function(evType,fn){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    bindEvent(elem[i],evType,fn);
             }
            return this;
        },off: function(evType){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    unbindEvent(elem[i],evType,fn);
             }
            return this;
        }
        ,click : function(fn){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    bindEvent(elem[i],"click",fn);
             }
            return this;
        },
        mouseover : function(fn){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    bindEvent(elem[i],"mouseover",fn);
             }
            return this;
        },
        mouseout : function(fn){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    bindEvent(elem[i],"mouseout",fn);
             }
            return this;
        },
        mousemove : function(fn){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    bindEvent(elem[i],"mousemove",fn);
             }
            return this;
        },
        hover : function(fnIn,fnOut){
            var elem = this.elements;
            for(var i=0;i<elem.length;i++){
                    bindEvent(elem[i],"mousemove",fnIn);
                    bindEvent(elem[i],"mouseout",fnOut);
             }
            return this;
        },
        animation : function(opts,t){
            var elem = this.elements[0];
            move(elem,opts,t);
            return this;
        },
        attr : function(opts){
            var elem = this.elements,i=0,attr,
            v1 = arguments[0],len =arguments.length;
            if(len==1){
                if(typeof v1==="string"){
                   return elem[0].getAttribute(opts);
                }else{
                    for(;i<elem.length;i++){
                        for(attr in opts){
                            elem[i].setAttribute(attr,opts[attr]);
                        }                       
                     }                 
                }
            }else{
                elem[0].setAttribute.apply(elem[0],arguments);
            }
            return this;
        },
        eq : function(num){
            return tdn(this.elements[num]);
        },
        get : function(num){//转原生
            return this.elements[num];
        },
        index : function(){
            var elem = this.elements[0].parentNode.children;
            for(var  i=0;i<elem.length;i++){
                if(elem[i]==this.elements[0]){
                    return i;
                }
            }
        },
        siblings : function(){
            var elem,arr,len,i,str,oParent;
            arr=[];
            oParent = this.elements[0].parentNode;
            if(arguments.length===0){
                elem = oParent.children;
            }else{
                if(typeof arguments[0] ==="string"){
                    str = arguments[0];
                    switch(str.charAt(0)){
                        case "#":
                        elem =[];
                        elem.push(document.getElementById(str.substring(1)));
                        break;
                        case ".":
                        elem=getByClass(str.substring(1),oParent);
                        break;
                        default:
                        elem=toArray(oParent.getElementsByTagName(str));
                        break;
                    }
                }
            }
            len = elem.length; 
               for(i=0;i<len;i++){
                    if(elem[i]==this.elements[0]){
                        continue;
                    }
                    arr.push(elem[i]);
                }
            return tdn(arr);
            
        },
        find : function(sel){
            var arr=[],elem,len;
            if(sel.charAt(0)==="."){//.class
                elem = getByClass(sel.substring(1),this.elements[0]);              
            }else{//标签 
                 elem = toArray(this.elements[0].getElementsByTagName(sel));              
            }
            len =elem.length;
             for(i=0;i<len;i++){
                 arr.push(elem[i]);
             }
            return tdn(arr);
        },first : function(){
            var elem = this.elements[0],
            oParent = elem.parentNode,first = oParent.firstChild;
            while(first.nodeType!=1){
                first = first.nextSibling;
            }
            return tdn(first);

        },last : function(){
            var elem = this.elements[0],
            oParent = elem.parentNode,last = oParent.lastChild;
            while(last.nodeType!=1){
                last = last.previousSibling;
            }
            return tdn(last);

        },
        next : function(){//未处理最后一个节点容错
            var elem = this.elements[0],next=elem.nextSibling;
            while(next.nodeType!==1){
                elem = next;
                next = elem.nextSibling;
            }
            return tdn(next);
        },prev: function(){//未处理第一个节点容错
            var elem = this.elements[0],prev=elem.previousSibling;
            while(prev.nodeType!==1){
                elem = prev;
                prev = elem.previousSibling;
            }
            return tdn(prev);

        },parent: function(){
            var elem = this.elements[0];
            return tdn(elem.parentNode)
        },
        remove: function(){
            var elem = this.elements[0];
            if(elem){
                elem.parentNode.removeChild(elem);
            }            
            return this;
        },hasClass: function(clsName){
            var str,elem = this.elements[0],arr,res;
            str = elem.className.trim();
            res =new RegExp('(^|\\s)'+clsName.trim()+'(\\s|$)');
            return res.test(str);
        },removeClass : function(clsName){
            var str,elem = this.elements[0],arr1,arr2,res;
            res = /\s+/g;
            str = elem.className.trim();
            arr1 = str.split(res);
            arr2 = clsName.trim().split(res);
            //console.log(arr2)
            for(var i=0;i<arr1.length;i++){
                for(var j=0;j<arr2.length;j++){
                    if(arr1[i]===arr2[j]){
                      delete  arr1[i];
                    }
                }
            }
            elem.className = arr1.join(" ").trim();
            return this;
        },addClass: function(clsName){
            var str,res,elem = this.elements[0];
            if(tdn(elem).hasClass(clsName))return;
            str=clsName.trim().split(/\s+/g).join(" ");
            elem.className = (elem.className.trim()+" "+str).trim();
        }
    };

    tdn.fn.extend = tdn.prototype.extend=function(opts,nowOpts){
        if(arguments.length===1){
            for(var attr in opts){//console.log(tdn.prototype.hasOwnProperty(attr))
                    tdn.prototype[attr] =opts[attr];         
            }
        } else if(typeof arguments[1]==="object"){
            for(var attr in nowOpts){
                if(opts.hasOwnProperty(attr)){//避免指向污染原型方法
                    opts[attr] = nowOpts[attr];
                }
            }
            return opts;
        }
        
    };
    tdn.extend = function(opts,nowOpts){
        var attr,arg=arguments;
        if(arg.length===1){
            for(attr in opts){
                //if(tdn.hasOwnProperty(attr)){
                    tdn[attr] =opts[attr];
               // }               
            }
        }else  if(arg.length===2){
            for(attr in nowOpts){
                if(opts.hasOwnProperty(attr)){//避免指向污染原型方法
                   opts[attr] = nowOpts[attr];
                }
            }
            return opts;
        }
    };
    tdn.each = function(obj,callback){
        if(undefined === obj.length){
            for(var attr in object){
                if(false === callback(obj[attr],attr,obj)) break;
            }
        }
    };
    tdn.fn.extend({
        shake : function(dir,num,interval){//上下抖动
            var arr=[],i,n=0,startPos,obj=this.elements[0];
             if(obj.on)return;
                clearInterval(obj.shake);
                obj.on = true;
                startPos = parseInt(getStyle(obj,dir));
                for(i=num*2;i>0;i-=2){
                    arr.push(i,-i);
                }
                arr.push(0);
                obj.shake = setInterval(function(){
                    obj.style[dir] = startPos +arr[n]+"px";
                    n++;
                    if(n==arr.length){
                        clearInterval(obj.shake);
                        obj.on = false;
                    }
                },interval||60);
        },
        offset: function(ev){
            var obj = this.elements[0],
            getRect = obj.getBoundingClientRect(),//getBoundingClientRect()谷歌45不支持x,y
            top = document.documentElement.clientTop, // 非IE为0，IE6,7以下为2
            left = document.documentElement.clientLeft; // 非IE为0，IE6,7以下为2
            return {
                top: getRect.top+Math.max( document.documentElement.scrollTop,document.body.scrollTop )-top,
                left: getRect.left+Math.max( document.documentElement.scrollLeft,document.body.scrollLeft )-left,
                bottom: getRect.top+Math.max( document.documentElement.scrollTop,document.body.scrollTop )-top,
                right: getRect.left+Math.max( document.documentElement.scrollLeft,document.body.scrollLeft )-left
            }
        }
    });
    tdn.extend({
      cssNumber: {
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true,
        "display":true,
        "transform":true,
        "transition":true
      },
      setCookie: function(key,val,time){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+1);
        document.cookie = key+'='+escape(val)+';expires='+oDate.toGMTString();
      },
      getCookie: function(key){
        var arr = document.cookie.split(';'),
            tips;  
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split("="); 
            if(key==arr2[0].trim()){//arr2[0].trim() 去除键值名的空格
                tips=arr2[1];
                break;
            }
        }
        return tips;
      },
      removeCookie: function(key){
        setCookie(key,"",-1)
      }
    })
    tdn.prototype.init.prototype = tdn.prototype;
    window.tdn = tdn;

function getByClass(obj,oParent){
    if(document.querySelectorAll)return (oParent||document).querySelectorAll("."+obj);
    var arr=[],o = (oParent||document).getElementsByTagName("*"),res = new RegExp("(^|\\s)"+obj+"(\\s|$)");
    for(var i=0;i<o.length;i++){
        if(res.test(o[i].className)){
            arr.push(o[i]);
        }
    }
    return arr;
}
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
/*function getCSS(obj,attr,boolean){
    if(attr==="width"){
        return obj.offsetWidth
    }
}*/
var pfs = (function(){
    var style = document.documentElement.style,
      prefixes = "webkit moz o ms khtml".split(" "),
      memory = {};
      return function(prop){
        if(typeof memory[prop]==="undefined"){
            var upProp = prop.charAt(0).toUpperCase()+prop.slice(1),
            props = (prop+' '+prefixes.join(upProp+' ')+upProp).split(' ');
            memory[prop] = null;
            for(var i in props){
                if(style[props[i]]!==undefined){
                    memory[prop] = props[i];
                    break;
                }
            }
        }
        return memory[prop];
      }
})();
function css3(obj,attr,val){
    var  prefixes = 'Webkit Moz O ms Khtml'.split(' ')
    len=prefixes.length,i=0;
    try{
        for(;i<len;i++){
            obj.style[prefixes[i]+attr.charAt(0).toUpperCase()+attr.substring(1)] = val;
        }
        obj.style[prefixes[i]+attr.charAt(0).toUpperCase()+attr.substring(1)] = val;
    }catch(e){
        throw("Your Browser is not support CSS3");
    }
}
function shake(obj,dir,num,interval){//对象 方向 次数 频率
    if(obj.on)return;
    clearInterval(obj.shake)
    obj.on = true;
    var arr=[],i,n=0,startPos;
    startPos = parseInt(getStyle(obj,dir));
    for(i=num*2;i>0;i-=2){
        arr.push(i,-i)
    }
    arr.push(0);
    obj.shake = setInterval(function(){
        obj.style[dir] = startPos +arr[n]+"px";
        n++;
        if(n==arr.length){
            clearInterval(obj.shake)
            obj.on = false;
        }
    },interval||80)
}
function move(obj,opts,d,fx,callback){
    clearInterval(obj.timer)
    var start,j,i,attr;
    start = (+new Date);
    j={};
    d = d||300;
    fx = fx || "easeOut";
    for( attr in opts){
        j[attr]={};
        if (attr == 'opacity') {
            j[attr].b = parseInt(getStyle(obj, 'opacity')) * 100;
             obj.style.display = "";
        } else if(attr =="scrollTop"){
            j[attr].b = document.documentElement.scrollTop||document.body.scrollTop;
        }else {
            j[attr].b = parseInt(getStyle(obj, attr))
        }
        j[attr].c =  parseInt(opts[attr])-j[attr].b;
    }
    obj.timer = setInterval(function(){
        var now = (new Date)-start;

        if(now>=d){now=d}
        for(var attr in opts){
            
            var v = Tween[fx](now,j[attr].b,j[attr].c,d);//now/d*(j[attr].c)+j[attr].b;
            if (attr == 'opacity') {
                obj.style.opacity = parseFloat(v / 100).toFixed(2);
                obj.style.filter = 'alpha(opacity=' + v + ')';
            } else if(attr =="scrollTop"){
                document.documentElement.scrollTop=document.body.scrollTop= v;
            }else {
                obj.style[attr] = v + 'px';
            }
        }
        if(now==d){
            clearInterval(obj.timer);
            callback&&callBack.call(this);
            /*if(obj.style.opacity&&obj.style.opacity>0){
                obj.style.display="";
            }else if(obj.style.opacity&&obj.style.opacity==0){
                obj.style.display="none";
            }*/
        }
    },15)
}
var Tween = {
    linear: function(t, b, c, d) { //匀速
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) { //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function(t, b, c, d) { //加速减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158; //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}


  var browser={
    versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                 trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
    function toLink(){
        if(browser.versions.mobile==true){
            alert("goTo-----移动端");
            if(browser.versions.iPad==true){
                alert("goTo-----Ipad");
                window.location="http://www.lin10.com/";
            }else{
                alert("goTo-----手机端");  
            }
        }   
    }         

         // document.writeln("语言版本: "+browser.language+"<br/>");
         // document.writeln(" 是否为移动终端: "+browser.versions.mobile+"<br/>");
         // document.writeln(" ios终端: "+browser.versions.ios+"<br/>");
         // document.writeln(" android终端: "+browser.versions.android+"<br/>");
         // document.writeln(" 是否为iPhone: "+browser.versions.iPhone+"<br/>");
         // document.writeln(" 是否iPad: "+browser.versions.iPad+"<br/>");
         // document.writeln(navigator.userAgent); 

})(window,undefined);