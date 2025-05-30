const product = require("../models/products");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", { PageTitle: "Shop Home", isAuthenticated: req.session.isAuthenticated });
};
exports.getProducts = (req, res, next) => {
  product.find().then((products)=>{
      res.render('../views/shop/product-list.ejs',{title:'veiw',prods:products, isAuthenticated: req.session.isAuthenticated});
  });

};
exports.getProduct = (req, res, next) => {
};
exports.postProduct = (req, res, next) => {

};
exports.postCart = (req, res, next) => {};
exports.getCart = (req, res, next) => {};
exports.postCartDeleteItem = (req, res, next) => {};
exports.postOrder = (req, res, next) => {};
exports.getOrders = (req, res, next) => {};
