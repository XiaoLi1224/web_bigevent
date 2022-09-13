$(function() {

    // 调用 getUserInfo 获取用户信息
    getUserInfo()


    var layer = layui.layer

    $('#btnLogout').on('click',function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something

            // 1.清空本地存储中的 token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'
            

            // 关闭 询问框
            layer.close(index);
          });
    })
    
})

// 获取用户的信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            // headers 就是请求头 配置对象
        
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }

                // 调用   randerAvatar() 渲染用户头像
                randerAvatar(res.data) 

            },

            // 无论成功还是失败，最终都会调用 complete 回调函数
         
        })
    }


// randerAvatar() 渲染用户头像
function randerAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username

    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)

    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}