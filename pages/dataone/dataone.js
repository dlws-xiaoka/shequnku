// pages/dataone/dataone.js
var app = getApp()

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
     locationArray: ['河北', '河南', '安徽', '云南', '贵州', '江西', '广州', '广西', '福建', '山东'],
     usertypeId:"",
     inputValue:"",
     schoolName:""

  },
  locationIndex: 2,
  handleLocationPickerChange(e) {
    if (this.data.locationIndex || e.detail.value) {
      this.setData({
        locationIndex: e.detail.value
      });
    }
  },
   userNameInput:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  onLoad:function(options){
   this.setData({
      usertypeId:options.usertypeId,
      
    }) 
  },
  formsubmit:function(e){
    this.setData({
      schoolName:e.detail.value.schoolName
    })
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