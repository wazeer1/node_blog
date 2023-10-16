const verifyToken = require("../middlevares/authentication");
const express = require("express");
const Blog = require("../blog/blogSchema");
const User = require("../user/schemas");


const router = express.Router();

router.post("/blogs", verifyToken, async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.userId; 
      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required fields" });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const blog = new Blog({ title, content, user: userId });
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;