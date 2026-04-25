const mongoose = require("mongoose");

const vehicleImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true
    },
    filename: {
      type: String,
      default: "",
      trim: true
    }
  },
  { _id: false }
);

const vehicleSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    marca: {
      type: String,
      required: true,
      trim: true
    },
    modelo: {
      type: String,
      required: true,
      trim: true
    },
    ano: {
      type: String,
      required: true,
      trim: true
    },
    combustivel: {
      type: String,
      required: true,
      trim: true
    },
    km: {
      type: String,
      required: true,
      trim: true
    },
    preco: {
      type: String,
      required: true,
      trim: true
    },
    cidade: {
      type: String,
      required: true,
      trim: true
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    status: {
      type: String,
      required: true,
      enum: ["disponivel", "reservado", "vendido"],
      default: "disponivel"
    },
    tag: {
      type: String,
      required: true,
      trim: true
    },
    ordem: {
      type: Number,
      required: true,
      default: 0
    },
    destaque: {
      type: Boolean,
      default: false
    },
    destaqueHome: {
      type: Boolean,
      default: false
    },
    descricao: {
      type: String,
      required: true,
      trim: true
    },
    opcionais: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    whatsappText: {
      type: String,
      required: true,
      trim: true
    },
    images: {
      type: [vehicleImageSchema],
      default: []
    },
    coverIndex: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);