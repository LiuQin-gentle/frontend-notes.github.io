# **Node.js总结**

[TOC]

## 一、Node简介

### 1. 异步

#### 1.1 简述

一段代码的执行不会影响到其他程序

#### 1.2 异步的问题

无法通过return来设置返回值

#### 1.3 特点

* 不会阻塞其他代码的执行
* 需要通过回调函数来返回结果

#### 1.4 基于回调函数的异步带来的问题

* 代码可读性差
* 可调试性差

```javascript
function sum(a, b ,cb) {
    const begin = Date.now();
    //同步写法
    while(Date.now() - begin < 1000){}
    return a + b; 

    //异步写法
    setTimeout(() =>{
        cb(a + b);
    }, 1000);
}

//回调地狱
const result = sum(123, 456, (result) => {
    sum(result, 8, result => {
            sum(result, 9, result => {
                sum(result, 10, result => {
                    console.log(result);
                })
            })
        })
    })
})
```

#### 1.5 解决异步出现的问题

我们需要一个东西可以代替回调函数来给我们返回结果，所以出现了Promise

### 2. Promise

#### 2.1 Promise简介

* Promise可以帮助我们解决异步中的回调函数问题
* 它是一个用来存储数据的容器，有一套特殊的存取数据方式，这个方式使得它可以存储异步调用的结果

#### 2.2 Promise使用

1. 创建Promise

   创建Promis时，构造函数需要一个函数作为参数，调用这个函数时会有两个参数传递进去：`resolve`和`reject`

2. 向Promise中存储数据

   `resolve`在执行正常时存储数据，`reject`在执行错误时存储数据

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("嘿嘿");
    //throw new Error("sorry, 我错了");
    //reject("出错了");
});
```

3. 从Promise读取数据

   可以通过Promise的实例方法then来读取

   then需要两个回调函数作为参数，回调函数用来获取Promise中的数据

   ​	通过resolve存储的数据，会调用第一个函数返回，

   ​        可以在第一个函数中编写处理数据的代码

   ​    通过reject存储的数据或出现异常时，会调用第二个函数返回

   ​        可以在第二个函数中编写处理异常的代码

```javascript
promise.then((result) => {},(reason) => {});
```

#### 2.3 Promise隐含属性

```
//打印创建好的promise的结果
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: '嘿嘿', Symbol(async_id_symbol): 9, Symbol(trigger_async_id_symbol): 1}
```

* PromiseResult：用来存储数据

* PromiseState：记录promise的状态（三种状态）

  * `pending`（进行中）
  * `fulfilled`（完成） 通过resolve存储数据时
  * `rejected`（拒绝，出错了） 通过reject存储数据或出现异常时

   流程：

  ​	当Promise创建时，PromiseState初始值为`pending`，

  ​	当通过resolve存储数据时，PromiseState变为`fulfilled`，PromiseResult的值为存储的数据

  ​	当通过reject存储数据时，PromiseState变为`rejected`，PromiseResult的值为存储的数据或异常对象

#### 2.4 catch()

​	`catch()`的用法和`then()`类似，但是只需要一个回调函数作为参数

​	`catch()`的回调函数只会在Promise被拒绝时才调用

​    `catch()`就相当于`then((null, reason) => {})`

​    `catch()`是一个专门处理Promise异常的方法

```javascript
promise2.catch(reason =>{
    console.log(reason);
})
```

#### 2.5 finally()

​	无论是正常存储还是出现异常，finally()总会执行。但是finally()的回调函数中不会接收到数据

​	通常用来编写一些无论成功与否都要执行的代码

```javascript
promise2.finally(() => {
    console.log("谁也无法阻挡我执行！");
})
```

#### 2.6 Promise链式调用

```javascript
const promise = new Promise((resolve, reject) => {
    reject("周一到周五19点, 不见不散");
});

//链式调用
promise.
    then((result) => {
        console.log("回调函数", result);//回调函数 周一到周五19点, 不见不散
        return "锄禾日当午";
    }).then((result) => {
        console.log("第二个then", result);//第二个then 锄禾日当午
        return "汗滴禾下土";
    }).then((result) => {
        console.log(result);//汗滴禾下土
    }) 
```

如下代码：

后边的方法（then 和 catch）读取上一步的执行结果，如果上一步的执行结果不是当前想要的结果，则跳过当前的方法

```javascript
const promise = new Promise((resolve, reject) => {
    //reject("周一到周五19点, 不见不散");
    resolve("周一到周五19点, 不见不散");
});
promise
    .then(r => {
        console.log("第一个then", r);
        return "啦啦";
    })
    .catch(r => {
        console.log("异常处理", r);
        return "嘻嘻"
    })
    .then(r => console.log("第二个then", r))
    .catch(r => console.log("出错了"));
