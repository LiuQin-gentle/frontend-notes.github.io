<script>
export default {
  //data返回的对象最终会被vue代理，写在函数中是为了每一次调用都返回一个新的对象，互不干扰
  data() {
    return {
      msg: "今天天气不错！",
      stu:{
        name:"孙悟空",
        age:18,
        gender:"男"
      },
      arr:["猪八戒", "孙悟空", "沙和尚"],
    }
  },
  
  /* 
    methods 用来指定实例对象中的方法
      它就是一个对象，可以在里边定义多个方法
      这些方法最终都会被挂载到组件实例上
      可以直接通过组件实例来调用这些方法
      所有组件实例上的属性都可以在模板中直接访问
      methods中函数的this会被自动绑定为组件实例
  */
  methods:{
    sum(a, b){
      //console.log(this);//组件实例vm
      return a + b;
    },
    changeMsg(){
      this.msg = "新的消息！"
    }
  }
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ sum(2, 5) }}</h2>
  <button @click="changeMsg">点我一下</button>
  <h2>{{ stu.name }} --- {{ stu.age }} --- {{ stu.gender }}</h2>
</template>