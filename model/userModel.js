const mongoose= require("mongoose");
const userSchema= mongoose.Schema({
    username:{
        type: String,
        required: (true, "Plz add username")
    },
    email : {
        type: String,
        required: (true, "Plz add email"),
        unique:["Email alrdy taken"]
    },
    password : {
        type: String,
        required: (true, "Plz add email")
    },
},
    {
        timestamps: true
    }
)
module.exports=mongoose.model("User", userSchema);