const product = require("../models/products");
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
  res.render("shop/index", { PageTitle: "Shop Home", isAuthenticated: req.session.isAuthenticated, isAdmin: req.session.user ? req.session.user.isAdmin : false });
};
exports.getProducts = (req, res, next) => {
  product.find().then((products)=>{
      res.render('../views/shop/product-list.ejs',{title:'veiw',prods:products, isAuthenticated: req.session.isAuthenticated, isAdmin: req.session.user ? req.session.user.isAdmin : false});
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  product.findById(prodId).then(prod => {
    if (!prod) {
      return res.status(404).render('404', { PageTitle: 'Product Not Found', isAuthenticated: req.session.isAuthenticated, isAdmin: req.session.user ? req.session.user.isAdmin : false });
    }
    res.render('shop/product-details', {
      product: prod,
      PageTitle: prod.name,
      isAuthenticated: req.session.isAuthenticated,
      isAdmin: req.session.user ? req.session.user.isAdmin : false
    });
  }).catch(err => {
    res.status(500).render('500', { PageTitle: 'Error', isAuthenticated: req.session.isAuthenticated, isAdmin: req.session.user ? req.session.user.isAdmin : false });
  });
};




// View cart



exports.getCart = async (req, res, next) => {
  const userId = req.session.user.id;
  const user = await User.findById(userId);
  const cart = user && user.cart ? user.cart : { items: [] };
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
    isAuthenticated: req.session.isAuthenticated,
    isAdmin: req.session.user ? req.session.user.isAdmin : false
  });
};



exports.postProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const userId = req.session.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).redirect('/auth/login');
  }
  const cart = user.cart || { items: [] };
  const existingItem = cart.items.find(item => item.productId.toString() === prodId.toString());
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ productId: prodId, quantity: 1 });
  }
  user.cart = cart;
  await user.save();
  res.redirect('/shop/cart');
};

exports.postCartDeleteItem = async (req, res, next) => {
  const prodId = req.body.productId;
  const userId = req.session.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).redirect('/auth/login');
  }
  const cart = user.cart || { items: [] };
  const itemIndex = cart.items.findIndex(item => item.productId.toString() === prodId.toString());
  if (itemIndex > -1) {
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  }
  user.cart = cart;
  await user.save();
  res.redirect('/shop/cart');
};





exports.getOrders = async (req, res, next) => {
  const userId = req.session.user.id;
  const user = await User.findById(userId);
  const cart = user && user.cart ? user.cart : { items: [] };
  
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
  res.render('shop/orders', {
    PageTitle: 'Orders',
    cart: { items: itemsWithDetails, total },
    isAuthenticated: req.session.isAuthenticated,
    isAdmin: req.session.user ? req.session.user.isAdmin : false
  });
};

exports.postOrder = (req, res, next) => {};