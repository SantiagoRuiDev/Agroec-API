import * as qualityParamsModel from "../models/qualityParams.model.js";
import * as preferencesModel from "../models/preferences.model.js";
import { deleteFile } from "../libs/file.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPreferences = async (req, res) => {
  try {
    const preferences = await preferencesModel.getPreferencesByUser(
      req.user_id
    );
    res.status(200).send(preferences);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deletePreferenceById = async (req, res) => {
  try {
    const existPreference = await preferencesModel.getPreferenceById(
      req.params.id
    );
    if (existPreference) {
      if (existPreference.url_castigos != "") {
        deleteFile(existPreference.url_castigos);
      }
    }
    const deleteRow = await preferencesModel.deletePreferenceById(
      req.params.id
    );
    if (deleteRow > 0) {
      return res
        .status(200)
        .send({ message: "Preferencia eliminada correctamente" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const uploadSheet = async (req, res) => {
  try {
    const preferences = await preferencesModel.uploadSheetByPreference(
      req.params.id,
      req.file_url
    );
    if (preferences > 0) {
      res
        .status(200)
        .send({ message: "Tabla de castigos subida correctamente" });
    } else {
      throw new Error("Error al intentar subir la tabla de castigos");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createPreferencesByUser = async (req, res) => {
  try {
    const preferences_body = req.body.preferences;
    const user_id =
      req.user_id != undefined && req.user_id != null
        ? req.user_id
        : req.body.id;

    if (preferences_body != undefined || preferences_body != null) {
      const uuids = [];
      for (const preference of preferences_body) {
        const uuid_preference = uuidv4();
        if (
          await preferencesModel.userPreferenceAlreadyExist(
            user_id,
            preference.id_producto
          )
        ) {
          throw new Error("Ya tienes este producto entre tus intereses");
        }
        await preferencesModel.createPreferencesByUser(
          uuid_preference,
          user_id,
          preference,
          ""
        );
        uuids.push(uuid_preference);
        if (preference.params) {
          for (const param of preference.params) {
            const uuid_param = uuidv4();
            await qualityParamsModel.createQualityParam(
              uuid_param,
              user_id,
              param
            );
            await qualityParamsModel.createQualityParamForPreference(
              uuidv4(),
              uuid_param,
              uuid_preference
            );
          }
        }
      }
      return res
        .status(200)
        .send({ message: "Preferencia creada correctamente", id: uuids });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