```

分析：

上面的promise中如果是resolve存储数据，则下面的方法中跳过第一个catch

执行结果为

```
第一个then 周一到周五19点, 不见不散
第二个then 啦啦
```

上面的promise中如果是reject存储数据，则下面的方法中跳过第一个then

执行结果为

```
异常处理 周一到周五19点, 不见不散
第二个then 嘻嘻
```

#### 2.7 Promise静态方法

1. `Promise.resolve()`创建一个立即完成的Promise

   ```javascript
   Promise.resolve(10).then(r =>{
       console.log(r);//10
   });
   ```

2. `Promise.reject()` 创建一个立即拒绝的Promise

   ```javascript
   Promise.reject("哈哈").then(result => {
       console.log(result);
   }, reason => {
       console.log(reason);//哈哈
   });
   ```

3. `Promise.all([...])` 同时返回多个Promise的执行结果, 其中有一个报错, 就返回错误

   下面的代码会直接报错，reject语句前面其他的结果也都不会返回

   ```javascript
   Promise.all([
       sum(123,456), 
       sum(222, 444), 
       Promise.reject("嘿嘿"),
       sum(111, 222)
   ]).then(r => {
       console.log(r);
   })
   ```

4. `Promise.allSettled([...])` 同时返回多个Promise的执行结果(无论成功或失败)

   ```javascript
   Promise.allSettled([
       sum(123,456), 
       sum(222, 444), 
       Promise.reject("嘿嘿"),
       sum(111, 222)
   ]).then(r => {
       console.log(r);
   })
   ```

   运行结果为

   ```
   [
     { status: 'fulfilled', value: 579 },
     { status: 'fulfilled', value: 666 },
     { status: 'rejected', reason: '嘿嘿' },
     { status: 'fulfilled', value: 333 }
   ]
   ```

5. `Promise.race() `返回执行最快的Promise(不考虑对错)

   ```javascript
   Promise.race([
       Promise.reject("嘿嘿"),
       sum(123,456), 
       sum(222, 444), 
       sum(111, 222)
   ]).then(r => {
       console.log(r);
   }).catch(reason =>{
       console.log(reason);
   })
   ```

   运行结果为

   ```
   嘿嘿
   ```

6. `Promise.any([...])` 返回执行最快的完成的Promise。都是rejected时，报错`All promises were rejected`

```javascript
Promise.any([
    Promise.reject("嘿嘿"),
    Promise.reject("哈哈"),
    Promise.reject("hh"),
]).then(r => {
    console.log(r);
}).catch(reason =>{
    console.log(reason);
})
```

运行结果为

```
[AggregateError: All promises were rejected] {
  [errors]: [ '嘿嘿', '哈哈', 'hh' ]
}
```

若不是只有reject时，如下代码

```javascript
Promise.any([
    Promise.reject("嘿嘿"),
    Promise.reject("哈哈"),
    Promise.reject("hh"),
    sum(123,456), 
    sum(222, 444), 
    sum(111, 222)
]).then(r => {
    console.log(r);
}).catch(reason =>{
    console.log(reason);
})
```

运行结果为` 579 `

### 3. 宏任务和微任务

JS是单线程的，它的运行是基于事件循环机制（event loop）

#### 3.1 调用栈

调用栈放的是要执行的代码

#### 3.2 任务队列

* 当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入栈中执行

* JS中任务队列有两种

| 队列类型   | 执行的任务                                  |
| ---------- | ------------------------------------------- |
| 宏任务队列 | 大部分代码都去宏任务队列中去排队            |
| 微任务队列 | Promise的回调函数`then`、`catch`、`finally` |

* 整个流程
  1. 执行调用栈中的代码
  2. 执行微任务队列中的所有任务
  3. 执行宏任务队列中的所有任务

#### 3.3 Promise的执行原理

* Promise在执行，`then`就相当于给Promise绑定了回调函数

* 当Promise的状态从`pending`变为`fullfilled`时，`then`的回调函数会被放入到任务队列中``

```javascript
Promise.resolve().then(() => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
    }, 0);
});

