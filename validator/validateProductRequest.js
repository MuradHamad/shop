const {validationResult} = require("express-validator");
const validateRequest = (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error = errors.array().map(err => err.msg);
        const oldInput = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            type: req.body.type,
            image: req.body.image
        };
        
        
        if (req.originalUrl.includes('edit-product')) {
            req.flash('edit-error', {error: error, oldInput: oldInput});
            return res.redirect(`/admin/edit-product/${req.body.id}`);
        } else {
            req.flash('add-error', {error: error, oldInput: oldInput});
            return res.redirect('/admin/add-product');
        }
    }
    next();
}
module.exports = validateRequest;