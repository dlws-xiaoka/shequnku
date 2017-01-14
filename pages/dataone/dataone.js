// pages/dataone/dataone.js
Page({
  data:{
     setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },
     locationArray: ['河北', '河南', '安徽', '云南', '贵州', '江西', '广州', '广西', '福建', '山东']
  },
  locationIndex: 2,
  handleLocationPickerChange(e) {
    if (this.data.languageIndex || e.detail.value) {
      this.showLoadingToast();
      this.setData({
        locationIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
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