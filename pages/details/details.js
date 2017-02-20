// pages/details/details.js
var app = getApp();
var sha1=require('../../utils/sha1.js');
Page({
  data:{
    header:{
      title:"",
      price:"",
      beginTime:"",
      endTime:""
    },
    details:[
      {
        "name":"路线介绍",
        "detail":""
      },
      {
        "name":"行程安排",
        "detail":""
      },
      {
        "name":"费用说明",
        "detail":""
      },
      {
        "name":"更多介绍",
        "detail":""
      },
      {
        "name":"评论",
        "detail":""
      }
    ],
    imageArr:[],
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    currentId:[
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
    var that = this;
    var id = options.id;
    that.setData({detailsId:id});//本次活动id

    var js = {
        id:id,
        page:"1"
      };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    var data ={
        id:id,
        page:"1",
        aesStr:aesStr
      };
    //获取活动详情信息
    app.getAPI('campaign/detail',data,that.getDetail);
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
  //获取活动详情回调
  getDetail:function(res){
    // console.log("getDetail:"+JSON.stringify(res));
    var that = this;
    if(res.data.code == 200){
        var data = res.data.data;
        var details = that.data.details;
        var header = {title:data.title,price:data.price,beginTime:data.beginTime,endTime:data.endTime,destination:data.destination,rendezvous:data.rendezvous};
        details[0].detail = data.lineIntroduction;
        details[1].detail = data.scheduling;
        details[2].detail = data.expenseExplanation;
        details[3].detail = data.moreIntroduction;
        if(data.evaluateArr.length > 0){
          details[4].detail = data.evaluateArr;
        }
        that.setData({details:details,imageArr:data.imageArr,header:header});
    }

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
        url: '/pages/trade/trade?id='+that.data.detailsId+'&header='+JSON.stringify(that.data.header),
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