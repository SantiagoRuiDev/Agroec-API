import * as advertisingModel from "../models/advertising.model.js";
import NodeCache from "node-cache";
import { v4 as uuidv4 } from "uuid";

const cache = new NodeCache({ stdTTL: 300 }); // 10 minutos por defecto
const key = "adversiting";

export const createAdvertising = async (req, res) => {
  try {
    const uuid_ads = uuidv4();
    const schemaAds = req.body;

    const createAdvertising = await advertisingModel.createAdvertising(
      uuid_ads,
      schemaAds
    );

    if (!createAdvertising) {
      res.status(404).send({ message: "No se pudo crear la publicacion" });
    }

    return res
      .status(200)
      .send({ uuid: uuid_ads, message: "Publicacion creada correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateImageById = async (req, res) => {
  try {
    const image = req.image_url;
    const uuidImage = req.params.id;

    const updateImageById = await advertisingModel.updateImageById(
      image,
      uuidImage
    );

    if (updateImageById == 0) {
      res.status(404).send({ message: "No se pudo actualizar la imagen" });
    }

    return res.status(200).send({ message: "Imagen eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteAdvertisingById = async (req, res) => {
  try {
    const uuid = req.params.id;

    const updatedRows = await advertisingModel.deleteAdvertisingById(uuid);

    if (updatedRows == 0) {
      return res
        .status(404)
        .send({ message: "No se pudo eliminar este anuncio" });
    }

    return res.status(200).send({ message: "Anuncio eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllAdvertising = async (req, res) => {
  try {
    const cached = cache.get(key);
    if (cached) {
      res.status(200).json(cached);
      return;
    }

    const getAllAdvertising = await advertisingModel.getAllAdvertisings();

    if (!getAllAdvertising) {
      res
        .status(404)
        .send({ message: "No se pudieron obtener las publicaciones" });
    }
    cache.set(key, getAllAdvertising);

    return res.status(200).send(getAllAdvertising);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
