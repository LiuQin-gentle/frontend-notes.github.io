<script>
import MyButton from './components/MyButton.vue';
    /* 编写组件的代码 */
    export default {
        data() {
            return {
                message: "我超级爱Vue！",
            }
        },
        components:{
            "my-button":MyButton
        }
    }
</script>

<template>
    <h1>{{message}}</h1>
    <my-button></my-button>
    <my-button></my-button>
</template>