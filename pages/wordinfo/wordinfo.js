// pages/wordinfo/wordinfo.js
var app = getApp();
var sysurl = app.remoteAddressdxf();
var message="";
var spaceId="";
var pId="";
var openId="";//ok

function addMesage(that){
  //表单校验-内容
    if (message.length < 3) {
      wx.showToast({
        title: '内容长度不得少于3个字符',
        icon: 'fail',
        duration: 2000
      })
      return;
  }
  wx.request({
            url: sysurl+'dlws-xiaoka-shequnku/xcxIndex/sendMessage.html', 
            data: {
              pId:pId,
              spaceId:spaceId,
              openId:openId,
              message:message
            },  
            method: 'GET',   
            success: function(res){ 
            console.info(res);          
            var list=that.data.leaveList;
           // var data=[{id:'12312',message:'999'}];
           var data=res.data.data.messageMap;
            list.push(data);
            that.setData({
              leaveList: list
            })
            }
    })
}
Page({
  data:{
    leaveList:{},
    inputValue:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this

    console.log(options)
    openId=options.openId;
    spaceId = options.spaceId;
    pId = options.pId;
    wx.request({
      url: sysurl + 'dlws-xiaoka-shequnku/xcxIndex/getLeaveComment.html',
      data: {
        spaceId:spaceId,
        openId: openId
      },
      method: 'GET',
      success: function (res) {
        console.info(res);
        var s = res.data.data.leaveList;
        if(s.length==0){
          pId=0;          
          console.log('99999999999999---'+pId)
        }else{
          pId = res.data.data.leaveList[s.length-1].id
          console.log('88888888888888---'+pId)
        }
        that.setData({
          leaveList: res.data.data.leaveList,
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
  bindblur:function(e){
    //添加留言
    this.setData({
      inputValue:e.detail.value
    })
    message=e.detail.value
  },
  bindblurs:function(e){
    this.bindblur()
  },
  send:function(e){
    var that = this
    var sysurl = app.remoteAddress(); 
    pId=pId;
    spaceId=spaceId;
    message=message;


    console.info(message)
    console.info(spaceId)
    console.info(pId)
    console.info(openId)

    addMesage(that);
   
  }
})