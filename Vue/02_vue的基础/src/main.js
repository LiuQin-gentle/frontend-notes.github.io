import { createApp } from 'vue'
import App from './App.vue'
/* 
    App.vue是根组件
        -createApp(App) 将根组件关联到应用上
            会返回一个应用的实例
        -app.mount('#app') 将应用挂载到页面中
            会返回一个根组件的实例，组件的实例通常可以命名为vm
            组件实例是一个Proxy对象（代理对象）
*/
const app = createApp(App)
const vm = app.mount('#app')

//模块是单独运行在一个独立的作用域中的
//在控制台不能直接访问到vm，因为此时vm变量不是全局变量
//console.log(vm);

//设置vm为全局变量
window.vm = vm
//createApp(App).mount('#app')