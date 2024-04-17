var express = require('express');
var sql = require('./conn');
var rout = express.Router();

function check_login(req,res,next){
    if(req.session.admin_id!=undefined){
        console.log(req.session.admin_id);
        next();
    }
    else{
        res.redirect("/admin_login");
    }
}

rout.get("/",async function(req,res){
    var list = await sql(`SELECT * FROM nav_logo`);
    var conatct_user = await sql(`SELECT * FROM conatct_user`);
    var obj = {'list':list,"conatct_user":conatct_user}
    res.render("admin/index.ejs",obj);
})
rout.post("/conatct_user",async function(req,res){
    var a = req.body;
    var data = await sql(`INSERT INTO conatct_user(Full_Name,Email_Address,Phone_Number,Your_Message) VALUES('${a.Full_Name}','${a.Email_Address}','${a.Phone_Number}','${a.Your_Message}')`)
    res.redirect("/");
})
rout.post("/save_navbar", async function(req,res){
    if(req.files){
        if(req.files.nav_logo){
            var file_name = new Date().getTime()+req.files.nav_logo.name;
            req.files.nav_logo.mv("public/uploads/"+file_name);
            var data = await sql(`UPDATE nav_logo SET nav_logo='${file_name}' WHERE id='1'`);
            // console.log(req.files);
        }

    }
    res.redirect("/admin");

})
rout.get("/slider" , async function(req,res){
    var list = await sql(`SELECT * FROM slider`);
    var list2 = await sql(`SELECT * FROM card2`);
    var obj = {"list":list,"list2":list2}
    res.render("admin/slider.ejs",obj);
})
rout.post("/save_slider", async function(req,res){
    var a = req.body;
    a.heding = a.heding.replace("'","`");
    if(req.files){
        if(req.files.video){
            var file_name = new Date().getTime()+req.files.video.name;
            req.files.video.mv("public/uploads/"+file_name);
            var data = await sql(`UPDATE slider SET heding='${a.heding}',detail='${a.detail}',video='${file_name}' WHERE id='1'`);
            // console.log(file_name);
        }
        
    }
    else{
        var data = await sql(`UPDATE slider SET heding='${a.heding}',detail='${a.detail}' WHERE id='1'`);
    }
    res.redirect("/admin/slider");
})
rout.post("/save_card", async function(req,res){
    var a = req.body;
    if(req.files){
        if(req.files.logo){
            var file_name = new Date().getTime()+req.files.logo.name;
            req.files.logo.mv("public/uploads/"+file_name);
            var data = await sql(`INSERT INTO card2(logo,card_number,detail) values('${file_name}','${a.card_number}','${a.detail}')`);
            console.log(data);
        }
        
    }
    else{
        var data = await sql(`INSERT INTO card2(card_number,detail) values('${a.card_number}','${a.detail}')`);
        
    }
    res.redirect("/admin/slider");
    // console.log(req.files);
})
rout.get("/delete_card/:id",async function(req,res){
    var data = await sql(`DELETE FROM card2 WHERE id='${req.params.id}'`);
    res.redirect("/admin/slider");
})
rout.get("/logout",check_login,function(req,res){
    req.session.destroy();
    res.redirect("/admin_login");
})
rout.get("/section2", async function(req,res){
    var list = await sql(`SELECT * FROM sec2_img`);
    var obj = {"list":list};
    res.render("admin/section2.ejs",obj);
})
rout.post("/save_section2", async function(req,res){
    var a = req.body;
    var data = await sql(`UPDATE section2 SET heading1='${a.heading1}',heading2='${a.heading2}',detail='${a.detail}' WHERE id='1'`);
    res.redirect("/admin/section2");
})
rout.post("/save_sec2_img", async function(req,res){
    var a = req.body;
    if(req.files){
        var file_name = new Date().getTime()+req.files.img.name;
        req.files.img.mv("public/uploads/"+file_name);
        var data = await sql(`INSERT INTO sec2_img(img,img_heding,detail) values('${file_name}','${a.img_heding}','${a.detail}')`);
        // console.log();
    }
    
    res.redirect("/admin/section2");
})
rout.get("/edit_sec2_img/:id",async function(req,res){
    var data = await sql(`SELECT * FROM sec2_img WHERE id='${req.params.id}'`);
    obj = {"list":data};
    res.render("admin/edit_sec2_img.ejs",obj);
})
rout.post("/update_sec2_img", async function(req,res){
    var a = req.body;
    if(req.files){
        if(req.files.img){
            var file_name = new Date().getTime()+req.files.img.name;
            req.files.img.mv("public/uploads/"+file_name);
           var data = await sql(`UPDATE sec2_img SET img_heding='${a.img_heding}',detail='${a.detail}', img='${file_name}' WHERE id='${a.id}'`);
            // console.log(data);
        }
        
    }
    else{
        var data1 = await sql(`UPDATE sec2_img SET img_heding='${a.img_heding}',detail='${a.detail}' WHERE id='${a.id}'`);
            // console.log(data1);
    }
    res.redirect("/admin/section2");
    
})


// admin section jayd 


