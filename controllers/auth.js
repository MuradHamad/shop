const user = require("../models/user");


exports.getLogin= (req,res,next)=> {
    message = req.flash('msg');
    res.render('auth/login',
    {PageTitle:'Login',isAuthenticated:req.session.isAuthenticated,invalid:false,msg:message});
};

exports.postLogin= (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(user);
    user.find({username:username,password:password}).then(
        
        (u)=>{
            if(u.length!=0){
                req.session.isAuthenticated = true;
                req.session.isAdmin = u[0].isAdmin;
                return res.redirect('/admin/products');

            }
            else{
                req.flash('msg','Invalid username or password');
                return res.redirect('/auth/login');

            }
        }
    );

};
exports.getLogout= (req,res,next)=> {
    req.session.destroy((err)=>{
        res.redirect('/auth/login');
    });
};
