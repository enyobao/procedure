// pages/user/user.js
var app = getApp();
Page({
  data:{  
    motto: 'Hello World',
    userInfo: {},
    details:[
      {
        statusMark:'已完成',
        campTitle:"色彩云南 色彩云南 色彩云南 色彩云南",
        headImg:"../img/car.jpeg",
        evaluateMark:'评价按钮字样',
        mark:'留言',
        createTime:'date',
        phone:'12333445566',
        campId:'活动ID',
        userName:'anier',
        amount:"总价格",
        userId:'用户id'
      },
      {
        statusMark:'已完成',
        campTitle:"色彩云南 色彩云南 色彩云南 色彩云南",
        headImg:"../img/car.jpeg",
        evaluateMark:'评价按钮字样',
        mark:'留言',
        createTime:'date',
        phone:'12333445566',
        campId:'活动ID',
        userName:'anier',
        amount:"总价格",
        userId:'用户id'
      }
    ],
    currentIndex:0,
    down:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showUserDetail:function(e){
    var that = this;
    var index = e.currentTarget.id+1;
    that.setData({down:true,currentIndex:index});
  }
})