// Project Page Section 1
rout.get("/project_page_sec1", async (req, res) => {
    var list = await sql(`SELECT * FROM project_page_sec1`);
    res.render("admin/project_page_sec1.ejs", { list: list[0] });
  });
  
  rout.post("/save_project_page_sec1", async (req, res) => {
    var d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO project_page_sec1(bg_img,heading,btn1,btn2) values('${file_name}','${d.heading}','${d.btn2}','${d.btn2}')`
      );
    }
    res.redirect("/admin/project_page_sec1");
  });
  
  rout.post("/update_project_page_sec1", async function (req, res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE project_page_sec1 SET bg_img='${file_name}',heading='${a.heading}',btn1='${a.btn1}',btn2='${a.btn2}' WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE project_page_sec1 SET heading='${a.heading}',btn1='${a.btn1}',btn2='${a.btn2}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/project_page_sec1");
  });
  
  // Project Page Section 2
  rout.get("/project_page_sec2", async (req, res) => {
    var list = await sql(`SELECT * FROM project_page_sec2`);
    res.render("admin/project_page_sec2.ejs", { list: list[0] });
  });
  
  rout.post("/save_project_page_sec2", async (req, res) => {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO project_page_sec2(bg_heading,heading,title,img,para_heading,para,point1,point2,point3,point4) values ('${a.bg_heading}','${a.heading}','${a.title}','${file_name}','${a.para_heading}','${a.para}','${a.point1}','${a.point2}','${a.point3}','${a.point4}')`
      );
    }
    res.redirect("/admin/project_page_sec2");
  });
  
  rout.post("/update_project_page_sec2", async function (req,res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE project_page_sec2 SET bg_heading='${a.bg_heading}',heading='${a.heading}',title='${a.title}',img='${file_name}',para_heading='${a.para_heading}',para='${a.para}',point1='${a.point1}',point2='${a.point2}',point3='${a.point3}',point4='${a.point4}' WHERE id='${a.id}'`
      );
      console.log(data)
      // res.send(data);
    } else {
      var data = await sql(
        `UPDATE project_page_sec2 SET bg_heading='${a.bg_heading}',heading='${a.heading}',title='${a.title}',para_heading='${a.para_heading}',para='${a.para}',point1='${a.point1}',point2='${a.point2}',point3='${a.point3}',point4='${a.point4}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/project_page_sec2");
  });
  
  // Project Page Section 3
  rout.get("/project_page_sec3", async (req, res) => {
    var list = await sql(`SELECT * FROM project_page_sec3`);
    res.render("admin/project_page_sec3.ejs", { list });
  });
  
  rout.post("/save_project_page_sec3", async (req, res) => {
    var d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO project_page_sec3(svg,count,heading) values('${file_name}','${d.count}','${d.heading}')`
      );
    }
    res.redirect("/admin/project_page_sec3");
  });
  
  rout.get("/edit_project_sec3/:id", async function (req, res) {
    var data = await sql(
      `SELECT * FROM project_page_sec3 WHERE id='${req.params.id}'`
    );
    res.render("admin/edit_project_page_sec3.ejs", { data: data[0] });
  });
  
  rout.post("/update_project_page_sec3", async function (req, res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE project_page_sec3 SET svg='${file_name}', count='${a.count}',heading='${a.heading}' WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE project_page_sec3 SET count='${a.count}',heading='${a.heading}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/project_page_sec3");
  });
  
  rout.get("/delete_project_sec3/:id", async function (req, res) {
    var data = await sql(
      `DELETE FROM project_page_sec4 WHERE id='${req.params.id}'`
    );
    res.render("admin/project_page_sec3.ejs");
  });
  
  // Project Page Section 4
  rout.get("/project_page_sec4", async (req, res) => {
    var list = await sql(`SELECT * FROM project_page_sec4`);
    res.render("admin/project_page_sec4.ejs", { list });
  });
  
  rout.post("/save_project_page_sec4", async (req, res) => {
    var d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO project_page_sec4(img,video_link) values('${file_name}','${d.video_link}')`
      );
    }
    res.redirect("/admin/project_page_sec4");
  });
  
  rout.get("/edit_project_sec4/:id", async function (req, res) {
    var data = await sql(
      `SELECT * FROM project_page_sec4 WHERE id='${req.params.id}'`
    );
    res.render("admin/edit_project_page_sec4.ejs", { data: data[0] });
  });
  
  rout.post("/update_project_page_sec4", async function (req, res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE project_page_sec4 SET img='${file_name}',video_link='${a.video_link}'  WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE project_page_sec4 SET video_link='${a.video_link}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/project_page_sec4");
  });
  
  rout.get("/delete_project_sec4/:id", async function (req, res) {
    var data = await sql(
      `DELETE FROM project_page_sec4 WHERE id='${req.params.id}'`
    );
    res.render("admin/project_page_sec4.ejs");
  });
  
  // Contact us Section 1
  rout.get("/contact_us_sec1", async (req, res) => {
    var list = await sql(`SELECT * FROM contact_us_sec1`);
    res.render("admin/contact_us_sec1.ejs", { list: list[0] });
  });
  
  rout.post("/save_contact_us_sec1", async (req, res) => {
    var d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO contact_us_sec1(bg_img,heading,btn1,btn2) values('${file_name}','${d.heading}','${d.btn1}','${d.btn2}')`
      );
    }
    res.redirect("/admin/contact_us_sec1");
  });
  
  rout.post("/update_contact_us_sec1", async function (req, res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE contact_us_sec1 SET bg_img='${file_name}',heading='${a.heading}',btn1='${a.btn1}',btn2='${a.btn2}' WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE contact_us_sec1 SET heading='${a.heading}',btn1='${a.btn1}',btn2='${a.btn2}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/contact_us_sec1");
  });
  
  // contact us section 2
  rout.get("/contact_us_sec2", async (req, res) => {
    var list = await sql(`SELECT * FROM contact_us_sec2`);
    res.render("admin/contact_us_sec2.ejs", { list });
  });
  
  rout.post("/save_contact_us_sec2", async (req, res) => {
    var d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO contact_us_sec2(img,heading,details) values('${file_name}','${d.heading}','${d.details}')`
      );
    } else {
      var data = await sql(
        `INSERT INTO contact_us_sec2(img,heading,details) values('${file_name}','${d.heading}','${d.details}')`
      );
    }
    res.redirect("/admin/contact_us_sec2");
  });
  
  rout.get("/edit_contact_us_sec2/:id", async function (req, res) {
    var list = await sql(
      `SELECT * FROM contact_us_sec2 WHERE id='${req.params.id}'`
    );
    res.render("admin/edit_contact_us_sec2.ejs", { list });
  });
  
  rout.post("/update_contact_us_sec2", async function (req, res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.img.name;
      req.files.img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE contact_us_sec2 SET img='${file_name}',heading='${a.heading}',details='${a.details}'  WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE contact_us_sec2 SET heading='${a.heading}',details='${a.details}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/contact_us_sec2");
  });
  
  rout.get("/delete_contact_us_sec2/:id", async function (req, res) {
    var data = await sql(
      `DELETE FROM contact_us_sec2 WHERE id='${req.params.id}'`
    );
    res.render("admin/contact_us_sec2.ejs");
  });
  
  // Contact us Section 3
  rout.get("/contact_us_sec3", async (req, res) => {
    var list = await sql(`SELECT * FROM contact_us_sec3`);
    res.render("admin/contact_us_sec3.ejs", { list });
  });
  
  rout.get("/edit_contact_us_sec3/:id", async function (req, res) {
    var list = await sql(
      `SELECT * FROM contact_us_sec3 WHERE id='${req.params.id}'`
    );
    res.render("admin/edit_contact_us_sec3.ejs", { list });
  });
  
  rout.post("/update_contact_us_sec3", async function (req, res) {
    var d = req.body;
  
    var data = await sql(
      `UPDATE contact_us_sec3 SET name	='${d.name}',email	='${d.email}',company	='${d.company}',phone	='${d.phone}',message='${d.message}' WHERE id='${d.id}'`
    );
    res.redirect("/admin/contact_us_sec3");
  });
  
  rout.get("/delete_contact_us_sec3/:id", async function (req, res) {
    var data = await sql(
      `DELETE FROM contact_us_sec3 Where id='${req.params.id}'`
    );
    res.redirect("/admin/contact_us_sec3");
  });
  
  // Contact us Section 4
  rout.get("/contact_us_sec4", async (req, res) => {
    var list = await sql(`SELECT * FROM contact_us_sec4`);
    res.render("admin/contact_us_sec4.ejs", { list: list[0] });
  });
  
  rout.post("/save_contact_us_sec4", async (req, res) => {
    var d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO contact_us_sec4(bg_img,title,heading) values('${file_name}','${d.title}','${d.heading}')`
      );
    }
    res.redirect("/admin/contact_us_sec4");
  });
  
  rout.post("/update_contact_us_sec4", async (req, res) => {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE contact_us_sec4 SET bg_img='${file_name}',title='${a.title}',heading='${a.heading}'  WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE contact_us_sec4 SET heading='${a.heading}',title='${a.title}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/contact_us_sec4");
  });
  
  // Subscriber
  rout.get("/subscribers", async (req, res) => {
    var list = await sql(`SELECT * FROM subscribers`);
    res.render("admin/subscribers.ejs", { list });
  });
  
  rout.get("/delete_subscriber/:id", async (req, res) => {
    var data = await sql(`DELETE FROM subscribers WHERE id='${req.params.id}'`);
    res.redirect("/admin/subscribers");
  });
  
  // About us Section 1
  rout.get("/about_us_sec1", async (req, res) => {
    var list = await sql(`SELECT * FROM about_us_sec1`);
    res.render("admin/about_us_sec1.ejs", { list: list[0] });
  });
  
  rout.post("/save_about_us_sec1", async (req, res) => {
    const d = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO about_us_sec1(bg_img,heading,btn1,btn2) values('${file_name}','${d.heading}','${d.btn1}','${d.btn2}')`
      );
    }
    res.redirect("/admin/about_us_sec1");
  });
  
  rout.post("/update_about_us_sec1", async function (req, res) {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.bg_img.name;
      req.files.bg_img.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE about_us_sec1 SET bg_img='${file_name}',heading='${a.heading}',btn1='${a.btn1}',btn2='${a.btn2}' WHERE id='${a.id}'`
      );
    } else {
      var data = await sql(
        `UPDATE about_us_sec1 SET heading='${a.heading}',btn1='${a.btn1}',btn2='${a.btn2}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/about_us_sec1");
  });
  
  // About us Section 2
  rout.get("/about_us_sec2", async (req, res) => {
    var list = await sql(`SELECT * FROM about_us_sec2`);
    res.render("admin/about_us_sec2.ejs",{"list":list});
  });
  
  rout.post("/save_about_us_sec2", async (req, res) => {
    const d = req.body;
    if (req.files) {
      var img1 = new Date().getTime() + req.files.img1.name;
      var img2 = new Date().getTime() + req.files.img2.name;
      var img3 = new Date().getTime() + req.files.img3.name;
      req.files.img1.mv("public/uploads/" + img1);
      req.files.img2.mv("public/uploads/" + img2);
      req.files.img3.mv("public/uploads/" + img3);
      const data = await sql(
        `INSERT INTO about_us_sec2 (title,Heading,img1,para,img2,name,position,img3) VALUES ('${title}','${Heading}','${img1}','${para}','${img2}','${name}','${position}','${img3}')`
      );
    }
  });
  
  // About us section 3
  rout.get("/about_us_sec3", async (req, res) => {
    var list = await sql(`SELECT * FROM about_us_sec3`);
    res.render("admin/about_us_sec3.ejs", { list });
  });
  
  rout.post("/save_about_us_sec3", async (req, res) => {
    if (req.files) {
      var file_name = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + file_name);
      var data = await sql(
        `INSERT INTO about_us_sec3(image) values('${file_name}')`
      );
    }
    res.redirect("/admin/about_us_sec3");
  });
  
  rout.get("/edit_about_us_sec3/:id", async (req, res) => {
    var list = await sql(
      `SELECT * FROM about_us_sec3 WHERE id='${req.params.id}'`
    );
    res.render("admin/edit_about_us_sec3.ejs", { list });
  });
  
  rout.post("/update_about_us_sec3", async (req, res) => {
    var a = req.body;
    if (req.files) {
      var file_name = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + file_name);
      var data = await sql(
        `UPDATE about_us_sec3 SET image='${file_name}' WHERE id='${a.id}'`
      );
    }
    res.redirect("/admin/about_us_sec3");
  });
  
  rout.get("/delete_about_us_sec3/:id", async (req, res) => {
    var data = await sql(`DELETE FROM about_us_sec3 WHERE id='${req.params.id}'`);
    res.redirect("/admin/about_us_sec3");
  });
  
  // About us section 4
  rout.get("/about_us_sec4", async (req, res) => {
    const list = await sql(`SELECT * FROM about_us_sec4`);
    res.render("admin/about_us_sec4.ejs", { list });
  });
  
  rout.post("/save_about_us_sec4", async (req, res) => {
    var d = req.body;
    const data = await sql(
      `INSERT INTO about_us_sec4 (heading,details) VALUES ('${d.heading}','${d.details}') `
    );
    res.redirect("/admin/about_us_sec4");
  });
  
  rout.get("/edit_about_us_4sec/:id", async (req, res) => {
    const data = await sql(
      `SELECT * FROM about_us_sec4 WHERE id='${req.params.id}'`
    );
    res.render("admin/edit_about_us_4sec.ejs", { data: data[0] });
  });
  
  rout.post("/update_about_us_sec4", async (req, res) => {
    const d = req.body;
    const data = await sql(
      `UPDATE about_us_sec4 SET heading='${d.heading}', details='${d.details}' WHERE id='${d.id}'`
    );
    res.redirect("/admin/about_us_sec4");
  });
  
  rout.get("/delete_about_us_sec4/:id", async (req, res) => {
    await sql(`DELETE FROM about_us_sec4 WHERE id='${req.params.id}'`);
    res.redirect("/admin/about_us_sec4");
  });
  
