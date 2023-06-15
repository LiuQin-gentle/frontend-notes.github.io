## 1. 什么是状态管理

### 1.1 引言

React遵循的是单向数据，属性通过Props自上向下传递。

当页面比较简单，组件之间的层级关系比较浅时，这种自上而下的单向数据流的方式是不会有问题的。

但当页面复杂，组件的嵌套层级深时，这种单向数据流的传递方式，将会陷入到“嵌套地狱”。

状态管理本身，解决的就是这种“嵌套地狱”的问题，解决的是跨层级组件之间的数据通信和状态共享。

### 1.2 状态管理的本质

* 管理内存中的状态
  * 共享内存
  * 管理状态
  * 页面通信
  * 组建通信
  * 刷新失效
* 详细定义：单页应用的各个组件本身是共享内存的，如果状态保存在内存中，就可以读写统一内存中的变量，从而达到状态共享的目的

### 1.3 为什么React有这么多状态管理工具

* Vue：Vuex（Pinia）
* Angular：Service和Rxjs
* React：Flux、Redux、Mobx、Rxjs、Recoil、Jotai、Zustand

跟不同前端框架的定义有关， Vue和Angular双向数据绑定，计算属性等，数据是响应式的，控制视图刷新，拥有

计算属性等，这些使得Vue和Angular需要状态管理的场景减少，此外其本身就包含了完整的状态管理工具，比如

Vue的Vuex和Pinia，Angular的Service(RXjs)等，从官方定调。

而React不一样,React是一个纯UI层的前端框架，Ul = fn(state)，React将状态的变动完全交给开发者。

## 2. React状态管理工具简介

React状态管理工具可以分为以下几类：

* React自带：Local State(props)和Context
* 单向数据流：Flux、Redux(Redux-toolkit)
* 双向数据绑定：Mobx
* 原子型状态管理：Recoil、Jotai
* 异步操作密集型：Rxjs

### 2.1 Local State和Context

* Local State即组件级别的局部状态
* 一般认为，单页应用中，子页面以及子页面之下的组件都是可以用local State来解决状态管理问题的
* 子页面和子页面之间的通信，React本身提供了Context
  * React中的Context解决了react中，props或者state进行多级数据传递，则数据需要自顶下流经过每一级组件，无法跨级的问题。但是Context在页面间共享数据的时候同样有很多问题:
    	1. Context相当于全局变量,难以追溯数据的变更情况
     	2. 使用Context的组件内部耦合度太高，不利于组件的复用和单元测试
     	3. 会产生不必要的更新(比如会穿透memo和dependicies等)
     	4. Context只能存储单—值，无法存储多个各自拥有消费者的值的集合
     	5. 粒度也不太好控制，不能细粒度的区分组件依赖了哪一个Context
     	6. 多个Context会存在层层嵌套的问题

### 2.2 Flux和Redux

1. Flux状态管理的架构图如下所示

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1683287580870.png" alt="1683287580870" style="zoom:50%;" />

2. Flux利用数据的单向流动的形式对公共状态进行管理

* View：视图层
* Action：视图发出的消息
* Dispatcher：派发者，用来接收Action，执行回调函数
* Store：数据层，存放状态，一旦发生改动，就会更新数据以及emit相关事件等

3. Flux的缺点：

* UI组件和容器组件的拆分过于复杂
* Action和Dispatcher绑定在一起
* 不支持多个store
* store被频繁的引入和调用

4. Redux架构图

   <img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1683287609527.png" alt="1683287609527" style="zoom:50%;" />



5. Redux三大原则

* 单一数据源：

  在redux中，整个应用的全局State(再次注意是全局state)，都会保存在一个store中，一个单一数据源state tree也简化了应用的调试和和监控；它也让你在开发中能将应用数据持久化到本地，从而加速开发周期。此外，有一些功能以前很难实现，比如"撤销/重做"，在单一数据源的原则下，使用Redux实现将非常容易。

* Store中的State是只读的:
  我们不能直接修改store中的state，store中的state是只读的。唯一能改变store中的state的方式就是通过action

* 使用纯函数来执行修改:
  接受纯函数来接受action，该纯函数叫reducer，可以改变store中的state

6. Redux缺点

   ​	Redux的缺点也很明显，首先为了实现纯函数的Reducer，Redux必须处理各种各样的副作用，需要引入一系列的副作用中间件，加重的心智负担，此外Action，Dispatch，Reducer的模式需要写过多的样版代码，虽然通过React hooks和Redux toolkit可以减少一定的样板代码，但是复杂度还是不低。

### 2.3 Mobx

​	Mobx通过透明的函数响应式编程使得状态管理变得简单和可扩展，Mobx跟vue的设计比较相似，是一个响应式的状态管理库。Mobx借助于装饰器的实现，使得代码更加简洁易懂。由于使用了可观察对象，所以Mobx可以做到直接修改状态，而不必像Redux一样编写繁琐的actions和reducers。

缺点：

* Mobx是不能实现时间旅行和回溯的，因此不太适合前端数据流比较复杂的场景
* 随着React hooks，比如useReducer等的，以及React自身的原子型状态管理工具Recoil。Mobx的使用场景会被进一步压缩

### 2.4 Recoil

Recoil是React官方内置的状态管理工具，一定程度上解决了Local State和Context的局限性，且能够兼容
React的新特性，比如Concurrent模式等
解决的问题:

* 组件间的状态共享只能通过将state 提升至它们的公共祖先来实现，但这样做可能导致重新渲染一颗巨大组件树。
* Context 只能存储单—值，无法存储多个各自拥有消费者的值的集合。
  

### 2.5 Zustand

Zustand是主打轻量级的状态管理工具，没有Redux那样臃肿的设计，也没有兼容React类组件的历史包袱，Zustand状态管理工具体积很小，因此很适合移动端的网页。