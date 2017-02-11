// pages/evaluate/evaluate.js
Page({
  data:{
    star:[
      {star:false},
      {star:false},
      {star:false},
      {star:false},
      {star:false}
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  clickStar:function(e){
    console.log(JSON.stringify(e));
    var that = this;
    var index = e.currentTarget.id;
    var star = that.data.star;
    if(star[index].star == true){
      for(var i=4;i>=index;i--){
        star[i].star = false;
      }
      global.starNum = index;
    }else{
      for(var i=0 ;i<=index;i++){
        star[i].star = true;
      }
      global.starNum = index+1;
    }
    that.setData({star:star});
  },
  handleEvaluate:function(e){
    console.log(JSON.stringify(e));
    var val = e.detail.value;
    var starNum = global.starNum;
  }
})