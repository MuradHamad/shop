exports.isAuth = (req,res,next)=>{
    if(!req.session.isAuthenticated){
        req.flash('msg','Invalid access , login please...');
        return res.redirect('/auth/login');
    }
    else{
        next();
    }
}

exports.isAdmin = (req,res,next)=>{
    console.log(req.session.isAdmin)
    if(!req.session.isAdmin){
        req.flash('msg','You are not admin');
        return res.redirect('/auth/login');
    }
    else{
        next();
    }
}
