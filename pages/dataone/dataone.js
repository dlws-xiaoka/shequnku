// pages/dataone/dataone.js
//获取应用实例
var tcity = require("../../utils/city.js");
var app = getApp()
var remoteAddress = app.remoteAddressdxf();
var TypeIdArray = "";
var provincedan = "";
var cityIdArr = "";
var schooIdArr = "";
var schIdArr=""
Page({
  data: {
    locationArray2: ['信阳市', '保定市', '合肥市', '南阳市'],
    userTypeArray: "",
    typeIndex: 0,
    TypeIdArray: "",
    provinceList: '',
    ProvenIndex: 0,
    cityList: '',
    cityIndex: 0,
    schoolList: '',
    schIndex:0,
    schArrId:''
  },

  handleLocationPickerChange2(e) {
    if (this.data.locationIndex2 || e.detail.value) {
      this.setData({
        locationIndex2: e.detail.value
      });
    }
  },
  changeUserType(e) {
    if (this.data.typeIndex || e.detail.value) {
      var typeIndex = e.detail.value
      this.setData({
        typeIndex: e.detail.value,
        TypeIdArray: TypeIdArray[typeIndex]
      });
    }
  },
  changeProven(e) {
    var that = this;
    if (this.data.ProvenIndex || e.detail.value) {
      var ProvenIndex = e.detail.value
      this.setData({
        ProvenIndex: e.detail.value,
      });
      var provinceb = provincedan[ProvenIndex];
      //根据省选择市
      wx.request({
        url: remoteAddress + '/xcxIndex/getCityListByprovince.html',
        data: { province: provinceb },
        method: 'GET',
        success: function (res) {
          var cityArr = res.data.data.cityList;
          var rescityArr = new Array();
          var cityArrId = new Array();
          for (var i = 0; i < cityArr.length; i++) {
            rescityArr.push(cityArr[i].cityName);
            cityArrId.push(cityArr[i].id);
          }
          cityIdArr = cityArrId;
          that.setData({
            cityList: rescityArr
          })
        }
      })

    }
  },
  changeCity(e) {
    var that = this;
    if (this.data.cityIndex || e.detail.value) {
      var cityId = "";
      var cityIndex = e.detail.value
      this.setData({
        cityIndex: e.detail.value,
        TypeIdArray: TypeIdArray[cityIndex]
      });
    }
    cityId = cityIdArr[cityIndex];
    //根据市选择学校
    wx.request({
      url: remoteAddress + '/xcxIndex/getSchoolListByCityId.html',
      data: { cityId: cityId },
      method: 'GET',
      success: function (res) {
        var schooArr = res.data.data.schoolList;
        var reschollArr = new Array();
        var schollArrId = new Array();
        for (var i = 0; i < schooArr.length; i++) {
          reschollArr.push(schooArr[i].schoolName);
          schollArrId.push(schooArr[i].id);
        }
        schooIdArr = schollArrId;
        that.setData({
          schoolList: reschollArr
        })
      }
    })
  },
  changeSchool(e) {
    var that = this;
    if (this.data.schIndex || e.detail.value) {
      var cityId = "";
      var schIndex = e.detail.value
      this.setData({
        schIndex: e.detail.value,
        schArrId: schIdArr[schIndex]
      });
    }
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: remoteAddress + "xcxIndex/getUserType.html",
      data: { openId: 123 },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.request({
          url: remoteAddress + '/xcxIndex/getProvince.html',
          data: {},
          method: 'GET',
          success: function (res) {
            console.info(res);
            var proArr = res.data.data.provinceList;
            var resproArr = new Array();
            for (var i = 0; i < proArr.length; i++) {
              resproArr.push(proArr[i].province);
            }

            that.setData({
              provinceList: resproArr
            })
            provincedan = resproArr;
          }
        })

        var tempArr = res.data.data.userTypeList;
        var resArr = new Array();
        var resArrId = new Array();
        for (var i = 0; i < tempArr.length; i++) {
          resArr.push(tempArr[i].typeName);
          resArrId.push(tempArr[i].id);
        }

        that.setData({
          userTypeArray: resArr,
          TypeIdArray: resArrId[0]
        })
        TypeIdArray = resArrId;
      }
    })
  },


  selectProven: function (e) {
    var that = this;
    wx.request({
      url: remoteAddress + '/xcxIndex/getProvince.html',
      data: {},
      method: 'GET',
      success: function (res) {
        console.info(res);
        that.setData({
          provenceList: res.data.data.provenceList,
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
  }
})

