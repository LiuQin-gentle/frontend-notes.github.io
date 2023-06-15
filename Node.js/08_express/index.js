const express = require("express");
const path = require("node:path");
const app = express();
const fs = require("fs/promises");

let STUDENTS = require("./data/students.json");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
    res.send("hello");
})

app.get("/students", (req, res) => {
    res.render("students", { stus: STUDENTS });
})

app.post("/add-student", (req, res) => {
    const id = STUDENTS.at(-1).id + 1;
    const newUser = {
        id,
        name: req.body.name,
        age: +req.body.age,
        gender: req.body.gender,
        address: req.body.address
    }
    STUDENTS.push(newUser);

    //将数据写入json文件
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENTS)
    ).then(() => {
        res.redirect("/students");
    }).catch(() => {

    });

})

/* 
    删除
        - 点击删除链接后，删除当前数据
        - 点击 白骨精 删除 --> 删除id为5的学生
        - 流程：
            1. 点击 白骨精 的删除链接
            2. 向路由发送请求（写一个路由）
            3. 路由怎么写？
                - 获取学生的id n
                - 删除id为n的学生
                - 将新的数组写入文件
                - 重定向到学生列表页面
*/
app.get("/delete", (req, res) => {
    const id = +req.query.id;
    STUDENTS = STUDENTS.filter((stu) => {
        return stu.id !== id;
    });
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENTS)
    ).then(() => {
        res.redirect("/students");
    }) 
})

/* 
    修改
        - 点击修改链接后，显示一个表单，表单中应该有要修改的学生的信息，
            用户对学生信息进行修改，修改以后点击按钮提交表单
        - 流程：
            1. 点击孙悟空的修改链接
            2. 跳转到一个路由
                - 这个路由会返回一个页面，页面中有一个表单，表单中应该显示孙悟空的各种信息
            3. 用户填写表单，点击按钮提交到一个新的路由
                - 获取学生信息，并对信息进行修改 
*/
app.get("/to-update", (req, res) => {
    const id = +req.query.id;
    const student = STUDENTS.find((item) => {
        return item.id === id;
    })
    res.render("update", {student});
})
app.post("/update-student", (req, res) => {
    
    const {id, name, age, gender, address} = req.body;

    const student = STUDENTS.find((item) => {
        console.log(item.id === id);
        return item.id == id;
    });
    student.name = name;
    student.age = +age;
    student.gender = gender;
    student.address = address;

    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENTS)
    ).then(() => {
        res.redirect("/students");
    }).catch(() => {

    })
})

app.use((req, res) => {
    res.status(404);
    res.send(`<h1>您访问的地址已被外星人劫持！</h1>`)
})

app.listen(3000, () => {
    console.log("服务器启动了！");
})
