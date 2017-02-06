// pages/searchList/searchList.js
var WxSearch = require('../wxSearch/wxSearch.js')
var app = getApp()
var openId = app.getSysOpenId();
var content = "";
Page({
  data: {
    hide:"true"
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata   '社团','微信群','公众号','QQ号','wxNotification'
    WxSearch.init(that, 43, []);
    WxSearch.initMindKeys(['校咖社团', '河南大学微信公众号', '美丽社团', '微信小程序', '安徽大学微信公众号']);
  },
  // a:function(e){
  //  console.log(this.data.inputValue)
  //   let data;
  //   let localStorageValue = [];
  //   if(this.data.inputValue != ''){
  //     //调用API从本地缓存中获取数据

  //     wx.navigateTo({
  //         url: '/pages/search/search'
  //     })
  //     // console.log('马上就要跳转了！')
  //   }else{
  //     console.log('空白的')
  //   }
  //   // this.onLoad();
  // },
  wxSearchFn: function () {
    this.setData({
      hide:!this.data.hide
    })

  },
  mySearch: function (e) {
    var that = this;
    WxSearch.wxSearchInput(content, that);
  },
    wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  //输入内容出发wxSearchInput事件
  /*wxSearchInput: function (e) {
    var that = this;
    content = e.detail.value;//页面输入的内容 
    WxSearch.wxSearchInput(e,that);
  },*/
  //点击输入框触发wxSerchFocus事件，
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
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


