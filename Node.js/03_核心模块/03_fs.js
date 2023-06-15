/* 
    fs.readFile() 读取文件
    fs.appendFile() 创建新文件，或将数据添加到已有文件中
    fs.mkdir() 创建目录
    fs.rmdir() 删除目录
    fs.rm() 删除文件
    fs.rename() 重命名（剪切）
    fs.copyFile() 复制文件
*/
const fs = require("node:fs/promises");
const path = require("node:path");

// fs.appendFile(
//     path.resolve(__dirname, "./hello.txt"), 
//     "超哥讲的很棒"
// ).then(r => {
//     console.log("添加成功");
// })

//复制一个图片
// fs.readFile("E:\\前端\\JS\\10_DOM\\images\\6.png")
//     .then(buffer => {
//         return fs.appendFile(
//             path.resolve(__dirname, "daola.png"),
//             buffer
//         )
//     })
//     .then(() => {
//         console.log("操作结束");
//     })

// fs.mkdir(path.resolve(__dirname, "./hello"))
//     .then(() => {
//         console.log("创建文件成功");
//     })

/* 
    mkdir可以接收一个配置对象作为第二个参数
        通过该对象可以对方法的功能进行配置
        recursive 默认值为false
            设置true以后，会自动创建不存在的上一级目录
*/

/* fs.mkdir(path.resolve(__dirname, "./hello/abc"), {recursive: true})
    .then(() => {
        console.log("创建文件成功");
    })
 */

// fs.rmdir(path.resolve(__dirname, "./hello"))
//     .then(() => {
//         console.log("删除成功");
//     })

// fs.rmdir(path.resolve(__dirname, "./hello/abc"), {recursive: true})
//     .then(() => {
//         console.log("删除成功");
//     })

//慎用递归删除
// fs.rename(path.resolve(__dirname, "./hello"), path.resolve(__dirname, "./hello1"))
//     .then(() => {
//         console.log("重命名成功");
//     })

//fs.copyFile()