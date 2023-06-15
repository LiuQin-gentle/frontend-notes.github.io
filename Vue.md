# Vue

## 1. vue简介

1. vue是一个前端框架，主要负责帮助我们构建用户的界面

2. MVVM：Model-View-View Model

3. vue负责vm的工作(视图模型)，通过vue可以将视图和模型相关联

* 当模型发生变化时，视图会自动更新
* 也可以通过视图去操作模型

4. vue思想

* 组件化开发
* 声明式编程

## 2. HelloWorld

1. 直接在网页中使用（像jQuery一样）

   ```html
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   ```

2. 使用vite

   `yarn add vite -D`

3. 代码

   ```javascript
   //组件，就是一个普通的js对象
   const App = {}
   //创建应用
   const app = createApp(App)
   //挂载到页面
   app.mount("#root")
   ```

4. 自动创建项目

   `npm init vue@latest`

   `yarn create vue`

   