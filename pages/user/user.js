var app = getApp()

Page({
  data:{
    text:"Page user",
    userInfo: {},
    userListInfo: [ ],
    leaveCount:"",
    wxname:"",
    headImgUrl:"",
    resourceList:""
  },
   onLoad: function () {
    var that = this;
    var remoteAddress = app.remoteAddress();

     wx.request({
        url: remoteAddress+"xcxIndex/getLeaveCountUserInfo.html", //仅为示例，并非真实的接口地址
        data:{openId:123},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            leaveCount:res.data.data.leaveCount,
            wxname:res.data.data.wxname,
            headImgUrl:res.data.data.headImgUrl
          })
          wx.request({
            url: remoteAddress+"xcxIndex/getMyResource.html",
            data: {},
            success: function(res){
              that.setData({
               resourceList:res.data.data.resourceList
               })
            },  
          })
        }
      }),
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
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