const express = require("express");
const {
  getContent,
  updateCategories,
  updateSiteSettings,
  updateHomeSettings,
  updateEsteticaSettings
} = require("../controllers/contentController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getContent);
router.put("/categories", requireAuth, updateCategories);
router.put("/site-settings", requireAuth, updateSiteSettings);
router.put("/home-settings", requireAuth, updateHomeSettings);
router.put("/estetica-settings", requireAuth, updateEsteticaSettings);

module.exports = router;
