const express=require("express");
const cookieParser=require("cookie-parser");
const session=require("express-session");

const userRouter=require("./routes/user");
const postRouter=require("./routes/post");
const app=express();



//处理模板引擎
app.set("views","views");
app.set("view engine","ejs");

//session处理
app.use(session({
    secret:"Hello",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*2
    }
}));

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
//2.文章相关：/posts
app.use("/posts",postRouter);

app.listen(3000);