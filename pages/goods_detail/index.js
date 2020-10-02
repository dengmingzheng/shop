import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  
  goodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const goods_id = options.goods_id;
        this.getGoodsDetail(goods_id); 
        
  },

  /**
   * 获取商品详情
   */
  getGoodsDetail:function(goods_id){
   
     request({ url:"goods/detail",data:{goods_id}}).then(result => {

       this.goodsInfo = result.data.message;

       this.setData({
        goodsObj:{
          goods_id:result.data.message.goods_id,
          goods_name:result.data.message.goods_name,
          goods_price:result.data.message.goods_price,
          //iphone部分手机不识别webp图片格式,前端可以把webp替换为其他图片格式
          goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g,'.png'),
          pics:result.data.message.pics
        }
       });
     });
  },

  /**
   * 浏览轮播图图片事件
   */
  onPreviewImageEvent:function(evnet){
    
    const index = evnet.currentTarget.dataset.index;

    wx.previewImage({
      urls: this.data.goodsObj.pics.map(v=>v.pics_mid),
      current:index
    })
  },

  /**
   * 点击加入购物车事件
   */
  onAddCartEvent:function(event){
   
    //获取缓存中获取购物车数据
    let cart = wx.getStorageSync('cart') || [];
   
    //判断加入购物车的商品是否在购物车中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);

    if(index === -1){
       //不存在购物车中
       this.goodsInfo.num = 1;
       cart.push(this.goodsInfo);
    }else{
       //存在购物车中
       this.goodsInfo.num++;
    }

    //保存数据到缓存中
    wx.setStorageSync('cart', cart);

    //提示加入成功
    wx.showToast({
      title: '加入成功!',
      icon:'success',
      mask:true
    })
  }
})