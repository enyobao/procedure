//index.js
//获取应用实例
var app = getApp();
var sha1=require('../../utils/sha1.js');
var util = require('../../utils/util');
Page({
  data: {
    hotArea:[],//热门城市
    campTypeArr:[],//种类
    details:[],//活动列表
    imgUrls:[],//轮播列表
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    currentTab: 0,
    currentShow:0,
    scroll:0,
    scrollTop:0,
    backTop:false,
    currentSelectedCity:0,
    checkBoxDetails:"",
    checkBoxChecked:false,
    locationName:"",
    campType:"",
    keyword:"",
    page:1,
    hidden:false,
    hasMore:true
  },
  //下拉刷新
  onPullDownRefresh: function(){
    console.log("刷新");
    // var that = this;
    // var js = {
    //         locationName:that.data.locationName,
    //         campType:that.data.campType,
    //         keyword:that.data.keyword,
    //         page:that.data.page+"",
    //         sessionId:app.globalData.sessionId
    //       };
    // var js1 = JSON.stringify(js);
    // var aesStr = sha1.sha1(js1+"wangguowei");
    // js.aesStr=aesStr;
    // //获取活动列表信息
    // app.getAPI('campaign/list',js,that.getList);

    wx.stopPullDownRefresh();
  },
  onLoad: function () {
    var that = this;
    that.loginFun();
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
  },
  //登录
  loginFun:function(){
    var that = this;
    wx.login({
      success: function (res) {
        var js={code:res.code};
        var js1 = JSON.stringify(js);
        var aesStr = sha1.sha1(js1+"wangguowei");
        var userData={code:res.code,aesStr:aesStr};
        app.getAPI('user/secret',userData,that.getSettion);
      }
    });
  },
  //上拉刷新
  loadMore:function(){
    var that = this;
    var js = {
            locationName:that.data.locationName,
            campType:that.data.campType,
            keyword:that.data.keyword,
            page:that.data.page+"",
            sessionId:app.globalData.sessionId
          };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    js.aesStr=aesStr;
    //获取活动列表信息
    app.getAPI('campaign/list',js,that.getList);
  },
  getSettion:function(res){
    app.globalData.sessionId = res.data.data;
    var that = this;
    //存储sessionId
    wx.setStorage({
      key: 'sessionId',
      data: res.data.data,
      success:function(res){
        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo;
            typeof cb == "function" && cb(that.globalData.userInfo);
            var userInfo = app.globalData.userInfo;
            var sessionId = app.globalData.sessionId;
            var regs = {
                  name:app.globalData.userInfo.nickName,
                  photoUrl:app.globalData.userInfo.avatarUrl,
                  sessionId:app.globalData.sessionId,
                  userInfo:JSON.stringify(userInfo)
                };
            var regs1 = JSON.stringify(regs);
            var aesStr = sha1.sha1(regs1+"wangguowei");
            var data ={
                name:app.globalData.userInfo.nickName,
                photoUrl:app.globalData.userInfo.avatarUrl,
                sessionId:app.globalData.sessionId,
                userInfo:JSON.stringify(userInfo),
                aesStr:aesStr
              };
            //用户注册请求接口
            app.getAPI('user/register',data,function(res){
              console.log("register"+JSON.stringify(res));
            });
          }
        });
        
        var js = {
            locationName:"",
            campType:"",
            keyword:"",
            page:"1",
            sessionId:app.globalData.sessionId
          };
        var js1 = JSON.stringify(js);
        var aesStr = sha1.sha1(js1+"wangguowei");
        var data ={
            locationName:"",
            campType:"",
            keyword:"",
            page:"1",
            sessionId:app.globalData.sessionId,
            aesStr:aesStr
          };
        //获取活动列表信息
        app.getAPI('campaign/list',data,that.getList);
      }
    });
  },
  //获取活动列表回答
  getList:function(res) {
      var that = this;
      var data = res.data;
      var page = that.data.page;
      if(data.code == 200){//正确数据
          var list = data.data.list; 
          var details = that.data.details;
          var img = data.data.img;
          var hotAreaArr = data.data.hotAreaArr;
          var campTypeArr = data.data.campTypeArr;
          if(list.length == 0){
              that.setData({hasMore:false});
              if(details.length>0 && page!=1){
                  return;
              }
          }
          if(details.length>0 && that.data.page > 1){
            list = details.concat(list);
          }
          page++;
          that.setData({details:list,imgUrls:img,hotArea:hotAreaArr,campTypeArr:campTypeArr,page:page,hidden:true,keyword:""});
      }
  },
  //滑动tab 切换
  bindChange:function(e){
    var that = this;
    that.setData({currentShow:e.detail.current});
  },
  //点击tab
  switchNav:function(e){
    var that = this;
    var current = e.target.dataset.current;
    if(current == 0){
        var js = {
            locationName:"",
            campType:"",
            keyword:"",
            page:"1",
            sessionId:app.globalData.sessionId
          };
        var js1 = JSON.stringify(js);
        var aesStr = sha1.sha1(js1+"wangguowei");
        js.aesStr = aesStr;
        //获取活动列表信息
        app.getAPI('campaign/list',js,that.getList);
        that.setData({currentTab:current,currentShow:current,page:1});
        that.cityReset();
        return;
    }
    that.setData({currentTab:current,currentShow:current,page:1});
  },
  //跳转到详情页
  getDetails:function(event){
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
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
  //当滚动条滚动时，header有设置背景
  changeHeader:function(event){
    var that = this;
    var scrollTop = event.detail.scrollTop;
    if(scrollTop > 10){
      that.setData({scroll:1,backTop:true});
    }else{
      that.setData({scroll:0,backTop:false});
    }
  },
  //热门城市，种类-复选框
  checkBoxChange:function(e){
    var that = this;
    var checkedTitle = e.currentTarget.id;
    var num = e.detail.value;

    switch(checkedTitle){
      case 'locationName':
      that.setData({locationName:num});
        break;
      case 'campType':
      that.setData({campType:num});
        break;
    }
  },
  //确认筛选
  citySelected:function(event){
    var that =this;
    var checkedData = that.data.checkBoxDetails;
    that.setData({currentShow:0,page:1,keyword:""});

    var js = {
            locationName:that.data.locationName,
            campType:that.data.campType,
            keyword:that.data.keyword,
            page:"1",
            sessionId:app.globalData.sessionId
          };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    js.aesStr = aesStr;
    //获取活动列表信息
    app.getAPI('campaign/list',js,that.getList);
  },
  //重置
  cityReset:function(){
    var that = this;
    that.setData({checkBoxChecked:false,locationName:"",campType:""});
  },
  //搜索
  searchFun:function(e){
    var that = this;
    that.setData({keyword:e.detail.value,page:1});
    var js = {
            locationName:that.data.locationName,
            campType:that.data.campType,
            keyword:that.data.keyword,
            page:"1",
            sessionId:app.globalData.sessionId
          };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    js.aesStr = aesStr;
    //获取活动列表信息
    app.getAPI('campaign/list',js,that.getList);
  },
  //返回顶部
  goTop:function(){
    this.setData({scrollTop:0});
  }
})
