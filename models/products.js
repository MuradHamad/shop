const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    type:String,
    description:String,
    image:String
});

module.exports= mongoose.model('products',productSchema);
