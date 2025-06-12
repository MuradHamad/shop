exports.get404= (req,res,next)=>{
    res.render('404', { isAuthenticated: req.session.isAuthenticated, isAdmin: req.session.user ? req.session.user.isAdmin : false });
};