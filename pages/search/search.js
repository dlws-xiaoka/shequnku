var $vm = getApp()
var openId=$vm.getSysOpenId();

Page({
  data:{
    text:"Page user",
    userInfo: {},
    datasource:[]
  },
  
   onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    $vm.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
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