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
    userInfo:null,
    campId:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var campId = options.id;
    var header = JSON.parse(options.header);
    that.setData({header:header,userInfo:app.globalData.userInfo,campId:campId});
    console.log(JSON.stringify(app.globalData.userInfo));
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
    console.log("formSubmit"+JSON.stringify(event.detail.value));
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
    //模态弹窗
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // });
    //显示操作菜单
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg)
    //   }
    // })
    console.log(JSON.stringify(formArr));
  },
  reduceUserFun:function(){
    var num = this.data.num;
    if(num>0){
        num--;
        this.setData({num:num});
    }
  },
  addUserFun:function(){
    var num = this.data.num;
    num++;
    this.setData({num:num});
  }
})