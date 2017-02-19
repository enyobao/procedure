// pages/details/details.js
var app = getApp();
Page({
  data:{
    details:[
      {
        "name":"概述",
        "detail":"详细描述概述"
      },
      {
        "name":"基本信息",
        "detail":"详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息"
      },
      {
        "name":"行程安排",
        "detail":"详细描述概述行程安排详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息"
      },
      {
        "name":"费用说明",
        "detail":"详细描述概述费用说明详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息"
      },
      {
        "name":"报名须知",
        "detail":"详细描述概述报名须知详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息详细描述概述基本信息"
      },
      {
        "name":"评价",
        "detail":"暂无评价"
      }
    ],
    imageArr:[
      {
        link:"",
        url:"../img/dengshan.jpeg"
      },
      {
        link:"",
        url:"../img/run2.jpeg"
      },
      {
        link:"",
        url:"../img/bike.jpeg"
      },
      {
        link:"",
        url:"../img/hike.jpeg"
      }
    ],
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    currentId:[
      false,
      false,
      false,
      false,
      false,
      false
    ],
    detailsId:0,
    evaluate:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(JSON.stringify(options));
    var that = this;
    var id = options.id;
    that.setData({detailsId:id});
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
  //了解详情
  clickToDetails:function(event){
      var id = event.currentTarget.id;
      var that = this;
      var currentId = that.data.currentId;

      if(currentId[id]){
        currentId[id] = false;
      }else{
        currentId[id] = true;
      }
      that.setData({currentId:currentId});
  },
  //报名
  joinInEvent:function(event){
     var that = this;
     var id = event.currentTarget.id;
      wx.navigateTo({
        url: '/pages/trade/trade?id='+that.data.detailsId,
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
  },
  evaluateDetails:function(){
    var that = this;
    that.setData({evaluate:1});
  }
})