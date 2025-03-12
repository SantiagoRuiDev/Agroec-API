import * as settingsModel from "../models/settings.model.js";

export const updateSettings = async (req, res) => {
  try {
    const settings = req.body;
  
    const updatedRow = await settingsModel.updateSettings(settings);

    if (updatedRow > 0) {
      return res
        .status(200)
        .json({ message: "La configuración ha sido actualizada." });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const settings = await settingsModel.getSettings();

    if (!settings) {
      res.status(404).send({ message: "No hay configuración para mostrar" });
    }

    return res.status(200).json(settings);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
