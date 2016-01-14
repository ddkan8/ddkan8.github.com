$(function() {
  
  // 图片延迟加载
  $("img.lazy, div.lazy").lazyload({
    effect : "fadeIn"
  });

  // 头部登录后鼠标经过提示框
  (function(){
    var timer = null;
    $('.login-after').mouseover(function(){
      clearTimeout(timer);
      $(this).find('.tip-pop').show();
    }).mouseout(function(){
      timer = setTimeout(function(){
        $('.tip-pop').hide();
      }, 200);
    });
  })();

  // 修改邮箱弹层控制
  $('.editEmail').click(function(){
    var emailBox = layer.open({
      type: 1,
      title: false,
      area: '382px',
      skin: 'nobg',
      content: $('#J-email')
    });
  });
  
  // 更新计划 自定义选中状态控制
  $('input[name="len"]').click(function(){
    if ($('#update4').is(":checked")){
      $('#update-inp').attr('disabled',false)
    }else{
      $('#update-inp').attr('disabled',true)
    }
  });
  
  // 消息删除弹层控制
  $('.cont-box').find('.del').click(function(){
    var del = layer.open({
      type: 1,
      title: false,
      area: '360px',
      closeBtn: 0,
      content: $('#J-del-pop')
    });
    
    $('.btn-cancel').click(function(){
      layer.close(del);
    });
  });
  
  // tab切换
  $('.tabs-hd').find('li').click(function(){
    var index = $(this).index();
    $(this).addClass('cur').siblings().removeClass('cur');
    $('.tabs-bd>div').hide().eq(index).show();
  });

  // 作品管理/章节管理 tab切换
  $('.tab-hd').find('li').click(function(){
    var index = $(this).index();
    $(this).addClass('cur').siblings().removeClass('cur');
    $(this).parents('.tabs-ct').find('.tab-bd>div').hide().eq(index).show();
  });

  // 意见反馈、消息中心 展开效果
  $('.cont-box').find('.tit').click(function(){
    $(this).parent().parent().toggleClass('on');
    $(this).parent().parent().find('.bd').slideToggle();;  
  });
  
  // 个人信息iframe加载
  $('.side-nav').find('.user-info').click(function(){
    var info = layer.open({
      type: 2,
      title: false,
      area: ['520px', '560px'],
      skin: 'bd5',
      closeBtn: 0,
      shadeClose: true,
      content: ['personal-info2.html?t='+Math.random(), 'no']
    });

  });
  // 个人信息取消按钮关闭弹层
  $('.mod-pop-info').find('.btn-cancel').click(function(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  });

});
