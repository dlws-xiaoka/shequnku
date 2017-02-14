// pages/filter/filter.js

var tcity = require("../../utils/city.js");

var app = getApp()
var remoteAddress = app.remoteAddressdxf();
var openId = app.getSysOpenId();
var pid = "";
var chidCaIdArr = "";//所有的微信号子分类Id
var chidCaId = "";//传后台的子分类Id
var childcategoryId = "";
var provincedan = "";//所有省
var provinceSin = "";//传后台的省
var cityIdArr = "";
var cityId = "";
var schName = ""//学校名称
var reschollArr = "";//学校名称数组
var schooIdArr = "";//全部的学校Id
var schArrId = ""//学校Id 校验用
var typeIndex = 0;//用户所属类型(微信,QQ群...)
var bussiLength = ""//二级分类长度
Page({
  data: {
    setDisabled: function (e) {
      this.setData({
        disabled: !this.data.disabled
      })
    },

    businessCategoryList: '',
    locationArray: ['河北', '河南', '安徽', '云南', '贵州', '江西', '广州', '广西', '福建', '山东'],
    locationArray2: ['信阳市', '保定市', '合肥市', '南阳市'],
    typeFlag: "",
    childCategoryList: '',
    chidCatIndex: 0,
    chidCaId: '',
    provinceList: '',
    ProvenIndex: 0,
    schIndex: 0,
    schArrId: '',
    schArrId: '',
    provinceSin: '',//传后台的省
    cityList: '',
    cityIndex: 0,
    hides: false,
    hide: true,
    wxSData: '',
    locationArray3: ['清华大学', '北京大学', '安徽大学', '暨南大学'],
    items: [
      { value: '一级分类' },
      { value: '二级分类', checked: 'true' },
      { value: '二三级分类' },
      { value: '分类' },
      { value: '英国' },
      { value: '法国' },
    ],
  },
  locationIndex: 2,
  locationIndex2: 1,
  locationIndex2: 1,
  chooseSchool(e) {
    if (this.data.locationIndex3 || e.detail.value) {

      this.setData({
        locationIndex3: e.detail.value
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
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (e) {
    console.log("onLoad");
    var that = this;
    pid = e.pid;
    //获取筛选类型
    that.setData({
      typeFlag: e.typeFlag
    })
    tcity.init(that);






    //一级分类
    wx.request({
      url: remoteAddress + 'xcxIndex/getBusinessList.html',
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          businessCategoryList: res.data.data.businessCategoryList,
        })
        console.log(pid)
        wx.request({
          url: remoteAddress + 'xcxIndex/getChildCategoryList.html',
          data: { pId: pid },
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
            //获取省市
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
              }
            })
          }
        })

        bussiLength = res.data.data.businessCategoryList.length;
      }
    })

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');

  },


  wxType(e) {
    var that = this;
    if (this.data.chidCatIndex || e.detail.value) {
      var chidCatIndex = e.detail.value
      this.setData({
        chidCatIndex: e.detail.value,
        chidCaId:chidCaIdArr[chidCatIndex]
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
        schArrId = schooIdArr[0];
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
      schArrId = schooIdArr[schIndex];//学校Id 校验用的
    }
  },
  selectResource: function (e) {

    var that = this;
    console.log(e)
    var arr = e.detail.value;
    var cbxgroupArr = "";

    for (var i = 0; i < bussiLength; i++) {
      var temId = "cbxgroup_" + i;
      console.log(temId)

      if (arr[temId].length > 0) {
        cbxgroupArr += arr[temId] + ",";
      }

    }
    cbxgroupArr = cbxgroupArr.substr(0, cbxgroupArr.length - 1);

    var spaceName = e.detail.value.spaceName
    var schoolId = e.detail.value.schoolId;
    var chidId = e.detail.value.childcategoryId;
    var businessId = cbxgroupArr;
    console.log('cityId' + cityId)
    console.log('schoolId' + schoolId)
    console.log('chidId' + chidId)
    console.log('businessId' + businessId)
    console.log('spaceName' + spaceName)

    wx.request({
      url: remoteAddress + 'xcxIndex/selectResource.html',
      data: {
        cityId: cityId != undefined ? cityId : '',//城市id
        schoolId: schoolId != undefined ? schoolId : '',//学校id
        businessId: cbxgroupArr != undefined ? cbxgroupArr : '',//分类
        chidId: chidId != undefined ? chidId : '',//业务分类
        spaceName: spaceName != undefined ? spaceName : ''//空间名称
      },
      method: 'GET', // 
      success: function (res) {
        // success
        console.log('+++++++++++++++++++++++')
        console.log(res)
        if (res.data.data.resourceList.length == 0) {
          wx.showToast({
            title: '搜索内容为空',
            icon: 'loading',
            duration: 2000
          })
          return;
        } else {
          that.setData({
            wxSData: res.data.data.resourceList,
            hides: true,
            hide: false
          })
        }
        cityId = '',
          schoolId = '',
          chidId = '',
          businessId = '',
          spaceName = '',
          cbxgroupArr = ''
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

