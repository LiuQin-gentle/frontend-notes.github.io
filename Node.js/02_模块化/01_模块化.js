/* 
    早期的网页中，是没有一个实质性的模块规范的
        我们实现模块化的方式，就是最原始的通过script标签来引入多个js文件
        问题：
            1. 无法选择要引入模块的哪些内容
            2. 在复杂的模块场景下非常容易出错
            ......
        于是，我们就急需在js中引入一个模块化的解决方案
    在node中，默认支持的模块化规范叫做CommonJS，
        在CommonJS中，一个js文件就是一个模块
    
        CommonJS规范
            - 引入模块
                - 使用require("模块的路径")函数来引入模块
                - 引入自定义模块时，
                    - 模块名要以./ 或 ../ 开头
                    - 扩展名可省略
                        在CommonJS中，如果省略js文件的扩展名，node会自动为文件补全扩展名
                            ./m1.js 如果没有js 它会寻找./m1.js
                            js --> json --> node(特殊)
                - 引入核心模块时
                    - 直接写核心模块的名字即可
                    - 也可以在核心模块前添加node:

*/
const m1 = require("./m1");
//const path = require("path")
const path = require("node:path")
//m1.c();
const m2 = require("./m2.cjs");
console.log(m2);