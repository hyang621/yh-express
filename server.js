const express=require("express");
const cookieParser=require("cookie-parser");
const userRouter=require("./routes/user");
const app=express();



//处理模板引擎
app.set("views","views");
app.set("view engine","ejs");

//处理静态资源托管
app.use(express.static("public"));

//处理req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//处理req.cookies;
app.use(cookieParser());

//处理各种路由中间件:
//1.用户相关:/users
app.use("/users",userRouter);

app.listen(3000);