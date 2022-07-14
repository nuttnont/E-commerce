const express = require('express');
const router = express.Router();
const category = require('../models/category');
const product = require('../models/product');
const db = require('monk')('localhost:27017/E-commerceDB');


router.get('/login', function(req, res, next) {
  res.render('login')
});

router.get('/register', function(req, res, next) {
  res.render('register')
});


/* router.get('/', function(req, res, next) {
  category.find().exec((err,doc)=>{
    res.render('index',{category:doc})
    })
});
 */
router.get('/', function(req, res, next) {
  product.find().exec((err,doc)=>{
    res.render('index',{product:doc})
    })
});

router.get("/:id",(req, res)=>{
  const product_id = req.params.id
  console.log(product_id)
  product.findOne({_id:product_id}).exec((err,doc)=>{
      res.render('product',{product:doc})
  })
})   


module.exports = router;
