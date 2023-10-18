const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/schemas");
const Category = require('../classes/schema');
const verifyToken = require("../middlevares/authentication");


const router = express.Router();

router.post("/add-catogary", verifyToken, async(req, res)=>{
    try{
        const {name, discription} = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if(!name || !discription ){
            return res.status(400).json({error:"name and description is required"})
        }
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const category = new Category({name, discription, user:userId})
        await category.save();
        res.status(200).json(category);

    }catch(error){
        res.status(500).json({ error: error.message });
    }
})
router.get('/catogary',verifyToken, async(req, res)=>{
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;