//   admin section jayd end


// start blog pallvi

rout.get("/blog",async function(req,res){
    var blogs = await sql(`SELECT * FROM blog`);
    var obj = {"blogs":blogs};
    res.render("admin/blog.ejs",obj);
});

rout.post("/save_blog",async function(req,res){
    var blog_image = new Date().getTime()+req.files.blog_image.name;
        req.files.blog_image.mv("public/uploads/"+blog_image);

    var d = req.body;
    var blog = `INSERT INTO  blog(blog_image,blog_details,blog_name,blog_date) VALUES  ('${blog_image}','${d.blog_details}','${d.blog_name}','${d.blog_date}')`;
    var data = await sql(blog);
    // res.send(data);
  //  console.log(req.files);
    res.redirect("/admin/blog");
});

rout.get("/delete_blog/:id",async function(req,res){
    var blog = `DELETE FROM blog WHERE blog_id = '${req.params.id}'`;
    var data = await sql(blog);
    // res.send(req
    // res.send(data);
    res.redirect("/admin/blog");
});

rout.get("/edit_blog/:id",async function(req,res){
    var blogs = await sql(`SELECT * FROM blog WHERE blog_id = '${req.params.id}'`);
    var obj = {"blogs":blogs};
    res.render("admin/edit_blog.ejs",obj);
});

