/* 
    ES模块化
*/

//向外部导出内容
export let a = 10;
export const b = "孙悟空";
export const c = {name: "猪八戒"};

//一个模块只有一个默认导出
export default function sum(a, b) {
    return a + b;
}

let d = 20;
//export default d;//只要一个值，不要写表达式