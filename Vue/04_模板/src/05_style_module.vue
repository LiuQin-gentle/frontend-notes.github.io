<script setup>
import MyBox from './components/MyBox.vue';
</script>

<template>
    <div class="app">
        <h2>今天天气真不错</h2>
        <!-- <div :class="$style.box1">我是App中的box1</div> -->
        <div :class="classes.box1">我是App中的box1</div>
        <MyBox></MyBox>
    </div>
</template>
<!-- 
    css模块
        自动对模块中的雷鸣进行hash化来确保类名的唯一
        在模板中可以通过 $style.类名 使用
        也可以通过module 的属性值来指定变量名
 -->
<style module="classes">
.box{
    background-color: #bfa;
}
</style>