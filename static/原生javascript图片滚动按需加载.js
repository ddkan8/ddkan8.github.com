/*
 * 图片滚动按需加载：在某个区域的图片（自定义的范围，一般是首屏以下的区域），拉动滚动，图片出现在可视范围才开始加载，目的是减少请求，减耗宽带，提高首屏的呈现速度，让用户第一时间看到网页内容，留下美好的第一印象。

讲解：
（一）需要按需加载的img标签，图片的真实地址保存到自定义的属性里，如'data-src'，那么src属性用一张1像素透明的图片
（二）把某范围内的img标签元素保存到数组里面
（三）定义一个方法：遍历数组元素，然后判断某元素的offsetTop是否在滚动的可视范围，如果在，交换图片的属性（'data-src','src'），然后删除这个元素，那么在下次遍历就不存在
（四）给window对象，scroll与resize 添加此事件
（五）用户有可能快速拉滚动条，这样会导致事件的频繁触发，所以需要添加个setTimeout
 */
function LazyScroll(opt){
    this.init(opt);
}
LazyScroll.prototype = {
    init:function(opt){
        this.setOptions(opt);
        this.load();
        this.fnLoad = this.bind(this,this.load);
        this.addHandler(window,'scroll',this.fnLoad);
        this.addHandler(window,'resize',this.fnLoad);
    },
    setOptions:function(opt){
        this.holderSrc = opt.holderSrc  'data-src';
        this.wrapId = opt.wrapId;
        this.imgList = [];
        this.timer = null;
        var targets = null;
        if (document.querySelectorAll) {
            targets = document.querySelectorAll("#" + this.wrapId + " img")
        } else {
            targets = document.getElementById(this.wrapId).getElementsByTagName("img")
        }
        var n = 0,
            len = targets.length;
        // 把元素存到数组里
        for(;n<len;n++){
            if(targets[n].getAttribute(this.holderSrc)){
                this.imgList.push(targets[n]);
            }
        }
    },
    load:function(){
        // 全部加装，解除事件
        if(this.imgList.length == 0){
            this.removeHandler(window,'scroll',this.fnLoad);
            this.removeHandler(window,'resize',this.fnLoad);
            return
        }
        var st = document.body.scrollTop  document.documentElement.scrollTop,
            clientH = document.documentElement.clientHeight,
            scrollArea = st + clientH;
        for(var n=0;n<this.imgList.length;n++){
            var offsetTop = this.imgList[n].getBoundingClientRect().top+st,
                imgH = this.imgList[n].clientHeight;
            if( scrollArea>(offsetTop-200)&&(imgH+offsetTop)>st ){
                var _src = this.imgList[n].getAttribute(this.holderSrc);
                this.imgList[n].setAttribute('src',_src);                
                this.imgList.splice(n,1);//删除已经加载完的元素
                n--;
            }
        }

    },
    bind:function(obj,fn){
        var _this = this;
        return function(){
            if(_this.timer) clearTimeout(_this.timer);
            _this.timer = setTimeout(function(){
                fn.apply(obj,arguments);
            },300);
            
        }
    },
    addHandler:function(node,type,fn){
        if(node.addEventListener){
            node.addEventListener(type,fn,false);  
        }
        else{
            node.attachEvent('on'+type,function(){
                fn.apply(node,arguments); 
            });
        }
    },
    removeHandler: function(node, type, fn) {
        if (node.addEventListener) {
            node.removeEventListener(type, fn, false);
        } else {
            node.detachEvent("on" + type, fn);
        }
    }
}

// html代码
// <body id="body">
//     <img src="xxxx" width="990" height="90" data-src="http://dummyimage.com/990x90//fff" alt="">
//     <img src="xxxx" width="990" height="90" data-src="http://dummyimage.com/990x90/f60/fff" alt="">
//     <img src="xxxx" width="990" height="90" data-src="http://dummyimage.com/990x90/259/fff" alt="">
//     <img src="xxxx" width="990" height="90" data-src="http://dummyimage.com/990x90//fff" alt="">
//     <img src="xxxx" width="990" height="90" data-src="http://dummyimage.com/990x90/4D3434/fff" alt="">
//     <img src="xxxx" width="990" height="90" data-src="http://dummyimage.com/990x90/344D3C/fff" alt="">
//     <script type="text/javascript" src="scrollLazy.js"></script>
//     <script type="text/javascript">
//         new LazyScroll({'wrapId':'body'});
//     </script>
// </body>
