$(function () {
    // 页面加载时就调用获取用户信息函数
    getUserInfo();


    let layer = layui.layer;
    // 点击退出按钮
    $('#btnlogout').on('click', function () {
        // 弹出询问框
        layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function (index) {

            // 清除本地存储的token
            localStorage.removeItem('token');

            // 跳转页面到首页
            location.href = 'login.html';

            // 关闭confirm 询问框  
            layer.close(index);
        });
    })
});


// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // 这里直接使用相对路径 因为根路径已经通过自己封装的函数获取
        url: '/my/userinfo',
        // headers 请求头配置对象
        // Headers: {
        //     // token值之前已经存在本地存储
        //     // Authorization属性值 从本地存储获取 如果没有 token这个属性 就用 空字符串
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息时失败!')
            }
            renderAvater(res.data);
        },

        // ajax向服务器请求数据 无论是否成功 都会执行complete函数
        // 另外 还有失败时调用的 error函数
        // complete: function (res) {
        //     console.log(res);
        //     // 判断是否获取失败
        //     // 在complete回调函数中 可以从responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!') {
        //         // 身份验证失败时强制清空本地存储的token
        //         localStorage.removeItem('token');
        //         // 并跳转到登录页
        //         location.href = 'login.html'
        //     }
        // }
    })
};


// 渲染用户信息
function renderAvater(user) {
    // 获取用户名并渲染 优先获取昵称 如果没有就获取用户名 逻辑或运算
    let username = user.nickname || user.username;
    $('.welcome').html(`欢迎&nbsp;&nbsp${username}`);

    // 获取用户头像并渲染
    // 判断是否有图片没哟就用图片头像
    if (user.user_pic !== unll) {
        $('.layui-nav-img').attr('src', user.user_pic).show;
        $('.text-avatar').hide();
    } else {
        let first = username[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}