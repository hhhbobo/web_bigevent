// 每次执行 $.get() , $.post() 和 $.ajax()
// 都会自动调用 ajaxPrefilter() 这个函数
// 在这个函数里面可以获得 ajax 提供的配置对象
// 可以在里面获得请求url 
// 那么只要将它和请求根路径拼接 即可实现请求的url太多修改麻烦的问题

$.ajaxPrefilter(function (options) {
    console.log(options);
    console.log(options.url);
    options.url = `http://www.liulongbin.top:3007${options.url}`;
    console.log(options.url);
})