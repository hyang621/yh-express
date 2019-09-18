//用来做mongoose链接

//1.引入mongoose
const mongoose = require("mongoose");

//2.定义一个mongodb的链接地址
const url = "mongodb://127.0.0.1:27017/express"; //express-要操作的数据库，不需要手动创建

//3.使用mongoose模块的connect()来链接
mongoose
  .connect(url, { useNewUrlParser: true,useUnifiedTopology:true })
  .then(() => {
    console.log("数据库链接成功");
  })
  .catch(error => {
    console.log("数据库链接失败");
    console.log(error);
  });
  
  module.exports=mongoose;
