function Msg() {
  /* body... */
}
Msg.prototype = {
  init: function() {
    /* body... */
    var me = this;
    // 读取第一页数据
    me.getData(1);

    // 初始化分页标签
    me.init_page();
    me.page_click();

    // 提交数据
    me.add();
    // 删除
    me.delect();
    // 编辑
    me.edit();

    // 分页查看
    me.get_page();
  },
  // 初始化分页标签
  init_page: function() {
    var me = this;
    var pages = null;
    $.get("/sum", function(result) {
      $("#pagination").html("");
      if (result.sum != 0) {
        pages = Math.ceil(result.sum/2);
        for (var i = 0; i < pages; i++) {
          $("#pagination").append('<li class="' + (i == 0 ? "active" : "") + '" data-page=' + (i + 1) + '><a href="#">' + (i + 1) + '</a></li>');
        }
      }
    });
  },
  // 页签的点击事件
  page_click: function() {
    var me = this;
    $('#pagination').on('click', 'li', function(e) {
      var dom = $(e.currentTarget);

      var active = dom.hasClass('active');
      if(!active){
        dom.addClass('active').siblings().removeClass('active');
        me.getData(dom.attr('data-page'))
      }
    });
  },
  // 获取全部数据
  getData: function(page) {
    // body... 
    $.get("/du?page=" + (page - 1), function(result) {
      $("#quanbuliuyan").html("");

      var compiled = _.template($("#moban").html());
      for (var i = 0; i < result.result.length; i++) {
        //数据绑定
        var html = compiled({
          liuyan: result.result[i].liuyan,
          xingming: result.result[i].xingming,
          shijian: new Date(result.result[i].shijian).toLocaleString(),
          id: result.result[i]._id
        });
        //DOM操作，添加节点
        $("#quanbuliuyan").append($(html));
      }
    });
  },
  // 留言保存
  add: function() {
    var me = this;
    $("#commit").click(function() {
      $("#shibai").hide();
      $("#chenggong").hide();
      if($("#xingming").val() == ''|| $("#liuyan").val() ==''){
          layer.msg('亲，不得为空！！');
          return false;
      }
      $.post("/tijiao", {
        "xingming": $("#xingming").val(),
        "liuyan": $("#liuyan").val()
      }, function(result) {
        if (result.result == -1) {
          $("#shibai").fadeIn();
        } else if (result.result == 1) {
          //提交成功
          layer.msg('亲，您的数据已成功打下烙印')
          $("#quanbuliuyan").html("");
          $("#xingming").val("");
          $("#liuyan").val("")

          me.getData(1);
          // $('#pagination li:eq(0)').addClass('active').siblings().removeClass('active');
          me.init_page();
        }
      });

    });
  },
  // 删除
  delect: function() {
    /* body... */
    var me = this;
    $('.container').on('click', '.del', function(e) {
      /* body... */
      var dom = e.target
      var id = $(dom).attr('id');

      $.get("/del?id=" + id, function(data) {
        if (data.ret) {
          me.getData(1);
        }
      });
    })
  },
  // 编辑
  edit: function() {
    /* body... */
    var me = this;

    $('.container').on('click', '.edit', function(e) {
      /* body... */
      var dom = e.target
      var id = $(dom).attr('id');
      var parent = $(dom).parent().parent();

      var name = parent.children('.panel-heading').children('.name').html();
      var info = parent.children('.panel-body').html();

      layer.open({
        type: 1,
        area: ['600px', '400px'],
        shadeClose: false, //点击遮罩关闭
        btn: ['保存', '取消'],
        content: '<div>' +
          '<div style="margin-top:5px;margin-left:20px">姓名：<input type="text" style="width:90%" id="back_name" value=' + name + '></div>' +
          '<div style="margin-top:5px;margin-left:20px">留言：<textarea  style="width:90%;height:200px" id="back_info" >' + info.trim() + '</textarea></div>' +
          '</div>',
        btn1: function(index, layero) {

          me.edit_save(index, id);
        },
        btn2: function(index, layero) {
          layer.close(index);
        },
      });
    });
  },
  // 保存修改信息
  edit_save: function(index, id) {
    /* body... */
    var me = this;
    var name = $('#back_name').val();
    var info = $('#back_info').val();
    if (name == '') {
      layer.msg('尊姓大名不能为空啊~~~~亲~~~~~~~~');
      return;
    }
    $.post("/update", {
      "id": id,
      "xingming": name,
      "liuyan": info
    }, function(result) {
      $("#quanbuliuyan").html("");
      me.getData(1);
      $('#pagination li:eq(0)').addClass('active').siblings().removeClass('active');
      layer.close(index);
    });
  },
  // 分页读取
  get_page: function() {
    /* body... */
    //给第一个页面，补一个active
    $(".yemaanniu:first").addClass("active");

    //给所有的页码按钮，添加监听
    $(".yemaanniu").click(function() {
      var nowpage = parseInt($(".yemaanniu").attr("data-page"));
      getData(nowpage);
      $(".yemaanniu").addClass("active").siblings().removeClass("active");
    });
  },

};
