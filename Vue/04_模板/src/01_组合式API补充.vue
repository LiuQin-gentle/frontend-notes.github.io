<script setup>
import {computed, ref} from 'vue'
  const msg = ref("Hello Vue");

  //obj.value.name
  const obj = ref({
    name:"孙悟空",
    age:18
  });
  console.log(obj.value.name);//孙悟空

  //obj2.name.value
  const obj2 = {
    name:ref("猪八戒"), //{value:"孙悟空"}
    age:ref(19)         //{value:19}
  }
  console.log(obj2.name.value);//猪八戒
  const {name, age} = obj2;

  const changeMsgHandler = ()=>{
    //修改ref对象时，必须通过value
    msg.value = "哈哈哈哈哈哈"
  }

  //computed 用来生成计算属性
  const newMsg = computed(() => {
    return msg.value + "-我爱Vue!"
  })
</script>

<template>
  <!-- ref对象在模板中可以自动解包（要求ref对象必须是顶层对象） -->
  <h1>{{ msg }}</h1>
  <h1>{{ newMsg }}</h1>
  <button @click="changeMsgHandler">点我一下</button>
  <h2>{{ obj.name }}</h2><!-- 孙悟空 -->

  <!-- obj2的name不是顶层响应式对象，所以不能自动解包 -->
  <!-- <h2>{{ obj2.name }}</h2> --><!-- "猪八戒" -->

  <h2>{{ name }}</h2>
</template>