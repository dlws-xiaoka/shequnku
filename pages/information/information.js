// pages/information/information.js
var app = getApp()
var openId = app.getSysOpenId();
var remoteAddress = app.remoteAddressdxf();
var userTypeId = "";
var id = "";

var provincedan = "";//所有省
//var provinceSin = "";//传后台的省
var provinceName = "";//传后台的省
var cityIdArr = "";
var cityId = "";
var schName = ""//学校名称
var reschollArr = "";//学校名称
var schooIdArr = "";//全部的学校Id
var childcategoryId = "";//用户分类下的子分类(第一个)
var chidCaIdArr = ""//用户分类下的子分类(全部)
//根据省选择市
function choseCity(provinceb, that) {
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

//根据市选择学校
function choseSchol(cityId, that) {
  wx.request({
    url: remoteAddress + '/xcxIndex/getSchoolListByCityId.html',
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
}
//用户分类下的子分类
function choseChild(childCategoryList, childcategoryId, that) {
  var chidList = childCategoryList;
  var chidCaArr = new Array();//子分类名称
  chidCaIdArr = new Array();//子分类Id
  if (chidList) {
    for (var i = 0; i < chidList.length; i++) {
      chidCaArr.push(chidList[i].childCategoryName);
      chidCaIdArr.push(chidList[i].id);
      
      if (chidList[i].id == childcategoryId) {
       
        that.setData({
          chidCatIndex : i
        })
      }

    }
  }

  that.setData({
    childCategoryList: chidCaArr,
    chidCaId: childcategoryId
  })
  childcategoryId = childcategoryId;

}
Page({
  data: {
    childCategoryList: '',
    cityList: "",
    cityIndex: 0,
    provinceList: '',
    resourceMap: '',
    schoolList: '',
    typeName: '',
    schIndex: 0,
    schArrId: '',
    ProvenIndex: 0,
    //provinceSin: '',//传后台的值
    remark: '',
    provinceName: '',//回显省
    chidCaId: '',//用户分类下的子分类
    chidCatIndex: 0,
    headImgUrl: ''
  },
  changeProven(e) {
    var that = this;
    if (this.data.ProvenIndex || e.detail.value) {
      var ProvenIndex = e.detail.value
      this.setData({
        ProvenIndex: e.detail.value,
        provinceName: provincedan[ProvenIndex]
      });
      var provinceb = provincedan[ProvenIndex];
      provinceName = provinceb;
      choseCity(provinceName, that);//根据省查出城市
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

    choseSchol(cityId, that);//根据城市查出学校的值
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
  wxType(e) {
    var that = this;
    if (this.data.chidCatIndex || e.detail.value) {
      var chidCatIndex = e.detail.value
      this.setData({
        chidCatIndex: e.detail.value,
        chidCaId: chidCaIdArr[chidCatIndex]
      });
      childcategoryId = chidCaIdArr[chidCatIndex];
    }
  },
  onLoad: function (options) {
    openId = app.getSysOpenId();
    var that = this;
    userTypeId = options.userTypeId;
    id = options.id;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    }),

      // 页面初始化 options为页面跳转所带来的参数
      wx.request({
        url: remoteAddress + "xcxIndex/toUpdateResourceData.html", //仅为示例，并非真实的接口地址
        data: {
          openId: openId,
          pId: options.userTypeId,
          id: options.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          var proArr = res.data.data.provinceList;
          var resproArr = new Array();
          for (var i = 0; i < proArr.length; i++) {
            resproArr.push(proArr[i].province);
          }
          provincedan = resproArr;//省名称
          that.setData({
            resourceMap: res.data.data.resourceMap,
            provinceName: res.data.data.resourceMap.provinceName,
            cityName: res.data.data.resourceMap.cityName,
            cityId: res.data.data.resourceMap.cityId,
            schoolName: res.data.data.schoolName,
            remark: res.data.data.resourceMap.remark,
            spaceName: res.data.data.resourceMap.spaceName,
            wxNumber: res.data.data.resourceMap.wxNumber,
            phone: res.data.data.resourceMap.phone,
            typeName: res.data.data.resourceMap.typeName,
            provinceList: resproArr, //全部省
            //childCategoryList: res.data.data.resourceMap.childCategoryList,//二级分类
            headImgUrl: res.data.data.resourceMap.headImgUrl
          })
          childcategoryId = res.data.data.resourceMap.childcategoryId;//二级分类

          var provinceName = res.data.data.resourceMap.provinceName;//回显省的值
          var cityName = res.data.data.resourceMap.cityName;//回显市的值
          var cityId = res.data.data.resourceMap.cityId;//回显市的值
          for (var i = 0; i < resproArr.length; i++) {//遍历省从而给页面回显省
            if (provinceName == resproArr[i]) {
              that.setData({ ProvenIndex: i })
            }
          }
          choseCity(provinceName, that)//根据省查出城市
          choseSchol(cityId, that) //根据城市查出学校
          choseChild(res.data.data.childCategoryList, childcategoryId, that)//根据用户类别查出子分类
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
    //手机验证
    var reg=/^0?(13|15|18|17)[0-9]{9}$/; 
    if (reg.test(arr.phone)==false) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    //简介验证
    if (arr.remark.length < 5) {
      wx.showToast({
        title: '简介长度不得小于5个单位',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: remoteAddress + '/xcxIndex/updateResource.html',
      data: {
        openId: openId,
        userTypeId: userTypeId == undefined ? '' : userTypeId,
        spaceName: arr.spaceName != undefined ? arr.spaceName : '',
        remark: arr.remark == undefined ? '' : arr.remark,
        resourceId: id == undefined ? '' : id,
        wxNumber: arr.wxNumber == undefined ? '' : arr.wxNumber,
        phone: arr.phone != undefined ? arr.phone : '',
        provinceName: arr.provinceName == undefined ? '' : arr.provinceName,
        schoolName: schName == undefined ? '' : schName,
        schoolId: arr.schoolId != undefined ? arr.schoolId : 0,
        childcategoryId: childcategoryId == undefined ? 0 : childcategoryId
      },
      method: 'GET',

      success: function (res) {
        /*wx.switchTab({
         url: '../user/user'
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