const mongoose = require("mongoose");

async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("A variável MONGODB_URI não foi definida no arquivo .env");
    }

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB conectado com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;