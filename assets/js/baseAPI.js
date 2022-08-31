// 每次执行 $.get() , $.post() 和 $.ajax()
// 都会自动调用 ajaxPrefilter() 这个函数
// 在这个函数里面可以获得 ajax 提供的配置对象
// 可以在里面获得请求url 
// 那么只要将它和请求根路径拼接 即可实现请求的url太多修改麻烦的问题

$.ajaxPrefilter(function (options) {
    // console.log(options);
    // console.log(options.url);
    options.url = `http://www.liulongbin.top:3007${options.url}`;
    // console.log(options.url);


    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 统一设置complete函数
    options.complete = function (res) {
        console.log(res);
        // 判断是否获取失败
        // 在complete回调函数中 可以从responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!') {
            // 身份验证失败时强制清空本地存储的token
            localStorage.removeItem('token');
            // 并跳转到登录页
            location.href = 'login.html'
        }
    }
})