rout.post("/update_blog",async function(req,res){
    var d = req.body;
    console.log(req.body.blog_details)
    if(req.files!=null){
         if(req.files.blog_image!=undefined){
            var image  = new Date().getTime()+req.files.blog_image.name;
            req.files.blog_image.mv("public/uploads/"+image);
            var data= await sql(`UPDATE blog SET blog_image='${image}' WHERE blog_id = '${d.blog_id }'`);
           console.log(data);
        }
    }
    // else{
    // var d = req.body;

        var query=`UPDATE blog SET blog_name='${d.blog_name}', blog_details='${d.blog_details}',blog_date='${d.blog_date}' WHERE blog_id ='${d.blog_id}'`;
        var data2=await sql (query);
    // }
    
    res.redirect("/admin/blog");
    // res.send(d.blog_id)
});

// _________________________________________________________

rout.get("/blog_slider",async function(req,res){
        var blogslider = await sql(`SELECT * FROM blog_slider`);
            res.render("admin/blog_slider.ejs",{"blogslider":blogslider});
})
rout.post("/update_blog_slider", async function(req,res){
    var d = req.body;
    
    if(req.files){
        if(req.files.slider_image){
            var image = new Date().getTime()+req.files.slider_image.name;
            req.files.slider_image.mv("public/uploads/"+image);
            var data = await sql(`UPDATE blog_slider SET image='${image}',text='${d.slider_heading}' WHERE blog_slider_id ='1'`);
            console.log(image);
        }
    }
    else{
        var data = await sql (`UPDATE blog_slider SET text='${d.slider_heading}' WHERE blog_slider_id ='1'`);
    }
    res.redirect("/admin/blog_slider");
})
// blog pallvi end




