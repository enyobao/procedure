// pages/trade/trade.js
var app = getApp();
var sha1=require('../../utils/sha1.js');
Page({
  data:{
    sex:[
      {sex:'男',value:'man'},
      {sex:'女',value:'woman'}
    ],
    header:{},
    num:1,
    total_Price:1,
    userInfo:null,
    campId:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var campId = options.id;
    var header = JSON.parse(options.header);
    that.setData({header:header,userInfo:app.globalData.userInfo,campId:campId,total_price:header.price});
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
    var that = this;
    var value = event.detail.value;
    var num = that.data.num;
    var form = "form[0].userName";
    var formArr =[];
    for( var i=0; i<num; i++){
        var json={};
        json.userName = value["form["+i+"].userName"];
        json.phone = value["form["+i+"].phone"];
        json.sex = value["form["+i+"].sex"];
        json.mark = value["form["+i+"].mark"];
        formArr.push(json);
    }
    var f2 = JSON.stringify(formArr);
    console.log("formArr.string"+f2);
    var userData = {
        campId:that.data.campId+"",
        userList: f2+"",
        num:that.data.num+"",
        sessionId: app.globalData.sessionId
    };
    var userData1 = JSON.stringify(userData);
    var aesStr = sha1.sha1(userData1+"wangguowei");
    userData.aesStr = aesStr;
    app.getAPI('order/add',userData,that.addOrder);
  },
  //创建订单回调函数
  addOrder:function(res){
    console.log("addOrder"+JSON.stringify(res));
    if(res.data.code == 200){
      //模态弹窗
      wx.showModal({
        title: '提示',
        content: '报名成功,点击确定返回详情页。',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
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
        }
      });
    }
    //此处调用微信支付接口
  },
  reduceUserFun:function(){
    var num = this.data.num;
    if(num>0){
        num--;
        var total_price = this.data.header.price * num;
        this.setData({num:num,total_price:total_price});
    }
  },
  addUserFun:function(){
    var num = this.data.num;
    num++;
    var total_price = this.data.header.price * num;
    this.setData({num:num,total_price:total_price});
  }
})