const express = require("express");
const PostModel=require("../models/post");
const router = express.Router();


router.get("/create",(req,res)=>{
    res.render("posts/create");
});

//文章列表
router.get("/",async(req,res)=>{
    //从url地址上获取当前的页数
    let pageNum=parseInt(req.query.pageNum)||1;
    let pageSize=parseInt(req.query.pageSize)||5;
    let total=5;
    let count =await PostModel.find().countDocuments();
    total=Math.ceil(count/pageSize);

    //从数据库中查找文章
    let list = await PostModel.find()
    .sort({updatedAt:-1})//排序
    .skip((pageNum-1)*pageSize)
    .limit(pageSize);
  
    res.render("posts/index",{
        list,
        total,
        pageNum
    });
});

//文章详情页
router.get("/:id",async(req,res)=>{
    //1.获取到文章的id
    let id = req.params.id;
    //2.根据这个id去数据库中查找那个文件
    let data = await PostModel.findById(id);
    //3.渲染页面
    res.render("posts/show",{
        postInfo:data
    });
});

//新增文章
router.post("/store",async(req,res)=>{
    //1.数据的校验
    if(!req.body.title || !req.body.content){
        res.send("参数有错误");
        return;
    }
    //2.直接存到数据库中
    let newPost = new PostModel(req.body);
    await newPost.save();
    // res.send("新增成功")
    res.redirect("/posts");
});


module.exports = router;