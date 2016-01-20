$(document).ready(function(){
   var flag=window.location.search;
   if(!flag){
        triggers.handle();
   }else{
    $('.part4 .w1000 .title #t4').click();
    $("html,body").animate({"scrollTop":$('.part4').offset().top},0);
   }
});
 ~function ($, window, undefind) {
    var dom = window.document;
    var page = 1, page_len = 8,
        url = "/www/ajax.php?mod=zt&act=zmxy2_2&a=list",
        cid = '',
        o_page = $("#page"),
        right_page = $("#select .page"),
        is_first = true;                
    //事件    
    var triggers = window.triggers = {
        category : function (e) {
            cid = this.attr('cid');
        },
        //发起请求
        handle : function () {
            var data = {category_id : cid, page : page};
            this.getData (url, data, 'get', function(data) {
                triggers.showList( data['list'] );
                triggers.handlePage( data['count'] );
            });
        },
        //发起请求
        searchHandle : function (search_contents) {
            var data = {page : page,search_contents:search_contents};
            this.getData (url, data, 'get', function(data) {
                triggers.showList( data['list'] );
                triggers.handlePage( data['count'] );
            });
        },              
        showList : function( list ) {
            //显示列表
            $(".zp_list").empty();
            $("#template_list").tmpl( list ).appendTo(".zp_list");

        },
        handlePage : function( count ) {    
            if ( typeof count == 'undefined' || count.total < 1 ) {
                $('.zp_list').empty();
                o_page.empty();
                right_page.empty();
                return false;
            }
            var total = count.total, page_count = count.page_count;
            page = count.page;              
            //计算页数
            var start_page , end_page, half_page = Math.ceil(page_len / 2);
            if (page < half_page) {
                start_page = 1, end_page = start_page + page_len;
            } else if (page + half_page > page_count) {                 
                start_page = page_count - page_len + 1;
                end_page = page_count;                  
            } else {
                start_page = page - half_page;
                end_page = start_page + page_len -1;
            }

            start_page = start_page < 1 ? 1 : start_page;
            end_page = end_page > page_count ? page_count : end_page;
            //生成分页html
            this.makePage ( start_page, end_page, page_count );
        },
        makePage : function( start_page, end_page, page_count) {

	var prev_page = page - 1 < 1 ? 1 : (page - 1), 
	next_page = (page + 1) > page_count ? page_count : ( page + 1 );

    var page_html = ["<a href='javascript:;' class='prev' page="+ prev_page +">上一页</a>"];
    for (var i = start_page; i <= end_page; i++) {
    	if ( i == page ) {
    		page_html.push("<span class='current'>"+ i +"</span>");
    	} else {
    		page_html.push("<a href='javascript:;' page="+i+">"+i+"</a>");	
    	}				    	
    };
    page_html.push("<a href='javascript:;' page="+ next_page +">下一页</a>");
    //总数和搜索
    page_html.push("<em>共"+page_count+"页</em>");
    page_html.push("<i>到第</i>\r\n<input type='text' name='page'>\r\n<i>页</i>");
    page_html.push("<input type='button' name='submit-page' class='btn btn_page'>");
    //插入到列表下面的页数
    o_page.html( page_html.join("\r\n") );
    //右侧小分页
    var right_page_html = "<em>"+page+"/"+page_count+"</em>\r\n";
    	right_page_html += "<a href='javascript:;' class='prev' page="+ prev_page +"><</a>";
    	right_page_html += "<a href='javascript:;' class='next' page="+ next_page +">></a>";
    	right_page.html( right_page_html );
    //绑定事件
    this.pageClick( [o_page, right_page] );
    this.pageButton( [o_page] );		                   
        },
        pageClick : function( obj ) {
            //绑定事件。
            $.each(obj, function(index, val) {
                
                val.undelegate('a[page]', 'click').delegate( 'a[page]', 'click' , function() {
                    var _page = parseInt( $(this).attr('page') );
                    if (_page > 0) { 
                        page = _page;
                        triggers.handle();
                    }
                });
            })                              
        },
        pageButton : function (obj) {
            $.each(obj, function(i, val) {                      
                val.undelegate(':button', 'click').delegate( ':button', 'click', function() {
                    var value = parseInt( val.find(':text[name=page]').val() );
                    if ( value > 0 ) {
                        page = value;
                        triggers.handle();
                    }
                });
            });
        },
        getData : function (url, data, method, callback) {
            $.ajax({
                url : url,
                data : data || {},
                type : method || 'get',
                dataType : 'json',
                success : function( data ) {                            
                    if ( data['code'] < 0 ) {
                        showMsg( data.msg );
                        return false;
                    } else {                                
                        callback && callback( data['data'] );
                    }
                }
            });
        }
    };  

    $('.tit a').bind('click', function(e) {
        var _this = $(this);
        if(_this.attr('act') == 'category'){
            _this.addClass('cur');
            _this.siblings().removeClass('cur');
        }else{
            _this.addClass('cur').siblings().removeClass('cur');
        }
        page = 1;   
        //执行请求
        triggers[_this.attr('act')].call(_this, e);
        triggers.handle();
    });

    $('.btn_ser').bind('click', function(e) {
        var search_contents = $('.txtinput').val();
        if(search_contents.length <= 0){
            showMsg("请输入要查询的作品名称!");
            return false;
        }
        triggers.searchHandle(search_contents);
    });         

} (jQuery, window);


function add_favorite(comic_id){

    if(!user){
        showMsg('请先登录！');
    }           
    $.ajax({
        url:"/www/ajax.php?mod=comic&act=favorite",
        data:{ user_id: user.id,comic_id:comic_id},
        type:"POST",
        dataType:'json',
        cache:false,
        success: function(o){
            showMsg( o.message);
        },
        error:function(){ showMsg('网络错误，请稍后重试'); }
    });     
}   
