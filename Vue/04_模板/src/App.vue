<script setup>
  import { ref } from 'vue';
  const imgPath = ref("/images/messi.png");
  const changeImg = () => {
    imgPath.value = "/images/neymar.png"
  }
  const attrs = {
    id: "box1",
    class: "hello"
  }
</script>

<template>
  <!-- 
    当需要为标签动态设置属性时，需要使用v-bind指令，
      v-bind可以简写为 :
   -->
  <img v-bind:src="imgPath" alt="梅西"/>
  <button @click="changeImg">切换图片</button>
  <!-- <div v-bind="attrs"></div> -->
  <div :="attrs"></div>
</template>