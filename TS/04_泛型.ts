function print<T>(arg:T):T {
    console.log(arg)
    return arg
}

print<string>('hello')//定义T为string
print('hello')//TS类型推断，自动推导类型为string

