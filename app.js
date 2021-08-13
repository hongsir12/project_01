//引入express框架
const express=require('express')

//引入路径处理模块
const path=require('path')
const formidable = require('formidable')

const fs = require('fs')
//创建web服务器
const app=express();
mongoose.connect('mongodb://itcast:itcast@localhost:27017/todo',{})
//静态资源访问服务器功能
app.use(express.static(path.join(__dirname,'public')))
//对应02html文件
app.get('/first',(req,res)=>{
    res.send('hello nihaoa')
})
// 对应03html文件
app.get('/responseData',(req, res) => {
    res.send({'name':'刘德华'})
})
// 对应04html文件
app.get('/get',(req, res) => {
    res.send(req.query)
})
// 对应05html文件
app.post('/post',(req, res) => {
    res.send(req.body)
})

// 对应06html文件
app.post('/json',(req, res) => {
    res.send(req.body)
})

// 对应07html文件
app.get('/readystate',(req, res) => {
    res.send('hello')
})
// 对应08html文件
app.get('/error',(req, res) => {
    res.status(400).send('not okay')
})

app.get('/cache',(req, res) => {
    fs.readFile('./test.txt',(err, data) => {
        res.send(data)
    })
})

/*app.get('/verifyEmailAdress',(req, res) => {
    console.log(req.query.email)
    Email.findOne({
        email:req.query.email
    },function (err,data){
        console.log('查询结果',data)
        if (err){
            return res.status(500).json({
                err_code:1,
                message:'email is exist'
            })
        }
        if (data){
            return  res.status(200).json({
                err_code:1,
                message:'email is exit'
            })
        }
        res.status(200).json({
            err_code:0,
            message:'email is available'
        })
        new Email({
            email:req.query.email
        }).save(function (err,data){
            console.log('邮箱创建成功',data)
        })
    })
})*/

app.get('/verifyEmailAdress', (req, res) => {
const email = req.query.email;
if (email == 'itheima@qq.com'){
    res.status(400).send({message:'邮箱已被注册'})
}else{
    res.send({message:'邮箱可用'})
}
});

app.get('/searchAutoPrompt',(req, res) => {
    const key = req.query.key
    const list = [
        '黑马程序员',
        '黑马程序员官网',
        '黑马程序员顺义校区',
        '黑马程序员学院报名系统',
        '传智播客',
        '传智博客前端与移动端开发',
        '传智播客大数据',
        '传智播客python',
        '传智播客java',
        '传智播客c++',
        '传智播客怎么样'
    ]
    // 搜索结果
    let result = list.filter(item => item.includes(key))
    // 将查询结果返回客户端
    res.send(result)
})

var mycities=[
    {
        pid:'001',
        provinceName:'北京市',
        cities:[
            {
                id:'101',
                cityName:'北京',
                areas:['东城区','西城区','崇文区']
            }
        ]
    },
    {
        pid:'002',
        provinceName:'天津市',
        cities:[
            {
                id:'201',
                cityName:'天津',
                areas:['和平区','河东区','河西区']
            }
        ]
    },
    {
        pid:'003',
        provinceName:'河北省',
        cities:[
            {
                id:'301',
                cityName:'石家庄',
                areas:['长安区','桥东区','桥西区']
            },
            {
                id:'302',
                cityName:'唐山',
                areas:['路南区','路北区','古冶区','开平区','丰南区']
            }
        ]
    }
]

app.get('/province', (req, res) => {
    res.send(mycities);
});
app.get('/cities',(req, res) => {
        let pid = req.query.pid
        for (var index in mycities){
            if (mycities[index].pid == pid){
                res.send(mycities[index].cities)
            }
        }
})
app.get('/areas',(req, res) => {
    let id = req.query.id
    for (var index1 in mycities){
        for (var index2 in mycities[index1].cities){
            if (mycities[index1].cities[index2].id==id){
                res.send(mycities[index1].cities[index2].areas)
            }
        }
    }
})
app.post('/formData',(req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm()
    // 解析客户端传递过来的FormData对象
    form.parse(req,(err,fields,files)=>{
        res.send(fields)
    })
})
// 实现文件上传的路由
app.post('/upload',(req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm()
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname,'public','uploads')
    // 保留上传文件的后缀名
    form.keepExtensions = true
    // 解析客户端传递过来的FormData对象
    form.parse(req,(err,fields,files)=>{
        // 将客户端传递过来的文件地址响应到客户端
        res.send({
            path:files.attrName.path.split('public')[1]
        })
    })
})
app.get('/jsonp',(req, res) => {
    const cb = req.query.cb
    const data = cb + "({name:'zhaoliu'})"
    res.send(data)
    // res.jsonp({
    //     name:'lisi',
    //     age:50
    // })
})
//监听端口
app.listen(3000);

//控制台提示输出
console.log('服务器启动成功')