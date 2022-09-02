$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度只能1~6之间';
            }
        }
    });

    initUserInfo();

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return '初始化用户信息失败!'
                }
                console.log(res);

                // 给表单赋值 利用layui提供的内置表单赋值方法
                // 先给赋值的form表单域添加lay-filter=""属性
                // 赋值方法 语法：form.val('filter', object) 第一个对应添加的属性名 第二个数据对象
                form.val('formUserInfo', res.data);
            }
        })
    };


    // 重置按钮功能
    $('#btnreset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });


    // 修改用户信息
    // 监听表单提交事件
    $('#layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!')
                }
                layer.msg('修改用户信息成功!');
                // 更新信息后渲染欢迎词
                // 调用父页面index里面的getUserInfo()方法

                // 现在用户信息的html是嵌套在iframe元素里面的
                // 可以把iframe看着一个页面window
                window.parent.getUserInfo();
            }
        })
    })
})