var $vm = getApp()
var resouId="";
var userTypeId="";
Page({
  data:{
    text:"Page user",
    userInfo: {},
    id:"",
    schoolId:"",
    openId:"",
    userTypeId:"",
    spaceName:"",
    schoolName:"",
    remark:"",
    resouId:""
  },
  
   onLoad: function (option) {
    resouId=option.id;
    userTypeId=option.userTypeId;
    var remoteAddress = $vm.remoteAddressdxf();
    var that = this
    //调用应用实例的方法获取全局数据
    $vm.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        resouId:option.id,
        userTypeId:option.userTypeId
      })
    }),

    wx.request({
      url: remoteAddress + "xcxIndex/getResourceDetail.html", //仅为示例，并非真实的接口地址
      data: {
        openId: 123,
        id: option.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          spaceName: res.data.data.spaceName,
          schoolName: res.data.data.schoolName,
          remark: res.data.data.remark
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
  },
   addsource(event){
     wx.navigateTo({
      url: '../choosetype/choosetype'
    })
   }
})