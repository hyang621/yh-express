const mongoose=require("../config/db");

const schema=new mongoose.Schema({
    title:String,
    content:String,
},{
    timestamps:true//可以让每篇文章自动携带创建时间和更新时间两个字段
});

const model=mongoose.model("post",schema);
module.exports=model;