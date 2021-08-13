function ajax(options){
    // 存储默认值
    var defaults = {
        type:'get',
        url:'',
        data:{},
        header:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success:function (){},
        error:function (){}
    }
    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults,options)
    // 1.创建ajax对象
    var xhr = new XMLHttpRequest()
    // 拼接 请求参数的变量
    var params = ''
    // 将对象形式转换为name=Joker&age=20
    for (var attr in defaults.data){
        // 将参数转换为字符串格式
        params += attr + '=' + defaults.data[attr] + '&'
    }
    // 将参数最后面的&截取掉
    params = params.substr(0,params.length-1)
    console.log(params)
    // 判断请求方式
    if (defaults.type == 'get'){
        defaults.url = defaults.url + '?' + params
    }
    // 2.配置ajax对象
    xhr.open(defaults.type,defaults.url)
    if (defaults.type == 'post'){
        // 用户希望向服务器端传递的请求参数的类型
        var contentType = defaults.header['Content-Type']
        // post请求必须设置请求参数格式类型
        xhr.setRequestHeader('Content-Type',contentType)
        // 判断用户输入的请求参数格式的类型
        if (contentType=='application/json'){
            // 向服务器端传递json数据格式的参数
            xhr.send(JSON.stringify(defaults.data))
        }else{
            xhr.send(params)
        }
    }else{
        // 发送请求
        xhr.send()
    }

    // 监听xhr对象下面的onload事件
    // 当xhr对象接收完响应数据后触发
    xhr.onload = function (){
        var contentType = xhr.getResponseHeader('Content-Type') //获取响应头中的数据
        var responseText = xhr.responseText
        // 如果响应类型中包含application/json
        if(contentType.includes('application/json')){
            // console.log('包含')
            responseText = JSON.parse(responseText)
        }
        // 如果当http状态码为200时
        if (xhr.status==200){
            // 请求成功调用处理成功情况函数
            defaults.success(responseText,xhr)
        }else{
            // 请求失败调用处理失败情况的函数
            defaults.error(responseText,xhr)
        }

    }
}