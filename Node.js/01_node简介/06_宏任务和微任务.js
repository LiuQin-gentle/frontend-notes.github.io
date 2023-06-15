//***************<1>*********************
/* 
    这一段的输出结果是 1 3 2
    进入任务队列的顺序是：
        1. then中的回调函数进入微任务队列 
        2. queueMicrotask中的回调函数进入微任务队列 
        3. setTimeout中的箭头函数进入宏任务队列
    先执行微任务，所以先打印1、3,再执行宏任务2，最终输出是1 -> 3 -> 2
    第一步：打印出1
    第二步：打印出3
    第三步：打印出2
*/
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



//***************<2>*********************
/* 
    这一段的输出结果是 1 3 2
    进入微任务队列的顺序是：
        1. 第一个then中的回调函数 
        2. queueMicrotask中的回调函数 
        3. 第二个then中的回调函数
    按照队列的特点先进先出，所以执行的顺序也是按照1 -> 2 -> 3
    第一步：打印出1
    第二步：打印出3
    第三步：打印出2
*/
/* Promise.resolve().then(() => {
    console.log(1);
    Promise.resolve().then(() => {
        console.log(2);
    })
});

queueMicrotask(() => {
    console.log(3);
}); */

//***************<3>*********************
/* 
   
*/
/* console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => {
    console.log(3);
    setTimeout(() => {
        console.log(9);
        setTimeout(() => {
            console.log(10);
        }, 0);
    }, 0);
});

Promise.resolve().then(() => 
    setTimeout(() => 
        console.log(4)
    )
);

Promise.resolve().then(() => {
    console.log(5);
    setTimeout(() => {
        console.log(8);
    }, 0);
});

setTimeout(() => console.log(6));

console.log(7); */

/* 
    JS是单线程的，它的运行是基于事件循环机制（event loop）
        - 调用栈：放的是要执行的代码
        - 任务队列
            - 当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入到栈中执行
            - 在JS中任务队列有两种
                宏任务队列（大部分代码都去宏任务队列中去排队）
                微任务队列（Promise的回调函数then、catch、finally）
            - 整个流程
                1.执行调用栈中的代码
                2.执行微任务队列中的所有任务
                3.执行宏任务队列中的所有任务

*/

/* 
    Promse的执行原理
        - Promise在执行，then就相当于给Promise绑定了回调函数
            当Promise的状态从pending变为fullfilled时，then的回调函数会被放入到任务队列中
*/
/* Promise.resolve(1).then(() => {
    console.log(2);
})
console.log(1);
 */
/* 
    queueMicotask() 用来向微任务队列中添加一个任务
*/