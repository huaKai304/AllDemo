
// 引入mongoose模块
var mongoose = require('mongoose');

// 链接数据库
mongoose.connect('mongodb://localhost/todo',{ useNewUrlParser: true })

// 创建图表
var todoSchema = new mongoose.Schema({
    item:String,
    complete:Boolean
});

// 创建数据模型
var Todo = mongoose.model('Todo',todoSchema);

// Todo({item:'Hello Everyone!'}).save(function (err,data) {
//     if (err) throw err;
//     console.log('Item saved');
// })

var bodyParser = require('body-parser');
// 对数据进行解析
var urlencodeParser = bodyParser.urlencoded({extended:false});

module.exports = function (app) {
    // 获取数据
    app.get('/todo',function (req,res) {
        Todo.find({},function (err,data) {
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });
    // 传递数据
    app.post('/todo',urlencodeParser,function (req,res) {
        // console.log(req.body.complete == 'true')
        if(req.body.complete == 'true'){
            Todo.find({item:req.body.item}).findOneAndUpdate({complete:false},{complete:true},function (err,data) {
                if (err) throw err;
                res.json(data);
            })
        }else{
            Todo(req.body).save(function (err,data) {
                if (err) throw err;
                res.json(data);
            })
        }
    });
    // 删除数据
    app.delete('/todo/:item',function (req,res) {
        // console.log(req.params.item);
        Todo.find({item:req.params.item}).remove(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
    });
}