$(function () {
    // 登录和注册点击切换
    $("#link-login").on('click', function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    $("#link-reg").on('click', function () {
        $(".reg-box").show();
        $(".login-box").hide();
    })



    // 利用layui自定义验证属性
    // 注意需要在元素上添加 lay-verify="" 的属性值

    // 从layui中获取form对象才能使用
    let form = layui.form;
    let layer = layui.layer

    // 这个对象的内容就是 有属性 verify 里面存放着layui提供的表单验证的正则
    // form里面有一个属性
    // console.log(form);
    // console.log(typeof form);

    // 自定义一个 pass的校验规则
    // 会将一个 pass 的属性值新增到form对象的verify属性里面
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {
            let pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    // 注册
    $('#reg-form').on('submit', function (e) {
        e.preventDefault();
        // console.log(1);

        let data = { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() };

        $.post(options.url, data, function (res) {
            if (res.status != 0) {
                // 注意 要使用layer 就需要从layui获取
                return layer.msg(res.message);
            }
            $("#link-login").click();
            return layer.msg('注册成功!请登录');
        })
    });


    // 登录
    $('#login-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: options.url,
            method: 'POST',
            // 利用 serialize() 快速获取表单的值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功!');
                // 将登录成功得到的token字符串保存到本地存储localStorage
                localStorage.setItem('token', res.token);
                location.href = './index.html';

            }
        })
    })

});


