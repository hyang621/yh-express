const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();

//中间件的调用，实现给req加了一个body的属性;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//中间件调用，实现了给req加了一个cookies 的属性；
app.use(cookieParser());

//中间件 使用静态资源托管设置
app.use(express.static("public"));


//todo 路由
app.get("/",(req,res)=>{
    // res.write("hello express");
    // res.end();
    //res.query;
    console.log(req.query);

    res.send("hello 新的express");
});

app.post("/handleLogin",(req,res)=>{
    console.log(req.body);
    res.send("hello req.body");
});

app.get("/setCookie",(req,res)=>{
    //设置cookie
    res.cookie("username","huanhuan",{
        maxAge:1000*60*10
    })
    res.send("cookie设置成功");
});

app.get("/getCookie",(req,res)=>{
    console.log(req.cookies);
    res.send("cookie获取成功");
})

//req.params
//获取路由的动态参数
app.get("/hello/:id",(req,res)=>{
    res.send("hello下面的都可以");
})


app.listen(3000); 