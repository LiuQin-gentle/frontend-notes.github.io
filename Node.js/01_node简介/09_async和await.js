function fn() {
    return Promise.resolve(10);
}
//console.log(fn());

async function fn2() {
    return 10;
}
//console.log(fn2()); 

/* 
    以上两种写法返回相同的结果
    async 创建一个异步执行的方法，返回值类型为Promise
*/

async function sum(a, b) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    })
}

/* 
    Promise解决了异步调用中回调函数问题，
        虽然通过链式调用解决了回调地狱，但是链式调用太多以后还是不好看
*/
async function fn3() {
    /* sum(123, 456)
        .then(r => sum(r, 7))
        .then(r => sum(r, 8))
        .then(r => console.log(r)); */

    /* 
        当我们通过await去调用异步函数时，它会暂停代码的运行
            直到异步代码有结果时,才会将结果返回
        注意：await只能用于async声明的异步函数中，或es模块的顶级作用域中
        await阻塞的只是异步函数内部的代码，不影响外部代码
        通过await调用异步代码时，需要通过try-catch来处理异常
    */
    try {
        let result = await sum(123, 456);
        result = await sum(result, 7);
        result = await sum(result, 8);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    
}
//fn3();
//console.log("全局输出~");

/* 
    如果async声明的函数中没有写await，那么它就相当于普通函数，只是返回值类型被定义为Promise类型而已
*/
/* async function fn4() {
    console.log(1);
    console.log(2);
    console.log(3);
}
fn4();
console.log(4); */

/* 
    当使用await调用函数后当前函数后边的所有代码
        会在当前函数执行完毕后，被放入到微任务队列中
*/
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

(async () => {await console.log("嘿嘿")})()