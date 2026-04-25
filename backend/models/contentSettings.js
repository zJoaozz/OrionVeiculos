const mongoose = require("mongoose");
const { getDefaultContent } = require("../config/defaultContent");

const mixed = mongoose.Schema.Types.Mixed;

const contentSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main"
    },
    categories: {
      type: [mixed],
      default: () => getDefaultContent().categories
    },
    siteSettings: {
      type: mixed,
      default: () => getDefaultContent().siteSettings
    },
    homeSettings: {
      type: mixed,
      default: () => getDefaultContent().homeSettings
    },
    esteticaSettings: {
      type: mixed,
      default: () => getDefaultContent().esteticaSettings
    }
  },
  {
    timestamps: true,
    minimize: false
  }
);

module.exports = mongoose.model("ContentSettings", contentSettingsSchema);
