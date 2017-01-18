var $vm = getApp()
var sysurl = $vm.remoteAddress();
var msgtitle = "";
var msgcontant = "";
var spaceId = "";
var openId = "";
var imgStr = "";
var tempFilePaths = "";
var imgUrl = "";



/*
function addCase(that){
  wx.request({
            url: sysurl+'dlws-xiaoka-shequnku/xcxIndex/addCase.html', 
            data: {
              spaceId:spaceId,
              title:msgtitle,
              caseContent:msgcontant,
              browseNum:browseNum,
              openId:openId,
              imgStr:imgStr
            },  
            method: 'GET',   
            success: function(res){
            console.info(res);
            var list=that.data.leaveList;
            var data=res.data.data.messageMap;
            list.push(data);
              that.setData({
                leaveList: list
              })
            }
    })
}*/

Page({
  data: {
    text: "Page user",
    userInfo: {},
    allimg: {}
  },
  //弹出确认框  
  modalTap: function (e) {
    var that = this
    //var id=options.id;
    spaceId = 1;
    openId = 456;
    var imgStr = imgUrl;
    var browseNum = 0;
    //表单校验-标题
    if (msgtitle.length < 5) {
      wx.showToast({
        title: '标题长度不得少于5个字符',
        icon: 'fail',
        duration: 2000
      })
      return;
    }
    //表单校验-内容
    if (msgcontant.length < 5) {
      wx.showToast({
        title: '内容长度不得少于5个字符',
        icon: 'fail',
        duration: 2000
      })
      return;
    }
    //表单校验-图片
    if (imgStr.length < 1) {
      wx.showToast({
        title: '图片不为空',
        icon: 'fail',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: sysurl + 'dlws-xiaoka-shequnku/xcxIndex/addCase.html',
      data: {
        spaceId: spaceId,
        title: msgtitle,
        caseContent: msgcontant,
        browseNum: browseNum,
        openId: openId,
        imgStr: imgStr

      },
      method: 'GET',
      success: function (res) {
        console.info(res);
        that.setData({
          caseNumber: res.data.caseNumber,
          caseList: res.data.caseList,
        })
      }
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    $vm.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
    console.log('页面渲染完成')
  },
  onShow: function () {
    // 页面显示
    console.log('页面显示')
  },
  onHide: function () {
    // 页面隐藏
    console.log('页面隐藏')
  },

  //获取title
  bindtitle: function (e) {
    msgtitle = e.detail.value
  },
  //获取contant
  bindcontant: function (e) {
    msgcontant = e.detail.value
  },
  onUnload: function (e) {
    // 页面关闭
    var that = this

    //var id=options.id;
    /*spaceId = 1;
    openId = 456;
    var imgStr = imgUrl;
    var browseNum = 0;
    wx.request({
      url: sysurl + 'dlws-xiaoka-shequnku/xcxIndex/addCase.html',
      data: {
        spaceId: spaceId,
        title: msgtitle,
        caseContent: msgcontant,
        browseNum: browseNum,
        openId: openId,
        imgStr: imgStr

      },
      method: 'GET',
      success: function (res) {
        console.info(res);
        that.setData({
          caseNumber: res.data.caseNumber,
          caseList: res.data.caseList,
        })
      }
    })*/
    //   addCase(that);
  },
  bindimg: function (e) {

    var that = this;
    console.log(e)
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        var patharr = new Array();
        console.log(res)

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths;
        //回显
        for (var i = 0; i < tempFilePaths.length; i++) {
          patharr.push(tempFilePaths[i]);
        }
        that.setData({
          allimg: patharr
        })
        //获取路径
        //var imgAll = new Array();
        //for (var i = 0; i < tempFilePaths.length; i++) {
        wx.uploadFile({
          contentType: "multipart/form-data",
          url: sysurl + 'dlws-xiaoka-shequnku/xcxIndex/uploadImg.html', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],//要上传文件资源的路径
          name: 'pic',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data;
            var obj = JSON.parse(data);
            imgUrl = obj.data.path;
            //imgAll.push(imgUrl[i]);
            console.log(imgUrl);

          }
        })
        // }





      }
    })
  }/*, 
  uploadPic:function(fileUrl){

       wx.uploadFile({
            contentType: "multipart/form-data",
            url: sysurl + 'dlws-xiaoka-shequnku/xcxIndex/uploadImg.html', //仅为示例，非真实的接口地址
            filePath: fileUrl,//要上传文件资源的路径
            name: 'pic',
            success: function (res) {
              var data = res.data;
              var obj = JSON.parse(data);
              imgUrl = obj.data.path;
              
              return imgUrl;
              //console.log(allimg)
              //do something
            }
          })

  }*/

})