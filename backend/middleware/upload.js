const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function sanitizeFileName(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const baseName = path.basename(file.originalname || "imagem", ext);
    const safeName = sanitizeFileName(baseName) || "imagem";
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(null, `${safeName}-${uniqueSuffix}${ext.toLowerCase()}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    return cb(new Error("Apenas arquivos de imagem são permitidos."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 20,
    fileSize: 10 * 1024 * 1024
  }
});

module.exports = upload;