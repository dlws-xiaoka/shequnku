// pages/dataone/dataone.js
//获取应用实例
var app = getApp()
Page({
  data:{
     setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
     locationArray: ['河北', '河南', '安徽', '云南', '贵州', '江西', '广州', '广西', '福建', '山东'],
     locationArray2:['信阳市','保定市','合肥市','南阳市'],
     locationArray3:['社团','微信群','公众号','QQ群'],
     locationArray4:['清华大学','北京大学','湖南大学','河南大学','内蒙古呼和浩特大学'],
     locationArray5:['类别1','泪别2','类别3','类别4','类别5']
  },
  locationIndex: 2,
  locationIndex2: 1,
  locationIndex3:2,
  locationIndex4:2,
  locationIndex5:3,
  changeChoose(e){
    if (this.data.locationIndex3 || e.detail.value) {

      this.setData({
        locationIndex3: e.detail.value
      });
    }
  },
  wxChoose(e){
    if (this.data.locationIndex5 || e.detail.value) {

      this.setData({
        locationIndex5: e.detail.value
      });
    }
  },
  handleLocationPickerChange(e) {
    if (this.data.locationIndex || e.detail.value) {

      this.setData({
        locationIndex: e.detail.value
      });
    }
  },
  handleLocationPickerChange2(e) {
    if (this.data.locationIndex2 || e.detail.value) {

      this.setData({
        locationIndex2: e.detail.value
      });
    }
  },
  chooseSchool(e){
    if (this.data.locationIndex4 || e.detail.value) {

      this.setData({
        locationIndex4: e.detail.value
      });
    }
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

