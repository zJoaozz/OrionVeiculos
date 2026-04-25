const mongoose = require("mongoose");
const Vehicle = require("../models/vehicle");

function normalizeStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (value === "reservado") return "reservado";
  if (value === "vendido") return "vendido";
  return "disponivel";
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];

  return images
    .map((image) => {
      if (typeof image === "string") {
        return {
          url: image.trim(),
          filename: ""
        };
      }

      if (image && typeof image === "object") {
        return {
          url: String(image.url || "").trim(),
          filename: String(image.filename || "").trim()
        };
      }

      return null;
    })
    .filter((image) => image && image.url);
}

function buildVehiclePayload(body) {
  return {
    titulo: String(body.titulo || "").trim(),
    marca: String(body.marca || "").trim(),
    modelo: String(body.modelo || "").trim(),
    ano: String(body.ano || "").trim(),
    combustivel: String(body.combustivel || "").trim(),
    km: String(body.km || "").trim(),
    preco: String(body.preco || "").trim(),
    cidade: String(body.cidade || "").trim(),
    categoria: String(body.categoria || "").trim().toLowerCase(),
    status: normalizeStatus(body.status),
    tag: String(body.tag || "").trim(),
    ordem: Number(body.ordem || 0),
    destaque: normalizeBoolean(body.destaque),
    destaqueHome: normalizeBoolean(body.destaqueHome),
    descricao: String(body.descricao || "").trim(),
    opcionais: String(body.opcionais || "").trim(),
    tags: String(body.tags || "").trim().toLowerCase(),
    whatsappText: String(body.whatsappText || "").trim(),
    images: normalizeImages(body.images),
    coverIndex: Number(body.coverIndex || 0)
  };
}

function validateVehiclePayload(payload) {
  const requiredFields = [
    "titulo",
    "marca",
    "modelo",
    "ano",
    "combustivel",
    "km",
    "preco",
    "cidade",
    "categoria",
    "status",
    "tag",
    "descricao",
    "opcionais",
    "tags",
    "whatsappText"
  ];

  for (const field of requiredFields) {
    if (!String(payload[field] || "").trim()) {
      return `O campo "${field}" é obrigatório.`;
    }
  }

  if (!["disponivel", "reservado", "vendido"].includes(payload.status)) {
    return 'O campo "status" precisa ser disponivel, reservado ou vendido.';
  }

  if (!Array.isArray(payload.images) || payload.images.length === 0) {
    return 'O campo "images" precisa ter pelo menos uma imagem.';
  }

  if (payload.images.some((image) => !image.url)) {
    return 'Todas as imagens precisam ter uma URL válida.';
  }

  if (Number.isNaN(payload.ordem) || payload.ordem < 0) {
    return 'O campo "ordem" precisa ser um número igual ou maior que zero.';
  }

  if (Number.isNaN(payload.coverIndex)) {
    return 'O campo "coverIndex" precisa ser numérico.';
  }

  if (payload.coverIndex < 0 || payload.coverIndex >= payload.images.length) {
    return 'O campo "coverIndex" é inválido para a quantidade de imagens enviada.';
  }

  return null;
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function sendServerError(res, message) {
  return res.status(500).json({
    ok: false,
    message
  });
}

async function getAllVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ ordem: 1, createdAt: -1 });

    return res.status(200).json({
      ok: true,
      total: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    console.error("Erro ao listar veículos:", error);

    return sendServerError(res, "Erro ao listar veículos.");
  }
}

async function getVehicleById(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: "ID do veículo inválido."
      });
    }

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        message: "Veículo não encontrado."
      });
    }

    return res.status(200).json({
      ok: true,
      data: vehicle
    });
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);

    return sendServerError(res, "Erro ao buscar veículo.");
  }
}

async function createVehicle(req, res) {
  try {
    const payload = buildVehiclePayload(req.body);
    const validationError = validateVehiclePayload(payload);

    if (validationError) {
      return res.status(400).json({
        ok: false,
        message: validationError
      });
    }

    if (payload.destaque) {
      await Vehicle.updateMany({}, { destaque: false });
    }

    const vehicle = await Vehicle.create(payload);

    return res.status(201).json({
      ok: true,
      message: "Veículo cadastrado com sucesso.",
      data: vehicle
    });
  } catch (error) {
    console.error("Erro ao cadastrar veículo:", error);

    return sendServerError(res, "Erro ao cadastrar veículo.");
  }
}

async function updateVehicle(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: "ID do veículo inválido."
      });
    }

    const existingVehicle = await Vehicle.findById(req.params.id);

    if (!existingVehicle) {
      return res.status(404).json({
        ok: false,
        message: "Veículo não encontrado."
      });
    }

    const payload = buildVehiclePayload(req.body);
    const validationError = validateVehiclePayload(payload);

    if (validationError) {
      return res.status(400).json({
        ok: false,
        message: validationError
      });
    }

    if (payload.destaque) {
      await Vehicle.updateMany(
        { _id: { $ne: req.params.id } },
        { destaque: false }
      );
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      ok: true,
      message: "Veículo atualizado com sucesso.",
      data: updatedVehicle
    });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);

    return sendServerError(res, "Erro ao atualizar veículo.");
  }
}

async function deleteVehicle(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: "ID do veículo inválido."
      });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!deletedVehicle) {
      return res.status(404).json({
        ok: false,
        message: "Veículo não encontrado."
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Veículo excluído com sucesso."
    });
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);

    return sendServerError(res, "Erro ao excluir veículo.");
  }
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};