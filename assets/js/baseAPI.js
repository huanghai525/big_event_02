// 1.开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net'
// 2.测试环境服务器地址
// 3.生成环境服务器地址

// 拦截所有ajax请求：get/post/ajax

// 处理参数
$.ajaxPrefilter(function (params) {
    // console.log(params);
    // 1.添加根路径
    params.url = baseURL + params.url;

    // 2.身份认证
    if (params.url.indexOf('/my/') != -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    params.complete = function (res) {
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html'
        }

    }
})