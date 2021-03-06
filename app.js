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
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
            // console.log("userInfoFun:"+JSON.stringify(res));
          }
        });
    }
  },
  globalData:{
    userInfo:null,
    sessionId:""
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