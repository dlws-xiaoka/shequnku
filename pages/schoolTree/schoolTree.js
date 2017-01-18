var $vm = getApp()

Page({
  data:{
    text:"Page user",
    userInfo: {},
    schoolId:"",
    schoolName:"",
    userTypeId:"",
    spaceName:"",
    provinceName:"",
    phone:"",
    remark:"",
    wxNumber:"",
    childcategoryId:""
  },
   addsource(event){
     
   },
   onLoad: function (option) {
    var remoteAddress = app.remoteAddressdxf();
    var that = this
    //调用应用实例的方法获取全局数据
    $vm.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
      that.setData({
        schoolId:"",
        schoolName:"",
        userTypeId:"",
        spaceName:"",
        provinceName:"",
        phone:"",
        remark:"",
        wxNumber:"",
        childcategoryId:""
        })
     wx.request({
        url: remoteAddress+"xcxIndex/addResource.html", 
        data:{openId:123},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            leaveCount:res.data.data.leaveCount,
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