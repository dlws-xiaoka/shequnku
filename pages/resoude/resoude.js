var $vm = getApp()

Page({
  data:{
    text:"Page user",
    userInfo: {},
    userListInfo: [ 
      {
      
        text: '消息通知',
        isunread: false,
        unreadNum: 2
      }, 
      {
      
        text: '活动',
        isunread: false,
        unreadNum: 2
      }, 
      {
     
        text: '商城',
        isunread: true,
        unreadNum: '特卖,电影'
      }, 
      {
     
        text: '京东特卖',
        isunread: false,
        unreadNum: 1
      }, 
      {

        text: '我要爆料'
      }, 
      {
      
        text: '反馈'
      }]


  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
  	//调用应用实例的方法获取全局数据
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