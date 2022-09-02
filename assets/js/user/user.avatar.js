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
    $image.cropper(options);


    // 点击上传按钮 选择文件
    $('#btnChooseImg').on('click', function () {
        $('#file').click();
    });


    // 为文件上传绑定change事件
    $('#file').on('change', function (e) {
        // 事件对象 e 里面有 target属性 包含files存储着选择的文件 伪数组形式
        // console.log(e);
        // 获取上传的文件
        let file = e.target.files[0];
        // 把文件创建一个对应的url地址
        let ImgUrl = URL.createObjectURL(file);
        console.log(ImgUrl);

        // 把选择的图片应用到裁剪框
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', ImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });


    $("#btnUpload").on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 提交用户头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: dataURL,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('上传头像失败!')
                }
                window.parent.getUserInfo();
            }
        })
    })
})