rout.get("/aboutfarm",async function(req,res){
  var about_farm =await sql(`SELECT * FROM about_farm`)
  res.render("admin/about_farm.ejs",{"about_farm":about_farm})
})
rout.post("/save_about_farm",async function(req,res){
  if(req.files!=null){
      var before_hover=new Date().getTime()+req.files.before_hover.name;
      req.files.before_hover.mv("public/uploads/"+before_hover)
      var after_hover=new Date().getTime()+req.files.after_hover.name;
      req.files.after_hover.mv("public/uploads/"+after_hover)
      var about_farm=`UPDATE about_farm SET before_hover='${before_hover}',ater_hover='${after_hover}'`;
      await sql(about_farm);
  }
  var a=req.body;
  var about_farm=`UPDATE about_farm SET first_heding='${a.heding1}',second_heading='${a.heding2}',discription='${a.disc}'`;
  await sql(about_farm)
  res.redirect("/admin/aboutfarm")
})
rout.get("/achivements",async function(req,res){
 var achivement=await sql(`SELECT * FROM achivement`)
  res.render("admin/achivements.ejs",{"achivement":achivement})
})
rout.post("/save_achivements",async function(req,res){
  if(req.files!=null){
      if(req.files.first_img){
          var first_img=new Date().getTime()+req.files.first_img.name;
          req.files.first_img.mv('public/uploads/'+first_img)
          await sql(`UPDATE achivement SET first_img='${first_img}' WHERE achivement_id='1'`)
      }
    
      if(req.files.second_img){
          var second_img=new Date().getTime()+req.files.second_img.name;
          req.files.second_img.mv('public/uploads/'+second_img)
          await sql(`UPDATE achivement SET second_img='${second_img}' WHERE achivement_id='1'`)
      }
     
      if(req.files.third_img){
          var third_img=new Date().getTime()+req.files.third_img.name;
          req.files.third_img.mv('public/uploads/'+third_img)
          await sql(`UPDATE achivement SET third_img='${third_img}' WHERE achivement_id='1'`)
      }

     
      if(req.files.achivement_img){
          var achivement_img=new Date().getTime()+req.files.achivement_img.name;
          req.files.achivement_img.mv('public/uploads/'+achivement_img)
          await sql(`UPDATE achivement SET achivement_logo='${achivement_logo}' WHERE achivement_id='1'`)
      }
      
      if(req.files.earth_img){
          var earth_img=new Date().getTime()+req.files.earth_img.name;
          req.files.earth_img.mv('public/uploads/'+earth_img)
          await sql(`UPDATE achivement SET earth_logo='${earth_logo}' WHERE achivement_id='1'`)
      }
  }
  var d=req.body;
  var data=`UPDATE achivement SET tittle='${d.achivements}',leader_section='${d.leaders}',award_count='${d.award_count}',experiance='${d.experiance}',more_disk='${d.disc}'`
  await sql(data);
  res.redirect("/admin/achivements")
 
})
rout.get("/testimonial", async function(req,res){
  var testimonial=await sql(`SELECT * FROM testimonial`);
  res.render("admin/testimonial.ejs",{"testimonial":testimonial})
})
rout.post("/save_testimonial",async function(req,res){
      var user_img=new Date().getTime()+req.files.user_img.name;
      req.files.user_img.mv("public/uploads/"+user_img)
      var user_img2=new Date().getTime()+req.files.user_img2.name;
      req.files.user_img2.mv("public/uploads/"+user_img2)
      var d=req.body;
      var data=`INSERT INTO testimonial(text_disc,test_name,test_img,anim_img) VALUES('${d.disc}','${d.user_name}','${user_img}','${user_img2}')`
      await sql(data)
      res.redirect("/admin/testimonial")
})
rout.get("/delete_testimonial/:id",async function(req,res){
  var data=await sql(`DELETE FROM testimonial WHERE test_id='${req.params.id}'`);
  res.redirect("/admin/testimonial")
})
rout.get("/edit_testimonial/:id",async function(req,res){
  var testimonial=await sql(`SELECT * FROM testimonial WHERE test_id='${req.params.id}'`)
  res.render("admin/edit_testmonial.ejs",{"testimonial":testimonial})
})
rout.post("/update_testomonial",async function(req,res){
if(req.files!=null){
      var user_img=new Date().getTime()+req.files.user_img.name;
      req.files.user_img.mv("public/uploads/"+user_img)
      var user_img2=new Date().getTime()+req.files.user_img2.name;
      req.files.user_img2.mv("public/uploads/"+user_img2)
      var d=req.body;
      var data=await sql(`UPDATE testimonial SET test_img='${user_img}',anim_img='${user_img2}' WHERE test_id='${d.id}' `)
  }
  var d=req.body;
   var data=`UPDATE testimonial SET text_disc='${d.disc}',test_name='${d.user_name}' WHERE test_id='${d.id}'`
   await sql(data)
  res.redirect("/admin/testimonial")     
})
rout.get("/service_heading", async function(req,res){
  var service_heading=await sql(`SELECT * FROM service_heading`)
  res.render("admin/service_heading.ejs",{"service_heading":service_heading})
})
rout.get("/teams",async function(req,res){
  var teams=await sql(`SELECT * FROM teams`)
  res.render("admin/teams.ejs",{"teams":teams})
})
rout.post("/save_team",async function(req,res){
      var img=new Date().getTime()+req.files.img.name;
      req.files.img.mv("public/uploads/"+img)

  var d=req.body;
  await sql(`INSERT INTO teams(quote,insta_link,whatsapp_link,facebook_link,img) VALUES ('${d.quote}','${d.insta_link}','${d.whatsapp_link}','${d.facebook_link}','${img}')`)
  res.redirect("/admin/teams")
})




