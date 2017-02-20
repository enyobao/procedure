// pages/user/user.js
var app = getApp();
Page({
  data:{  
    motto: 'Hello World',
    userInfo: {},
    details:[
      {
        status:1,
        statusMark:'支付完成',
        campTitle:"色彩云南 色彩云南 色彩云南 色彩云南",
        headImg:"../img/car.jpeg",
        evaluateMark:'评价按钮字样',
        mark:'留言',
        createTime:'date',
        userDetail:[
          {userName:'anier',phone:'12333445566'},
          {userName:'anier',phone:'12333445566'},
          {userName:'anier',phone:'12333445566'}         
        ],
        campId:'活动ID',
        amount:"总价格",
        userId:'用户id'
      },
      {
        status:2,
        statusMark:'活动进行中',
        campTitle:"色彩云南 色彩云南 色彩云南 色彩云南",
        headImg:"../img/car.jpeg",
        evaluateMark:'评价按钮字样',
        mark:'留言',
        createTime:'date',
        userDetail:[
          {userName:'anier',phone:'12333445566'},
          {userName:'anier',phone:'12333445566'},
          {userName:'anier',phone:'12333445566'}         
        ],
        campId:'活动ID',
        amount:"总价格",
        userId:'用户id'
      },
      {
        status:3,
        statusMark:'活动已结束',
        campTitle:"色彩云南 色彩云南 色彩云南 色彩云南",
        headImg:"../img/car.jpeg",
        evaluateMark:'评价按钮字样',
        mark:'留言',
        createTime:'date',
        userDetail:[
          {userName:'anier',phone:'12333445566'},
          {userName:'anier',phone:'12333445566'},
          {userName:'anier',phone:'12333445566'}         
        ],
        campId:'活动ID',
        amount:"总价格",
        userId:'用户id'
      }

    ],
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
    var index = e.currentTarget.id;
    var down = that.data.down;
    if(down[index].down){
      down[index].down = false;
    }else{
      down[index].down = true;      
    }
    that.setData({down:down});
  },
  goEvaluate:function(e){
    var that = this;
    var campId = e.currentTarget.campid;

    wx.navigateTo({
      url: '../evaluate/evaluate?campId='+campId,
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