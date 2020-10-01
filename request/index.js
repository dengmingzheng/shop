
//发起请求的次数
let ajaxTimes = 0;

export const request = (params) => {

   ajaxTimes++;

   //显示加载数据提示
   wx.showLoading({
     title: '正在加载中',
     mask:true
   })

   //定义接口的公共路径
   const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1/";
   
   return new Promise((resolve, reject) => {
      wx.request({
         ...params,
         url: baseUrl + params.url,
         success: (result) => {
            resolve(result);
         },
         fail: (error) => {
            reject(error);
         },
         complete:()=>{
            //解决同时多次请求时，提示框隐藏的问题
            ajaxTimes--;
            if(ajaxTimes === 0){
               //不管成功是否都关闭加载提示
               wx.hideLoading();
            }
         }
      })
   });
}