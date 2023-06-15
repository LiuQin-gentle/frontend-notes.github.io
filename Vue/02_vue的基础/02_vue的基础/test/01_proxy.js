//创建一个对象
const obj = {
    name:"孙悟空",
    age:18
}

//来为对象创建一个代理
const handler={} //handler用来指定代理的行为

//创建代理
const proxy = new Proxy(obj, handler);

//修改代理的属性
proxy.age = 28
console.log(proxy.age);//28
console.log(obj.age);//28