const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const{check,validationResult}=require('express-validator')
const db = require('monk')('localhost:27017/E-commerceDB');

router.use(bodyParser.json());
router.use(express.urlencoded({extended:false}))

const category = require('../models/category');
const product = require('../models/product');

/* GET home page. */
router.get('/add', function(req, res, next) {
    category.find().exec((err,doc)=>{
        res.render('addproducts',{category:doc})
    })
});

/* router.post('/cart/', function(req, res, next) {
    const product_id = req.params.id
    console.log(product_id)
    console.log(req.body)
    product.findOne({_id:product_id}).exec((err,doc)=>{
      res.render('product',{product:doc})
  })
}); */
router.post('/cart/', function(req, res, next) {
    const products = db.get('products')
    const product_id = req.body.product_id
    req.session.cart = req.session.cart || {}
    const cart = req.session.cart
    products.find({
        _id: product_id
    }, {}, function(err, product){
        //cart id , name , price , qty
        if(cart[product_id]){
            cart[product_id].qty++
        }else{
            product.forEach(function(item) {
            cart[product_id]={
                item: item._id,
                title: item.name,
                price: item.price,
                qty:1
            }
            });
        }
        
        res.redirect('/')
    })
});

router.get('/cart', function(req, res, next) {
    const cart = req.session.cart
    let displayCart={items:[],total:0}
    let total = 0
    for(item in cart){
        displayCart.items.push(cart[item])
        total+=(cart[item].qty * cart[item].price)
    }
    displayCart.total=total
    res.render('cart',{cart: displayCart})
});



router.post('/add',[
    check('name','กรุณาป้อนชื่อสินค้า').not().isEmpty(),
    check('price','กรุณาป้อนราคาสินค้า').not().isEmpty(),
    check('image','กรุณาป้อนภาพสินค้า').not().isEmpty(),
    check('description','กรุณาป้อนรายละเอียดสินค้า').not().isEmpty()
  ], function(req, res, next) {
    const result = validationResult(req)
    const errors = result.errors
    if(!result.isEmpty()){
        category.find({}, {}, function(err, category) {
            res.render('addproducts', {
              category: category,
              errors: errors
            });
        })
    }else{
        let data = new product({
            name:req.body.name,
            price:req.body.price,
            image:req.body.image,
            description:req.body.description,
            category : req.body.category
        })
        product.saveProduct(data,(err)=>{
            if(err) console.log(err)
            res.redirect('/')
        })
    }
  });


module.exports = router;
