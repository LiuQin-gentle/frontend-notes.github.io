//创建一个对象
const obj = {
    name:"孙悟空",
    age:18
}
/* 
    如果直接修改对象的属性，那么久仅仅修改了属性，没有去做其他事情，
        这种操作只会影响对象自身，不会导致元素的重新渲染
    希望在修改一个属性的同时，可以进行一些其他的操作，比如触发元素重新渲染！
    要实现这个目的，必须对对象进行改造，vue3中使用的是代理模式来完成对对象的改造
*/
//obj.name = "猪八戒";

//handler用来指定代理的行为
const handler={
    /* 
        get用来指定读取数据时的行为，它的返回值就是最终读取到的值
        指定get后，在通过代理读取对象属性时，就会调用get方法来获取值
    */
    get(target, prop, receiver){
        //返回值之前做一些其他的操作...
        //在vue中，data()返回的对象会被vue代理
        //vue代理后，当我们通过代理去读取属性时，返回值之前会先做一个跟踪的操作，调用一个track()方法

        /* 
            target   被代理的对象
            prop     读取的属性
            receiver 代理对象
        */
        return target[prop];
    },

    /* 
        set会在通过代理修改对象时调用
    */
    set(target, prop, value, receiver){
        target[prop] = value;
        //vue代理会调用trigger() 触发所有使用该值的位置进行更新
        //值修改之后做一些其他操作
    }

} 

//创建代理
const proxy = new Proxy(obj, handler);
//console.log(proxy);
//修改代理的属性(这里修改时，会调用handler里的set方法)
proxy.age = 28;
console.log(proxy.age);//这里读取时，会调用handler里的get方法
//console.log(obj.age);