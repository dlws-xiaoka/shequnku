var page = 0;
var page_size = 5;

var app = getApp()
var $vm = getApp()
var openId = app.getSysOpenId();
var remoteAddress = app.remoteAddressdxf();

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  console.log('GetList'+openId)
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
        wxname: res.data.data.wxname,
        headImgUrl: res.data.data.headImgUrl
      })
      wx.request({
        url: remoteAddress + "xcxIndex/getMyResource.html",
        data: { page: page, page_size: page_size },
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
    headImgUrl: "",
    resourceList: "",
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
  },
  onLoad: function () {
    console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // $vm.getUserInfo(function(userInfo){
    //   //更新数据
    //   console.log(userInfo)
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

    openId = app.getSysOpenId();

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
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
  }
})