import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义轮播图数组
    swiperList:[],
    //导航数组
    cateList:[],
    //楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 获取轮播图数据
   */
  getSwiperList:function(){
    request({url:"home/swiperdata"}).then(result => {
      this.setData({
        swiperList:result.data.message
      });
    });
  },

  /**
   * 获取导航分类数据
   */
  getCateList:function(){
    request({url:"home/catitems"}).then(result => {
      this.setData({
        cateList:result.data.message
      });
    });
  },

  /**
   * 获取楼层数据
   */
  getFloorList:function(){
    request({url:"home/floordata"}).then(result => {
    
      this.setData({
        floorList:result.data.message
      });
    });
  }

})