queueMicrotask(() => {
    console.log(3);
}); 
console.log(4);
```

这一段代码的输出结果是4 1 3 2

 首先执行调用栈中的代码，打印出4

  然后，进入任务队列的顺序是：

​    1. `then`中的回调函数进入微任务队列 

​    2. `queueMicrotask`中的回调函数进入微任务队列 

​    3. `setTimeout`中的箭头函数进入宏任务队列

  先执行微任务，所以先打印1、3, 再执行宏任务，输出是 2

#### 3.4 async和await

* `async`创建一个异步执行的方法，返回值类型为Promise

  ```javascript
  function fn(){
      return new Promise.resolve(10);
  }
  
  async function fn2(){
      return 10;
  }
  
  //以上两种写法返回相同的结果
  ```

* 通过`await`去调用异步函数时，它会暂停代码的运行，直到异步代码有结果时，才会将结果返回

  ​	注意：`await`只能用于`async`声明的异步函数中，或es模块的顶级作用域中

  ```html
  <script type="module">
          await console.log(123);
  </script>
  ```

  ​	`await`阻塞的只是异步函数内部的代码，不影响外部代码

  ​	通过`await`调用异步代码时，需要通过`try-catch`来处理异常

  ```javascript
  async function sum(a, b) {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve(a + b);
          }, 1000);
      })
  }
  
  async function fn3() {
      try {
          let result = await sum(123, 456);
          result = await sum(result, 7);
          result = await sum(result, 8);
          console.log(result);
      } catch (error) {
          console.log(error);
      }   
  }
  fn3();
  console.log("全局输出~");
  ```

  ​    以上代码先输出` 全局输出~ `,然后再输出` 594 `

* 如果`async`声明的函数中没有写`await`，那么它就相当于普通函数，只是返回值类型被定义为Promise类型而已

  ```javascript
  async function fn4() {
      console.log(1);
      console.log(2);
      console.log(3);
  }
  fn4();
  console.log(4);
  ```

  输出顺序为`1 2 3 4` 

* 当使用await调用函数后，当前函数后边的所有代码会在当前函数执行完毕后，被放入到微任务队列中

  ```javascript
  async function fn5() {
      console.log(1);
      await console.log(2);
      console.log(3);
  }
  
  //以上代码等价于
  /* function fn5() {
      return new Promise(resolve => {
          console.log(1);
          console.log(2);
          resolve();
      }).then(r => {
          console.log(3);
      })
  } */
  
  fn5();
  console.log(4);
  ```

  输出顺序为`1 2 4 3`

  ### 4. 自定义Promise

  ```javascript
  const PROMISE_STATE = {
      PENDING: 0,
      FULFILLED: 1,
      REJECTED: 2
  }
  class MyPromise{
      //创建一个变量用来存储Promise的结果
      #result
      
      //创建一个变量记录Promis的状态
      #state = PROMISE_STATE.PENDING
  
      //创建一个变量来存储回调函数
      //由于回调函数有多个，所以我们使用数组来存储回调函数
      #callbacks = []
  
      constructor(executor){
          executor(this.#resolve.bind(this), this.#reject.bind(this));
      }
  
      //私有的resolve()用来存储成功的数据
      #resolve(value){
  	//禁止值被重复修改
          //如果state不等于pending，说明值已经被修改，函数直接返回
          if(this.#state !== PROMISE_STATE.PENDING) return;
          this.#result = value;
          this.#state = PROMISE_STATE.FULFILLED;//数据填充成功
  
           //当resolve执行时，说明数据已经进来了，需要调用then的回调函数
          queueMicrotask(() => {
              //调用#callbacks中的所有函数
              this.#callbacks.forEach(cb => {
                  cb();
              })
          })
      }
  
      //私有的reject()用来存储拒绝的数据
      #reject(reason){}
  
      //添加一个用来读取数据的then方法
      then(onFulfilled, onRejected){
          return new MyPromise((resolve, reject) => {
              if(this.#state === PROMISE_STATE.PENDING){
                  //进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
                  this.#callbacks.push(() => {
                      //把回调函数onFulFilled的返回值作为resolve的参数传给新的Promise
                      resolve(onFulfilled(this.#result));
                  })
              } else if(this.#state === PROMISE_STATE.FULFILLED){
                  //then的回调函数，应该放到微任务队列中执行，而不是直接调用
                  queueMicrotask(() => {
                      onFulfilled(this.#result);
                  })
              }
          })
      }
  }
  
  const mp = new MyPromise((resolve, reject) => {
      setTimeout(() => {
          resolve("孙悟空");
      }, 1000);
  })
  
  mp.then(result => {
      console.log("读取数据1", result);
      return "猪八戒";
  }).then(result => {
      console.log("读取数据2", result);
      return "沙和尚";
  }).then(result => {
      console.log("读取数据3", result);
  })
  ```

## 二、模块化

### 1. 模块化简述

* 早期的网页中，是没有一个实质性的模块规范的。实现模块化的方式，就是最原始的通过script标签来引入多个js文件
*  问题：      
    	1. 无法选择要引入模块的哪些内容
     	2. 在复杂的模块场景下非常容易出错

​      ......

​    于是，我们就急需在js中引入一个模块化的解决方案

* 在node中，默认支持的模块化规范叫做CommonJS。在CommonJS中，一个js文件就是一个模块

### 2. CommonJS规范

#### 2.1 引入

* 引入模块：使用`require("模块的路径")`函数来引入模块

* 引入自定义模块时

  * 模块名要以./ 或 ../ 开头

    ```javascript
    const m1 = require("./m1");
    const m2 = require("./m2.cjs");
    ```
  ```
  
  * 扩展名可省略
  ```

​            在CommonJS中，如果省略js文件的扩展名，node会自动为文件补全扩展名

​              `./m1.js` 如果没有js 它会寻找`./m1.js`

​             寻找顺序： js --> json --> node(特殊)

* 引入核心模块时

  * 直接写核心模块的名字即可

    ```javascript
    const path = require("path")
    ```

  * 也可以在核心模块前添加`node:`

    ```javascript
    const path = require("node:path")
    ```

#### 2.2 导出

* 在定义模块时，模块中的内容默认是不能被外部看到的，可以通过exports来设置要向外部暴露的内容

* 访问exports的方式有两种：

​    	1. exports

​    	2. module.exports

* 当我们在其他模块中引入当前模块时，require函数返回的就是exports

* 可以将希望暴露给外部模块的内容设置为exports的属性

```javascript
/* 
    cjs扩展名，表示是一个CommonJS标准的模块
*/
exports.a = "哈哈"
```

* 可以通过exports一个一个的导出值

```javascript
exports.a = "孙悟空";
exports.b = "猪八戒";
exports.c = function fn() {
    console.log("我是fn");
}
```

*  也可以直接通过module.exports同时导出多个值

```javascript
module.exports = {
    a: "孙悟空",
    b: "猪八戒",
    c: function fn() {
        console.log("我是fn");
    }
}
```

#### 2.3 原理

* 所有CommonJS模块都会被包装到一个函数中，即

```javascript
(function(exports, require, module, __filename, __dirname) {
    //模块代码会被放到这里 
});
```

* 所有的实参都会封装到`arguments`对象中

#### 2.4 CommomJS部分引入

```javascript
//导出
module.exports = {
    name: "孙悟空",
    age: 18,
    gender: "男"
}
//引入
const name = require("./m4").name;
```

### 3. ES模块化

#### 3.1 配置

* 默认情况下，node中的模块化标准是CommonJS

* 使用ES模块化的两种方案：

    * 使用`mjs`作为扩展名

    * 修改`package.json`将模块化规范设置为ES模块，即

        ​	设置`"type": "module"` 当前项目下所有的js文件都默认是ES模块

#### 3.2 引入

* 使用`mjs`作为扩展名导入时，不可以省略扩展名

```javascript
import {a, b, c} from "./m3.mjs"
```
* 可以通过`as`指定别名

```javascript
import {a as hello, b, c} from "./m3.mjs"
```

* 开发时尽量避免`import*`的情况

#### 3.3 导出

* 默认导出：在`export`后加`default`

导出文件m3.mjs

```javascript
//向外部导出内容
export let a = 10;
export const b = "孙悟空";
export const c = {name: "猪八戒"};

//一个模块只有一个默认导出
export default function sum(a, b) {
    return a + b;
} 
```

导入以上文件

```javascript
import hello,{a, b, c} from "./m3.mjs"
console.log(hello);
//输出结果如下：
/*
	ƒ sum(a, b) {
            return a + b;
        }
*/
```

#### 3.4 注意

* 通过ES模块化，导入的内容都是常量
* ES模块都是运行在严格模式下的
* ES模块化，在浏览器中同样支持，但是通常我们不会直接使用，通常会结合打包工具使用

### 4. CommonJS与ES互相加载

#### 4.1 CommonJS模块加载ES6模块

```javascript
(async () => {
    await import('./m5.mjs');
  })();
