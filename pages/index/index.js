//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    navTab: [],
    currentNavtab: "0",
    currentShai:"0",
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    movies:[],
    peopleNum:{},//入驻人数，页面需要改
    datasource:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {


    var that = this
    var sysurl = app.remoteAddress();
    
    wx.request({
            url: sysurl+'/dlws-xiaoka-shequnku/xcxIndex/indexData.html', 
            data: {},
            method: 'GET',
            success: function(res){ 
            console.info(res); 
                that.setData({
                  navTab: res.data.data.categoryList,
                  peopleNum: res.data.data.peopleNumMap,
                  movies: res.data.data.bannerList,
                })     
                wx.request({
                  url: sysurl + '/dlws-xiaoka-shequnku/xcxIndex/querySpaceInfoByCategory.html',
                  data: { id: 1},
                  method: 'GET',
                  success: function (res) {
                    console.info(res);
                    that.setData({
                      datasource: res.data.data.po.datasource,
                    })
                  }
                })        
            }
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
   switchTab: function(e){
     console.info(e); 
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.reswitch(e)
  },
   reswitch: function(e){
    //var feed = util.getDiscovery();
    //通过分类id
    console.log(e)
    var that=this
    var id = e.currentTarget.dataset.id
    var sysurl = app.remoteAddress();
    wx.request({
            url: sysurl+'/dlws-xiaoka-shequnku/xcxIndex/querySpaceInfoByCategory.html', 
            data: {id:id},  
            method: 'GET',   
            success: function(res){   
            console.info(res); 
                that.setData({                
                  datasource: res.data.data.po.datasource,                                
                })             
            }
    })

  },
  switchSha:function(e){
    this.setData({
      currentShai: e.currentTarget.id
    });
    if(e.currentTarget.id==1){
      console.log('e.currentTarget.id==1')
     wx.navigateTo({
            url:'/pages/screen/screen'
        })
    }
  },
  
})
