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

  const attrName = "title";
  const attrValue = "这是一个title属性";
  const isDisabled = "";
</script>

<template>
  <!-- 
    当需要为标签动态设置属性时，需要使用v-bind指令，
      v-bind可以简写为 :
    为一个布尔值设置属性时，
      如果值为true，则元素上有该属性（转换后为true，也算true）
      如果值为false，则元素没有该属性（转换后为false，也算false）
      特殊情况： "" 空串，在这里会被当成true
   -->
  <!-- <img v-bind:src="imgPath" alt="梅西"/>
  <button @click="changeImg">切换图片</button> -->
  <!-- <div v-bind="attrs"></div> -->
  <div :="attrs"></div>

  <img v-bind:[attrName]="attrValue" :src = "imgPath" alt="梅西"/>

  <input type="text" :disabled="isDisabled"/>
</template>