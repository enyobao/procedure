//app.js
var sha1=require('utils/sha1.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      that.loginFun();
    }
  },
  getSettion:function(res){
    console.log("getSettion"+JSON.stringify(res));
    wx.setStorage({
      key: 'sessionId',
      data: res.data,
      success:function(res){
        console.log("storage"+JSON.stringify(res));
      }
    });
  },
  globalData:{
    userInfo:null,
    starNum:0,
    sessionId:""
  },
  loginFun:function(){
    var that = this;
    wx.login({
      success: function (res) {
        console.log("userInfoFun:"+JSON.stringify(res));
        var js={code:res.code};
        var js1 = JSON.stringify(js);
        var aesStr = sha1.sha1(js1+"wangguowei");
        var userData={code:res.code,aesStr:aesStr};
        // console.log("userData"+JSON.stringify(userData));
        that.getAPI('user/secret',userData,that.getSettion); 
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
            // console.log("userInfoFun:"+JSON.stringify(res));
          }
        });
        // wx.getStorage({
        //   key:'sessionId',
        //   success:function(res){
        //     console.log("sessionId:"+res.data);
        //     that.globalData.sessionId = res.data;
        //   }
        // });
      }
    });
  },
  //接口公用函数
  getAPI:function(api,data,fnSuc){
    wx.request({
      url: 'https://www.ioutdoor.org/api/'+api, 
      method:'POST',
      header: {"Content-Type":"application/x-www-form-urlencoded"},
      data:data,
      success: fnSuc,
      fail:function(){
        
      }
    })
  }
})