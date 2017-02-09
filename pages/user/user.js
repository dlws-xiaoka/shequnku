var page = 0;
var page_size = 5;

var app = getApp()
var openId = app.getSysOpenId();
var remoteAddress = app.remoteAddressdxf();

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  console.log('GetList' + openId)
  wx.request({
    url: remoteAddress + "xcxIndex/getLeaveCountUserInfo.html",
    data: { openId: openId },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)    
      that.setData({
        leaveCount: res.data.data.leaveCount,
        wxname: res.data.data.wxname
      })
      wx.request({
        url: remoteAddress + "xcxIndex/getMyResource.html",
        data: { openId: openId },
        success: function (res) {
          console.log(res)
          that.setData({
            resourceList: res.data.data.resourceList
          })

          page++;
          that.setData({
            hidden: true
          });
        },
      })
    }
  })
}

Page({
  data: {
    text: "Page user",
    userInfo: {},
    userListInfo: [],
    leaveCount: "",
    wxname: "",
    resourceList: "",
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
    sysNickName: ""
  },

  onLoad: function () {
    console.log('onLoad')
    openId = app.getSysOpenId();
  },
  onReady: function () {
    // 页面渲染完成
    console.log('onReady')
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
     console.log('onShow')
    var that = this;
    that.setData({
      sysNickName: app.sysNickName
    })

     app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    openId = app.getSysOpenId();
    GetList(that);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
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