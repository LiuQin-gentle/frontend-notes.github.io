<script>
import { computed } from 'vue';


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
      lastName:"边",
      firstName:"浩东",
      arr:["猪八戒", "孙悟空", "沙和尚"],
    }
  },

  methods:{
    sum(a, b){
      //console.log(this);//组件实例vm
      return a + b;
    },
    changeMsg(){
      this.msg = "新的消息！"
    },
    updateAge(){
      if(this.stu.age === 18){
        this.stu.age = 17;
      }else{
        this.stu.age = 18;
      }
    },
    getInfo(){
      console.log("getInfo被调用了");
      return this.stu.age >= 18 ? "你是一个成年人!!" : "你是一个未成年人!!"
    }
  },
  /* 
    computed用来指定计算属性
    {
      属性名：getter
    }
    - 计算属性，只在其依赖的数据发生变化时才会重新执行
    - 会对数据进行缓存
  */
  computed:{
    info(){
      console.log("info被调用了");
      return this.stu.age >= 18 ? "你是一个成年人" : "你是一个未成年人"
    },
    //计算属性的简写（只有getter时）
    /* name(){
      return this.lastName + this.firstName;
    }, */
    name:{
      get(){
        return this.lastName + this.firstName;
      },
      set(value){
        //set在计算属性被修改时调用
        //console.log(value);
        this.lastName = value[0];
        this.firstName = value.slice(1);
      }
    }
  }
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ sum(2, 5) }}</h2>
  <button @click="changeMsg">点我一下</button><!-- 这里执行修改msg时，methods中的getInfo()会被调用，而computed中的info()不会被调用 -->
  <h2>{{ stu.name }} --- {{ stu.age }} --- {{ stu.gender }}</h2>
  <h2>computed:{{ info }}</h2>
  <h2>methods:{{ getInfo() }}</h2>
  <button @click="updateAge">变年龄</button>
  <h1>{{ name }}</h1>
  <h1>{{ arr[0] }} --- {{ arr[1] }} --- {{ arr[2] }}</h1>
</template>