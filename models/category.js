const mongoose = require('mongoose')

const dbUrl = 'mongodb://localhost:27017/E-commerceDB'
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err=>console.log(err))


const categorySchema = mongoose.Schema({
    title: String,
})

let category = mongoose.model('categories', categorySchema)

module.exports = category

module.exports.savetitle=function(model,data){
    model.save(data)
}