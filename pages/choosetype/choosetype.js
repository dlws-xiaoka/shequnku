// pages/choosetype/choosetype.js

function  backcolor(){
  return ["hidden","hidden","hidden"]
}
Page({
  data:{
    backGroud: ""
  },
  
  changeBack: function(e) {
//        获取当前显示的一级菜单标识
        var index = parseInt(e.currentTarget.id);
        // 生成数组，全为hidden的，只对当前的进行显示
        var newSubMenuDisplay = backcolor();
//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
        if(newSubMenuDisplay[index] == 'hidden') {
            newSubMenuDisplay[index] = 'bg_active';
        } else {
            newSubMenuDisplay[index] = 'hidden';
        }
        // 设置为新的数组
        this.setData({
            backGroud: newSubMenuDisplay
        });
    },


  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})