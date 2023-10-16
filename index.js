const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./api/user");
const blogRoute = require('./api/blog')

const PORT = 3004;

mongoose.connect(
  "mongodb+srv://wazeerwazz123:kO3rLwipyBuoGZ1J@cluster0.k6hotna.mongodb.net/",
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
