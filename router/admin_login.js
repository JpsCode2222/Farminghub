var express = require('express');
var sql = require('./conn');
const session = require('express-session');
var rout = express.Router();

rout.get("/",function(req,res){
    res.render("login/admin_login.ejs");
})
rout.post("/save_login", async function(req,res){
    // INSERT INTO `admin_login` (`id`, `email`, `password`) VALUES ('1', 'team1@gmail.com', 'team123');
    var data = await sql(`SELECT * FROM admin_login WHERE email='${req.body.email}' AND password='${req.body.password}' && id='1'`);
    if(data.length>0){
        req.session.admin_id=data[0].id;
        req.session.massege = "success Login";
        // console.log(req.session.admin_id);
        res.redirect("/admin");
    }
    else{
        req.session.error_massege = "Login Faild";
        res.redirect("/admin_login");
    }

})

module.exports = rout;