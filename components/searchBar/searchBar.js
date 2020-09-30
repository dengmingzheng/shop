// pages/components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      isNavigator:{
        type:Boolean,
        value:false
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      //输入框搜索事件
      onInputEvent:function(event){
           
            var value = event.detail.value;

            this.triggerEvent("searchEvent",{value:value});
      }
  }
})
