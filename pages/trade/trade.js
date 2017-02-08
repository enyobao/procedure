// pages/trade/trade.js
Page({
  data:{
    sex:[
      {sex:'男',value:'man'},
      {sex:'女',value:'woman'}
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(JSON.stringify(options));
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
  //性别被选中
  radioChecked:function(event){
    console.log("checked"+JSON.stringify(event.detail.value));
  },
  formSubmit:function(event){
    console.log("formSubmit"+JSON.stringify(event.detail));
  }
})