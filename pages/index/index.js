//index.js

var page=0;
var pageNum=0;
var page_size=5;
var userType=""
//获取应用实例
var app = getApp()
var openId=app.getSysOpenId();

var sysurl = app.remoteAddressdxf();
var GetList = function(that){
  
  wx.request({
    url: sysurl + 'xcxIndex/indexData.html',
    data: {},
    method: 'GET',
    success: function (res) {
      console.info(res);
      that.setData({
        navTab: res.data.data.categoryList,
        peopleNum: res.data.data.peopleNumMap,
        movies: res.data.data.bannerList,
      })
      if(userType==""&&userType!='all'){
      userType=res.data.data.categoryList[0].id;
      }else if(userType=='all'){
        userType="";
      }
      wx.request({
        url: sysurl + 'xcxIndex/querySpaceInfoByCategory.html',
        data: { userTypeId: userType,
        start:page
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          var datasourceL = that.data.datasource;
          if(pageNum<res.data.data.po.absolutePage){
            for(var i=0;i<res.data.data.po.datasource.length;i++){
            datasourceL.push(res.data.data.po.datasource[i]);
            }
            that.setData({
              datasource: datasourceL,
            })
          }
            that.setData({
              hidden:true
            })

        }
      })
    }
  })
}



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
    flag:false,
    feed_length: 0,
    movies:[],
    peopleNum:{},//入驻人数，页面需要改
    datasource:[],
    hidden:true,
        list:[],
        scrollTop : 0,
        userTypeId:""
  },
   onShareAppMessage: function () {
    return {
      title: app.shareshareTitle,
      desc: '',
      path: '/page/index/index'
    }
  },

  onLoad: function () {
    var that = this;
     wx.getSystemInfo({
     success:function(res){
       console.info("windowHeight="+res.windowHeight);
       
     }
   });

  },

   switchTab: function(e){

     console.info(e); 
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
      datasource:[]
    });
    this.reswitch(e)
  },
   reswitch: function(e){
    //var feed = util.getDiscovery();
    //通过分类id
    console.log(e)
    var that=this
    var id = e.currentTarget.dataset.id
    userType=id;
    page=0;
    pageNum=0;
    GetList(that);
  },
 
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
    page=0;
    pageNum=0;
    this.setData({
      datasource:[]
    });
    GetList(that);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    page+=10;
    pageNum++;
    that.setData({
    hidden:false
  });
    GetList(that);

  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  switchAll:function(e){
    var that=this;
    page=0;
    pageNum=0;
    userType="all"
    this.setData({
      datasource:[]
    });
    GetList(that);
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
  }
})
