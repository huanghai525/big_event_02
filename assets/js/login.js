$(function () {
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    // 3.自定义验证规则
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 选择器必须带空格，选择的是后代中input的name属性值为password的
            let pwd = $('.reg-box input[name="password"]').val()
            // 对比
            if (value !== pwd) return "两次密码不一致，请重新输入"
        }

    })

    // 4.注册功能

    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发送ajax
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val()
            },
            success: function (res) {
                // console.log(res);

                if (res.status != 0) return layer.msg(res.message, { icon: 5 });

                layer.msg(res.message, { icon: 6 });
                // 切换到登录页面
                $('#link_login').click()
                // 重置表单
                $('#form_reg')[0].reset();
            }
        })
    })

    // 5.登录功能

    $('#form_login').on('submit', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发送ajax
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                // 校验返回状态
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });

                layer.msg(res.message, { icon: 6 });
                // 保存token，一会验证登录身份要用
                localStorage.setItem('token', res.token)
                // 跳转
                location.href = '/index.html'
            }
        })
    })




})