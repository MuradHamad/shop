const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    const message = req.flash('msg');
    res.render('auth/login', {
        PageTitle: 'Login',
        isAuthenticated: req.session.isAuthenticated,
        invalid: false,
        msg: message,
        isAdmin: req.session.isAdmin
    });
};

exports.postLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;


        if (!username || !password) {
            req.flash('msg', 'Please provide both username and password');
            return res.redirect('/auth/login');
        }

        // Find user by username and password (plain text)
        const user = await User.findOne({ username, password });

        if (!user) {
            req.flash('msg', 'Invalid username or password');
            return res.redirect('/auth/login');
        }

        req.session.isAuthenticated = true;
        req.session.user = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        };

        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                req.flash('msg', 'Session error. Please try again.');
                return res.redirect('/auth/login');
            }
            if (user.isAdmin) {
                res.redirect('/admin/products');
            } else {
                res.redirect('/shop');
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        req.flash('msg', 'Server error. Please try again.');
        res.redirect('/auth/login');
    }
};

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.redirect('/');
        }
        res.redirect('/auth/login');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        PageTitle: 'Sign Up',
        isAuthenticated: req.session.isAuthenticated,
        msg: req.flash('msg'),
        isAdmin: req.session.user ? req.session.user.isAdmin : false
    });
};

exports.postSignup = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        req.flash('msg', 'Please provide both username and password');
        return res.redirect('/auth/signup');
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash('msg', 'Username already exists');
            return res.redirect('/auth/signup');
        }
        const user = new User({ username, password, isAdmin: false });
        await user.save();
        req.flash('msg', 'Account created! Please log in.');
        res.redirect('/auth/login');
    } catch (err) {
        req.flash('msg', 'Server error. Please try again.');
        res.redirect('/auth/signup');
    }
};
