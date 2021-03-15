// 1.开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net'
// 2.测试环境服务器地址
// 3.生成环境服务器地址

// 拦截所有ajax请求：get/post/ajax

// 处理参数
$.ajaxPrefilter(function (params) {
    // console.log(params);
    params.url = baseURL + params.url;

})