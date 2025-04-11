import * as settingsModel from "../models/settings.model.js";
import * as profileChecker from "../libs/checker.js";

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

export const getSidebarSettings = async (req, res) => {
  try {
    const settings = await settingsModel.getSettings();

    let inputModule = false;

    if(!await profileChecker.isMerchantAgrochemical(req.user_id)){
      inputModule =  await profileChecker.canUseInputModule(req.user_id);
    }

    if (!settings) {
      res.status(404).send({ message: "No hay configuración para mostrar" });
    }

    return res.status(200).json({terminos_condiciones: settings.url_terminos_condiciones, input_module: inputModule});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
