const mongoose = require('mongoose')



const dbUrl = 'mongodb://localhost:27017/E-commerceDB'
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err=>console.log(err))


const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String
})


let product = mongoose.model('products', productSchema)


module.exports = product

module.exports.saveProduct=function(model,data){
    model.save(data)
}