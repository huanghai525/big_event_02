$(function () {
    // 1.调用获取用户信息函数
    getUserInof();

    // 2.退出
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        alert(1)
        // 框架提供的询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地token
            localStorage.removeItem('token');
            // 2.页面跳转
            location.href = '/login.html'
            // 3.关闭询问框
            layer.close(index);
        })
    })
})

// 封装获取用户信息函数
function getUserInof() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // 重新登录，因为token有时间限制
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            // 判断返回值 不等于0就是失败
            if (res.status != 0) return layui.layer.msg(res.message, { icon: 5 })
            // 调用渲染头像函数
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    // 1.渲染名称（nickname优先，username其次）
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 2.渲染头像 (判断有没有头像)
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());
    }
}