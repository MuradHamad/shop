const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart:{
        items:[{
            productId:{ type:mongoose.Schema.Types.ObjectId,required:true, ref:'products' },
            quantity: {type: Number, required: true},
        }]
    }
});



module.exports = mongoose.model('User', userSchema);