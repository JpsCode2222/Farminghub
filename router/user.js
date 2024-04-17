var express = require('express');
var sql = require('./conn');
var rout = express.Router();

rout.get("/",async function(req,res){
    var logo = await sql(`SELECT * FROM nav_logo`);
    var slider = await sql(`SELECT * FROM slider`);
    var section2 = await sql(`SELECT * FROM section2`);
    var sec2_img = await sql(`SELECT * FROM sec2_img`);
    var about_farm=await sql(`SELECT * FROM about_farm`)
    var achivement=await sql(`SELECT * FROM achivement`)
    var testimonial=await sql(`SELECT * FROM testimonial`)
    var teams=await sql(`SELECT * FROM teams`)
    var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
    // console.log(sec2_img);
    var obj = {"logo":logo,"slider":slider,"section2":section2,"sec2_img":sec2_img,"about_farm":about_farm,"achivement":achivement,"testimonial":testimonial,"teams":teams,"footer":footer,"link":link,"social_link":social_link}
    res.render("user/index.ejs",obj);
})
rout.get("/shetkari",async function(req,res){
    var logo = await sql(`SELECT * FROM nav_logo`);
    var card = await sql(`SELECT * FROM blog`);
    var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
    console.log(card);
    var obj = {"logo":logo,"card":card,"footer":footer,"social_link":social_link,"link":link}

    res.render("user/shetkari.ejs",obj);
})


rout.get("/about",async function(req,res){
     var logo = await sql(`SELECT * FROM nav_logo`);
     var about_farm=await sql(`SELECT * FROM about_farm`)
     var achivement=await sql(`SELECT * FROM achivement`)
     var sec1=await sql(`SELECT * FROM about_us_sec1`)
     var sec3=await sql(`SELECT * FROM about_us_sec3`)
     var footer=await sql(`SELECT * FROM footer`)
     var link=await sql(`SELECT * FROM link`)
     var social_link =await sql(`SELECT * FROM social_link`)
    // var obj = {"logo":logo}
    res.render("user/about.ejs",{"logo":logo,"about_farm":about_farm,"achivement":achivement,"sec1":sec1,"sec3":sec3,"footer":footer,"social_link":social_link,"link":link});
})
rout.get("/my_foods",async function(req,res){
     var logo = await sql(`SELECT * FROM nav_logo`);
     var footer=await sql(`SELECT * FROM footer`)
     var link=await sql(`SELECT * FROM link`)
     var social_link =await sql(`SELECT * FROM social_link`)
    var obj = {"logo":logo,"footer":footer,"social_link":social_link,"link":link}
    res.render("user/my_foods.ejs",obj);
})


// contact page dynamic jayad
rout.get("/contact", async function (req, res) {
    var sec1 = await sql(`SELECT * FROM contact_us_sec1`);
    var sec2 = await sql(`SELECT * FROM contact_us_sec2`);
    var sec4 = await sql(`SELECT * FROM contact_us_sec4`);
    var logo = await sql(`SELECT * FROM nav_logo`);
    var footer=await sql(`SELECT * FROM footer`)
     var link=await sql(`SELECT * FROM link`)
     var social_link =await sql(`SELECT * FROM social_link`)
    var obj = {}
    var logo = await sql(`SELECT * FROM nav_logo`);
    res.render("user/contact.ejs", { sec1, sec2, sec4,"logo":logo ,"logo":logo,"footer":footer,"social_link":social_link,"link":link});
  });
  rout.get("/services",async function(req,res){
    var service_heading=await sql(`SELECT * FROM service_heading`)
    var service_img=await sql(`SELECT * FROM service_img`)
    var service_discription=await sql(`SELECT * FROM service_discription`)
    var logo = await sql(`SELECT * FROM nav_logo`);
    var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
    // var obj = {"logo":logo}
    res.render("user/services.ejs",{"service_discription":service_discription,"service_heading":service_heading,"service_img":service_img,"logo":logo,"footer":footer,"social_link":social_link,"link":link});
})
  
  
  rout.get("/my_foods",async function (req, res) {
    var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
    res.render("user/my_foods.ejs",{"footer":footer,"social_link":social_link,"link":link});
  });
  // project page dynamic
  rout.get("/project", async function (req, res) {
    var logo = await sql(`SELECT * FROM nav_logo`);
    // var obj = {}
    var sec1 = await sql(`SELECT * FROM project_page_sec1`);
    var sec2 = await sql(`SELECT * FROM project_page_sec2`);
    var sec3 = await sql(`SELECT * FROM project_page_sec3`);
    var sec4 = await sql(`SELECT * FROM project_page_sec4`);
    var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
    res.render("user/project.ejs", {"logo":logo, sec1: sec1[0], sec2: sec2[0], sec3, sec4,"footer":footer,"social_link":social_link,"link":link});
  });
  
  // save Contact us form
  rout.post("/save_contact_us", async (req, res) => {
    var d = req.body;
    var data = await sql(
      `INSERT INTO contact_us_sec3 (name,email,company,phone,message) values ('${d.name}','${d.email}','${d.company}','${d.phone}','${d.message}')`
    );
    res.redirect("/contact");
  });
  
  // save subscriber
  rout.post("/save_subscriber_home", async (req, res) => {
    const d = req.body;
    var data = await sql(`INSERT INTO subscribers (email) values ('${d.email}')`);
    res.redirect("/");
  });
  rout.post("/save_subscriber", async (req, res) => {
    const d = req.body;
    var data = await sql(`INSERT INTO subscribers (email) values ('${d.email}')`);
    res.redirect("/contact");
  });
  rout.get("/vegetables", async (req, res) => {
    var logo = await sql(`SELECT * FROM nav_logo`);
    const sec1 = await sql(`SELECT * FROM vegetable_sec1`);
    const sec2 = await sql(`SELECT * FROM vegetable_sec2`);
    var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
    res.render("user/vegetables.ejs", { sec1: sec1[0], sec2 ,"logo":logo,"footer":footer,"social_link":social_link,"link":link});
  });
  
// fresh fruits
rout.get("/fresh_fruits", async (req, res) => {
  var logo = await sql(`SELECT * FROM nav_logo`);
  const sec1 = await sql(`SELECT * FROM fresh_fruits_sec1`);
  const sec2 = await sql(`SELECT * FROM fresh_fruits_sec2`);
  var footer=await sql(`SELECT * FROM footer`)
    var link=await sql(`SELECT * FROM link`)
    var social_link =await sql(`SELECT * FROM social_link`)
  res.render("user/fresh_fruits.ejs", { sec1: sec1[0], sec2 ,"logo":logo,"footer":footer,"social_link":social_link,"link":link});
});

//   jayad end




module.exports = rout;