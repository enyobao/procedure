//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    city:[
      {name:"北京"},
      {name:"上海"},
      {name:"广州"},
      {name:"深圳"},
      {name:"厦门"},
      {name:"青岛"},
      {name:"西安"},
      {name:"成都"},
      {name:"重庆"}
    ],
    theme:[
      {name:'徒步'},
      {name:'摄影'},
      {name:'登山'},
      {name:'骑行'},
      {name:'跑步'},
      {name:'赛事'},
      {name:'俱乐部'},
      {name:'结伴'},
      {name:'AA'}
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
    currentTab: 0,
    scroll:0
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
  },
  //当滚动条滚动时，header有设置背景
  changeHeader:function(event){
    var that = this;
    var scrollTop = event.detail.scrollTop;
    console.log(JSON.stringify("scrollTop"+scrollTop));
    if(scrollTop > 10){
      that.setData({scroll:1});
    }else{
      that.setData({scroll:0});
    }
  }
})
