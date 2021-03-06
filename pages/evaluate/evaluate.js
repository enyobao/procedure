// pages/evaluate/evaluate.js
var app = getApp();
var sha1=require('../../utils/sha1.js');
Page({
  data:{
    star:[
      {star:false,starSrc:"../img/star.png"},
      {star:false,starSrc:"../img/star.png"},
      {star:false,starSrc:"../img/star.png"},
      {star:false,starSrc:"../img/star.png"},
      {star:false,starSrc:"../img/star.png"}
    ],
    orderId:0,
    starLevel:0
  },
  onLoad:function(options){
    var orderId = options.orderId;
    var that = this;
    that.setData({orderId:orderId});
    // 页面初始化 options为页面跳转所带来的参数
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
  clickStar:function(e){
    var that = this;
    var index = parseInt(e.currentTarget.id);
    var star = that.data.star;
    var starLevel;
    if(star[index].star == true){
      for(var i=4;i>=index;i--){
        star[i].star = false;
        star[i].starSrc="../img/star.png";
      }
      starLevel = index;
    }else{
      for(var i=0 ;i<=index;i++){
        star[i].star = true;
        star[i].starSrc="../img/staron.png";
      }
      starLevel = index+1;
    }
    that.setData({star:star,starLevel:starLevel});
  },
  handleEvaluate:function(e){
    var that = this;
    var mark = e.detail.value.text;
    var starLevel = that.data.starLevel;
    var orderId = that.data.orderId;

    var js = {
        starLevel:starLevel+"",
        orderId:orderId+"",
        mark:mark,
        sessionId:app.globalData.sessionId        
      };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    var data ={
        starLevel:starLevel+"",
        orderId:orderId+"",
        mark:mark,
        sessionId:app.globalData.sessionId,
        aesStr:aesStr
      };
    //获取活动详情信息
    app.getAPI('order/evaluate',data,that.getEvaluateRes);
  },
  getEvaluateRes:function(res){
    console.log("getEvaluateRes"+JSON.stringify(res));
    if(res.data.code == 200){
      wx.showModal({
        title: '提示',
        content: "评价完成，点击确认返回订单列表。",
        success: function(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            });
          }
        }
      });
    }else{
      wx.showModal({
        title: '提示',
        content: res.data.info,
        success: function(res) {
          if (res.confirm) {
          }
        }
      });
    }
  }
})