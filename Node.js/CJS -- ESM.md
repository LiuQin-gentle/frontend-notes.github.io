# CJS --> ESM

[TOC]

## 一、两种模块的差异

ES6模块和CommonJS模块有很大的差异

1. 语法上面，CommonJS 模块使用`require()`加载和`module.exports`输出，ES6 模块使用`import`和`export`。

2. 用法上面，`require()`是同步加载，后面的代码必须等待这个命令执行完，才会执行。`import`命令则是异步加载，或者更准确的说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。

## 二、Node.js的区分

1. Node.js 要求 ES6 模块采用`.mjs`后缀文件名。

 * 也就是说，只要脚本文件里面使用`import` 或`export`命令，那么久必须采用`.mjs`后缀名

 * Node.js 遇到`.mjs`文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定`"use strict"`。

 * 如果不希望将后缀名改成`.mjs`，可以在文件的`package.json`中，指定`type`字段为`module`。

   ```json
   {
       "type": "module"
   }
   ```

   一旦设置了以后，该目录里面的JS脚本，就被解释用 ES6 模块

2. 如果这时要使用 CommonJS 模块，那么需要将 CommonJS 的脚本后缀名都改成`.cjs`

* 如果没有`type`字段，或者`type`字段为commonjs，则`.js`脚本会被解释为 CommonJS 模块

3. 总结：`.mjs`文件总是以 ES6 模块加载，`.cjs`文件总是以 CommonJS 模块加载，`.js`文件的加载取决于`package.json`里面的`type`字段设置。
4. 注意：ES6 模块与 CommonJS 模块尽量不要混用。`require`命令不能加载`.mjs`文件，会报错，只有`import`命令才可以加载`.mjs`文件。反过来，`.mjs`文件里面也不能使用`require`命令，必须使用`import`。 

## 三、CommonJS 模块加载 ES6 模块

 CommonJS 的`require()`命令不能加载 ES6 模块，会报错，只能使用`import()`这个方法加载。 

```javascript
(async () => {
  await import('./my-app.mjs');
})();
```

上面代码可以在 CommonJS 模块中运行。

`require()`不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层`await`命令，导致无法被同步加载。

## 四、ES6 模块加载 CommonJS 模块

 ES6 模块的`import`命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。 

```javascript
// 正确
import packageMain from 'commonjs-package';//试了一下，被引入的CommonJs模块要写成.cjs后缀才可以，如果是.js后缀（package.json里的type是commonjs）的，则会报错，不能引入

// 报错
import { method } from 'commonjs-package';
```

这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是`module.exports`，是一个对象，无法被静态分析，所以只能整体加载。

加载单一的输出项，可以写成下面这样。

> ```javascript
> import packageMain from 'commonjs-package';
> const { method } = packageMain;
> ```

## 五、同时支持两种格式的模块

一个模块同时要支持 CommonJS 和 ES6 两种格式，也很容易。

1. 如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，比如`export default obj`，使得 CommonJS 可以用`import()`进行加载。

   如果原始模块是 CommonJS 格式，那么可以加一个包装层。

```javascript
import cjsModule from '../index.js';
export const foo = cjsModule.foo; 
```

​	上面代码先整体输入 CommonJS 模块，然后再根据需要输出具名接口。

​	你可以把这个文件的后缀名改为`.mjs`，或者将它放在一个子目录，再在这个子目录里面放一个单独的`package.json`文件，指明`{ type: "module" }`。

2. 另一种做法是在`package.json`文件的`exports`字段，指明两种格式模块各自的加载入口。

> ```javascript
> "exports"：{ 
>     "require": "./index.js"，
>     "import": "./esm/wrapper.js" 
> }
> ```

上面代码指定`require()`和`import`，加载该模块会自动切换到不一样的入口文件。