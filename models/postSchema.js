const mongoose =require("mongoose");
 
const postSchema = new mongoose.Schema({
    title : String,
    content :String,
});

 const Vlog = mongoose.model("vlog",postSchema);

module.exports=Vlog;