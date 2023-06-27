<script setup>
import { reactive } from 'vue';
  const count = 0;
  const msg = "今天天气真不错！"
  const stu = reactive({
    name:"孙悟空",
    age:18,
    gender:"男"
  });
  function fn() {
    alert("哈哈哈");
  }
</script>

<template>
  <h1>组合式API</h1>
  <h2>{{ msg }}</h2>
  <h2>{{ count }}</h2>
  <h2>{{ stu.name }}---{{ stu.age }}---{{ stu.gender }}</h2>
  <button @click="fn">点我一下</button>
</template>