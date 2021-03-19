
$(function () {
    // 1.自定义校验规则
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度未1~6位之间'
            }
        }

    })

    // 2.用户渲染
    // 导出layer方法
    let layer = layui.layer
    initUserInfo();
    // 封装渲染页面方法
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: function (res) {
                //    console.log(res);
                // 失败判断
                if (res.status != 0) return layer.msg(res.message)

                // 成功渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.表单重置
    $('#btnReset').click(function (e) {
        // 阻止表单默认事件
        e.preventDefault();
        // 重新渲染页面
        initUserInfo();
    })

    // 4.修改用户信息
    $('.layui-form').submit(function (e) {
        // 阻止表单默认事件
        e.preventDefault();
        // 发送ajac 修改个人信息
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                //    console.log(res);
                // 失败提示
                if (res.status != 0) return layer.msg(res.message);
                // 成功后 提示 
                layer.msg(res.message);
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInof();

            }
        })
    })




})