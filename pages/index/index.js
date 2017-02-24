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
    currentSelectedCity:0,
    checkBoxDetails:[],
    checkBoxChecked:false
  },
  //下拉刷新
  onPullDownRefresh: function(){
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
      console.log(that.data);
    });
  },
  //登录
  loginFun:function(){
    var that = this;
    wx.login({
      success: function (res) {
        console.log("userInfoFun:"+JSON.stringify(res)); 
    
        var js={code:res.code};
        var js1 = JSON.stringify(js);
        var aesStr = sha1.sha1(js1+"wangguowei");
        var userData={code:res.code,aesStr:aesStr};
        app.getAPI('user/secret',userData,that.getSettion);
      }
    });
  },
  getSettion:function(res){
    console.log("getSettion"+JSON.stringify(res));
    app.globalData.sessionId = res.data.data;
    var that = this;
    //存储sessionId
    wx.setStorage({
      key: 'sessionId',
      data: res.data.data,
      success:function(res){
        console.log("storage"+JSON.stringify(res));
        //获取用户信息
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo;
            typeof cb == "function" && cb(that.globalData.userInfo);
            // var userInfo = JSON.stringify(app.globalData.userInfo);
            var userInfo = app.globalData.userInfo;
            var sessionId = app.globalData.sessionId;
            // console.log("sessionId"+sessionId);
            var regs = {
                  name:app.globalData.userInfo.nickName,
                  photoUrl:app.globalData.userInfo.avatarUrl,
                  sessionId:app.globalData.sessionId,
                  userInfo:JSON.stringify(userInfo)
                };
            var regs1 = JSON.stringify(regs);
            // console.log("regs1"+regs1);
            var aesStr = sha1.sha1(regs1+"wangguowei");
            var data ={
                name:app.globalData.userInfo.nickName,
                photoUrl:app.globalData.userInfo.avatarUrl,
                sessionId:app.globalData.sessionId,
                userInfo:JSON.stringify(userInfo),
                aesStr:aesStr
              };
            //用户这册请求接口
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
    console.log("getList"+JSON.stringify(res));
      var that = this;
      var data = res.data;
      if(data.code == 200){//正确数据
          var list = data.data.list; 
          var img = data.data.img;
          var hotAreaArr = data.data.hotAreaArr;
          var campTypeArr = data.data.campTypeArr;
          that.setData({details:list,imgUrls:img,hotArea:hotAreaArr,campTypeArr:campTypeArr});
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
    if(this.data.currentTab === current){
      return false;
    }else{
      that.setData({currentTab:current,currentShow:current});
    }

    if(current == 0){
      var e={detail:{value:[]}};
      that.checkBoxChange(e);
      that.cityReset();
    }
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
      that.setData({scroll:1});
    }else{
      that.setData({scroll:0});
    }
  },
  //热门城市，种类-复选框
  checkBoxChange:function(e){
    var that = this;
    var num = e.detail.value;
    console.log("种类"+num);
    that.setData({checkBoxDetails:num});
    // var js = {
    //         locationName:"",
    //         campType:"",
    //         keyword:"",
    //         page:"1",
    //         sessionId:app.globalData.sessionId
    //       };
    // var js1 = JSON.stringify(js);
    // var aesStr = sha1.sha1(js1+"wangguowei");
    // var data ={
    //     locationName:"",
    //     campType:"",
    //     keyword:"",
    //     page:"1",
    //     sessionId:app.globalData.sessionId,
    //     aesStr:aesStr
    //   };
    // //获取活动列表信息
    // app.getAPI('campaign/list',data,that.getList);
  },
  //确认筛选
  citySelected:function(event){
    var that =this;
    var checkedData = that.data.checkBoxDetails;
    console.log("筛选"+checkedData);
    that.setData({currentShow:0});
  },
  //重置
  cityReset:function(){
    var that = this;
    that.setData({checkBoxChecked:false});
  },
  //搜索
  searchFun:function(e){
    console.log("search:"+e.detail.value);
  },
  searchBtnFun:function(){
    var search_content = document.getElementById('search_value').value; 
    console.log("search:"+search_content);
  }
})
