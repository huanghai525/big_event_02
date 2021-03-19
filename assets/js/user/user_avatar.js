$(function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2.选择文件 (把上传按钮绑定文件上传按钮)
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 3. 修改裁剪图片
    let layer = layui.layer
    $('#file').on('change', function (e) {
        // 3.1拿到用户选择的文件
        let file = e.target.files[0]
        // 非空校验
        if (file == undefined) {
            return layer.msg('请选择图片！')
        }
        // 3.2 根据选择的文件，创建一个应对的 URL 地址
        let newImgURL = URL.createObjectURL(file)
        // 3.3 先销毁旧的裁剪区域，再重新设置图片路径，再创建新的裁剪区域`
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 4.上传头像
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {  //创建一个 Canvas
                width: 100,
                height: 100
            })
            .toDataURL('image/png')         //Canvas
            console.log(dataURL);
            console.log(typeof dataURL);
            // 发送ajax
            $.ajax({
                method:'post',
                url:'/my/update/avatar',
                data:{
                    avatar:dataURL
                },
                success:function (res) {
                    if(res.status!=0)return layer.msg(res.message);
                    layer.msg(res.message);
                    window.parent.getUserInof();
                }
            })
    })


















})