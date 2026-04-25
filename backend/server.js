const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API da Orion Veículos funcionando."
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    status: "online"
  });
});

app.use("/api/uploads", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor da Orion rodando em http://localhost:${PORT}`);
});
