//using express and defining port
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

// for layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//for middleware
app.use(express.urlencoded());

//setting up the cookie parser
app.use(cookieParser());

//using express router
app.use("/", require("./routes"));
//using database
const database = require("./config/mongoose");

//setting ejs template engine
app.set("view engine", "ejs");
app.set("views", "./views");
//setting assets
app.use(express.static("assets"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error is in running server ${err}`);
    return;
  }
  console.log(`Server is running perfectly fine ${port}`);
});
