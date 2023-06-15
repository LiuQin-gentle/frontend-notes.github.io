const express = require("express");
const path = require("node:path");
const app = express();
const fs = require("fs/promises");
const userRouter = require("./routes/user");
const goodsRouter = require("./routes/goods");
const studentsRouter = require("./routes/student");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/goods", goodsRouter);
app.use("/student", studentsRouter);

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面被外星人劫持了</h1>")
})
app.listen(3000, () => {
    console.log("服务器启动了！");
})
