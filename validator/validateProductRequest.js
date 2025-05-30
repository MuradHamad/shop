const {validationResult} = require("express-validator");
const validateRequest = (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
    return res.redirect('/auth/login');
    }
    next();
}
module.exports= validateRequest;