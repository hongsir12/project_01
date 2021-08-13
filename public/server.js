// 1.引入express
const express = require('express')

// 2.创建应用对象
const app = express()

// 3.创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
// app.all()可以接收任意类型的请求
app.get('/server',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    // 设置响应体
    res.send('hello ajax-2')
})

app.post('/server',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    res.send('hello ajax post')
})
//JSON响应
app.all('/json-server',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    // 响应一个数据
    const data = {
        name:'itcast'
    }
    // 对对象进行字符串转换
    let str = JSON.stringify(data)
    // 设置响应体
    res.send(str)
})

// 针对IE缓存
app.get('/ie',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应体
    res.send('hello IE-2')
})
//延时响应
app.all('/delay',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')

    setTimeout(()=>{
        // 设置响应体
        res.send('延时响应')
    },1000)
})


//jquery服务
app.all('/jquery-server',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')

    // res.send('hello jQuery Ajax')
    const data = {name:'刘德华'}
    res.send(JSON.stringify(data))
})


//axios服务
app.all('/axios-server',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')

    // res.send('hello jQuery Ajax')
    const data = {name:'刘德华'}
    res.send(JSON.stringify(data))
})

//fetch服务
app.all('/fetch-server',(req, res) => {
    // 设置响应头  设置允许跨域
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')

    // res.send('hello jQuery Ajax')
    const data = {name:'刘德华'}
    res.send(JSON.stringify(data))
})


//jsonp服务
app.all('/jsonp-server',(req, res) => {
    // res.send('console.log("hello jsonp)')
    const data = {
        name:'张学友123'
    }
    let str = JSON.stringify(data)
    res.end(`handle(${str})`)
})

// 检测用户名是否存在
app.all('/check-username',(req, res) => {
    const data = {
        exist:1,
        msg:'用户名已存在'
    }
    // 将数据转化为字符串
    let str = JSON.stringify(data)
    // 返回结果
    res.end(`handle(${str})`)
})

//jquery-jsonp-server
app.all('/jquery-jsonp-server',(req, res) => {
    const data = {
        name:'臭狗托',
        city:['北京','上海','广州']
    }
    // 将数据转化为字符串
    let str = JSON.stringify(data)
    // 接收callback参数
    let cb = req.query.callback
    // 返回结果
    res.end(`${cb}(${str})`)
})

//cors
app.all('/cors-server',(req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Method','*')

    res.send('hello cors')
})

// 4.监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中')

})