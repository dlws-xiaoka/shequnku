// pages/searchList/searchList.js
var WxSearch = require('../wxSearch/wxSearch.js')
var app = getApp()
var openId = app.getSysOpenId();
var content = "";
Page({
  data: {
    hide:"true",
    wxSData:[],
   inp:""
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata   '社团','微信群','公众号','QQ号','wxNotification'
    WxSearch.init(that, 43, []);
    WxSearch.initMindKeys(['校咖社团', '河南大学微信公众号', '美丽社团', '微信小程序']);
  },
  formBindsubmit: function (e) {
      var that = this;
      var sysurl = app.remoteAddressdxf();
      content=e.detail.value.myText;
      wx.request({
        url: sysurl + 'xcxIndex/selectResourceByName.html',
        data: {
            spaceName: content
        },
        method: 'GET',
        success: function (res) {
            console.log(res);
            that.setData({
                wxSData: res.data.data.resourceList
            });
           // content=""
           // console.log(content);
        }
    })
  },
  wxSearchFn: function () {
    
    if(content==''){
      //隐藏
      this.setData({
        hide:true
      })
      wx.showToast({
        title: '搜索内容不为空',
        icon: 'loading',
        duration: 2000
      })
    }else{
      //显示
      this.setData({
        hide:false
      })
    }
  },
  mySearchs: function (e) {
    var sysurl = app.remoteAddressdxf();
    var that = this;
    //var myContent = e.detail.value.myContent;
    console.log(content)
     wx.request({
        url: sysurl + 'xcxIndex/selectResourceByName.html',
        data: {
            spaceName: content
        },
        method: 'GET',
        success: function (res) {
            console.log(res);
            that.setData({
                wxSData: res.data.data.resourceList
            });
            content=""
            console.log(content);
        }
    })
   
  },
    wxSearchInput: function(e){

    var that = this
    content = e.detail.value
    console.log(content)
   // WxSearch.wxSearchInput(e,that);

      this.setData({
        inP:e.detail.value
      });
    var that = this;
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


