var app = getApp()
var openId=app.getSysOpenId();

Page({
  data:{
    text:"Page user",
    userInfo: {},
    businessList:{},
    caseList:{},
    userListInfo: [],
    childCategoryName:"",
    wxNumber:"",
    typeFlag:"",
    cityName:"",
    schoolName:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var sysurl = app.remoteAddressdxf();
    console.log(options)
    var id=options.id;
    //var spaceId=3;
    wx.request({
            url: sysurl+'xcxIndex/spaceDetailInfo.html', 
            data: {
              id:id,
             // spaceId:spaceId
            },  
            method: 'GET',   
            success: function(res){   
            console.info(res); 
                that.setData({
                  typeFlag:res.data.data.spaceInfoMap.typeFlag,
                  childCategoryName:res.data.data.spaceInfoMap.childCategoryName,
                  wxNumber:res.data.data.spaceInfoMap.wxNumber,
                  cityName:res.data.data.spaceInfoMap.cityName,
                  schoolName:res.data.data.spaceInfoMap.schoolName,
                  userInfo: res.data.data.spaceInfoMap,  
                  businessList: res.data.data.businessList, 
                  caseList: res.data.data.caseList, 

                })             
            }
    })

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