## 1. 为什么要学习TypeScript

| TypeScript                                     | JavaScript                     |
| ---------------------------------------------- | ------------------------------ |
| JavaScript的超集，用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页 |
| 强类型，支持静态和动态类型                     | 动态弱类型语言                 |
| 可以在编译期间发现并纠正错误                   | 只能在运行时发现错误           |
| 不允许改变变量的数据类型                       | 变量可以被赋值成不同类型       |

## 2. TypeScript基础

### 2.1 基础类型

* boolean、number、string
* undefined、null
* any、unknown、void
* never
* 数组类型[]
* 元组类型 tuple

### 2.2 函数类型

* 定义：TS定义函数类型时要定义输入参数类型和输出类型

* 输入参数：参数支持可选参数和默认参数

* 输出参数：输出可以自动推断，没有返回值时，默认为void类型

* 函数重载：名称相同但参数不同，可以通过重载支持多种类型

  ```typescript
  function add(x: number[]): number
  function add(x: string[]): string
  function add(x: any[]): any{
      if(typeof x[0] === 'string'){
          return x.join()
      }
      if(typeof x[0] === 'number'){
          return x.reduce((acc, cur) => acc + cur)
      }
  }
  ```

### 2.3 interface

* 定义：接口是为了定义对象类型
* 特点：
  * 可选属性：？
  * 只读属性：readonly
  * 可以描述函数类型
  * 可以描述自定义属性

* 总结：接口非常灵活

  ```typescript
  interface Person{
      name: string
      age: number
  }
  const p1: Person = {
      name: 'lin',
      age: 18
  }
  ```

  ```typescript
  interface RandomKey{
      [propName: string]:string
  }
  const obj: RandomKey = {
      a: 'hello',
      b: 'world',
      c: 'typescript',
  }
  ```

### 2.4 类

* 定义：写法和JS差不多，增加了一些定义
* 特点:
  * 增加了public、private、protected修饰符
  * 抽象类:
    * 只能被继承、不能被实例化
    * 作为基类，抽象方法必须被子类实现

- interface约束类，使用implements关键字

  ```typescript
  class Person{
      protected name: string
      private sex: string
      public constructor(name: string){
          this.name = name
          this.sex = 'male'
      }
  }
  class Student extends Person{
      study(){
          console.log(this.name)
          console.log(this.sex)////Property 'sex' is private and only accessible within class 'Person ' .
      }
  }
  
  let person = new Person("daming")
  person.name//Property 'name' is protected and only accessible within class'Person' and its subclasses.
  person.sex////Property 'sex' is private and only accessible within class 'Person' .
  ```

## 3. TypeScript进阶

### 3.1 高阶类型

* 联合类型 |

  ```typescript
  let num: number | string
  num = 9
  num = 'nine'
  ```

* 交叉类型 &

  ```typescript
  type Student1 = Person1 & {grade: number}
  ```

* 类型断言
* 类型别名（type VS interface）
  * 定义：给类型起个别名
  * 相同点：1.都可以定义对象或函数；2.都允许继承
  * 差异点
    * interface是TS用来定义对象，type是用来定义别名方便使用;
    * type可以定义基本类型，interface不行;
    3. interface可以合并重复声明，type不行;

### 3.2 泛型

基本定义：

* 泛型的语法是<>，里面写类型参数，一般用T表示
* 使用时有两种方法指定类型:
  * 要便用的类型
  * 通过TS类型推断，自动推导类型

* 泛型的作用是临时占位，之后通过传来的类型进行推导

  ```typescript
  function print<T>(arg:T):T {
      console.log(arg)
      return arg
  }
  
  print<string>('hello')//定义T为string
  print('hello')//TS类型推断，自动推导类型为string
  ```

### 3.3 泛型工具类型-基础操作符

* typeof：获取类型

- keyof：获取所有键
- in：遍历枚举类型
- T[K]：索引访问
- extends：泛型约束

### 3.4 泛型工具类型-常用工具类型

* Partial<T>：将类型属性变为可选
* Required<T>：将类型属性变为必选
* Readonly<T>：将类型属性变为只读
* Pick、Record...

## 4. TS实战

### 4.1 声明文件

* declare：三方库需要类型声明文件
* d.ts：声明文件定义
* @types：三方库TS类型包
* tsconfig.json：定义TS的配置