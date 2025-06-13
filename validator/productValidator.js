const {body} = require("express-validator");
const productValidationRules = {
add:[
    body('name')
    .trim()//remove spaces
    .isLength({min:3,max:25})//check length
    .withMessage("Name should be more than 3 letters to 25"),//error message
    body("price")
    .trim()
    .isFloat({min:0.5, max:1000})
    .withMessage("Price should be greater than 0.5 and less than 1000")
],
edit:[
    body('name')
    .trim()
    .isLength({min:3,max:25})
    .withMessage("Name should be more than 3 letters to 25"),
    body('price')
    .trim()
    .isFloat({min:0.5, max:1000})
    .withMessage("Price should be greater than 0.5 and less than 1000")
]
}
module.exports= productValidationRules;