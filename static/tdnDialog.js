;(function(window){
    window.DIALOG_NUM = 0;
    window.DIALOG_ZINDEX = 2015;
    var doc = document.documentElement||document.body;
    var view = {
        w: doc.clientWidth,
        h: doc.clientHeight
    };
    Array.prototype.remove = function(arg,onOff){//onOff存在返回被删除元素？那么arg 有啥用？
        var self = this,len = this.length,i = 0,arr=[];
        if(onOff){
            for(i=0;i<len;i++){
                if(arg == this[i]){
                    arr.push(this.splice(i,1)[0]);
                    break;
                }
            }
            return arr;
        }
        for(i=0;i<len;i++){
            if(arg == this[i]){
                this.splice(i,1);
            }
        }
        return this;
        
    }
    function dialog(opts){
        return new dialog.prototype.init(opts);
    }
    dialog.Arr=[];
    dialog.close= function(){
        var last = dialog.Arr[dialog.Arr.length-1];
        console.log(last,last.HideID)
        if( !dialog.Arr.length)return;
        var obj = dialog.Arr.remove(last,1)[0];
            document.body.removeChild(obj);
            console.log(dialog.Arr)
    }
    dialog.prototype=dialog.fn={
        constructor: dialog,
        init: function(opts){
            this.setting(opts);
            this.createDialog();
            this.createBtn();
            this.setDialog();
            this.show();
            if(this.options.type==="dialog"){

            }
            switch (this.options.type){
                case "dialog":
                 this.createResize();
                break;
                case "alert":
                 this.alert();
                break;
                case "confirm":
                 this.confirm();
                break;
            }
            this.dragEvent();
            this.addEvent();
            dialog.Arr.push(this.Dialog);
            console.log(dialog.Arr);

            DIALOG_ZINDEX++;
            this.options.moreWin&&DIALOG_NUM++;
        },
        show: function(){
            var self =this;
            tdn(this.Outer).css({transform:"translateY(0px) translateZ(0px) scale(1) rotateX(0deg)",opacity: 1})
            bindEvent(this.Outer,"webkitTransitionEnd",function(){
                 tdn(self.Outer).css({transform:"",transition:""});
                 //tdn(self.Dialog).css({transition:""})
            })
            bindEvent(this.Outer,"mozTransitionEnd",function(){
                 tdn(self.Outer).css({transform:"",transition:""});
                 //tdn(self.Dialog).css({transition:""})
            })
            bindEvent(this.Outer,"transitionend",function(){
                 tdn(self.Outer).css({transform:"",transition:""});
                 //tdn(self.Dialog).css({transition:""})
            })
        },
        setting: function(opts){
            var self = this;
             //tdn("body").addClass("tdn_100"); 
             this.NUM = DIALOG_NUM;
            this.options={
                type: "dialog",// "alert" "confirm" 弹出框类型
                id:true,//窗口ID,可省略
                title: "",//弹出框标题
                width: 500,//窗口宽度
                height: 325,//窗口高度
                canDrag: true,//是否可 拖拽
                canResize: true,//是否能 调整大小
                position: "center",//弹出框位置 如果是json:{left:20,top:20}对象按json来调整位置 "left right bottom"
                yes: null,//点击确认后调用的方法
                no: null,//点击取消后 调用的方法
                showBtn: true,//按钮是否可视
                autoClose: false,//是否自动关闭值为数值型，默认为false;
                moreWin: true, //是否开启多窗口模式     
                URL: null,//窗口内容页地址 
                InnerHTML:null,//    窗口内容为HTML代码
                HideID:null,//窗口内容为隐藏的id内容
                showMask: false,//是否显示遮罩层
                content:"是否确定为？？？",
                close:null//关闭后调用的函数
            }
            tdn.extend(self.options,opts);
            if(this.options.type!="dialog"){
                this.options.width = 368;
                this.options.height = 215;
            }
            //console.log(this.options)
        },
        createDialog: function(){
            this.Dialog = document.createElement("div");
            this.options.id&&(this.Dialog.id = "tdnDialog_"+DIALOG_NUM);
            this.Dialog.className = "tdnDialog";
            this.Dialog.style.zIndex = parseInt(DIALOG_ZINDEX)+1;
            tdn(self.Dialog).css({transition:"all 0.8s ease"})
            /*if(this.Dialog.once)return;
            this.Dialog.once = true;*/
            document.body.appendChild(this.Dialog);

            this.Outer = document.createElement("div");
            this.options.id&&(this.Outer.id="dialog_outer_"+DIALOG_NUM);
            this.Outer.className = "dialog_outer";
            tdn(this.Outer).css({transform:"translateY(90px) translateZ(-320px) scale(0.1) rotateX(135deg)",transition:"all 1s cubic-bezier(0.4, -1.01, 0, 0.96)",opacity: 0})
            this.Dialog.appendChild(this.Outer);

            this.Inner = document.createElement("div");
            this.options.id&&(this.Inner.id="dialog_inner_"+DIALOG_NUM);
            this.Inner.className = "dialog_inner";
            this.Outer.appendChild(this.Inner);

            this.Title = document.createElement("div");
            this.options.id&&(this.Title.id="dialog_title_"+DIALOG_NUM);
            this.Title.className="dialog_title";
            if(this.options.type!=="dialog"){
                this.Title.appendChild(document.createTextNode("Javascript提示框"));
            }else{
                this.Title.appendChild(document.createTextNode(this.options.title));
            }          
            this.Inner.appendChild(this.Title);

            this.Body = document.createElement("div");
            this.Body.id = "dialog_body_"+DIALOG_NUM;
            this.Body.style.height = this.options.height-46+"px";
            this.Inner.appendChild(this.Body);

            this.createMask();
            (this.options.type=="dialog")&&this.createBody();
        },
        alertBox: function(){
            //tdn(this.Dialog).css({width:"368",height:"215"});
            this.Body.style.padding="25px 30px 15px ";
            this.Body.style.height="130px";
            this.Content = document.createElement("div");
            this.Content.innerHTML=this.options.content;
            this.Content.className ="alertMain";
            this.Content.style.cssText="height:90px;overflow-y:auto;overflow-x:hidden;";
            this.Body.appendChild(this.Content);
            this.sure = document.createElement("div");
            this.sure.innerHTML ="确定";
            this.sure.className="alertSure";
            this.Body.appendChild(this.sure);
        },
        alert:function(){
            var self =this;
            this.alertBox();
            bindEvent(this.sure,"click",function(){
                self.closeDialog();
            })
        },
        confirm: function(){
            var self =this;
            this.alertBox();
            this.cancel = document.createElement("div");
            this.cancel.innerHTML ="取消";
            this.cancel.className="alertCancel";
            this.Body.appendChild(this.cancel);
            bindEvent(this.sure,"click",function(){             
                self.options.yes&&self.options.yes()
                self.closeDialog();
                return true;
            });
            bindEvent(this.cancel,"click",function(){
                self.closeDialog();
                self.options.no&&self.options.no()
                return false;
            });
        },
        createBody: function(){
            if( this.options.InnerHTML){
                this.Body.innerHTML = this.options.InnerHTML;
            }else if(this.options.URL){
                this.Body.innerHTML =  '<iframe width="100%" height="100%" frameborder="0" style="border:none;" allowtransparency="true" id="DialogFrame_' +this.NUM  + '" src="' + this.options.URL + '"></iframe>'
            }else if(this.options.HideID){
                //console.log(this.options.HideID,document.getElementById(this.options.HideID));
               this.HideNode = document.getElementById(this.options.HideID);
               this.Body.appendChild(this.HideNode)
               this.HideNode.style.display = "block";
               this.Dialog.style.zIndex -=2;
            }
        },
        createBtn: function(){
            this.Btn = document.createElement("div");
            this.closeBtn = document.createElement("span");
            this.maxBtn = document.createElement("span");
            this.initBtn = document.createElement("span");
            this.minBtn = document.createElement("span");
            if(!this.options.showBtn)return;
            this.Btn.className = "dialog_btn";
            this.Btn.id = "dialog_btn_"+DIALOG_NUM;
            this.Inner.appendChild(this.Btn);

            this.closeBtn.className = "closeWin";
            this.Btn.appendChild(this.closeBtn);
            if(this.options.type!=="dialog")return;
            this.maxBtn.className = "maxWin";
            this.Btn.appendChild(this.maxBtn);
            this.initBtn.className = "initWin";
            this.Btn.appendChild(this.initBtn);
            this.minBtn.className = "minWin";
            this.Btn.appendChild(this.minBtn);
            
        },
        setDialog: function(){
                this.Dialog.style.width = this.options.width+"px";
                this.Dialog.style.height = this.options.height+"px";

                this.Outer.style.width = this.options.width-10+"px";
                this.Outer.style.height = this.options.height-10+"px";        

            this.setPos(this.options.position);
        },
        setPos: function(strorjson){
            if(typeof strorjson==="string"){
                if(strorjson ==="center"){
                    this.Dialog.style.top = (view.h-this.Dialog.offsetHeight)/2+"px";
                    this.Dialog.style.left = (view.w-this.Dialog.offsetWidth)/2+"px";
                }else if(strorjson ==="left"){
                    this.Dialog.style.top = (view.h-this.Dialog.offsetHeight)/2+"px";
                    this.Dialog.style.left = "0px";
                }else if(strorjson ==="right"){
                    this.Dialog.style.top = (view.h-this.Dialog.offsetHeight)/2+"px";
                    this.Dialog.style.left = (view.w-this.Dialog.offsetWidth)+"px";
                }else if(strorjson ==="top"){
                    this.Dialog.style.top = "0px";
                    this.Dialog.style.left = (view.w-this.Dialog.offsetWidth)/2+"px";
                }else if(strorjson ==="bottom"){
                    this.Dialog.style.top = (view.h-this.Dialog.offsetHeight)+"px";
                    this.Dialog.style.left = (view.w-this.Dialog.offsetWidth)+"px";
                }
            }else if(typeof strorjson==="object"){
                this.Dialog.style.top = parseFloat(this.options.position.top)+"px";
                this.Dialog.style.left = parseFloat(this.options.position.left)+"px";
            }
        },
        createResize: function(){
            if(!this.options.canResize)return;
            this.leftBar = document.createElement("div");
            this.leftBar.className= "dialog_left";         
            this.Outer.appendChild(this.leftBar);

            this.topBar = document.createElement("div");
            this.topBar.className= "dialog_top";
            this.Outer.appendChild(this.topBar);

            this.rightBar = document.createElement("div");
            this.rightBar.className= "dialog_right"; 
            this.Outer.appendChild( this.rightBar);
            
            this.botBar = document.createElement("div");
            this.botBar.className= "dialog_bot";
            this.Outer.appendChild( this.botBar);
            
            this.ltBar = document.createElement("div");
            this.ltBar.className= "dialog_lt";
            this.Outer.appendChild( this.ltBar);
            
            this.lbBar = document.createElement("div");
            this.lbBar.className= "dialog_lb";
            this.Outer.appendChild( this.lbBar);
            
            this.rtBar = document.createElement("div");
            this.rtBar.className= "dialog_rt";
            this.Outer.appendChild( this.rtBar);
            
            this.rbBar = document.createElement("div");
            this.rbBar.className= "dialog_rb";
            this.Outer.appendChild( this.rbBar);

            this.leftBar.style.cssText="position:absolute;overflow: hidden;cursor: w-resize;z-index: 1;left: 0px; top: 0px;width: 5px;height: 100%;background:transparent;";
            this.topBar.style.cssText="position:absolute;overflow: hidden;cursor: s-resize;z-index: 1;left: 0px; top: 0px;width: 100%;height: 5px;background:transparent;";
            this.rightBar.style.cssText="position:absolute;overflow: hidden;cursor: w-resize;z-index: 1;right: 0px; top: 0px;width: 5px;height: 100%;background:transparent;";
            this.botBar.style.cssText="position:absolute;overflow: hidden;cursor: s-resize;z-index: 1;bottom: 0px; left: 0px;width: 100%;height: 5px;background:transparent;";
            this.ltBar.style.cssText="position:absolute;overflow: hidden;cursor: nw-resize;z-index: 1;left: 0px; top: 0px;width: 5px;height: 5px;background:transparent;";
            this.rbBar.style.cssText="position:absolute;overflow: hidden;cursor: nw-resize;z-index: 1;right: 0px; bottom: 0px;width: 5px;height: 5px;background:transparent;";
            this.lbBar.style.cssText="position:absolute;overflow: hidden;cursor: sw-resize;z-index: 1;left: 0px; bottom:0px;width: 5px;height: 5px;background:transparent;";
            this.rtBar.style.cssText="position:absolute;overflow: hidden;cursor: sw-resize;z-index: 1;right: 0px; top: 0px;width: 5px;height: 5px;background:transparent;";
        },
        resizeNone: function(){
            this.leftBar.style.display = 
            this.topBar.style.display = 
            this.rightBar.style.display = 
            this.botBar.style.display = 
            this.ltBar.style.display = 
            this.rbBar.style.display = 
            this.lbBar.style.display = 
            this.rtBar.style.display ="none";
        },
        resizeBlock: function(){
            this.leftBar.style.display = 
            this.topBar.style.display = 
            this.rightBar.style.display = 
            this.botBar.style.display = 
            this.ltBar.style.display = 
            this.rbBar.style.display = 
            this.lbBar.style.display = 
            this.rtBar.style.display ="block";
        },
        createMask: function(){
            if(this.options.showMask){
                if($id("tdn_mask")){
                    this.Mask = $id("tdn_mask");
                    this.Mask.style.display = "block";
                    this.Mask.style.zIndex = DIALOG_ZINDEX+1;
                    //document.body.insertBefore(this.Mask,this.Dialog);
                    //console.log(tdn(".tdnDialog").length)
                }else{
                     this.Mask = document.createElement("div");
                     this.Mask.id = "tdn_mask";
                     this.Mask.className = "tdn_mask";
                     tdn(this.Mask).css({
                       "display": "block",
                        "width": view.w,
                        "height":view.h
                     })
                    document.body.insertBefore(this.Mask,this.Dialog);
                }
               
            }
        },
        zIndexEvent: function(){
            var self = this
            bindEvent( this.Dialog,"click",function(){
                 self.Dialog.style.zIndex = DIALOG_ZINDEX;
                DIALOG_ZINDEX++;
            })
        },
        dragEvent: function(){
            if(!this.options.canDrag)return;
            var obj,startX,startY,nowX,nowY,left,top,
            obj = this.Title,
            self = this;
            tdn(obj).on('mousedown',function(ev){
                var ev = ev || window.event;
                startX = ev.clientX;
                startY = ev.clientY;
                left = tdn(self.Dialog).offset().left;
                top = tdn(self.Dialog).offset().top;
                obj.setCapture&&obj.setCapture();
                obj.style.cursor="move";
                function dragMove(ev){
                    var ev = ev || window.event;
                    ev.preventDefault&&ev.preventDefault();
                    nowX = ev.clientX;
                    nowY = ev.clientY;
                    tdn(self.Dialog).css({
                        left: self.limitSize(nowX - startX+left,view.w-self.Dialog.offsetWidth,0),
                        top: self.limitSize(nowY - startY+top,view.h-self.Dialog.offsetHeight,0)
                    })
                    return false;
                }
                function dragUp(ev){
                     obj.releaseCapture&&obj.releaseCapture();
                     unBind(document,"mousemove",dragMove);
                     unBind(document,"mouseup",dragUp);
                      obj.style.cursor="";
                    return false;
                }
                bindEvent(document,"mousemove",dragMove);
                bindEvent(document,"mouseup",dragUp);
                return false;
            })

        },
        addEvent: function(){
            var self = this;
            this.closeBtn.onclick=function(){self.closeDialog()};
            if(this.options.type!="dialog")return;
            this.zIndexEvent();
            this.initDialog(this.options.position);
            this.maxDailog();
            this.minDialog();
            if(!this.options.canResize)return;
            this.setWidth();
            this.setHeight();
            this.setWidth2();
            this.setHeight2();
            this.rbwh();
            this.rtwh();
            this.ltwh();
            this.lbwh();
        },
        limitSize: function(val,max,min){
            if(val>max){
                return max;
            }else if(val<min){
                return min
            }
            return val;
        },
        closeDialog: function(){
            var self = this;
            //console.log( dialog.Arr.remove(self.Dialog,1) );
            /*var obj = dialog.Arr.remove(self.Dialog,1)[0];
            console.log(obj)
            document.body.removeChild(obj)*/
            //console.log( dialog.Arr.remove(self.Dialog) );
            (self.options.type==="dialog")&&self.options.canResize&&self.resizeNone();
            document.body.removeChild(self.Dialog);                
            self.options.showMask&&(self.Mask.style.zIndex -=1);    

            if(tdn(".tdnDialog").length()<1){    
                 self.options.showMask&&(self.Mask.style.display="none");
                tdn("body").removeClass("tdn_100");    
            }

            if(self.options.type=="dialog"&&self.options.HideID){
                self.HideNode.style.display = "none";
                document.body.appendChild(self.HideNode);
            }
            self.options.close&&self.options.close()
            
        },
        initDialog: function(strorjson){
            var self = this;
            this.initBtn.onclick = function(){
                self.options.canResize&&self.resizeBlock();
                 self.initBtn.style.display = "none";
                 self.maxBtn.style.display = "block";
                 self.minBtn.style.display = "block";
                if (typeof strorjson === "string") {
                    if (strorjson === "center") {
                        tdn(self.Dialog).css({
                            top: (view.h - self.options.height) / 2,
                            left: (view.w - self.options.width) / 2,
                            width: self.options.width,
                            height: self.options.height
                        });
                    } else if (strorjson === "left") {
                        tdn(self.Dialog).css({
                            top: (view.h - self.options.height) / 2,
                            left: 0,
                            width: self.options.width,
                            height: self.options.height
                        });
                    } else if (strorjson === "right") {
                        tdn(self.Dialog).css({
                            top: (view.h - self.options.height) / 2,
                            left: (view.w - self.options.width),
                            width: self.options.width,
                            height: self.options.height
                        });
                    } else if (strorjson === "top") {
                        tdn(self.Dialog).css({
                            top: 0,
                            left: (view.w - self.options.width) / 2,
                            width: self.options.width,
                            height: self.options.height
                        });
                    } else if (strorjson === "bottom") {;
                        tdn(self.Dialog).css({
                            top: (view.h - self.options.height),
                            left: (view.w - self.options.width),
                            width: self.options.width,
                            height: self.options.height
                        });
                    }
                } else if (typeof strorjson === "object") {
                    tdn(self.Dialog).css({
                        top: parseFloat(self.options.position.top),
                        left: parseFloat(self.options.position.left),
                        width: self.options.width,
                        height: self.options.height
                    });
                }
                tdn(self.Outer).css({width:self.options.width-10,height:self.options.height-10});
                self.Body.style.height = self.options.height-46+"px";
            }
        },
        maxDailog: function(){
            var self = this;
            self.maxBtn.onclick=function(){
                self.options.canResize&&self.resizeNone();
                self.minBtn.style.display="block";
                self.initBtn.style.display = "block";
                 self.maxBtn.style.display = "none";
                self.Body.style.height = view.h-46+"px";
                tdn(self.Dialog).css({
                    width: view.w,
                    height: view.h,
                    left:0,
                    top:0
                 })
                 tdn(self.Outer).css({
                    width: view.w-10,
                    height: view.h-10
                 })
            }
             
        },
        minDialog: function(){
            var self = this;
            self.minBtn.onclick=function(){
                self.options.canResize&&self.resizeNone();
                self.minBtn.style.display="none";
                self.initBtn.style.display = "block";
                self.maxBtn.style.display = "block";
                tdn(self.Dialog).animation({
                    width: 140,
                    height: 30,
                    top:view.h-40,
                    left:80*self.NUM
                 })
                tdn(self.Outer).animation({
                    width: 140,
                    height:30
                 })
            }
            
        },
        setWidth:function(){
            var self = this,
            nowX,nowY,oldX,oldY,w1,w2,l1,l2;
            bindEvent(this.leftBar,"mousedown",md)
            function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                w1 = self.Dialog.offsetWidth;
                l1 = tdn(self.Dialog).offset().left;
                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;

                if(nowX<=0){
                    nowX=0
                }
                if(nowX>oldX){
                    w2 = w1-Math.abs(nowX-oldX);
                }else{
                    w2 = Math.abs(nowX-oldX)+w1;
                }
                
                if(w2<=200){
                    w2 =200;
                    nowX = w1-200+oldX;
                }
                l2 = l1 - Math.abs(nowX-oldX);
                tdn(self.Dialog).css({left:nowX,width:w2});
                tdn(self.Outer).css({width:w2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        setWidth2:function(){
            var self = this,
            nowX,nowY,oldX,oldY,w1,w2,l1,l2;
            bindEvent(this.rightBar,"mousedown",md)
            function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                w1 = self.Dialog.offsetWidth;
                l1 = tdn(self.Dialog).offset().left;
                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;

                if(nowX<oldX){
                    w2 = w1-Math.abs(nowX-oldX);
                }else{
                    w2 = Math.abs(nowX-oldX)+w1;
                }
                if(nowX>=view.w){
                    nowX=view.w;
                    w2 = view.w-l1;
                }
                if(w2<=200){
                    w2 =200;
                    nowX = w1-200+oldX;
                }

                l2 = l1 - Math.abs(nowX-oldX);
                tdn(self.Dialog).css({width:w2});
                tdn(self.Outer).css({width:w2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        setHeight: function(){
            var self = this,
            nowX,nowY,oldX,oldY,h1,h2,t1,t2;
            bindEvent(this.topBar,"mousedown",md)
            function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                h1 = self.Dialog.offsetHeight;
                t1 = tdn(self.Dialog).offset().top;
                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;
                if(nowY>oldY){
                    h2 = h1-Math.abs(nowY-oldY);
                }else if(nowY>0){
                    h2 = Math.abs(nowY-oldY)+h1;
                }
                if(nowY<=0){
                    nowY=0;
                }
                if(h2<=200){
                    h2 =200;
                    nowY = h1-200+oldY;
                }

                t2 = t1 - Math.abs(nowY- oldY);
                tdn(self.Dialog).css({top:nowY,height:h2});
                tdn(self.Outer).css({height:h2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        setHeight2: function(){
            var self = this,
            nowX,nowY,oldX,oldY,h1,h2,t1,t2;
            bindEvent(this.botBar,"mousedown",md)
            function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                h1 = self.Dialog.offsetHeight;
                t1 = tdn(self.Dialog).offset().top;
                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;
                if(nowY<oldY){
                    h2 = h1-Math.abs(nowY-oldY);
                }else{
                    h2 = Math.abs(nowY-oldY)+h1;
                }
                if(nowY>view.h){
                    nowY=view.h;
                    h2 = view.h - t1;
                }
                if(h2<=200){
                    h2 =200;
                    nowY = h1-200+oldY;
                }

                t2 = t1 - Math.abs(nowY- oldY);
                tdn(self.Dialog).css({height:h2});
                tdn(self.Outer).css({height:h2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        rbwh: function(){
            var self = this,
            nowX,nowY,oldX,oldY,h1,h2,t1,t2,w1,w2,l1,l2;
            bindEvent(this.rbBar,"mousedown",md)
             function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                h1 = self.Dialog.offsetHeight;              
                w1 = self.Dialog.offsetWidth;
                t1 = tdn(self.Dialog).offset().top;
                l1 = tdn(self.Dialog).offset().left;

                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;
                if(nowY<oldY){
                    h2 = h1-Math.abs(nowY-oldY);
                }else{
                    h2 = Math.abs(nowY-oldY)+h1;
                }
                if(nowY>view.h){
                    nowY=view.h;
                    h2 = view.h - t1;
                }
                if(h2<=200){
                    h2 =200;
                    nowY = h1-200+oldY;
                }

                if(nowX<oldX){
                    w2 = w1-Math.abs(nowX-oldX);
                }else{
                    w2 = Math.abs(nowX-oldX)+w1;
                }
                if(nowX>=view.w){
                    nowX=view.w;
                    w2 = view.w-l1;
                }
                if(w2<=200){
                    w2 =200;
                    nowX = w1-200+oldX;
                }
                t2 = t1 - Math.abs(nowY- oldY);
                tdn(self.Dialog).css({width:w2,height:h2});
                tdn(self.Outer).css({width:w2-10,height:h2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        rtwh: function(){
            var self = this,
            nowX,nowY,oldX,oldY,h1,h2,t1,t2,w1,w2,l1,l2;
            bindEvent(this.rtBar,"mousedown",md)
             function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                h1 = self.Dialog.offsetHeight;              
                w1 = self.Dialog.offsetWidth;
                t1 = tdn(self.Dialog).offset().top;
                l1 = tdn(self.Dialog).offset().left;

                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;
                
                if(nowY>oldY){
                    h2 = h1-Math.abs(nowY-oldY);
                }else if(nowY>0){
                    h2 = Math.abs(nowY-oldY)+h1;
                }
                if(nowY<=0){
                    nowY=0;
                }
                if(h2<=200){
                    h2 =200;
                    nowY = h1-200+oldY;
                }

                if(nowX<oldX){
                    w2 = w1-Math.abs(nowX-oldX);
                }else{
                    w2 = Math.abs(nowX-oldX)+w1;
                }
                if(nowX>=view.w){
                    nowX=view.w;
                    w2 = view.w-l1;
                }
                if(w2<=200){
                    w2 =200;
                    nowX = w1-200+oldX;
                }
                t2 = t1 - Math.abs(nowY- oldY);
                tdn(self.Dialog).css({width:w2,height:h2,top:nowY});
                tdn(self.Outer).css({width:w2-10,height:h2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        lbwh: function(){
            var self = this,
            nowX,nowY,oldX,oldY,h1,h2,t1,t2,w1,w2,l1,l2;
            bindEvent(this.lbBar,"mousedown",md)
             function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                h1 = self.Dialog.offsetHeight;              
                w1 = self.Dialog.offsetWidth;
                t1 = tdn(self.Dialog).offset().top;
                l1 = tdn(self.Dialog).offset().left;

                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;             
                
                if(nowX<=0){
                    nowX=0
                }
                if(nowY<=oldY){
                    h2 = h1-Math.abs(nowY-oldY);
                }else if(nowY>0){
                    h2 = Math.abs(nowY-oldY)+h1;
                }
                if(nowY<=0){
                    nowY=0;
                }               
                if(nowY>view.h){
                    nowY=view.h;
                    h2 = view.h - t1;
                }
                if(h2<=200){
                    h2 =200;
                    nowY = h1-200+oldY;
                }

                if(nowX>oldX){
                    w2 = w1-Math.abs(nowX-oldX);
                }else{
                    w2 = Math.abs(nowX-oldX)+w1;
                }
                if(w2<=200){
                    w2 =200;
                    nowX = w1-200+oldX;
                }
                t2 = t1 - Math.abs(nowY- oldY);
                tdn(self.Dialog).css({width:w2,height:h2,left:nowX});
                tdn(self.Outer).css({width:w2-10,height:h2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        },
        ltwh: function(){
            var self = this,
            nowX,nowY,oldX,oldY,h1,h2,t1,t2,w1,w2,l1,l2;
            bindEvent(this.ltBar,"mousedown",md)
             function md(ev){
                var ev = ev || window.event;
                oldX = ev.clientX;
                oldY = ev.clientY;
                h1 = self.Dialog.offsetHeight;              
                w1 = self.Dialog.offsetWidth;
                t1 = tdn(self.Dialog).offset().top;
                l1 = tdn(self.Dialog).offset().left;

                 bindEvent(document,"mousemove",mv);
                 bindEvent(document,"mouseup",mp);
                return false;
            }
            function mv(ev){
                var ev = ev || window.event;
                ev.preventDefault&&ev.preventDefault();
                nowX = ev.clientX;
                nowY = ev.clientY;
                
                if(nowX<=0){
                    nowX=0
                }             
                if(nowY>=oldY){
                    h2 = h1-Math.abs(nowY-oldY);
                }else if(nowY>0){
                    h2 = Math.abs(nowY-oldY)+h1;
                }
                if(nowY<=0){
                    nowY=0;
                }  
                if(h2<=200){
                    h2 =200;
                    nowY = h1-200+oldY;
                }

                if(nowX>oldX){
                    w2 = w1-Math.abs(nowX-oldX);
                }else{
                    w2 = Math.abs(nowX-oldX)+w1;
                }
                if(w2<=200){
                    w2 =200;
                    nowX = w1-200+oldX;
                }
                t2 = t1 - Math.abs(nowY- oldY);
                tdn(self.Dialog).css({width:w2,height:h2,top:nowY,left:nowX});
                tdn(self.Outer).css({width:w2-10,height:h2-10});  
                return false;
            }
            function mp(){                
                unBind(document,"mousemove",mv)
                unBind(document,"mouseup",mp)
                return false;
            }
        }
    }
    dialog.fn.init.prototype=dialog.fn;
    window.dialog =dialog;

    function $id(id){
        return document.getElementById(id);
    }
    function bindEvent(obj,evType,fn){
        if(obj.addEventListener){
            obj.addEventListener(evType,fn,false);
        }else{
            obj.attachEvent('on'+evType,fn);
        }
    }
    function unBind(obj,evType,fn){
        if(obj.removeEventListener){
            obj.removeEventListener(evType,fn,false);
        }else{
            obj.detachEvent('on'+evType,fn);
        }
    }
})(window);

/*dialog({position:"left",width:240,height:200,InnerHTML:"<div style=\"color:red\">asda</div>"});
dialog({position:"top",width:540,height:300,URL:"http://www.baidu.com"});*/

