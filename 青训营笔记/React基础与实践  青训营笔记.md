## 1. React简介与特性

React 用于构建用户界面的JavaScript库

### 1.1 特点

* 声明式
* 组件化
* 跨平台编写

### 1.2 React哲学

* React是用JavaScript构建`快速响应`的`大型Web应用程序`的首选方式之一

* 等待资源加载时间和大部分情况下浏览器单线程执行时影响web性能的两大主要原因

  | 等待资源加载   | 浏览器线程执行 |
  | -------------- | -------------- |
  | React.Lazy     | 异步更新       |
  | React.Suspense | 时间切片       |
  | ErrorBoundary  | React Fiber    |

* 更新流程
  * Scheduler 调度器
    	* 维护时间片
    	* 与浏览器任务调度
    	* 优先级调度
  * Reconciler 协调器
    * 将JSX转化为Fiber
    * Riber树对比（双缓存）
    * 确定本次更新的Fiber
  * Renderer 渲染器
    * 渲染器用于管理一棵React树，使其根据底层平台进行不同的调用

### 1.3 优缺点

* 优点
  * 快速响应：Fiber
  * 组件化：复用性强
  * 声明式编程
  * 跨平台：只需修改渲染器

* 缺点
  * 大型应用需要配套学习  状态管理、路由工具
  * 不适合小型应用，需要用babel处理

## 2. React基础

### 2.1 用React开发web应用

* 架构
  * 打包配置：JSX -> babel -> JS
  * 加载优化和错误降级

* 路由
  * React Router 向应用中快速地添加视图和数据流，保持页面与URL间的同步
* 状态
  * 多页面多组件共享信息
  *  redux&context
* UI
  * 可复用UI -> 组件 -> 页面
  * 可复用逻辑抽离成hook

### 2.2 组件

* 数据
  * 通过定义state操作视图
  * Mount时获取数据更新state
  * Ref保存与视图无直接关系的值
  * unMount前清空Ref
* 通信
  * props 父子组件通信
  * context & redux 组件信息共享
* 性能
  * 函数使用 useCallback
  * 值或者计算使用useMemo
  * 组件包装memo
* UI
  * 数据决定视图
  * 通过Ref获取到DOM

### 2.3 Class组件

* 继承 + 构造函数
* this
* 生命周期
* render方法

### 2.4 函数式组件

* 没有生命周期
* 借助Hook
* return JSX

### 2.5 函数式 相较于Class的优点

* 代码量骤减，组件清爽干净
* 没有复杂的生命周期
* 支持自定义hook，逻辑复用方便

### 2.6 组件和Hook的关系

* 将UI拆成多个独立单元，这些单元组合可以构成多种视图展示，这些独立单元就是组件。组件相当于原子
* hook贴近组件内部运行的各种概念逻辑，effect、state、context等。hooks更贴切于电子

### 2.7 Hook规则&原理

* 只能在React函数中调用Hook
  * 在React函数组件中或自定义Hook中调用
  * 自定义Hook必须以use开头
  * Hook中的state是完全隔离的

