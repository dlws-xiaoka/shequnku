//app.js
App({
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  remoteAddress:function(){
    return "http://192.168.15.99:8080/";//wxl
  },
  //统一请求入口，需传入请求地址：url，请求参数：data
  getData:function(url,data){
    var remoteAddress  = "http://localhost:8080/xxxxxxxx/";

    //未来会在此处做缓存
    //缓存开始
    // 1.通过url为key 从store中get，如果有就返回，如果没有继续

    //缓存结束
    wx.request({
        url: remoteAddress+url, //仅为示例，并非真实的接口地址
        data:data,
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.info(res);
          return res;
        }
      })
  }
})