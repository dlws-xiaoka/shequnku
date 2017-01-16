// pages/information/information.js
Page({
  data:{
    flag:2,
    WeiWeiChatArray: ['一级分类', '二级分类', '三级分类'],
    WeiWeiChatIndex:0,
    locationArray: ['选择省', 'Australia', 'China', 'Canada', 'France', 'Germany', 'India', 'Japan', 'UK', 'USA'],
    locationIndex:0,
    cityArray: ['选择市', '北京市', '哈尔滨市', '日本市'],
    cityIndex:0
  },
  handleWeiChatPickerChange(e) {
    if (this.data.WeiWeiChatIndex || e.detail.value) {
      this.setData({
        WeiWeiChatIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },
  handleLocationPickerChange(e) {
    if (this.data.locationIndex || e.detail.value) {
      this.setData({
        locationIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },
  handleCityPickerChange(e) {
    if (this.data.cityIndex || e.detail.value) {
      this.setData({
        cityIndex: e.detail.value
      });
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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