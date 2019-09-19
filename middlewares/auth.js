//做登录校验的一个中间件
const auth = ()=>{
    return(req,res,next)=>{
        if(!req.session.user){
            //没有登录，跳转到登录页面
            res.redirect(`/users/login?redirect=${req.originalUrl}`);
        }else{
            next();
        }
        
    }
}
module.exports=auth;