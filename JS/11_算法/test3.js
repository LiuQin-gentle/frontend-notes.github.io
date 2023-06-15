let obj = { a: "1", b: "2", c: "3" };

for (let i in obj) {
  console.log(i);
}

Object.defineProperty(obj, "d", {
  value: "4",
});

console.log(obj);

let obj1 = {};
//与我们使用 obj.name = 'zhangsna' 效果一样 但是用defineProperty定义的属性无法改变 或者删除
Object.defineProperty(obj1, "name", {
  value: "zhangsan",
});
console.log(obj1);