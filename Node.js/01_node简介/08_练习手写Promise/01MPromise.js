const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MPromise{
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
        //当resolve执行时，说明数据已经进来了，需要调用then的回调函数
        queueMicrotask(() => {
            this.#callbacks.forEach(cb => {
                cb();
            });
        })
    }

    #reject(){}

    then(onFulfilled, onRejected){
        return new MPromise((resolve, reject) => {
            if(this.#state === PROMISE_STATE.PENDING){
                this.#callbacks.push(() => {
                    //把回调函数onFulFilled的返回值作为resolve的参数传给新的Promise
                    resolve(onFulfilled(this.#result));
                });
            }else if(this.#state === PROMISE_STATE.FULFILLED){
                queueMicrotask(() => {
                    onFulfilled(this.#result);
                })  
            }
        }) 
    }
}

const mPromise = new MPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("孙悟空");
    }, 1000);
})

mPromise.then(result => {
    console.log("读取数据1",result);
    return "猪八戒";
}).then(result => {
    console.log("读取数据2",result);
    return "沙和尚";
}).then(result => {
    console.log("读取数据3",result);
})