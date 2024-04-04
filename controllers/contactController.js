const asyncHandler=require("express-async-handler");
const contact = require("../model/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req,res) => {
    const contacts=await contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res) => {
    const contactIn=await contact.findById(req.params.id);
    if(!contactIn){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contactIn);
});

//@desc create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req,res) => {
    console.log(req.body);
    const{Name,Email,Phone}=req.body;
    if(!Name||!Email||!Phone){
        res.status(400);
        throw new Error("All fields are manadatory");
    }
    const contacts=await contact.create({
        Name,
        Email,
        Phone,
        user_id:req.user.id,
    });
    res.status(201).json({msg: "Creating a contact"});
   
});

//@desc updating a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req,res) => {
    const contactIn=await contact.findById(req.params.id);
    if(!contactIn){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contactIn.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update");
    }
    const updatedContact= await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});


//@desc deleting a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res) => {
    const contactIn=await contact.findById(req.params.id);
    if(!contactIn){
        res.status(404);
        throw new Error("contact not found");
    }
    await contactIn.deleteOne({ _id: req.params.id });
    res.status(200).json(contactIn);
});

module.exports={getContacts, getContact, createContact, updateContact, deleteContact};