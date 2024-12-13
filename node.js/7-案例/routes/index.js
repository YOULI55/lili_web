var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const queryParser = bodyParser.urlencoded({ extended: false });

const { Record } = require('../mongoose/index');

// 获取记账本列表
router.get('/account', (req, res, next) => {
    Record.find({}).then((users) => {
        console.log(users);
        res.render('account',{ list: users});
    }).catch((err) => {
        console.error('Error finding users:', err);
        res.send('Error finding users:', err);
    });
});

// 删除记录
router.get('/account/delete', queryParser,(req, res, next) => {
    Record.findOneAndDelete({ "_id":req.query.id }).then((deletedUser) => {
        console.log('删除成功');
        Record.find({}).then((users) => {
            res.render('account',{ list: users});
        }).catch((err) => {
            console.error('Error finding users:', err);
            res.send('Error finding users:', err);
        });
      }).catch((err) => console.error('Error deleting user:', err));
});

// 添加记账
router.get('/account/create', (req, res, next) => {
    res.render('create');
});

router.post('/account/create',queryParser,(req,res,next) => {
    const {
        matter,
        timer,
        type,
        amount,
        remark
    } = req.body
    const newRecord = new Record({
        matter,
        timer,
        type,
        amount,
        remark
    });
    newRecord.save().then(() => console.log('record created')).catch((err) => console.error('Error creating user:', err));
    res.send('添加成功！请访问http://localhost:3000/account查看')
})

module.exports = router;
