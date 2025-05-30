const {body} = require("express-validator");
const productValidationRules = {
add:[
body('name')
.trim()//remove spaces
.isLength({min:3,max:15})//check length
.withMessage("Name should be more than 3 letters to 15"),//error message
body("price")
.trim()
.isFloat({min:0.5, max:100})
.withMessage("Price should be greater than 0.5 and less than 100")
]
}
module.exports= productValidationRules;