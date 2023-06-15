/* 
    所有CommonJS的模块都会被包装到一个函数中
*/
/* (function(exports, require, module, __filename, __dirname) {
    //模块代码会被放到这里 
}); */

let a = 10;
let b = 20;
//所有的实参都会封装到arguments对象中
console.log(arguments);