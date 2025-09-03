const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// เชื่อม MongoDB

mongoose.connect("mongodb://localhost:27017/myshop")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection failed ❌", err));

// Routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
