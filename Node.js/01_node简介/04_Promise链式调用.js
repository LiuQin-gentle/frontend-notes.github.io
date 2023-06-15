function sum(a, b) {
    return new Promise((reslove, reject) => {
        reslove(a + b);
    })
}

/* sum(123, 456).then((result)=>{
    sum(result, 7).then(result => {
        sum(result, 8).then(result => {
            console.log(result);
        })
    })
}); */
/* sum(123, 456)
    .then(result => result + 7)
    .then(result => result + 8)
    .then(result => console.log(result)); */

const promise = new Promise((resolve, reject) => {
    reject("周一到周五19点, 不见不散");
});

/* 
    后边的方法（then 和 catch）读取上一步的执行结果，
        如果上一步的执行结果不是当前想要的结果，则跳过当前的方法
    例：上面的promise中如果是resolve存储数据，则下面的方法中跳过第一个catch
        上面的promise中如果是reject存储数据，则下面的方法中跳过第一个then

    当Promise出现异常时，而整个调用链中没有出现catch，则异常会向外抛出
*/
promise
    .then(r => {
        console.log("第一个then", r);
        return "啦啦";
    })
    .catch(r => {
        //throw new Error("报个错");
        console.log("异常处理", r);
        return "嘻嘻"
    })
    .then(r => console.log("第二个then", r))
    .catch(r => console.log("出错了"));

/* const p2 = promise.then((result) => {
    console.log(result);
    return "锄禾日当午";
});

const p3 = p2.then((result) => {
    console.log(result);
    return "汗滴禾下土";
}); */

//promise链式调用
/* promise.
    then((result) => {
        console.log("回调函数", result);
        return "锄禾日当午";
    }).then((result) => {
        console.log("第二个then", result);
        return "汗滴禾下土";
    }).then((result) => {
        console.log(result);
    }) */
