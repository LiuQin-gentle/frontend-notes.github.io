/* 
    1. 处理链式调用的问题
        返回值类型是Promise，才可以链式调用
*/
const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}
class MyPromise{
    #result

    #state = PROMISE_STATE.PENDING

    #callbacks = []

    constructor(executor){
        executor(this.#resolve.bind(this), this.#reject.bind(this));
    }

    #resolve(value){

        if(this.#state !== PROMISE_STATE.PENDING) return;
        this.#result = value;
        this.#state = PROMISE_STATE.FULFILLED;

        queueMicrotask(() => {
            this.#callbacks.forEach(cb => {
                cb();
            })
        })
    }

    #reject(reason){}

    then(onFulfilled, onRejected){
        /* 
            谁将成为then返回的新Promise中的数据？？？
                then中回调函数的返回值，会成为新的Promise中的数据
        */
        return new MyPromise((resolve, reject) => {
            if(this.#state === PROMISE_STATE.PENDING){
                this.#callbacks.push(() => {
                    //把回调函数onFulFilled的返回值作为resolve的参数传给新的Promise
                    resolve(onFulfilled(this.#result));
                })
            } else if(this.#state === PROMISE_STATE.FULFILLED){
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
