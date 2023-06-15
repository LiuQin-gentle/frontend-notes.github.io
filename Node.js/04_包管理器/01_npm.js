/* 
    package.json
        - package.json是包的描述文件
        - node中通过该文件对项目进行描述
        - 每一个node项目必须有package.json
        - scripts:
            - 可以自定义一些命令
            - 定义以后可以直接通过npm来执行这些命令
            - start 和 test 可以直接通过 npm start 和 npm test 执行
            - 其他自定义命令需要通过 npm run xxx 执行
    命令
        npm init初始化项目，创建package.json文件(需要回答问题)
        npm init -y 初始化项目，创建package.json文件(所有值都采用默认值)
        npm install 包名  将指定包下载到当前项目
            install时发生了什么？
                ① 将包下载到当前项目的node_modules目录下
                ② 会在package.json的dependencies属性中添加一个新属性
                    "lodash": "^4.17.21"
                        "^4.17.21"表示匹配最新的4.x.x的版本，也就是如果后期lodash包更新到了4.18.1，我们的包也会一起更新，但是如果更新到了5.0.0，我们的包是不会随之更新的。
                        如果是"~4.17.21"，~表示匹配最小依赖，也就是4.17.x。
                        如果是"*"则表示匹配最新版本，即x.x.x（不建议使用）。
                ③ 会自动添加package-lock.json文件
                    帮助加速npm下载
        npm install 自动安装所有依赖
        npm uninstall 包名 卸载

    npm镜像
        - npm的仓库服务器位于国外，有时候会因网络问题不好用
        - 为了解决这个问题，可以在npm中配置一个镜像服务器
        - 镜像的配置：
            ① 在系统中安装cnpm（不推荐使用）
                npm install -g cnpm --registry=https://registry.npmmirror.com
            ② 彻底修改仓库地址
                npm set registry https://registry.npmmirror.com
                还原到原版仓库：
                    npm config delete registry
*/