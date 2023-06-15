<script>
    export default{
        data(){
            return{
                count: 0
            }
        }
    }
</script>

<template>
    <button @click="count++">点我一下~</button>{{count}}
</template>