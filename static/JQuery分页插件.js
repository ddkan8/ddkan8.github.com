// 一个简单的jQuery分页插件，兼容AMD规范和requireJS.
/**
 * jQuery分页插件
 * */
;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
     
     //定义MyPagePlugin的构造函数
    MyPagePlugin = function(ele, option) {
         //   this.viewHtml="<nav><ul class='pagination'><li><a id='firstPageli'>&laquo;</a></li><li><a id='prevPageli'>&lsaquo;</a></li><li class='active'><a>第<span id='curPageNoSpan'></span>页,共<span id='allPageCountSpan'></span>页</a></li><li><a id='nextPageli'>&rsaquo;</a></li><li><a id='lastPageli'>&raquo;</a></li></ul></nav>";
   this.viewHtml= "<div class='pageplugin'><a  class='first firstPageli'>&laquo;</a><a class='previous prevPageli'>&lsaquo;</a><a class='present'>第<span class='curPageNoSpan'></span>页,共<span class='allPageCountSpan'></span>页</a><a class='next nextPageli'>&rsaquo;</a><a class='last lastPageli'>&raquo;</a></div>"
 
        this.$element = ele;
        /**参数：page:当前页,pageCount:总共页数,onPaged回调函数,回调函数会传入页数*/
        this.defaults = {
            page:1,
            pageCount:1,
            onPaged:function(pageNo){}
        };
        this.options = $.extend({}, this.defaults, option);
 
    }
    //定义MyPagePlugin的方法
    MyPagePlugin.prototype = {
        initPlugin:function(){
            this.$element.empty();
             this.$element.append(this.viewHtml);
             this.options.onPaged(this.options.page);//初始化
             this.$element.find(".curPageNoSpan").text(this.options.page);
             this.$element.find(".curPageNoSpan").data("options",this.options);
             this.$element.find(".allPageCountSpan").text(this.options.pageCount);
             this.$element.find(".firstPageli").on("click",function(e){
                  
                var curNo=$(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text();
                curNo=parseInt(curNo);
                if(curNo==1){
                     return false;
                }else{
                     
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").data("options").onPaged(1);
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text(1);
                }
                return false;
             });
             this.$element.find(".prevPageli").on("click",function(e){
                var curNo=$(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text();
                curNo=parseInt(curNo);
                if(curNo==1){
                    return false;
                }else{
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").data("options").onPaged(curNo-1);
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text(curNo-1);
                }
                return false;
             });
             this.$element.find(".nextPageli").on("click",function(e){
                var curNo=$(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text();
                curNo=parseInt(curNo);
                var pageCount=$(e.currentTarget).parent("div.pageplugin").find(".allPageCountSpan").text();
                pageCount=parseInt(pageCount);
                if(curNo==pageCount){
                    return false;
                }else{
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").data("options").onPaged(curNo+1);
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text(curNo+1);
                }
                return false;
             });
             this.$element.find(".lastPageli").on("click",function(e){
                var curNo=$(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text();
                curNo=parseInt(curNo);
                var pageCount=$(e.currentTarget).parent("div.pageplugin").find(".allPageCountSpan").text();
                pageCount=parseInt(pageCount);
                if(curNo==pageCount){
                     return false;
                }else{
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").data("options").onPaged(pageCount);
                    $(e.currentTarget).parent("div.pageplugin").find(".curPageNoSpan").text(pageCount);
                }
                return false;
             });
              
        }
 
 
    }
    $.fn.pagePlugin = function (option) {
        var pagePlugin=new MyPagePlugin(this,option);
        pagePlugin.initPlugin();
    };
}));

// css代码
.pageplugin {
  display: inline-block;
  border: 1px solid #CDCDCD;
  border-radius: 3px; }
 
.pageplugin a {
  cursor: pointer;
  display: block;
  float: left;
  width: 20px;
  height: 20px;
  outline: none;
  border-right: 1px solid #CDCDCD;
  border-left: 1px solid #CDCDCD;
  color: #767676;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  font-family: Times, 'Times New Roman', Georgia, Palatino;
    background-color: #f7f7f7;
  /* ATTN: need a better font stack 
  background-color: #f7f7f7;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f3f3f3), color-stop(100%, lightgrey));
  background-image: -webkit-linear-gradient(#f3f3f3, lightgrey);
  background-image: linear-gradient(#f3f3f3, lightgrey); */}
  .pageplugin a:hover, .pageplugin a:focus, .pageplugin a:active {
    color:#0099CC;
    background-color: #cecece;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e4e4e4), color-stop(100%, #cecece));
    background-image: -webkit-linear-gradient(#e4e4e4, #cecece);
    background-image: linear-gradient(#e4e4e4, #cecece); }
  .pageplugin a.disabled, .pageplugin a.disabled:hover, .pageplugin a.disabled:focus, .pageplugin a.disabled:active {
    background-color: #f3f3f3;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f3f3f3), color-stop(100%, lightgrey));
    background-image: -webkit-linear-gradient(#f3f3f3, lightgrey);
    background-image: linear-gradient(#f3f3f3, lightgrey);
    color: #A8A8A8;
    cursor: default; }
 
.pageplugin a:first-child {
  border: none;
  border-radius: 2px 0 0 2px; }
 
.pageplugin a:last-child {
  border: none;
  border-radius: 0 2px 2px 0; }
 
 .pageplugin .present {
  float: left;
  margin: 0;
  padding: 0;
  width: 120px;
  height: 20px;
  outline: none;
  border: none;
  vertical-align: middle;
  text-align: center; }