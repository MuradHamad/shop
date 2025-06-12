const express = require('express');
const router = express.Router();
const productController = require("../controllers/shop");



router.get('/',productController.getIndex);
router.get('/products',productController.getProducts);
router.get('/products/:productId',productController.getProduct);
router.get('/cart',productController.getCart);
router.get('/orders',productController.getOrders);



router.post('/products/:productId',productController.postProduct);
router.post('/cart-delete-item',productController.postCartDeleteItem);
router.post('/create-order',productController.postOrder);


module.exports = router;