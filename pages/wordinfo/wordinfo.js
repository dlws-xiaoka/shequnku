// pages/wordinfo/wordinfo.js
var app = getApp();
var openId = app.getSysOpenId();
var cusOpenId = "";

var sysurl = app.remoteAddressdxf();
var message = "";
var spaceId = "";
var pId = "";

function addMesage(that) {
  //表单校验-内容
  if (message.length < 3) {
    wx.showToast({
      title: '内容长度不得少于3个字符',
      icon: 'loading',
      duration: 2000
    })
    return;
  }

  wx.request({
    url: sysurl + 'xcxIndex/sendMessage.html',
    data: {
      pId: pId,
      spaceId: spaceId,
      openId: openId,
      message: message
    },
    method: 'GET',
    success: function (res) {
      console.info(res);
      var list = that.data.leaveList;
      // var data=[{id:'12312',message:'999'}];
      var data = res.data.data.messageMap;
      data.wxname = app.sysNickName,
      data.headImgUrl = app.sysHeadImgUrl,
      list.push(data);
      message="";

      that.setData({
        leaveList: list,
        emptyMessage: ""
      })

      wx.showToast({
        title: '留言添加成功',
        icon: 'success',
        duration: 2000
      })
    }
  })
}
Page({
  data: {
    leaveList: {},
    inputValue: '',
    emptyMessage: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    openId = app.getSysOpenId();
    cusOpenId = options.cusOpenId;
    console.log(options)
    // openId=options.openId;
    spaceId = options.spaceId;
    pId = options.pId;
    wx.request({
      url: sysurl + 'xcxIndex/getLeaveComment.html',
      data: {
        spaceId: spaceId,
        openId: openId,
        cusOpenId:cusOpenId
      },
      method: 'GET',
      success: function (res) {
        console.info(res);
        var s = res.data.data.leaveList;
        if (s.length == 0) {
          pId = 0;

        } else {
          pId = res.data.data.leaveList[s.length - 1].id

        }
        that.setData({
          leaveList: res.data.data.leaveList,
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
  },
  bindblur: function (e) {
    //添加留言
    this.setData({
      inputValue: e.detail.value
    })
    message = e.detail.value
  },
  bindblurs: function (e) {
    this.bindblur()
  },
  send: function (e) {
    var that = this
    var sysurl = app.remoteAddressdxf();
    pId = pId;
    spaceId = spaceId;
    message = message;
    addMesage(that);

  },
  onShareAppMessage: function () {
    return {
      title: app.shareshareTitle,
      desc: '',
      path: '/page/index/index'
    }
  }
})