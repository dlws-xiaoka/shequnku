var $vm = getApp()
var openId=$vm.getSysOpenId();

Page({
  data:{
    text:"Page user",
    userInfo: {},
    changeColor:function(e){
      this.setdata({
        background:"13b1a3"
      })
    },
    items: [
      {value: '一级分类'},
      {value: '二级分类', checked: 'true'},
      {value: '二三级分类'},
      {value: '分类'},
      {value: '英国'},
      {value: '法国'},
    ]
  },
  
   onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    $vm.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
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