```

#### 4.2 ES模块加载CommonJS模块

```javascript
//导出
module.exports = {
    a: function sum(a, b) {
        return a + b
    }
}
//引入
import m6 from './m6.cjs';
const method = m6.a;
console.log(method(3,4));//输出7
```

### 5. 核心模块

#### 5.1 核心模块

* 核心模块是node自带的模块，可以在node中直接使用

* `window`是浏览器中的宿主对象，node中是没有的

* `global`是node中的全局对象，作用类似于`window`

* ES标准下，全局对象的标准名应该是`globalThis`

    ```javascript
    console.log(global === globalThis);//true
    ```

#### 5.2 process核心模块

* process表示当前的node进程，通过该对象可以获取进程的信息，或者对进程做各种操作

* 使用

    * process是一个全局变量，可以直接使用

    * 属性和方法

        ​	`process.exit()`:结束当前进程，终止node

        ​	`process.nextTick()`:将函数插入到tick队列中

        ​			tick队列的代码，会在下一次事件循环之前执行；会在微任务队列和宏任务队列之前执行

* 执行顺序
    	1. 调用栈
     	2. tick队列
     	3. 微任务队列
     	4. 宏任务队列

```javascript
setTimeout(() => {
    console.log(1);//宏任务队列
}, 0);

queueMicrotask(() => {
    console.log(2);//微任务队列
})

process.nextTick(() => {
    console.log(3);//tick队列
})
console.log(4);//调用栈
```

输出顺序是`4 3 2 1`

#### 5.3 path核心模块

* path表示的是路径，通过path可以用来获取各种路径

* 使用

    * 引入：` const path = require("node:path")`

    * 方法：

        ​	`path.resolve([...paths])`：用来生成一个绝对路径

        ​			如果直接调用resolve，则返回当前工作目录

        ​			假设当前文件路径为：`E:\前端\Node.js\03_核心模块\01_path.js`

        ​					则	F5执行:             `E:\前端`

        ​           				终端node执行:  `E:\前端\Node.js\03_核心模块`

* 如果将一个相对路径作为参数，则resolve会自动将其转换为绝对路径，此时根据工作目录的不同，所产生的路径也不同

* 一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数， 这样会自动计算出最终的路径

    ```javascript
    const result = path.resolve(__dirname, "./hello.js");
    console.log(result);//E:\前端\Node.js\03_核心模块\hello.js
    ```

* 相对路径： `./xxx`  `../xxx`  `xxx`

* 绝对路径：

    在计算机本地  `c:\xxx`  `/User/xxx`

    在网络中	`http://www.xxx/...`   `https://www.xxx/...`

#### 5.4 fs核心模块

* fs模块用来读取磁盘中的文件

* 使用

    * 引入：`const fs = require("node:fs");`

    * 方法：

        * `fs.readFileSync()`  同步读取文件的方法，会阻塞后边代码的执行

            通过fs模块读取磁盘中的数据时，读取到的数据会以Buffer对象的形式返回，Buffer是一个临时用来存储数据的缓冲区

            ```javascript
            const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"));
            ```

        * `fs.readFile()` 异步读取文件的方法

            ```javascript
            fs.readFile(
            	path.resolve(__dirname, "./hello.txt"),
            	(err, buffer) => {
                        if(err) {
                            console.log("出错了");
                        }else {
                            console.log(buffer.toString());
                        }
                }
            )
            ```

        * `fs.appendFile()` 创建新文件，或将数据添加到已有文件中

            ```javascript
            fs.appendFile(
                path.resolve(__dirname, "./hello.txt"), 
                "超哥讲的很棒"
            ).then(r => {
                console.log("添加成功");
            })
            ```

        * `fs.mkdir()` 创建目录

            ```javascript
            fs.mkdir(path.resolve(__dirname, "./hello"))
                .then(() => {
                    console.log("创建文件成功");
                })
            ```

            `mkdir()`可以接收一个配置对象作为第二个参数，通过该对象可以对方法的功能进行配置

            ​    `recursive` 默认值为`false`，设置`true`以后，会自动创建不存在的上一级目录

            ```javascript
            fs.mkdir(path.resolve(__dirname, "./hello/abc"), {recursive: true})
                .then(() => {
                     console.log("创建文件成功");
                });
            ```

        * `fs.rmdir() `删除目录

            ```javascript
            fs.rmdir(path.resolve(__dirname, "./hello"))
                .then(() => {
                    console.log("删除成功");
                })
            ```

        * `fs.rm()` 删除文件

        * `fs.rename()` 重命名（剪切）

            ```javascript
            fs.rename(path.resolve(__dirname, "./hello"), path.resolve(__dirname, "./hello1"))
                .then(() => {
                    console.log("重命名成功");
                })
            ```

        * `fs.copyFile()` 复制文件

* Promise版本的fs方法

    * 引入：`const fs1 = require("node:fs/promises");`

    * 方法：

        ```javascript
        fs1.readFile(path.resolve(__dirname, "./hello.txt"))
            .then(buffer => {
                 console.log(buffer.toString());
            })
            .catch(e => {
                console.log("出错了");
            });
        ```

        或者用async

        ```javascript
        async(() => {
            try{
                const buffer = await fs1.readFile(path.resolve(__dirname, "./hello.txt"));
                console.log(buffer.toString());
            } catch(error) {
                console.log("出错了");
            }
        })();
        ```

## 三、包管理器

### 1. package.json

* `package.json`是包的描述文件，node中通过该文件对项目进行描述，每一个node项目必须有`package.json`

