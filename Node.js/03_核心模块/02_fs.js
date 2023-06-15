/* 
    fs模块
        用来读取磁盘中的文件
*/
const fs = require("node:fs");
const path = require("node:path");

/* 
    fs.readFileSync() 同步的读取文件的方法，会阻塞后边代码的执行
    当我们通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
    Buffer是一个临时用来存储数据的缓冲区
*/
// const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"));
// console.log(buf.toString());

/* 
    readFile()是异步读取文件的方法
*/
// fs.readFile(
//     path.resolve(__dirname, "./hello.txt"),
//     (err, buffer) => {
//         if(err){
//             console.log("出错了");
//         }else{
//             console.log(buffer.toString());
//         }
//     }
// )

const fs1 = require("node:fs/promises");
//const {buffer} = require("stream/consumers");
/* 
    promise版本的fs方法
*/
/* fs1.readFile(path.resolve(__dirname, "./hello.txt"))
    .then(buffer => {
        console.log(buffer.toString());
    })
    .catch(e => {
        console.log("出错了");
    }); */

;(async () => {
    try {
        const buffer = await fs1.readFile(path.resolve(__dirname, "./hello.txt"));
        console.log(buffer.toString());
    } catch (error) {
        console.log("出错了");
    }
})()