rout.post("/save_service_heading",async function(req,res){
  if(req.files!=null){
      var img = new Date().getTime()+req.files.img.name;
      req.files.img.mv("public/uploads/"+img)
      await sql(`UPDATE service_heading SET background_img='${img}'`)
  }
  var d=req.body;
  await sql(`UPDATE service_heading SET service_heading='${d.heading}'`)
  res.redirect("/admin/service_heading")
})
rout.get("/service_discription",async function(req,res){
  var service_discription=await sql(`SELECT  * FROM service_discription`)
  var service_img=await sql(`SELECT  * FROM service_img`)

  res.render("admin/service_discription.ejs",{"service_discription":service_discription,"service_img":service_img})
})
rout.post("/save_service_discription",async function(req,res){
  var d=req.body;
  var data=`UPDATE service_discription SET service_main_heading='${d.service_main_heading}',service_sub_heading='${d.service_sub_heading}',key_point_1='${d.key_point_1}',key_point_2='${d.key_point_2}',key_point_3='${d.key_point_3}',key_point_4='${d.key_point_4}'`;
  await sql(data)
  res.redirect("/admin/service_discription")
})
rout.post("/save_service_images",async function(req,res){
  var Image=new Date().getTime()+req.files.Image.name;
  req.files.Image.mv("public/uploads/"+Image)
  await sql(`INSERT INTO service_img(service_img) VALUES('${Image}')`)
  res.redirect("/admin/service_discription")
})
rout.get("/delete_service_img/:id",async function(req,res){
  await sql(`DELETE FROM service_img WHERE service_img_id='${req.params.id}'`)
  res.redirect("/admin/service_discription")
})
rout.get("/update_service_img/:id",async function(req,res){
  var data=await sql(`SELECT * FROM service_img WHERE service_img_id='${req.params.id}'`)
  res.render("admin/update_service_img.ejs",{"data":data})
})
rout.post("/edit_service_img",async function(req,res){
  var d=req.body
  if(req.files!=null){
      var Image=new Date().getTime()+req.files.Image.name;
      req.files.Image.mv("public/uploads/"+Image)
      await sql(`UPDATE service_img SET service_img='${Image}' WHERE service_img_id='${d.id}'`)
  }
  res.redirect("/admin/service_discription")
})
rout.get("/edit_team/:id",async function(req,res){
  var teams=await sql(`SELECT * FROM teams WHERE team_id ='${req.params.id}'`)
  res.render("admin/edit_team.ejs",{"teams":teams})
})
rout.post("/update_team", async function(req,res){
  var d=req.body;

  if(req.files!=null){
      var img=new Date().getTime()+req.files.img.name;
      req.files.img.mv("public/uploads/"+img)
      await sql(`UPDATE teams SET img='${img}' WHERE team_id='${d.id}'`)
  }
  var update=`UPDATE teams SET insta_link='${d.insta_link}',whatsapp_link='${d.whatsapp_link}',facebook_link='${d.facebook_link}' WHERE team_id='${d.id}'`
  await sql(update)
  res.redirect("/admin/teams")
})
rout.get("/delete_team/:id",async function(req,res){
  await sql(`DELETE FROM teams WHERE team_id='${req.params.id}'`)
  res.redirect("/admin/teams")

})


