// pages/user/user.js
var app = getApp();
var sha1=require('../../utils/sha1.js');
Page({
  data:{  
    motto: 'Hello World',
    userInfo: {},
    details:[],
    currentIndex:0,
    down:[
      {down:false},
      {down:false},
      {down:false}
    ]
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh();
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    var js = {
        page:"1",
        sessionId: app.globalData.sessionId
    };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    var data={
        page:"1",
        sessionId: app.globalData.sessionId,
        aesStr: aesStr
    }
    //获取个人中心-订单列表信息
    app.getAPI('order/list',data,that.getOrderList);
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取个人中心-订单列表回调
  getOrderList:function(res){
    console.log("getOrderList:"+JSON.stringify(res.data.data));
    var that = this;
    that.setData({details:res.data.data});
  },
  showUserDetail:function(e){
    var that = this;
    var index = e.currentTarget.id;
    var down = that.data.down;
    if(down[index].down){
      down[index].down = false;
    }else{
      down[index].down = true;      
    }
    that.setData({down:down});
  },
  //去评价
  goEvaluate:function(e){
    console.log("evaluate"+JSON.stringify(e));
    var that = this;
    var orderId = e.currentTarget.id;

    wx.navigateTo({
      url: '../evaluate/evaluate?orderId='+orderId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})