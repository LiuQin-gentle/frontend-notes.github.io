const jwt = require("jsonwebtoken");
const obj = {
    name:"swk",
    age:18,
    gender:"男"
}

//使用jwt对JSON数据进行加密
const token = jwt.sign(obj, "hellohowareyou", {
    expiresIn:"1h"
})

try {
    //服务器收到客户端的token后
    const decodeData = jwt.verify(token, "hellohowareyou");
    console.log(decodeData);
} catch (error) {
    //说明token解码失败
    console.log("无效token");
}
