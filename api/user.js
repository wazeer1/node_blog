const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/schemas");


const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || name.length < 3) {
        return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
      }
      if (!email || !email.match(/\S+@\S+\.\S+/)) {
        return res.status(400).json({ error: 'Email is required and must be valid.' });
      }
      if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password is required and must be at least 6 characters long.' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User with the given email already exists.' });
      }
      const user = new User({ name, email, password });
  
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key"); // Change 'your_secret_key' to a secure secret key
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
