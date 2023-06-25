<script>
import { shallowReactive } from 'vue';
import MyButton from './components/MyButton.vue';
  export default{
    //data返回的对象最终会被vue代理，写在函数中是为了每一次调用都返回一个新的对象，互不干扰
    data(){
      return {
        msg:"今天天气不错！",
        //vue在构建响应式对象时，会同时将对象中的属性也做成响应式属性
        //深层响应式对象
        stu:{
          name:"猪八戒",
          age:18,
          gender:"男",
          friend:{
            name:"孙悟空"
          }
        },
        //建议那些暂时没有用到的属性，也添加到data返回的对象中，值可以设置为null
        hello:null,
      }

      //有些场景下，可以通过shallowReactive()来创建一个浅层的响应式对象
      /* return shallowReactive({
        msg:"今天天气不错！",
        stu:{
          name:"猪八戒",
          age:18,
          gender:"男",
          friend:{
            name:"孙悟空"
          }
        }
      }) */
    },
    components:{
      MyButton
    }
  }
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ stu.name }} --- {{ stu.age }} --- {{ stu.gender }}</h2>
  <h3>{{ stu.friend.name }}</h3>
  <h3>{{ hello }}</h3>
  <MyButton></MyButton>
  <MyButton></MyButton>
</template>