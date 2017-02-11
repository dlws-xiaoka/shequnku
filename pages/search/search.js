var $vm = getApp()
var WxSearch = require('../wxSearch/wxSearch.js')
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
    }),
   
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['社团','微信群','公众号','QQ号','wxNotification']);
    WxSearch.initMindKeys(['校咖社团','河南大学微信公众号','美丽社团','微信小程序','安徽大学微信公众号'])
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