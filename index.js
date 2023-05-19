//using express and defining port
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

//using database
const database = require("./config/mongoose");

// Used for session cookie..
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');



//for middleware
app.use(express.urlencoded());
  
//setting up the cookie parser
app.use(cookieParser());

//setting assets
app.use(express.static("assets"));

// for layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//setting ejs template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the sesssion cookie in the database
app.use(
  session({
    name: "codeial",
    // TODO secret before deployment in production mode..
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      mongooseConnection: database,
      autoRemove: "disabled",
    },
    function(err){
      console.log(err || 'connect-mongodb setup ok');
    }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

//using express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error is in running server ${err}`);
    return;
  }
  console.log(`Server is running perfectly fine ${port}`);
});
