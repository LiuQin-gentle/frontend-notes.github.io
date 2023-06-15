/* 
    path
        - 表示的是路径
        - 通过path可以用来获取各种路径
        - 要使用path，需要先对其进行引入
        - 方法：
            path.resolve([...paths])
                - 用来生成一个绝对路径
                    相对路径：./xxx ../xxx xxx
                    绝对路径：
                        - 在计算机本地
                            c:\xxx
                            /USer/xxx
                        - 在网络中
                            http://www.xxx/...
                            https://www.xxx/...
                    如果直接调用resolve，则返回当前的工作目录
                        (F5执行)      E:\前端
                        (终端node执行)E:\前端\Node.js\03_核心模块
                    注意：通过不同的方式执行代码时，它的工作目录是有可能发生变化的
            - 如果将一个相对路径作为参数：
                则resolve会自动将其转换为绝对路径
                此时根据工作目录的不同，所产生的路径也不同
            
            - 一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数
                这样会自动计算出最终的路径
*/
 const path = require("node:path")
// console.log(path);

const result = path.resolve();

//const result = path.resolve("./hello.js");
//const result = path.resolve(__dirname, "./hello.js");
console.log(result);