// pages/wordlist/wordlist.js
var app = getApp()
Page({
  data: {
    leaveMessList: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var sysurl = app.remoteAddress();
    console.log(options)
  //  var resourceId = 1;
    var openId = 'oHxmUjg-f-LLWn7ppSHUQIKMzXoA';
    wx.request({
      url: sysurl + 'dlws-xiaoka-shequnku/xcxIndex/getLeaveMessageList.html',
      data: {
      //  resourceId: resourceId,
        openId: openId
      },
      method: 'GET',
      success: function (res) {
        console.info(res);
        that.setData({
          leaveMessList: res.data.data.leaveMessList,
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})