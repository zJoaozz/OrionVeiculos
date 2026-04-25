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

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5501",
  "http://127.0.0.1:5501",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "null"
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem não permitida pelo CORS."));
    },
    credentials: true
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

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Rota não encontrada."
  });
});

app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);

  const isProduction = process.env.NODE_ENV === "production";

  res.status(err.status || 500).json({
    ok: false,
    message: isProduction ? "Erro interno do servidor." : err.message
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor da Orion rodando em http://localhost:${PORT}`);
});