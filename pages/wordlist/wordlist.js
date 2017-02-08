// pages/wordlist/wordlist.js
var app = getApp()
var openId = app.getSysOpenId();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
Page({
  data: {
    leaveMessList: {}

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    openId = app.getSysOpenId();
    var that = this
    var sysurl = app.remoteAddressdxf();
    console.log(options)

    console.log('我的还是我的' + openId)
    if (null != openId && undefined != openId) {
      wx.request({
        url: sysurl + 'xcxIndex/getLeaveMessageList.html',
        data: {
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
    } else {
      console.log("open is not find");
    }




    // getLeaveMessageList

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