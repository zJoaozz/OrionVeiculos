const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp"
]);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function sanitizeFileName(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function getSafeExtension(originalName) {
  return path.extname(originalName || "").toLowerCase();
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = getSafeExtension(file.originalname);

    if (!allowedExtensions.has(ext)) {
      return cb(new Error("Extensão de arquivo não permitida."));
    }

    const baseName = path.basename(file.originalname || "imagem", ext);
    const safeName = sanitizeFileName(baseName) || "imagem";
    const uniqueSuffix = `${Date.now()}-${cryptoRandomSuffix()}`;

    cb(null, `${safeName}-${uniqueSuffix}${ext}`);
  }
});

function cryptoRandomSuffix() {
  return Math.random().toString(36).slice(2, 10);
}

const fileFilter = (req, file, cb) => {
  const ext = getSafeExtension(file.originalname);

  if (!allowedExtensions.has(ext)) {
    return cb(new Error("Formato não permitido. Use JPG, PNG ou WEBP."));
  }

  if (!allowedMimeTypes.has(file.mimetype)) {
    return cb(new Error("Tipo de imagem não permitido."));
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 20,
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;