var express = require('express');
var bodyparser = require('body-parser');
var upload = require('express-fileupload');
var session = require('express-session');
var app = express();
var user = require("./router/user.js");
var admin_login = require("./router/admin_login.js");
var admin = require("./router/admin.js");


app.use(bodyparser.urlencoded({extended:true}))
app.use(upload())
app.use(session({
    secret:"team123",
    saveUninitialized:true,
    resave:true
}))
app.use(express.static("public/"));
app.use("/",user);
app.use("/admin",admin);
app.use("/admin_login",admin_login);

app.listen(2000);