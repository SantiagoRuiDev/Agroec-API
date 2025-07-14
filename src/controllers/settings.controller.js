import * as settingsModel from "../models/settings.model.js";
import NodeCache from "node-cache";
import * as profileChecker from "../libs/checker.js";

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutos por defecto
const cache_sidebar = new NodeCache({ stdTTL: 120 }); 
const key_global = "settings";
const key_sidebar = "sidebar_";

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
    const cached = cache.get(key_global);
    if (cached) {
      res.status(200).json(cached);
      return;
    }

    const settings = await settingsModel.getSettings();

    if (!settings) {
      res.status(404).send({ message: "No hay configuración para mostrar" });
    }
    cache.set(key_global, settings);

    return res.status(200).json(settings);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSidebarSettings = async (req, res) => {
  try {
    const cached = cache_sidebar.get(key_sidebar + req.user_id);
    if (cached) {
      res.status(200).json(cached);
      return;
    }

    const settings = await settingsModel.getSettings();

    let inputModule = false;

    if (!(await profileChecker.isMerchantAgrochemical(req.user_id))) {
      inputModule = await profileChecker.canUseInputModule(req.user_id);
    }

    if (!settings) {
      res.status(404).send({ message: "No hay configuración para mostrar" });
    }
    cache_sidebar.set(key_sidebar  + req.user_id, {
      terminos_condiciones: settings.url_terminos_condiciones,
      input_module: inputModule,
      soporte_whatsapp: settings.soporte_whatsapp_dos,
    });

    return res.status(200).json({
      terminos_condiciones: settings.url_terminos_condiciones,
      input_module: inputModule,
      soporte_whatsapp: settings.soporte_whatsapp_dos,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
