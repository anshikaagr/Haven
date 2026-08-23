require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();
connectDB();


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Haven API Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});