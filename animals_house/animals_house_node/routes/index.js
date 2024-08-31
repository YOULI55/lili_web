var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const queryParser = bodyParser.urlencoded({ extended: false });
const register = require('../mongodb/modules/register')


router.post('/user/register', queryParser,function(req, res, next) {
    register.then((User) => {
        User.find({email: req.body.email}).then((users) => {
            console.log(users)
            if(users.length === 0) {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                  });
                  newUser.save().then(() => {
                    console.log('User created')
                    res.send({
                        data: 'OK',
                        message: 'register success'
                    })
                  }).catch((err) => {
                    console.error('Error creating user:', err)
                    res.status(500)
                    res.send({
                        data: 'error',
                        message: 'register error'
                    })
                  });
            }else {
                res.send({
                    data: 'registered',
                    message: '当前邮箱已被注册'
                })
            }
        }).catch((err) => console.error('Error finding users:', err));
    })
});

// login
router.get('/user/login',queryParser,(req,res,next) => {
    console.log(req.query)
    register.then(User => {
        User.find({email: req.query.email}).then((users) => {
            if(users.length === 0) {
                res.send({data: 'not',message:'用户不存在'})
            }else {
                if(users[0].password != req.query.password) {
                    res.send({data: 'password', msessage: '密码错误'})
                }else {
                    res.send({data: 'OK',message:'登录成功',user: users[0]})
                }
            }
            res.send({data: 'OK',message:'login success'})
        }).catch((err) => console.error('Error finding users:', err));
    })
})
module.exports = router;
