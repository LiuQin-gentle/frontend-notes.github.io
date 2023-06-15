/* 
    1. 处理微任务队列的问题：then的回调函数，应该放到微任务队列中执行
    2. 处理只能读一次的问题(调用then的时候，读取数据)：用数组存储回调函数
*/
const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}
class MyPromise{
    #result

    #state = PROMISE_STATE.PENDING 

    //创建一个变量来存储回调函数
    //由于回调函数有多个，所以我们使用数组来存储回调函数
    #callbacks = []

    constructor(executor){
        executor(this.#resolve.bind(this), this.#reject.bind(this));
    }

    #resolve(value){
        if(this.#state !== 0) return;
        this.#result = value;
        this.#state = PROMISE_STATE.FULFILLED;

        queueMicrotask(() => {
            //调用#callbacks中的所有函数
            this.#callbacks.forEach(cb => {
                cb();
            })
        })
    }

    #reject(reason){

    }

    then(onFulfilled, onRejected){
        if(this.#state === PROMISE_STATE.PENDING){
            //this.#callback = onFulfilled;
            this.#callbacks.push(() => {
                onFulfilled(this.#result);
            })
        } else if(this.#state === PROMISE_STATE.FULFILLED){
           //onFulfilled(this.#result)

           /* 
                then的回调函数，应该放到微任务队列中执行，而不是直接调用
           */
          queueMicrotask(() => {
            onFulfilled(this.#result)
          })
        }
    }
}

const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("孙悟空");
    }, 1000);
})

mp.then((result) => {
    console.log("读取数据1", result);
})

mp.then((result) => {
    console.log("读取数据2", result);
})