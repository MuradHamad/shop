const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    type:String,
    description:String,
});
module.exports= mongoose.model('product',productSchema);
