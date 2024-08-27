const { render } = require("ejs");
const express =require("express");
const app=express();
const port =8080;
const parth =require("path");
const mongoose =require("mongoose");
var methodOverride = require('method-override');
const Vlog =require("./models/postSchema.js");
app.use(express.static(parth.join(__dirname,"/public")));
app.set("view engine ","ejs");
app.set("views",parth.join(__dirname,"/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


//connection to database 

main().then(()=>{
    console.log("database connection succseful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/vlog');

}


app.get("/vlog", async (req,res)=>{
    let vlogs =await Vlog.find();
    res.render("index.ejs",{vlogs});
});

app.get("/vlog/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/vlog",(req,res)=>{
    let {title,content}=req.body;
let vlog= new Vlog({
    title : title,
    content :content,
});
vlog.save().then((result)=>{
    console.log(result)
}).catch((Err)=>{
    console.log(Err);
})

    res.redirect("/vlog");
});

//edit vlog 
app.get("/vlog/:id/edit", async (req,res)=>{
    let{id} =req.params;
    let vlog = await Vlog.findById(id);
    console.log(vlog);
   res.render("edit.ejs",{vlog});
});

app.patch("/vlog/:id",async (req,res)=>{
    let{id}=req.params;
    let {content} =req.body;
    await Vlog.findByIdAndUpdate(id ,{   content : content });
    res.redirect("/vlog");
});

//DELETE ROUTE 

app.delete("/vlog/:id", async (req,res)=>{
    let{id} =req.params;
    await Vlog.findByIdAndDelete(id);
    res.redirect("/vlog");
});







app.listen(port,()=>{
    console.log("sever is listing ");
});