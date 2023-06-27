<script>
import { reactive } from 'vue';

  export default{
    setup(){
      //定义变量
      //在组合式API中直接声明的变量，就是一个普通的变量，不是响应式属性
      //  修改这些属性时，不会在视图中产生效果
      let count = 0;
      let msg = "今天天气真不错！"

      //可以通过reactive()来创建响应式对象
      const stu = reactive({
        name:"孙悟空",
        age:18,
        gender:"男"
      })

      //在setup()中可以通过返回值来指定哪些内容要暴露给外部
      return {
        msg,
        count,
        stu
      }
    }
  }  
</script>

<template>
  <h1>演示组合式API</h1>
  <h2>{{ msg }}</h2>
  <h2>{{ count }}</h2>
  <h2>{{ stu.name }}---{{ stu.age }}---{{ stu.gender }}</h2>
</template>