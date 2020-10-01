// components/tabs/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
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
     //点击菜单切换事件
     onItemEvent:function(event){
        
        const id = event.currentTarget.dataset.id;
        
        //子组件向父传参
        this.triggerEvent('itemChange',{id:id});
     }
  }
})
