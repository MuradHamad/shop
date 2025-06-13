const authMiddleware = require("../middleware/authmiddleware");
const productValidation = require("../validator/productValidator");
const validateRequest = require('../validator/validateProductRequest');

const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
router.get('/add-product',adminController.getAddProduct);
router.get('/products',adminController.getProducts);
router.get('/edit-product/:ProductId',adminController.getEditProduct);


router.post('/edit-product',
    productValidation.edit,validateRequest,
    adminController.postEditProduct);
router.post('/add-product',
    productValidation.add,validateRequest,
    adminController.postAddProduct);
router.post('/delete-product',authMiddleware.isAdmin,adminController.postDeleteProduct);


module.exports = router;