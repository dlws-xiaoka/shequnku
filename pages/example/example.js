// pages/example/example.js
var app = getApp()
var openId=app.getSysOpenId();
Page({
  data:{
    caseInfo:{},
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var sysurl = app.remoteAddressdxf();
    console.log(options)
    var id=options.id;
    wx.request({
            url: sysurl+'xcxIndex/getCaseDetailInfo.html', 
            data: {
              id:id,
            },  
            method: 'GET',   
            success: function(res){   
            console.info(res); 
                that.setData({                
                  caseInfo: res.data.data,                

                })             
            }
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
  },
  onShareAppMessage: function () {
    return {
      title: app.shareshareTitle,
      desc: '',
      path: '/page/index/index'
    }
  }
})