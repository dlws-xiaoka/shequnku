// pages/filter/filter.js
// Page({
//   data:{
//      setDisabled: function(e) {
//     this.setData({
//       disabled: !this.data.disabled
//     })
//   },
//     locationArray: ['河北', '河南', '安徽', '云南', '贵州', '江西', '广州', '广西', '福建', '山东'],
//       locationArray2:['信阳市','保定市','合肥市','南阳市'],
  
//   locationIndex: 2,
//   locationIndex2: 1,
//   handleLocationPickerChange(e) {
//     if (this.data.locationIndex || e.detail.value) {

//       this.setData({
//         locationIndex: e.detail.value
//       });
//     }
//   },
//   handleLocationPickerChange2(e) {
//     if (this.data.locationIndex2 || e.detail.value) {

//       this.setData({
//         locationIndex2: e.detail.value
//       });
//     }
//   },
 
//   onLoad:function(options){
//     // 页面初始化 options为页面跳转所带来的参数
//   },
//   onReady:function(){
//     // 页面渲染完成
//   },
//   onShow:function(){
//     // 页面显示
//   },
//   onHide:function(){
//     // 页面隐藏
//   },
//   onUnload:function(){
//     // 页面关闭
//   }
//  }
  
// })
var tcity = require("../../utils/city.js");

var app = getApp()
Page({
  data:{
     setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  // provinces: [],
  //   province: "",
  //   citys: [],
  //   city: "",
  //   countys: [],
  //   county: '',
  //   value: [0, 0, 0],
  //   values: [0, 0, 0],
  //   condition: false,
  // setPlain: function(e) {
  //   this.setData({
  //     plain: !this.data.plain
  //   })
  // },
  // setLoading: function(e) {
  //   this.setData({
  //     loading: !this.data.loading
  //   })
  // },
     locationArray: ['河北', '河南', '安徽', '云南', '贵州', '江西', '广州', '广西', '福建', '山东'],
      locationArray2:['信阳市','保定市','合肥市','南阳市']
  },
  locationIndex: 2,
  locationIndex2: 1,
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
 bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    
    if(val[0] != t[0]){
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys:citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })
      
      return;
    }
    if(val[1] != t[1]){
      console.log('city no');
      const countys = [];

      for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }
    if(val[2] != t[2]){
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
    

  },
   open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;
    
    tcity.init(that);

    var cityData = that.data.cityData;

    
    const provinces = [];
    const citys = [];
    const countys = [];

    for(let i=0;i<cityData.length;i++){
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0 ; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys':citys,
      'countys':countys,
      'province':cityData[0].name,
      'city':cityData[0].sub[0].name,
      'county':cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');


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

