import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧数据
    rightContent: [],
    //左侧菜单被点中的状态
    currentIndex: 0,
    //点击左侧菜单触发右侧菜单置顶
    scrollTop:0,
   
  },
  //接口返回的分类数据
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //先从本地获取缓存数据，如果没有再请求服务器获取
    const storageCates = wx.getStorageSync('category');

    if (!storageCates) {
      //获取分类数据
      this.getCategoryList();
    }else{
      //查看缓存中的数据有没有过期、缓存有效期一个小时
      if(Date.now() - storageCates.time > 1000*60*60){
        //重新获取数据
        this.getCategoryList();
      }else{
        //缓存数据没有过期
        this.cates = storageCates.data;

        //构造左侧的大菜单数据
      let leftMenuList = this.cates.map(v => v.cat_name);
      //构造右侧数据
      let rightContent = this.cates[0].children;

      //保存数据
      this.setData({
        leftMenuList: leftMenuList,
        rightContent: rightContent
      });

      }
    }

  },

  /**
   * 获取分类数据
   */
  getCategoryList: function () {

    wx.showLoading({
      title: '正在加载数据...',
    });

    //请求接口返回数据
    request({
      url: "categories"
    }).then(result => {

      //返回的接口数据
      this.cates = result.data.message;

      //保存缓存数据
      wx.setStorage({
        key:'category',
        data:{time:Date.now(),'data':this.cates}
      });

      //构造左侧的大菜单数据
      let leftMenuList = this.cates.map(v => v.cat_name);
      //构造右侧数据
      let rightContent = this.cates[0].children;

      //保存数据
      this.setData({
        leftMenuList: leftMenuList,
        rightContent: rightContent
      });

      //隐藏加载数据提示
      wx.hideLoading();
    });
  },

  /**
   * 左侧菜单点击事件
   */
  onHaddleItemEvent: function (event) {

    //获取点击菜单的下标
    const currentIndex = event.target.dataset.index;

    //切换菜单获取右侧数据  
    if (this.data.currentIndex != currentIndex) {
      //获取右侧数据
      let rightContent = this.cates[currentIndex].children;

      this.setData({
        currentIndex: currentIndex,
        rightContent: rightContent,
        scrollTop:0
      });
    }
  }
})