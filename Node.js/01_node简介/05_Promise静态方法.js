/* 
    静态方法    
*/

/* 
    Promise.resolve() 创建一个立即完成的Promise
*/
//Promise.resolve(10).then(r =>{console.log(r)});

/* 
    Promise.reject() 创建一个立即拒绝的Promise
*/
//Promise.reject("哈哈").then(result => {console.log("result",result)}, reason => {console.log("reason",reason)});

function sum(a, b) {
    return new Promise((resolve, reject) => {
        resolve(a + b);
    })
}

/* 
    Promise.all([...]) 同时返回多个Promise的执行结果
        其中有一个报错，就返回错误
*/
// Promise.all([
//     sum(123,456), 
//     sum(222, 444), 
//     //Promise.reject("嘿嘿"),
//     sum(111, 222)
// ]).then(r => {
//     console.log(r);
// })

/* 
    Promise.allSettled([...]) 同时返回多个Promise的执行结果(无论成功或失败)
        {status: 'fulfilled', value: 579}
        {status: 'rejected', reason: '嘿嘿'}
*/
// Promise.allSettled([
//     sum(123,456), 
//     sum(222, 444), 
//     Promise.reject("嘿嘿"),
//     sum(111, 222)
// ]).then(r => {
//     console.log(r);
// })

/* 
    Promise.race() 返回执行最快的Promise(不考虑对错)
*/
// Promise.race([
//     Promise.reject("嘿嘿"),
//     sum(123,456), 
//     sum(222, 444), 
//     sum(111, 222)
// ]).then(r => {
//     console.log(r);
// }).catch(reason =>{
//     console.log(reason);
// })

/* 
    Promise.any([...]) 返回执行最快的完成的Promise
    都是rejected时，报错All promises were rejected 
*/
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
