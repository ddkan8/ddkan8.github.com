/*begin*/
/*2011-08-18 17:33:57*/
(function($){$.extend({LAYER:{openID:"",position:"",mt:"",parentIsLoad:true,init:function(pid){if(pid==undefined)pid="UED_box";if(this.parentIsLoad){$('<div id="'+pid+'"></div>').appendTo("body");$('<div class="UED_SHUCOVER_V1 UED_hide" id="UED_SHUCOVER_V1"></div>').appendTo("body");this.parentIsLoad=false}},show:function(json){var def={overlay:{color:"#000",opacity:0.5},position:"fixed",mt:"200px",layerContainer:"UED_LAYER_PARENT_FRAME_V1"};
def=$.extend(def,json);if(!document.getElementById(def.id)){alert("\u5f39\u51fa\u5c42\u51fa\u9519: \u9875\u9762\u4e0a\u6ca1\u6709\u53d1\u73b0id="+def.id);return false}this.init(def.layerContainer);this.position=def.position;this.mt=def.mt;this.openID=json.id;this.setpos($("#"+this.openID));/*this.is6FIX("100%");*/$("#"+this.openID).prependTo($("#"+def.layerContainer));$("#"+this.openID).show();$("#UED_SHUCOVER_V1").css({"background-color":def.overlay.color,opacity:def.overlay.opacity}).show()},setpos:function(obj){obj.addClass("UED_LAYER_PARENT_V1");
var h=obj.height();var w=obj.width();var mr=h/2*-1+"px";var ml=w/2*-1+"px";obj.css({"margin-left":ml,"margin-top":mr});var vH=(window.innerHeight > 0) ? window.innerHeight : screen.height;if(h>vH||this.position==="absolute")obj.css({top:this.mt,position:"absolute",marginTop:"0"})},close:function(){$("#"+this.openID).hide();$("#"+this.openID).removeClass("UED_LAYER_PARENT_V1");$("#UED_SHUCOVER_V1").hide();/*this.is6FIX("auto")*/},is6FIX:function(value){if($.browser.msie&&
$.browser.version=="6.0"){$("html").css({height:value});$("body").css({height:value,backgroundImage:"url(about:blank)",backgroundAttachment:"fixed"})}}}})})(jQuery);

/*end*/