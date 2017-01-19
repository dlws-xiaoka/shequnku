var $vm = getApp()
var openId = $vm.getSysOpenId();
var spaceId = '';

Page({
  data: {
    text: "Page user",
    caseList: {},
    caseNumber: '',
    spaceId: ''
  },

  onLoad: function (options) {

    openId = $vm.getSysOpenId();
    var that = this
    var sysurl = $vm.remoteAddressdxf();
    var id = options.id;
    spaceId = options.spaceId;
    that.setData({
      spaceId: spaceId
    })
    console.log('onLoad的spaceId=' + spaceId)
    wx.request({
      url: sysurl + 'xcxIndex/myCase.html',
      data: {
        spaceId: spaceId
      },
      method: 'GET',
      success: function (res) {
        console.info(res);
        that.setData({
          caseNumber: res.data.caseNumber,
          caseList: res.data.caseList,
        })
      }
    })
    //调用应用实例的方法获取全局数据
    $vm.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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
  },
  addsource(event) {
    wx.navigateTo({
      url: '../choosetype/choosetype'
    })
  }
})