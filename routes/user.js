const express = require("express");
const UserModel = require("../models/user");
const bcryptjs=require("bcryptjs");//密码加密模块
const router = express.Router();

//注册页面路由
router.get("/create", (req, res) => {
  // res.send("用户注册页面");
  //渲染模板页面
  res.render("register");
});

//注册操作路由
router.post("/store", async(req, res) => {
  //1.获取form表单传递过来的参数
  // console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  //2.对参数做一些校验
  if (!username || !email || !password) {
    res.send("参数有错误");
    return;
  }

  //用async 和await解决回调地狱；
  let data= await UserModel.findOne({ email:req.body.email });
  // console.log(data);
  if (data) {
        //说明邮箱已经被注册过了
        res.send("邮箱已被占用");
      } else {
        //3.存储到数据库中
        let user = new UserModel({
          username:req.body.username,
          emai:req.body.email,
          password:bcryptjs.hashSync(req.body.password)
        });
        await user.save();
          res.send("注册成功");
      }

  // //查找数据库表中的邮箱是否有
  // UserModel.findOne({ email:req.body.email }).then(data => {
  //   if (data) {
  //     //说明邮箱已经被注册过了
  //     res.send("邮箱已被占用");
  //   } else {
  //     //3.存储到数据库中
  //     let user = new UserModel({
  //       username,
  //       password,
  //       email
  //     });
  //     user.save().then(() => {
  //         //成功
  //         res.send("注册成功");
  //       })
  //       .catch(() => {
  //         res.send("注册失败");
  //       });
  //   }
  // });
});

module.exports = router;