* `scripts`：可以自定义一些命令，定义以后可以直接通过npm来执行这些命令

    ​	`start`和`test`可以直接通过 `npm start `和 `npm test `执行

    ​	其他自定义命令需要通过`npm run xxx`执行

### 2. 命令

* `npm init`初始化项目，创建`package.json`文件(需要回答问题)

* `npm init -y` 初始化项目，创建`package.json`文件(所有值都采用默认值)

* `npm install 包名`  将指定包下载到当前项目

    ​      install时发生了什么？

    ​        ① 将包下载到当前项目的`node_modules`目录下

    ​        ② 会在`package.json`的`dependencies`属性中添加一个新属性

    ​             ` "lodash": "^4.17.21"`

    ​              `"^4.17.21"`表示匹配最新的`4.x.x`的版本，也就是如果后期`lodash`包更新到了`4.18.1`，我们的包也会一起更新，但是如果更新到了`5.0.0`，我们的包是不会随之更新的。

    ​              如果是`~4.17.21"`，~表示匹配最小依赖，也就是`4.17.x`。

    ​              如果是`"*"`则表示匹配最新版本，即`x.x.x`（不建议使用）。

    ​        ③ 会自动添加`package-lock.json`文件

    ​          	帮助加速npm下载

* `npm install` 自动安装所有依赖
* `npm uninstall 包名` 卸载

### 3. npm镜像

* npm的仓库服务器位于国外，有时候会因网络问题不好用

* 为了解决这个问题，可以在npm中配置一个镜像服务器

* 镜像的配置：

    ​      ① 在系统中安装cnpm（不推荐使用）

    ​        	`npm install -g cnpm --registry=https://registry.npmmirror.com`

    ​      ② 彻底修改仓库地址

    ​        	`npm set registry https://registry.npmmirror.com`

    ​       	 还原到原版仓库：

    ​          		`npm config delete registry`

## 四、 HTTP协议

### 1. HTTP协议

* 网络基础

* 网络的服务器基于请求和响应的

    * `https:// 协议名`  http ftp ...
    * `baidu.com` 域名 domain
        * 整个网络中存在着无数个服务器，每一个我服务器都有它自己的唯一标识，这个标识被称为 ip地址 `192.168.1.17`，但是ip地址不方便记忆，域名就相当于是ip地址的别名
    * `/hello/index.html` 网站资源路径

* 当在浏览器中输入地址以后发生了什么？

    ​	① DNS解析，获取网站的ip地址
    ​    ② 浏览器需要和服务器建立连接（tcp/ip）（三次握手）
    ​    ③ 向服务器发送请求（http协议）
    ​    ④ 服务器处理请求，并返回响应（http协议）
    ​    ⑤ 浏览器将响应的页面渲染
    ​    ⑥ 断开和服务器的连接（四次挥手）

* 客户端如何和服务器建立（断开）连接?
    * 通过三次握手和四次挥手
        * 三次握手（建立连接）：三次握手是客户端和服务器建立连接的过程
            客户端向服务器发送连接请求 ` SYN`
            服务器收到连接请求，向客户端返回消息 `SYN ACK `
            客户端向服务器发送同意连接的信息` ACK`
        * 四次挥手（断开连接）
            客户端向服务器发送请求，通过之服务器数据发送完毕，请求断开来接 `FIN`
            服务器向客户端返回数据，知道了 `ACK`
            服务器向客户端返回数据，收完了，可以断开连接`FIN ACK`
            客户端向服务器发数据，可以断开了` ACK`
    * 请求和响应实际上就是一段数据，只是这段数据需要遵循一个特殊的格式，这个特殊的格式由HTTP协议来规定

### 2. TCP/IP协议族

#### 2.1 简述

TCP/IP协议族中包含了一组协议，这组协议规定了互联网中所有的通信的细节

#### 2.2 网络通信四层

* 网络通信的过程由四层组成
    应用层：软件的层面，浏览器 服务器都属于应用层
    传输层：负责对数据进行拆分，把大数据拆分为一个一个小包
    网络层：负责给数据包，添加信息
    数据链路层：传输信息

#### 2.3 报文

* HTTP协议就是应用层的协议，用来规定客户端和服务器间通信的报文格式的

* 一个服务器的主要功能：
    可以接收到浏览器发送的请求报文
    可以向浏览器返回响应报文

* 报文（message）：浏览器和服务器之间通信是基于请求和响应的
    浏览器向服务器发送请求`（request）`，相当于浏览器给服务器写信
    服务器向浏览器返回响应`（response）`，相当于服务器给浏览器回信
    这个信在HTTP协议中就被称为报文，而HTTP协议就是对这个报文的格式进行规定

* 请求报文`（request）`

    * 客户端发送给服务器的报文称为请求报文

    * 请求报文的格式如下：

        * 请求首行

            请求首行就是请求报文的第一行
            `GET /index.html?username=sunwukong HTTP/1.1`
            第一部分` get` 表示请求的方式，get表示发送的是get请求
                现在常用的方式就是get和post请求
            	get请求主要用来向服务器请求资源
                post请求主要用来向服务器发送数据

            第二部分 `/index.html?username=sunwukong`
            	表示请求资源的路径，
            	`? `后边的内容叫做查询字符串
            	查询字符串是一个名值对结构，一个名字对应一个值，使用`=`连接，多个名值对之间使用`&`分割
                        `username=admin&password=123123`
                get请求通过查询字符串将数据发送给服务器
                	由于查询字符串会在浏览器地址栏中直接显示，所以安全性较差

            ​    	同时，由于url地址长度有限制，所以get请求无法发送较大的数据

            ​    post请求通过请求体来发送数据

            ​		在chrome中通过 载荷 可以查看

            ​		post请求通过请求体发送数据，无法在地址栏直接查看，所以安全性较好
            ​        请求体的大小没有限制，可以发送任意大小的数据

            ​		如果需要向服务器发送数据，能用post尽量使用post

            第三部分
                        `HTTP/1.1` 协议的版本

        * 请求头

            * 请求头也是名值对结构，用来告诉服务器我们浏览器的信息

            * 每一个请求头都有它的作用：

                `Accept` 浏览器可以接受的文件类型
                `Accept-Encoding `浏览器允许的压缩的编码
                `User-Agent `用户代理，它是一段用来描述浏览器信息的字符串

        * 空行：用来分隔请求头和请求体
        * 请求体：post请求通过请求体来发送数据

