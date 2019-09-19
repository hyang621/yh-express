$(function(){
    $("#delete").click(function(){
        //发送ajax请求delete
        var id = $(this).data("id");
        var url="/posts/"+id;
        $.ajax({
            url:url,
            method:"DELETE",
            success:function(res){
                if(res.code===0){
                    alert("删除成功");
                    //删除成功，跳转到列表页面
                    location.href="/posts";
                }    
            },
            error:function(){
                alert("删除失败");
            }
        })
    })
})