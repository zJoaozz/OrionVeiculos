const express = require("express");
const {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require("../controllers/vehicleController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/", requireAuth, createVehicle);
router.put("/:id", requireAuth, updateVehicle);
router.delete("/:id", requireAuth, deleteVehicle);

module.exports = router;
