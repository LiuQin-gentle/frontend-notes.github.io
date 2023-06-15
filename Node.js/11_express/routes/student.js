const express = require("express");
const fs = require("fs/promises");
const path = require("path");
let STUDENTS = require("../data/students.json");
const router = express.Router();

router.use((req, res, next) => {
    if(req.session.loginUser){
        next();
    }else{
        res.redirect("/");
    }
});

router.get("/list", (req, res) => {
    res.render("students", { stus: STUDENTS });
});

router.post("/add-student", (req, res, next) => {
    const id = STUDENTS.at(-1).id + 1;
    const newUser = {
        id, 
        name: req.body.name, 
        age: +req.body.age,
        gender: req.body.gender,
        address: req.body.address
    };
    STUDENTS.push(newUser);
    next();
})

router.get("/delete", (req, res, next) => {
    const id = +req.query.id;
    STUDENTS = STUDENTS.filter((item) => {
        return item.id !== id;
    });
    next();
})

router.get("/to-update", (req, res) => {
    const id = +req.query.id;
    const student = STUDENTS.find((item) => {
        return item.id === id;
    })
    res.render("update", {student});
})

router.post("/update-student", (req, res, next) => {
    const {id, name, age, gender, address} = req.body;

    const student = STUDENTS.find((item) => {
        return item.id == id;
    });
    student.name = name;
    student.age = +age;
    student.gender = gender;
    student.address = address; 
    next();
})

router.use((req, res) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(STUDENTS)
    ).then(() => {
        res.redirect("/student/list");
    }).catch((err) => {
        res.send("操作失败！");  
    });
    return;
})
module.exports = router