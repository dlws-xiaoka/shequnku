// pages/dataone/dataone.js
//获取应用实例
var tcity = require("../../utils/city.js");
var app = getApp()

var remoteAddress = app.remoteAddressdxf();
var TypeIdArray = "";//所有一级分类 不可以改变这个值
var provincedan = "";//所有省
var provinceSin = "";//传后台的省
var cityIdArr = "";
var cityId = "";
var schName = ""//学校名称
var reschollArr = "";//学校名称
var schooIdArr = "";//全部的学校Id
var bussiLength = ""//二级分类长度
var childcategoryId = 0;
var wxNumber = "";//微信号
var chidCaIdArr = "";//所有的微信号子分类Id
var chidCaId = "";//传后台的子分类Id


Page({
  data: {
    userTypeArray: "",
    typeIndex: 0,
    TypeIdArray: "",
    provinceList: '',
    ProvenIndex: 0,
    provinceSin: '',//传后台的省
    cityList: '',
    cityIndex: 0,
    schoolList: '',
    schIndex: 0,
    schArrId: '',
    businessCategoryList: '',
    childCategoryList: '',
    chidCatIndex: 0,
    chidCaId: '',

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
      url: remoteAddress + 'xcxIndex/addResource.html',
      data: {
        openId: app.getSysOpenId(),
        userTypeId: arr.userType,
        schoolId: arr.schoolId != undefined ? arr.schoolId : 0,
        schoolName: schName,
        provinceName: provinceSin,
        phone:arr.phone!= undefined ? arr.phone : '',
        remark: arr.remark,
        spaceName: arr.spaceName!= undefined ? arr.spaceName : '',
        businessId: cbxgroupArr,
        childcategoryId: childcategoryId != undefined ? childcategoryId : 0,
        wxNumber: arr.wxNumber!= undefined ? arr.wxNumber : ''
      },
      method: 'GET',
      success: function (res) {
        wx.switchTab({
          url: '../user/user'
        })
      }
    })
  },
  changeUserType(e) {
    var that = this;
    if (this.data.typeIndex || e.detail.value) {
      var typeIndex = e.detail.value
      this.setData({
        typeIndex: e.detail.value,
        TypeIdArray: TypeIdArray[typeIndex]
      });
    }
    wx.request({
      url: remoteAddress + 'xcxIndex/getChildCategoryList.html',
      data: { pId: TypeIdArray[typeIndex] },
      method: 'GET',
      success: function (res) {
        var chidList = res.data.data.childCategoryList;
        var chidCaArr = new Array();//子分类名称
        chidCaIdArr = new Array();//子分类Id
        if (chidList) {
          for (var i = 0; i < chidList.length; i++) {
            chidCaArr.push(chidList[i].childCategoryName);
            chidCaIdArr.push(chidList[i].id);
          }
        }

        that.setData({
          childCategoryList: chidCaArr,
          chidCaId: chidCaIdArr[0]
        })
        childcategoryId = chidCaIdArr[0];
      }
    })

  },
  wxType(e) {
    var that = this;
    if (this.data.chidCatIndex || e.detail.value) {
      var chidCatIndex = e.detail.value
      this.setData({
        chidCatIndex: e.detail.value
      });
      childcategoryId = chidCaIdArr[chidCatIndex]
    }
  },
  changeProven(e) {
    var that = this;
    if (this.data.ProvenIndex || e.detail.value) {
      var ProvenIndex = e.detail.value
      this.setData({
        ProvenIndex: e.detail.value,
        provinceSin: provincedan[ProvenIndex]
      });
      var provinceb = provincedan[ProvenIndex];
      provinceSin = provinceb;
      //根据省选择市
      wx.request({
        url: remoteAddress + 'xcxIndex/getCityListByprovince.html',
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
      var cityIndex = e.detail.value
      this.setData({
        cityIndex: e.detail.value
      });
    }
    cityId = cityIdArr[cityIndex];
    //根据市选择学校
    wx.request({
      url: remoteAddress + 'xcxIndex/getSchoolListByCityId.html',
      data: { cityId: cityId },
      method: 'GET',
      success: function (res) {
        var schooArr = res.data.data.schoolList;
        reschollArr = new Array();//学校名称
        var schollArrId = new Array();//学校Id
        for (var i = 0; i < schooArr.length; i++) {
          reschollArr.push(schooArr[i].schoolName);
          schollArrId.push(schooArr[i].id);
        }
        schooIdArr = schollArrId;
        schName = reschollArr[0];
        that.setData({
          schoolList: reschollArr,
          schArrId: schooIdArr[0],//学校Id
          schName: reschollArr[0]//学校名称
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
        schArrId: schooIdArr[schIndex]
      });
      schName = reschollArr[schIndex];

    }
  },

  onLoad: function () {
    var that = this;
    var openId = app.getSysOpenId();
    wx.request({
      url: remoteAddress + "xcxIndex/getUserType.html",
      data: { openId: openId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.request({
          url: remoteAddress + 'xcxIndex/getProvince.html',
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
            provincedan = resproArr;//省名称

            //一级分类
            wx.request({
              url: remoteAddress + 'xcxIndex/getBusinessList.html',
              data: {},
              method: 'GET',
              success: function (res) {
                that.setData({
                  businessCategoryList: res.data.data.businessCategoryList,
                })
                bussiLength = res.data.data.businessCategoryList.length;
              }
            })

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
      url: remoteAddress + 'xcxIndex/getProvince.html',
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

