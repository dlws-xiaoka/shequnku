//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    navTab: ["社团", "技能达人", "微信群", "QQ群","公众号"],
    currentNavtab: "0",
    currentShai:"0",
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    movies:[  
          {url:'http://img2.imgtn.bdimg.com/it/u=2335862085,307954931&fm=21&gp=0.jpg'} ,  
          {url:'http://img2.imgtn.bdimg.com/it/u=2335862085,307954931&fm=21&gp=0.jpg'} ,  
          {url:'http://img2.imgtn.bdimg.com/it/u=2335862085,307954931&fm=21&gp=0.jpg'} ,  
          {url:'http://img2.imgtn.bdimg.com/it/u=2335862085,307954931&fm=21&gp=0.jpg'}   
          ]

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
   switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  switchSha:function(e){
    this.setData({
      currentShai: e.currentTarget.id
    });
    if(e.currentTarget.id==1){
     wx.navigateTo({
            url:'/pages/screen/screen'
        })
    }
  }
})
