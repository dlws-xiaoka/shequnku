var app = getApp()
var openId = app.getSysOpenId();
var remoteAddress = app.remoteAddressdxf();
var bussiLength = 0;
var id = 0;
var userTypeId = 0;
Page({
  data: {
    changeColor: function (e) {
      this.setdata({
        background: "13b1a3"
      })
    },
    businessAllCategoryList: '',
    businessSelectList: ''
  },

  onLoad: function (e) {
    var that = this
    openId = app.getSysOpenId();
    id = e.id;
    //一级分类
    wx.request({
      url: remoteAddress + '/xcxIndex/toBusinessSkill.html',
      data: { id: id },
      method: 'GET',
      success: function (res) {
        that.setData({
          businessAllCategoryList: res.data.data.businessAllCategoryList,
          businessSelectList: res.data.data.businessSelectList
        })
        bussiLength = res.data.data.businessAllCategoryList.length;
      }
    })


  },
  //表单提交按钮
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    this.setData({
      allValue: e.detail.value
    })
    var arr = e.detail.value;
    var cbxgroupArr = "";

    for (var i = 0; i < bussiLength; i++) {
      var temId = "cbxgroup_" + i;

      if (arr[temId].length > 0) {
        cbxgroupArr += arr[temId] + ",";
      }

    }
    cbxgroupArr = cbxgroupArr.substr(0, cbxgroupArr.length - 1);


    wx.request({
      url: remoteAddress + '/xcxIndex/updateBusinCategoryById.html',
      data: {
        openId: 123,
        resourceId: id,
        businessId: cbxgroupArr
      },
      method: 'GET',
      success: function (res) {

        /*wx.redirectTo({
          url: "../resourdtal/resourdtal?id=" + id + "&userTypeId=" + userTypeId
        })*/

        wx.navigateBack({
          delta: 1
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
  onShareAppMessage: function () {
    return {
      title: app.shareshareTitle,
      desc: '',
      path: '/page/index/index'
    }
  }
})