// nagesh admin end 




// Vegetable section 1 jayad
rout.get("/vegetable_sec1", async (req, res) => {
  var list = await sql(`SELECT * FROM vegetable_sec1`);
  res.render("admin/vegetable_sec1.ejs", { list: list[0] });
});

rout.post("/save_vegetable_sec1", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var bg_img = new Date().getTime() + req.files.bg_img.name;
    req.files.bg_img.mv("public/uploads/" + bg_img);
    await sql(
      `INSERT INTO vegetable_sec1 (bg_img,title,heading,para) VALUES ('${bg_img}','${d.title}','${d.heading}','${d.para}')`
    );
  } else {
    await sql(
      `INSERT INTO vegetable_sec1 (title,heading,para) VALUES ('${d.title}','${d.heading}','${d.para}')`
    );
  }
  res.redirect("/admin/vegetable_sec1");
});

rout.post("/update_vegetable_sec1", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var bg_img = new Date().getTime() + req.files.bg_img.name;
    req.files.bg_img.mv("public/uploads/" + bg_img);
    await sql(
      `UPDATE vegetable_sec1 SET bg_img='${bg_img}',title='${d.title}',heading='${d.heading}',para='${d.para}'`
    );
  }
  await sql(
    `UPDATE vegetable_sec1 SET title='${d.title}' , heading='${d.heading}',para='${d.para}'`
  );
  res.redirect("/admin/vegetable_sec1");
});

// Vegetable section 2
rout.get("/vegetable_sec2", async (req, res) => {
  var list = await sql(`SELECT * FROM vegetable_sec2`);
  res.render("admin/vegetable_sec2.ejs", { list });
});

rout.post("/save_vegetable_sec2", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var img = new Date().getTime() + req.files.img.name;
    req.files.img.mv("public/uploads/" + img);
    await sql(
      `INSERT INTO vegetable_sec2 (img,name) VALUES ('${img}','${d.name}')`
    );
  } else {
    await sql(`INSERT INTO vegetable_sec2 (name) VALUES ('${d.name}')`);
  }
  res.redirect("/admin/vegetable_sec2");
});

rout.get("/edit_vegetable_sec2/:id", async (req, res) => {
  var list = await sql(
    `SELECT * FROM vegetable_sec2 WHERE id='${req.params.id}'`
  );
  res.render("admin/edit_vegetable_sec2.ejs", { list: list[0] });
});

rout.post("/update_vegetable_sec2", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var img = new Date().getTime() + req.files.img.name;
    req.files.img.mv("public/uploads/" + img);
    await sql(
      `UPDATE vegetable_sec2 SET img='${img}', name='${d.name}' WHERE id='${d.id}'`
    );
  } else {
    await sql(`UPDATE vegetable_sec2 SET name='${d.name}' WHERE id='${d.id}'`);
  }
  res.redirect("/admin/vegetable_sec2");
});

rout.get("/delete_vegetable_sec2/:id", async (req, res) => {
  await sql(`DELETE FROM vegetable_sec2 WHERE id='${req.params.id}'`);
  res.redirect("/admin/vegetable_sec2");
});

// Vegetable section 1 jayad

// Fresh Fruits section 1
rout.get("/fresh_fruits_sec1", async (req, res) => {
  var list = await sql(`SELECT * FROM fresh_fruits_sec1`);
  res.render("admin/fresh_fruits_sec1.ejs", { list: list[0] });
});

rout.post("/save_fresh_fruits_sec1", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var bg_img = new Date().getTime() + req.files.bg_img.name;
    req.files.bg_img.mv("public/uploads/" + bg_img);
    await sql(
      `INSERT INTO fresh_fruits_sec1 (bg_img,title,heading,para) VALUES ('${bg_img}','${d.title}','${d.heading}','${d.para}')`
    );
  } else {
    await sql(
      `INSERT INTO fresh_fruits_sec1 (title,heading,para) VALUES ('${d.title}','${d.heading}','${d.para}')`
    );
  }
  res.redirect("/admin/fresh_fruits_sec1");
});

