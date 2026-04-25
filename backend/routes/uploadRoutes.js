const express = require("express");
const path = require("path");
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", requireAuth, upload.array("images", 20), (req, res) => {
  try {
    const files = Array.isArray(req.files) ? req.files : [];

    const data = files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      extension: path.extname(file.filename || "").toLowerCase()
    }));

    return res.status(201).json({
      ok: true,
      message: "Upload realizado com sucesso.",
      data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Erro ao fazer upload das imagens.",
      error: error.message
    });
  }
});

module.exports = router;
