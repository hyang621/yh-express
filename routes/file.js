const express = require("express");
const multer=require("multer");
const fs=require("fs");
const path=require("path");
const router =express.Router();
const upload=multer({
    dest:"c:/tmp"
});
//文件上传页面
router.get("/create",(req,res)=>{
    // res.send("文件上传");
    res.render("files/create");
})

//文件上传处理
router.post("/store",upload.single("file"),(req,res)=>{
    //1.通过req.file可以查看当前文件的信息
    console.log(req.file);
    //2.需要将文件移动到当前项目的public/upload文件夹中

    //2.1先确定要放到public/upload文件夹下的文件的名字
    let newFileName=new Date().getTime()+"_"+req.file.originalname;
    let newPath=path.resolve(__dirname,`../public/upload/${newFileName}`);
    console.log(newFileName);
    //2.2使用fs.readFileSync去读取上传的文件的信息
    let fileData= fs.readFileSync(req.file.path);
    //2.3使用fs.writeFileSync去写文件
    fs.writeFileSync(newPath,fileData);
    //2.4 给浏览器输出当前文件的url访问地址
    res.send(`http://localhost:3000/upload/${newFileName}`);
});

module.exports = router;