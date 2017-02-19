//index.js
//获取应用实例
var app = getApp()
var sha1=require('../../utils/sha1.js');
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
    currentShow:0,
    scroll:0,
    currentSelectedCity:0,
    checkBoxDetails:[],
    checkBoxChecked:false
  },
  onLoad: function () {
    console.log('onLoad');
    var js = {
        locationName:"",
        campType:"",
        keyword:"",
        page:"1"
      };
    var js1 = JSON.stringify(js);
    var aesStr = sha1.sha1(js1+"wangguowei");
    console.log("aesStr"+aesStr);
    var that = this;
    wx.request({
      url: 'https://www.ioutdoor.org/api/campaign/list', //仅为示例，并非真实的接口地址
      method:'POST',
      header: {
          'content-type': 'application/json'
      },
      // header: {"Content-Type":"application/x-www-form-urlencoded"},
      data:{
        locationName:"",
        campType:"",
        keyword:"",
        page:"1",
        aesStr:aesStr
      },
      complete:function(res){
        console.log("complete"+JSON.stringify(res));
      },
      success: function(res) {
        console.log("success"+JSON.stringify(res));
      },
      fail:function(res){
        console.log("fail"+JSON.stringify(res));
      }
    })
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
    
    console.log("checkedData"+JSON.stringify(checkedData));
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
