import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //菜单栏数据
    tabs:[
      {
        id:1,
        title:'综合',
        isActive:true
      },
      {
        id:2,
        title:'销量',
        isActive:false
      },
      {
        id:3,
        title:'价格',
        isActive:false
      }
    ],
    //商品列表数据
    goodsList:[]
  },

  //接口默认参数
  QueryParams:{
     query:'',
     cid:'',
     pagenum:1,
     pagesize:10
  },

  //总页数
  totalPage:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //获取分类ID并赋值
     this.QueryParams.cid = options.cid;
     //获取商品列表数据
     this.getGoodsList();    
  },

  //监听子组件切换菜单事件
  listenItemChangeEvent:function(event){
       const id = event.detail.id;
      
       let tabs = this.data.tabs;

       tabs.forEach((v,i)=>{
          if(id === v.id){
              v.isActive = true;
          }else{
              v.isActive = false;
          }
       });

       this.setData({
        tabs:tabs
       });
  },

  //获取商品列表数据
  getGoodsList:function(){

       this.QueryParams.url="goods/search";
       
       request(this.QueryParams).then(result=>{
        //console.log(result);
         //计算总页数
         this.totalPage = Math.ceil(result.data.message.total/this.QueryParams.pagesize);
        
         this.setData({
          goodsList:[...this.data.goodsList,...result.data.message.goods]
         });
       });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     //判断还有没有下一页数据
     if(this.QueryParams.pagenum >= this.totalPage){
        //没有下一页
        wx.showToast({
          title: '没有下一页数据了...',
        })
     }else{
        //有下一页
        this.QueryParams.pagenum++;
        this.getGoodsList();
     }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      //重新设置商品列表
      this.setData({
        goodsList:[]
      });

      //重新设置页数
      this.QueryParams.pagenum = 1;

      //发起数据请求
      this.getGoodsList();

      //数据返回后关闭等待提示
      wx.stopPullDownRefresh();
  }
})