* 响应报文

    * 响应首行

        * `HTTP/1.1 200 OK`

            `200` 响应状态码
            `ok `对响应状态码的描述
            响应状态码的规则
                   `1xx` 请求处理中
                   `2xx` 表示成功
                   `3xx` 表示请求的重定向
                  ` 4xx`表示客户端错误
                   `5xx` 表示服务器的错误

    * 响应头
        * 响应头也是一个一个的名值对结构，用来告诉浏览器响应的信息
        * `Content-Type` 用来描述响应体的类型
        * `Content-Length` 用来描述响应体大小

    * 空行：空行用来分隔响应头和响应体
    * 响应体：服务器返回给客户端的内容

## 五、 express

### 1. express简述

#### 1.1 创建和使用

* express是node中的服务器软件，通过express可以快速地在node中搭建一个web服务器

* 使用步骤

    ​    1. 创建并初始化项目

    ​      `npm init -y`

    ​    2. 安装express

    ​      `npm i express`

    ​    3. 创建`index.js` 并编写代码

#### 1.2 启动服务器

```javascript
//1. 引入express
const express = require("express");

//2. 获取服务器的实例（对象）
const app = express();

/* 
    3. 启动服务器
    app.listen(端口号)用来启动服务器
    服务器启动后，即可通过3000端口来访问了
    协议名://ip地址:端口号/路径
    http://localhost:3000
    http://127.0.0.1:3000
*/
app.listen(3000, () => {
    console.log("服务器启动了~");
})
```

#### 1.3 路由和中间件

* 如果希望服务器可以正常访问，则需要为服务器设置路由，路由可以根据不同的请求方式和请求地址来处理用户的请求

    ​	`app.METHOD(...)`  `METHOD`可以是`get`或者`post`

* 路由的回调函数执行时，会接收三个参数，第一个是request，第二个是response

* 在路由中，应该做两件事

    ​	读取用户的请求（request）req表示的是用户的请求信息，通过req可以获取用户传递的数据

    ​	根据用户的请求返回响应（response） res表示服务器发送给客户端的响应信息，通过res来向客户端返回数据

    ​		sendStatus()向客户端发送响应状态码

    ​		status()用来设置响应状态码，但是并不发送

    ​		send()设置并发送响应体
    ```javascript
    app.get("/", (req, res) => {
        console.log("有人访问我了~");
        console.log(req.url);
        //res.sendStatus(404);
        res.status(200);
        res.send("<h1>这是我的第一个服务器！</h1>");
    })
    ```
* 中间件：在express中使用app.use来定义一个中间件
  	中间件和路由的作用很像，用法也很像；但是路由不区分请求方式，只看路径
* 中间件和路由的区别
  	路由会匹配所有的请求
    路由的路径设置父目录
* 中间件如果不写"/",则根目录下所有的访问路径都会执行
* `next()`是回调函数的第三个参数，是一个函数，调用函数后，可以触发后续的中间件;`next()`不可以在响应处理完毕后调用
	```javascript
	app.use((req, res, next) => {
        console.log("收到请求1");
        next()//放行，我不管了~
    });

    app.use((req, res, next) => {
        console.log("收到请求2");
        next()//放行，我不管了~
    });

    app.use((req, res, next) => {
        console.log("收到请求3");
        res.send("这是通过中间件返回的响应3")
    });
	```
#### 1.4 静态资源
* 服务器中的代码，对于外部来说是不可见的，所以我们写的html页面，浏览器无法直接访问
	如果希望浏览器访问，则需要将页面所在的目录设置为静态资源目录
	```javascript
	app.use(express.static(path.resolve(__dirname, "./public")));
	```
    设置static中间件后，浏览器访问时，会自动取public目录寻找是否有匹配
#### 1.5 get请求
* get请求发送参数的第一种方式：查询字符串
  通过`req.query`获取客户端的请求数据
  ```javascript
  app.get("/login", (req, res) => {
    if(req.query.username === "123" && req.query.password === "123"){
        res.send("<h1>登录成功！</h1>")
    }else{
        res.send("<h1>登录失败！</h1>")
    }
  })
  ```
* get请求的发送参数的第二种方式：params
  可以通过`req.params`属性来获取这些参数
  `/hello/:id`  表示当用户访问/hello/xxx时会触发
  在路径中以冒号命名的部分我们成为`param`，在get请求它可以被解析为请求参数
  ```javascript
  app.get("/hello/:id", (req, res) => {
    console.log(req.params);
    res.send("<h1>这是hello路由</h1>");
  })
  ```
#### 1.6 post请求
* 通过req.body来获取post请求的参数(请求体中的参数)
  默认情况下，express不会自动解析请求体，需要通过中间件为其增加功能
  ```javascript
  //引入解析请求体的中间件
  app.use(express.urlencoded());
  ```

  ```javascript
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === "123" && password === "123"){
        res.send("<h1>登录成功！</h1>")
    }else{
        res.send("<h1>登录失败！</h1>")
    }
  })
  ```
### 2. 模板引擎
#### 2.1 模板引擎的产生
* html页面属于静态页面，创建的时候是什么样子，用户看到的就是什么样子，不会自动跟随服务器中数据的变化而变化
*  希望有一个东西，长得像网页，但是可以嵌入变量，这个东西在node中被称为**模板**
*  node中有很多个模板引擎
#### 2.2 ejs模板引擎
* 使用步骤
  1.安装ejs  npm i ejs
  2.配置express的模板引擎为ejs 
    ```javascript
    app.set("view engine", "ejs");
    ```
  3.配置模板路径
    ```javascript
    app.set("views", path.resolve(__dirname, "views"));
    ```
