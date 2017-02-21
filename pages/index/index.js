//index.js
//获取应用实例
var app = getApp();
var sha1=require('../../utils/sha1.js');
var util = require('../../utils/util');
Page({
  data: {
    hotArea:[],
    campTypeArr:[],
    details:[
      {
        id:0,
        title:"色彩云南 色彩云南 色彩云南 色彩云南",
        price:"¥2990",
        beginTime:"开始时间",
        rendezvous:"昆明出发",
        destination:"目的地",
        days:"8日行程",
        headImg:"../img/car.jpeg"
      }
    ],
    imgUrls:[
      {
        id:"",
        img:"../img/dengshan.jpeg"
      }
    ],
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
  loginFun:function(){
    console.log("login2");
    var that = this;
    wx.login({
      success: function (res) {
        console.log("userInfoFun:"+JSON.stringify(res)); 
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo;
            typeof cb == "function" && cb(that.globalData.userInfo);
          }
        });
        var js={code:res.code};
        var js1 = JSON.stringify(js);
        var aesStr = sha1.sha1(js1+"wangguowei");
        var userData={code:res.code,aesStr:aesStr};
        app.getAPI('user/secret',userData,that.getSettion);
      }
    });
  },
  getSettion:function(res){
    app.globalData.sessionId = res.data.data;
    var that = this;
    wx.setStorage({
      key: 'sessionId',
      data: res.data.data,
      success:function(res){
        console.log("storage"+JSON.stringify(res));
        var userInfo = JSON.stringify(app.globalData.userInfo);
        var regs = {
                name:app.globalData.userInfo.nickName,
                photoUrl:app.globalData.userInfo.avatarUrl,
                sessionId:app.globalData.sessionId,
                userInfo:"'"+userInfo+"'"
              };
        var regs1 = JSON.stringify(regs);
        var aesStr = sha1.sha1(regs1+"wangguowei");
        var data ={
            name:app.globalData.userInfo.nickName,
            photoUrl:app.globalData.userInfo.avatarUrl,
            sessionId:app.globalData.sessionId,
            userInfo:"'"+userInfo+"'",
            aesStr:aesStr
          };
        //获取活动列表信息
        app.getAPI('user/register',data,function(res){
          console.log("register"+JSON.stringify(res));
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
  getList:function(res) {
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
    that.setData({checkBoxDetails:num});
  },
  //确认筛选
  citySelected:function(event){
    var that =this;
    var checkedData = that.data.checkBoxDetails;
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
