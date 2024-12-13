var express = require('express');
const formidable = require('formidable')
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/index',(req, res, next) => {
    const form = formidable({
        multiples: true,
        uploadDir: __dirname +  '/../public/images',
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        console.log(files.someExpressFiles.newFilename)
        res.json({ fields, files });
    });
})

module.exports = router;
