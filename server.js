const express =require("express");
const errorHandler = require("./middleware/errorhandler");
const connectdb = require("./config/dbconnection");
const dotenv=require("dotenv").config();
const app=express();
connectdb();

//configuring middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);


//configuring routes
app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));


const port=process.env.PORT||5000;
app.listen(port,()=> {
    console.log(`server running on port ${port}`);

})