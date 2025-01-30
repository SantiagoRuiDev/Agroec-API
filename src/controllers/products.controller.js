import * as productModel from "../models/products.model.js";
import { v4 as uuidv4 } from "uuid";
import { isAuthentified } from "../libs/auth.js";

export const getAllMarketProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();

    if (!products) {
      res.status(404).send({ message: `No hay productos para mostrar` });
    }

    res.status(200).send(products);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPriceAnalyticByProduct = async (req, res) => {
  try {
    const data = await productModel.getPriceAnalyticByProduct(req.params.id);

    if (!data) {
      res.status(404).send({ message: `No hay datos para mostrar` });
    }

    res.status(200).send(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const isLoggedUser = await isAuthentified(req);
    let products = [];

    if (isLoggedUser != null) {
      products = await productModel.getProductsByPreferences(isLoggedUser.user);
    } else {
      products = await productModel.getAllProducts();
    }

    if (!products) {
      res.status(404).send({ message: `No hay productos para mostrar` });
    }

    res.status(200).send(products);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const uuid = uuidv4();
    const schema = req.body;

    const createProduct = await productModel.createProduct(uuid, schema);

    if (!createProduct) {
      res.status(404).send({ message: "No se pudo crear el producto" });
    }

    res.status(200).send({ message: "Producto creado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const uuid = req.params.id;
    const deleteProduct = await productModel.deleteProductById(uuid);

    if (!deleteProduct) {
      return res
        .status(404)
        .send({ message: "No se pudo eliminar el producto" });
    }

    return res
      .status(200)
      .send({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
