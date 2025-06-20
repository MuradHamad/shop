const product = require("../models/products");

exports.getAddProduct= (req,res,next)=> {
    const error = req.flash('add-error')[0];
    res.render('../views/admin/add-product.ejs', {
        PageTitle: "Add product",
        isAuthenticated: req.session.isAuthenticated,
        isAdmin: req.session.user ? req.session.user.isAdmin : false,
        error: error || null,
        oldInput: error ? error.oldInput : {}
    });
};
exports.postAddProduct= (req,res,next)=>{
    p = product({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        description: req.body.description,
        image: `/images/${req.body.image}`
    });
    p.save();
    res.redirect('/admin/products');
};
exports.getEditProduct= (req,res,next)=> {
    const id = req.params.ProductId;
    const error = req.flash('edit-error')[0];
    product.findById(id).then(
        (p)=>{
            res.render('../views/admin/edit-product.ejs',{
                PageTitle:'edit',
                product:p, 
                isAuthenticated: req.session.isAuthenticated, 
                isAdmin: req.session.user ? req.session.user.isAdmin : false,
                error: error || null,
                oldInput: error ? error.oldInput : {}
            });
        }
    )
};
exports.postEditProduct= (req,res,next)=>{
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const description = req.body.description;
    const image = `/images/${req.body.image}` ;
    
    product.findById(id).then((p)=>{
        p.name = name;
        p.type = type;
        p.price = price;
        p.description = description;
        p.image = image;
        return p.save();
    }).then(()=>{
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/products');
    });
};
exports.postDeleteProduct= (req,res,next)=>{
    
    id = req.body.id;
    product.findByIdAndDelete(id).then(
        (p)=>{
            res.redirect('/admin/products');
        }
    );
    
};
exports.getProducts = (req,res,next)=> {
    product.find().then((products)=>{
        res.render('../views/admin/products.ejs',{title:'veiw',prods:products, isAuthenticated: req.session.isAuthenticated, isAdmin: req.session.user ? req.session.user.isAdmin : false});
    });
}; 
