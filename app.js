const express=require('express');
const app=express();
const PORT = 8080;

app.set('view engine','ejs');
app.set('views','views');

const mongoose= require('mongoose');
const bodyParser=require('body-parser');
const path = require("path");


const expressSession=require('express-session');
const MongoDBSession=require('connect-mongodb-session')(expressSession);
const mdbsession = MongoDBSession({uri:"mongodb://localhost:27017/Murad",collection:'sessions'});
app.use(expressSession({secret:'Murad',resave:false,saveUninitialized:false,store:mdbsession}));


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
const connectFlash = require('connect-flash');
app.use(connectFlash());

///routers
const authMiddleware = require('./middleware/authmiddleware');

const shopRouter = require('./routes/shop');
app.use('/shop',shopRouter);

const adminRoutes=require('./routes/admin');
app.use('/admin',authMiddleware.isAuth,adminRoutes);

const authRoutes=require('./routes/auth');
app.use('/auth',authRoutes);

const errorRouter=require('./routes/error');
app.use(errorRouter);

//end routers


mongoose
  .connect("mongodb://localhost:27017/Murad")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`https://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  
