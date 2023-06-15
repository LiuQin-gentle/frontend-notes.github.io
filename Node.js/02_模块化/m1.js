let a = 10; 
let b = 20;
//console.log(a + b);

/* 
    在定义模块时，模块中的内容默认是不能被外部看到的
        可以通过exports来设置要向外部暴露的内容

    访问exports的方式有两种：
        exports
        module.exports
        - 当我们在其他模块中引入当前模块时，require函数返回的就是exports
        - 可以将希望暴露给外部模块的内容设置为exports的属性
*/

//可以通过exports一个一个的导出值
// exports.a = "孙悟空";
// exports.b = "猪八戒";
// exports.c = function fn() {
//     console.log("我是fn");
// }

//也可以直接通过module.exports同时导出多个值
module.exports = {
    a: "孙悟空",
    b: "猪八戒",
    c: function fn() {
        console.log("我是fn");
    }
}