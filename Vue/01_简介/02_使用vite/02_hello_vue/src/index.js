import {createApp} from "vue/dist/vue.esm-bundler.js"
import App from "./App.vue"

//创建应用挂载到页面
//mount()的返回值是根组件的实例
const vm = createApp(App).mount("#app")
