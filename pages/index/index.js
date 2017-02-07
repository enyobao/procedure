//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    city:[
      {city:"北京"},
      {city:"上海"},
      {city:"广州"},
      {city:"深圳"},
      {city:"厦门"},
      {city:"青岛"},
      {city:"西安"},
      {city:"成都"},
      {city:"重庆"}
    ],
    details:[
      {
        title:"色彩云南 色彩云南 色彩云南 色彩云南",
        price:"¥2990",
        date:"1/30",
        departure:"昆明出发",
        days:"8日行程",
        imgsrc:"../img/car.jpeg"
      },
      {
        title:"色彩云南 色彩云南 色彩云南 色彩云南",
        price:"¥2990",
        date:"2/30",
        departure:"昆明出发",
        days:"8日行程",
        imgsrc:"../img/car.jpeg"
      },
      {
        title:"色彩云南 色彩云南 色彩云南 色彩云南",
        price:"¥2990",
        date:"3/30",
        departure:"昆明出发",
        days:"8日行程",
        imgsrc:"../img/car.jpeg"
      }
    ],
    imgUrls:[
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
    currentTab: 0
  },
  onLoad: function () {
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
  //滑动tab 切换
  bindChange:function(e){
    var that = this;
    that.setData({currentTab:e.detail.current});
  },
  //点击tab切换
  switchNav:function(e){
    var that = this;
    if(this.data.currentTab === e.target.dataset.current){
      return false;
    }else{
      that.setData({currentTab:e.target.dataset.current});
    }
  },
  //跳转到详情页
  getDetails:function(event){
    var id = event.currentTarget.id;
    console.log(id);
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
  }
})