rout.post("/update_fresh_fruits_sec1", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var bg_img = new Date().getTime() + req.files.bg_img.name;
    req.files.bg_img.mv("public/uploads/" + bg_img);
    await sql(
      `UPDATE fresh_fruits_sec1 SET bg_img='${bg_img}',title='${d.title}',heading='${d.heading}',para='${d.para}'`
    );
  }
  await sql(
    `UPDATE fresh_fruits_sec1 SET title='${d.title}' , heading='${d.heading}',para='${d.para}'`
  );
  res.redirect("/admin/fresh_fruits_sec1");
});

// Fresh Fruits section 2
rout.get("/fresh_fruits_sec2", async (req, res) => {
  var list = await sql(`SELECT * FROM fresh_fruits_sec2`);
  res.render("admin/fresh_fruits_sec2.ejs", { list });
});

rout.post("/save_fresh_fruits_sec2", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var img = new Date().getTime() + req.files.img.name;
    req.files.img.mv("public/uploads/" + img);
    await sql(
      `INSERT INTO fresh_fruits_sec2 (img,name) VALUES ('${img}','${d.name}')`
    );
  } else {
    await sql(`INSERT INTO fresh_fruits_sec2 (name) VALUES ('${d.name}')`);
  }
  res.redirect("/admin/fresh_fruits_sec2");
});

rout.get("/edit_fresh_fruit_sec2/:id", async (req, res) => {
  var list = await sql(
    `SELECT * FROM fresh_fruits_sec2 WHERE id='${req.params.id}'`
  );
  res.render("admin/edit_fresh_fruit_sec2.ejs", { list: list[0] });
});

rout.post("/update_fresh_fruits_sec2", async (req, res) => {
  var d = req.body;
  if (req.files) {
    var img = new Date().getTime() + req.files.img.name;
    req.files.img.mv("public/uploads/" + img);
    await sql(
      `UPDATE fresh_fruits_sec2 SET img='${img}', name='${d.name}' WHERE id='${d.id}'`
    );
  } else {
    await sql(
      `UPDATE fresh_fruits_sec2 SET name='${d.name}' WHERE id='${d.id}'`
    );
  }
  res.redirect("/admin/fresh_fruits_sec2");
});

rout.get("/delete_fresh_fruit_sec2/:id", async (req, res) => {
  await sql(`DELETE FROM fresh_fruits_sec2 WHERE id='${req.params.id}'`);
  res.redirect("/admin/fresh_fruits_sec2");
});




rout.get("/footer",async function(req,res){
  var footer=await sql(`SELECT * FROM footer`)
  var link=await sql(`SELECT * FROM link`)
  var social_link=await sql(`SELECT * FROM social_link`)
  res.render("admin/manage_footer.ejs",{"footer":footer,"social_link":social_link,"link":link})
})
rout.post("/save_footer",async function(req,res){
  var d=req.body;
  if(req.files!=null){
      if(req.files.logo1){
          var logo1=new Date().getTime()+req.files.logo1.name;
          req.files.logo1.mv("public/uploads/"+logo1)
          await sql(`UPDATE footer SET logo1='${logo1}' WHERE footer_id='1'`)
      }
      if(req.files.logo2){
          var logo2=new Date().getTime()+req.files.logo2.name;
          req.files.logo2.mv("public/uploads/"+logo2)
          await sql(`UPDATE footer SET logo2='${logo2}' WHERE footer_id='1'`)
      }
   }
  var  update=`UPDATE footer SET address='${d.address}',number='${d.number}',email='${d.email}'`
  await sql(update)
  res.redirect("/admin/footer")
})
rout.post("/save_link",async function(req,res){
  var d=req.body;
  var link=`INSERT INTO link (link_name,url) VALUES('${d.link_name}','${d.url}')`
  await sql(link)
  res.redirect("/admin/footer")
})
rout.get("/edit_link/:id",async function(req,res){
  var link=await sql(`SELECT * FROM link WHERE link_id ='${req.params.id}'`)
  res.render("admin/edit_link.ejs",{"link":link})
})
rout.post("/update_link",async function(req,res){
  var d=req.body;
  await sql(`UPDATE link SET link_name='${d.link_name}',url='${d.url}' WHERE link_id='${d.id}'`)
  res.redirect("/admin/footer")
})
rout.get("/delete_link/:id",async function(req,res){
  await sql(`DELETE FROM link WHERE link_id='${req.params.id}'`)
  res.redirect("/admin/footer")
})

// ???Social Link
rout.post("/save_social_link",async function(req,res){
  var d=req.body;
  if(req.files!=null){
      if(req.files.logo){
          var logo=new Date().getTime()+req.files.name;
          req.files.logo.mv("public/uploads/"+logo)
          await sql(`UPDATE social_link SET logo='${logo}'`)
      }
  }
  var update= `UPDATE social_link SET facebook_link='${d.facebook}',twitter_link='${d.twitter}',insta_link='${d.instagram}',youtube='${d.youtube}'`
  await sql(update)
  res.redirect("/admin/footer")
})

module.exports = rout;