import * as suggestionModel from "../models/suggestion.model.js";
import { v4 as uuidv4 } from "uuid";

export const createSuggestion = async (req, res) => {
  try {
    const { producto, cantidad } = req.body;
    const uuid = uuidv4();
    const suggestion = await suggestionModel.createSuggestion(
      uuid,
      req.user_id,
      producto,
      cantidad
    );

    if (suggestion == 0) {
      return res
        .status(404)
        .send({ message: `No se pudo crear la sugerencia del producto` });
    }

    return res
      .status(200)
      .json({ message: `Sugerencia de producto agregada correctamente` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await suggestionModel.getSuggestions();

    if (!suggestions) {
      res.status(404).send({ message: "No hay sugerencias para mostrar" });
    }

    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await suggestionModel.getProducts();

    if (!products) {
      res.status(404).send({ message: "No hay productos para mostrar" });
      return;
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const enableProductById = async (req, res) => {
  try {
    const modifiedRows = await suggestionModel.enableProductById(req.params.id);

    if (modifiedRows == 0) {
      res.status(404).send({ message: "No se pudo habilitar este producto" });
      return;
    }

    return res.status(200).json({message: "Producto habilitado correctamente"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const disableProductById = async (req, res) => {
  try {
    const modifiedRows = await suggestionModel.disableProductById(req.params.id);

    if (modifiedRows == 0) {
      res.status(404).send({ message: "No se pudo deshabilitar este producto" });
      return;
    }

    return res.status(200).json({message: "Producto deshabilitado correctamente"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};