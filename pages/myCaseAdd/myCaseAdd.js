var $vm = getApp()
var openId = $vm.getSysOpenId();

var sysurl = $vm.remoteAddressdxf();
var msgtitle = "";
var msgcontant = "";
var spaceId = "";
var imgStr = "";
var tempFilePaths = "";
var imgUrl = "";
var idx = 0;
var uploadPics = "";


Page({
  data: {
    text: "Page user",
    userInfo: {},
    allimg: {},
    spaceId: {},
    hidden: true
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      hidden: !this.data.hidden
    });
    var that = this
    spaceId = e.currentTarget.dataset.spaceid;
    console.log(e)
    // var imgStr = imgUrl;
    var browseNum = 0;
    //表单校验-标题
    if (msgtitle.length < 5) {

      wx.showToast({
        title: '标题长度不得少于5个字符',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    //表单校验-内容
    if (msgcontant.length < 5) {

      wx.showToast({
        title: '内容长度不得少于5个字符',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    //表单校验-图片
    /* if (patharr.length == 0) {
       wx.showToast({
         title: '图片不能为',
         icon: 'fail',
         duration: 2000
       })
       return;
     }*/

    that.uploadCaseImg(idx, that);
    console.log('idx是这么多======' + idx)
  },

  onLoad: function (e) {
    console.log('onLoad')
    openId = $vm.getSysOpenId();
    spaceId = e.spaceId
    var that = this
    that.setData({
      spaceId: spaceId
    })
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

  },

  bindimg: function (e) {
    var that = this;
    console.log(e)
    wx.chooseImage({
      count: 3, // 最多上传照片个数--默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {


        console.log(res)
        var patharr = new Array();
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
        //that.uploadCaseImg(idx, that);
      }
    })

  },
  uploadCaseImg: function (idx, that) {
    if (tempFilePaths.length == 0) {

      wx.showToast({
        title: '图片不能为空',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    console.log(sysurl + 'xcxIndex/uploadImg.html');
    wx.uploadFile({
      contentType: "multipart/form-data",
      url: sysurl + 'xcxIndex/uploadImg.html',
      filePath: tempFilePaths[idx],//要上传文件资源的路径
      name: 'pic',
      success: function (res) {
        var data = res.data;
        var obj = JSON.parse(data);
        imgUrl = obj.data.path;
        uploadPics += imgUrl + ",";
        //imgAll.push(imgUrl[i]);
        idx++;
        if (idx < tempFilePaths.length) {
          that.uploadCaseImg(idx, that);
        } else {
          if (idx == tempFilePaths.length) {

            wx.request({
              url: sysurl + 'xcxIndex/addCase.html',
              data: {
                spaceId: spaceId,
                title: msgtitle,
                caseContent: msgcontant,
                browseNum: 0,
                openId: $vm.getSysOpenId(),
                imgStr: uploadPics

              },
              method: 'GET',
              success: function (res) {
                //重置变量
                uploadPics = "";
                msgtitle = "";
                msgcontant = "";
                tempFilePaths="";
                console.info(res);
                wx.redirectTo({
                  url: '../myCase/myCase?spaceId=' + spaceId
                })
              }
            })
          }

        }
        console.log('服务器返回地址----------------' + uploadPics);
      }
    })
  }


})