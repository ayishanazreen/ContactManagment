const mongoose =require("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
         type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"User" , 
        },
        
    Name:{
        type:String,
        required:(true,"plz add contact name")
    },
    Email:{
        type:String,
        required:(true,"plz add email")
    },
    Phone:{
        type:String,
        required:(true,"plz add phone")
    },
},
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("contact", contactSchema);