* 渲染
  * 模板引擎需要被express渲染后才能使用
  * `res.render()` 用来渲染一个模板引擎，并将其返回给浏览器   
  * 可以将一个对象作为`render`的第二个参数传递，这样在模板中可以访问到对象中的数据
        `<%= %>` 在ejs中输出内容时，它会自动对字符中的特殊符号进行转义` < `转义成 `&lt;`
          这个设计主要是为了避免xss攻击 
        `<%- %>`  直接将内容输出
        `<% %>` 可以在其中直接编写js代码，js代码会在服务器中执行
  ```javascript
    res.render("students", {name:"swk", age:18});
  ```
### 3. Router
* 步骤
  * 在项目中新建一个routes文件夹，这个文件夹下面存路由文件
    在路由文件中，创建router对象，并将router暴露到模块外
    ```javascript
    const express = require("express");
    const router = express.Router();
    router.get("/list", (req, res) => {
        res.send("hello 我是user list")
    });
    module.exports = router
    ```
  * 在index.js中引入路由文件，并设置中间件
    ```javascript
    const userRouter = require("./routes/user");
    app.use("/user", userRouter);
    ```
    访问list时，完整路径为`http://localhost:3000/user/list`
### 4. Cookie
#### 4.1 cookie的产生
* HTTP是一个无状态的协议，服务器无法区分请求是否发送自同一个客户端
* cookie是HTTP协议中用来解决无状态问题的技术
#### 4.2 cookie使用
* cookie的本质就是一个头
    服务器以响应头的形式将cookie发送给客户端，客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回，这样服务器就可以根据cookie来识别出客户端了
* 安装中间件使得express可以解析cookie
    1. 安装`cookie-parser npm i cookie-parser`
    2. 引入 
      ```javascript
      const cookieParser = require("cookie-parser");
      ```
    3. 设置中间件
      ```javascript
      app.use(cookieParser());
      ```
* 假设在登录场景中，登录成功后，通过`res`设置cookie
  ```javascript
  res.cookie("username", username);
  ```
  需要访问登录后才能访问的页面时，判断cookie是否存在
  ```javascript
    if(req.cookies.username){
      res.render("students", { stus: STUDENTS });
    }else{
      res.redirect("/")
    }
  ```
* cookie的默认有效期是一次会话（session），会话就是一次从打开到关闭浏览器的过程
    `maxAge` 用来设置cookie的有效时间，单位是毫秒
  
  ```javascript
    res.cookie("name", "swk", {
      maxAge:1000 * 60 * 60 * 24 *30//一个月的时间
    });
  ```
* cookie一旦发送给浏览器就不能再修改了，但是可以通过发送新的同名cookie来替换旧cookie，从而达到修改的目的
* cookie的不足：cookie是由服务器创建、浏览器保存，每次浏览器访问服务器时都需要将cookie发回，导致不能在cookie中存放较多的数据，并且cookie是直接存储在客户端，容易被篡改盗用
  注意：使用cookie功能一定不会在cookie存储敏感数据
### 5. Session
#### 5.1 session的产生
* session是服务器中的一个对象，这个对象用来存储用户的数据
* 每一个session对象都有一个唯一的id，id会通过cookie的形式发给客户端
* 客户端每次访问时只需将存储有id的cookie发回即可获取它在服务器中存储的数据
#### 5.2 session使用
* 使用步骤
    ① 安装 `npm i express-session`
    ② 引入
      ```javascript
      const session = require("express-session")
      ```
    ③ 设置为中间件
      ```javascript
      app.use(session({...}))
      ```
* session什么时候会失效？
    浏览器的cookie没了
    服务器中的session对象没了   
#### 5.3 session持久化
* express-session默认是将session存储到内存中，所以服务器一旦重启session会自动重置，所以我们使用session通常会对session进行一个持久化的操作（写到文件或数据库）
* 如何将session存储到本地文件：
    需要引入一个中间件`session-file-store`
    ① 安装 `npm i session-file-store`
    ② 引入
    
      ```javascript
      const FileStore = require("session-file-store")(session);
      ```
    ③ 设置为中间件
      ```javascript
      app.use(
        session({
          store: new FileStore({}),
          secret: "hello"
        })
      );
      ```
#### 5.4 session的方法
* `destroy()`  使session失效
  
  ```javascript
  req.session.destroy(() => {
      res.redirect("/");
  });
  ```
* `save() `使得session可以立刻存储
  
  ```javascript
  req.session.save(() => {
    res.redirect("/student/list");
  }); 
  ```
### 6. crsf攻击
#### 6.1 简述

crsf即跨站请求伪造

#### 6.2 解决方案

* 现在大部分的浏览器都不会在跨域的情况下自动发送cookie，这个设计就是为了避免csrf的攻击

* 怎么解决？
  1. 使用`referer`头来检查请求的来源
  
      ```javascript
       const referer = req.get("referer");
          if(!referer || !referer.startsWith("http://localhost:3000/")){
              res.status(403).send("你没有这个权限！");
              return;
         }
      ```
  
  2. 使用验证码
  
  3. 尽量使用post请求(结合token)

#### 6.3 token

* token(令牌)
  可以在创建表单时随机生成一个令牌，然后将令牌存储到session中，并通过模板发送给用户
  用户提交表单时，必须将`token`发回，才可以进行后续操作(可以使用`uuid`来生成`token`)
  
* uuid的使用
  * 安装 `npm i uuid`
  * 引入 `const uuid = require("uuid").v4;`
  * 使用
    ```javascript
    //生成一个token
    const csrfToken = uuid();
    //将token添加到session中
    req.session.csrfToken = csrfToken;
    ```

