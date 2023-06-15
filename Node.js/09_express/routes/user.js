const express = require("express");

//创建router对象
const router = express.Router();
router.get("/list", (req, res) => {
    res.send("hello 我是user list")
});

//将router暴露到模块外
module.exports = router