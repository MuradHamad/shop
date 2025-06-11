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
  const prodId = req.params.productId;
  product.findById(prodId).then(prod => {
    if (!prod) {
      return res.status(404).render('404', { PageTitle: 'Product Not Found', isAuthenticated: req.session.isAuthenticated });
    }
    res.render('shop/product-details', {
      product: prod,
      PageTitle: prod.name,
      isAuthenticated: req.session.isAuthenticated
    });
  }).catch(err => {
    res.status(500).render('500', { PageTitle: 'Error', isAuthenticated: req.session.isAuthenticated });
  });
};




// View cart



exports.getCart = async (req, res, next) => {
  const cart = req.session.cart || { items: [] };
  // Fetch product details for each item
  const itemsWithDetails = [];
  let total = 0;
  for (const item of cart.items) {
    const prod = await product.findById(item.productId);
    if (prod) {
      itemsWithDetails.push({
        product: prod,
        qty: item.quantity
      });
      total += prod.price * item.quantity;
    }
  }
  res.render('shop/cart', {
    cart: { items: itemsWithDetails, total },
    isAuthenticated: req.session.isAuthenticated
  });
};



exports.postProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const myProduct = product.findById(prodId);
  if(!myProduct){
    return res.status(404).render('404', { PageTitle: 'Product Not Found', isAuthenticated: req.session.isAuthenticated });
  }
  const cart = req.session.cart || { items: [] };
  const existingItem = cart.items.find(item => item.productId.toString() === prodId.toString());
  if(existingItem){
    existingItem.quantity++;
  }else{
    cart.items.push({productId:prodId,quantity:1});
  }
  req.session.cart = cart;
  res.redirect('/shop/cart');
};
exports.postCart = (req, res, next) => {};
exports.postCartDeleteItem = (req, res, next) => {};
exports.postOrder = (req, res, next) => {};
exports.getOrders = (req, res, next) => {};
