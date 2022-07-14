const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const{check,validationResult}=require('express-validator')

router.use(bodyParser.json());
router.use(express.urlencoded({extended:false}))

const category = require('../models/category')

/* GET home page. */
router.get('/add', function(req, res, next) {
  category.find().exec((err,doc)=>{
    res.render('addcategory',{category:doc})
    })
});

router.post('/add',[
  check('title','กรุณาป้อนชื่อหมวดหมู่สินค้า').not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req)
  const errors = result.errors
  if(!result.isEmpty()){
    res.render('addcategory',{errors: errors})
  }else{
    let data = new category({
      title:req.body.title,
  })
  category.savetitle(data,(err)=>{
    if(err) console.log(err)
    res.redirect('/category/add')
  })
  }
});

module.exports = router;