## 六、Rest

### 1. Rest简述

* 全称`REpresentstional State Transfer`，表示层状态的传输。
* Rest实际上就是一种服务器的设计风格，它的主要特点是：服务器只返回数据
* 服务器和客户端传输数据时通常会使用JSON作为数据格式
* 请求的方法：
    * GET    加载数据
    * POST   新建或添加数据
    * PUT    添加或修改数据
    * PATCH  修改数据
    * DELETE 删除数据
    * OPTION 由浏览器自动发送，检查请求的一些权限

### 2. AJAX

* A：异步   J：Javascript   A：和   X：xml

* 异步的js和xml，它的作用就是通过js向服务器发送请求来加载数据

* xml是早期AJAX使用的数据格式

    ```xml
    <student>
        <name>孙悟空</name>
    </student>
    ```

* 目前数据格式都用json

    ```json
    {"name":"孙悟空"}
    ```

* 可选择的方案：`XMLHTTPRequest(xhr)`、`Fetch`、`Axios`

* CORS(跨域资源共享)

    * 跨域请求：两个网站的完整域名不相同

        a网站：http://haha.com

        b网站：http://heihei.com

    * 跨域需要检查三个东西：协议 域名 端口号。三个只要有一个不同就算跨域

    * 当AJAX去发送跨域请求时，浏览器为了服务器的安全，会阻止JS读取到服务器的数据

    * 解决方案：在服务器中设置一个允许跨域的头，`Access-Control-Allow-Origin`，允许哪些客户端访问我们的服务器

        ```javascript
        //设置响应头
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
        ```

### 3. XMLHTTPRequest

```javascript
const xhr = new XMLHttpRequest();
//设置响应体的类型，设置后会自动对数据进行类型转换
xhr.responseType = "json";
//xhr.response表示响应信息
const result = xhr.response;
xhr.open("GET","http://localhost:3000/student");
xhr.send();
```

### 4. Fetch

#### 4.1 fetch发送请求

```javascript
fetch("http://localhost:3000/xxx")
.then((res) => {return xxx})
.then((res)=>{return xxx})
.catch((err)=>{console.log(err)});
```

通过`body`去发送数据时，必须通过请求头来指定数据的类型

```javascript
headers:{
    // application/x-www-form-urlencoded 
    "Content-type":"application/json"
},
```

#### 4.2 本地存储

* 所谓的本地存储就是指浏览器自身的存储空间，可以将用户的数据存储到浏览器内部

​            `sessionStorage` 中存储的数据 页面一关闭就会丢失

​            `localStorage` 存储的时间比较长

​			`setItem()`用来存储数据

​      	  `getItem()`用来获取数据

​     	   `removeItem()`删除数据

​      	  `clear()`清空数据

* 怎么生成一个token

    * 安装`jsonwebtoken`

    * 引入`const jwt = require("jsonwebtoken");`

    * 生成token

        ```javascript
        const token = jwt.sign({
            id:"12345",
            username:"admin",
            nickname:"超级管理员"
        }, "chaojianquanmima", {
            expiresIn:"1h"
        })
        ```

    * 服务器生成后返回客户端，客户端将token存储在本地存储`localStorage`中

    * 访问需要验证`token`后才能进入的页面时

        ```javascript
        //读取请求头
        const token = req.get("Authorization").split(" ")[1];
        //对token进行解码
        const decodeToken = jwt.verify(token, "chaojianquanmima");
        ```

#### 4.3 终止请求

使用AbortController

```javascript
let controller;
btn01.onclick = () => {
    //创建一个AbortController
    controller = new AbortController();
    
    //终止请求
    //点击按钮向test发送请求
    fetch("http://localhost:3000/test", {
        signal: controller.signal
    })
        .then((res) => console.log(res))
        .catch((err) => console.log("出错了！"));
}
btn02.onclick = () => {
    //如果controller为空（false），则不执行&&后面的代码
    //如果controller不为空（true），则执行&&后面的代码
    controller && controller.abort();
}
```

### 5. Axios

#### 5.1 引入

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

#### 5.2 axios配置对象

* 直接调用`axios(config)`发送请求

* `baseURL` 指定服务器的根目录（路径的前缀）

    ```javascript
    baseURL:"http://localhost:3000",
    ```

* 请求地址

    ```javascript
    url:"student",
    ```

* 请求方法，默认是get

    ```javascript
    method:"get",
    ```

* 请求体

    ```javascript
    data:"name=swk&age=16"
    data:{
        name:"swk",
        age:18,
        gender:"男",
        address:"火锅山"
    },
    ```

* `params` 指定路径中的查询字符串

    ```javascript
    params:{
        id:1
    },
    ```

* timeout 过期时间

    ```javascript
    timeout:1000,  //1s以后自动取消
    ```

* 用来终止请求

    ```javascript
    signal,
    ```

* `transformRequest` 可以用来处理请求数据（data），它需要一个数组作为参数，数组可以接收多个参数，请求发送时多个函数会按照顺序执行，函数在执行时，会接收到两个参数`data`和`headers`

    ```javascript
    transformRequest:[
        function(data, headers) {
            //可以在函数中对data和headers进行修改
            data.name = "猪八戒"
            headers["Content-Type"] = "application/json"
            console.log(headers, data);
            return data//这里设置返回值，下一个函数才能拿到data
        }, function (data, header) {
            // 最后一个函数必须返回一个字符串，才能使得数据有效
            return JSON.stringify(data);
        }
    ] 
    ```

#### 5.3 axios响应结构

一个请求的响应包含以下信息。

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

当使用 `then` 时，您将接收如下响应:

```js
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

#### 5.4 axios默认配置

全局 axios 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

自定义实例默认值

```js
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

#### 5.5 axios拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你稍后需要移除拦截器，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以给自定义的 axios 实例添加拦截器。

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```