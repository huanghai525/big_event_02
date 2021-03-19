$(function () {

    // 1.定义校验规则
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新旧不重复
        samePwd: function (value) {
            // value是新密码，原密码需要获取
            if (value == $('[name="oldPwd"]').val()) {
                return '新密码不能和旧密码相同'
            }
        },
        // 1.3 两次新密码必须相同
        rePwd: function (value) {
            // value是再次输入的密码，新密码需要获取
            if (value != $('[name="newPwd"]').val()) {
                return '两次密码不一致'
            }
        }

    })


    // 表单提交
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                //    console.log(res);
                // 失败提示
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功提示
                layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })





})