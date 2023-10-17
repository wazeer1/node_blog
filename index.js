const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./api/user");
const blogRoute = require('./api/blog')
const classRoute = require('./api/classes')

const PORT = 3004;

mongoose.connect(
  "mongodb+srv://mailtowazeer:8FTnb4cknO0Ik2Ms@cluster0.bxb1qte.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/users", userRoutes);
app.use("/api/blog",blogRoute)
app.use('/api/classes', classRoute)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
