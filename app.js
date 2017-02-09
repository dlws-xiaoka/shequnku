//app.js
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo();
  },
  sysOpenId: '101',
  sysNickName:"我",
  aaisysHeadImgUrl :"",
  shareshareTitle:'校咖社群部落',
  getUserInfo: function (cb) {
    var that = this;
    var remoteAddress = that.remoteAddressdxf();
    var openId = "";
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      openId = wx.getStorage({
        key: 'openId',
        success: function (res) {
          console.log("缓存中数据" + res.data);
          if (undefined != res.data) {
            openId = res.data;
            that.sysOpenId = openId;
          }
          return res.data;
        }
      })
      if (typeof (openId) == "undefined") {
        wx.login({
          success: function (res) {
            res.code;
            wx.request({
              url: remoteAddress + "weixin/getOpenidSessionKeyByCode.html",
              data: { code: res.code },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                openId = res.data.data.openId;
                that.sysOpenId = openId;
                wx.setStorage({
                  key: "openId",
                  data: openId
                });
                return res;
              }
            })
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo;
                that.sysNickName=res.userInfo.nickName;
                that.sysHeadImgUrl=res.userInfo.avatarUrl;
                  
                wx.request({
                  url: remoteAddress + "weixin/addUserInfo.html",
                  data: { openId: openId, name: res.userInfo.nickName, sex: res.userInfo.gender, province: res.userInfo.province, city: res.userInfo.city, headImgUrl: res.userInfo.avatarUrl, country: res.userInfo.country },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    return res;
                  }
                })
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
        })
      } else {
        console.log(openId);
      }

    }
  },
  globalData: {
    userInfo: null
  },
  getSysOpenId: function () {
    // wx.getStorage({
    //   key: 'openId',
    //   success: function (res) {
    //     console.log("sys open is="+res.data);
    //     return res.data;
    //   }
    // })
    var that = this;
    console.log("返回openid" + that.sysOpenId);
    return that.sysOpenId;

  },
  remoteAddressdxf: function () {
    //部署环境使用
    return "https://xcx.xiaoka360.com/dlws-xiaoka-shequnku/";
    //本地环境使用
  //  return "http://localhost:8080/dlws-xiaoka-shequnku/";
  }
})
