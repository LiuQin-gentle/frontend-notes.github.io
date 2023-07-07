<script setup>
import MyBox from './components/MyBox.vue';
</script>

<template>
    <div class="app">
        <h2>今天天气真不错</h2>
        <div class="box1">我是App中的box1</div>
        <MyBox></MyBox>
    </div>
</template>

<!-- 
    可以为style标签添加一个scoped属性，这样样式将成为局部样式，只对当前组件生效
    如何实现的？
        在组件中使用scoped样式时，vue会自动为组件中的所有元素生成一个随机的属性
        形如：data-v-7a7a37b1
        生成后，所有的选择器都会在最后添加一个[data-v-7a7a37b1]
            h1 -> h1[data-v-7a7a37b1]
            .box1 -> .box1[data-v-7a7a37b1]

        注意：
            这个自动添加属性只适用于单根组件，比如MyBox里只有div一个根组件，就是单根组件
            随机生成的属性，除了会添加到当前组件内的所有元素上，
                也会添加到当前组件引入的其他子组件的根元素上，
                这样设计是为了可以通过父组件来为子组件设置一些样式
        
 -->
<style scoped>
h2 {
    background-color: orange;
}

.box1 {
    background-color: #bfa;
    width: 100px;
    height: 100px;
}

/* 
    将组件中所有h2的字体颜色设置为黄色
    不加deep时，解析为 .app h2[data-v-7a7a37b1]
    加deep时，解析为   .app[data-v-7a7a37b1] h2
*/
.app :deep(h2){
    color: yellow;
}

:global(div){
    border: 1px red solid;
}
</style>