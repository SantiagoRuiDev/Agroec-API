import * as productModel from "../models/products.model.js";
import { isAuthentified } from "../libs/auth.js";

export const getAllMarketProducts = async (req, res) => {
  try {
    if (req.user_id == "Sistema") {
      const products = await productModel.getAllProductsRaw();
      if (!products) {
        res.status(404).send({ message: `No hay productos para mostrar` });
      }
      res.status(200).send(products);
    } else {
      const products = await productModel.getAllProducts();
      if (!products) {
        res.status(404).send({ message: `No hay productos para mostrar` });
      }
      res.status(200).send(products);
    }
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
    const schema = req.body;

    if (await productModel.getProductById(schema.nombre)) {
      throw new Error("Este producto ya existe");
    }

    const createProduct = await productModel.createProduct(schema);

    if (!createProduct) {
      res.status(404).send({ message: "No se pudo crear el producto" });
    }

    res
      .status(200)
      .send({ message: "Producto creado correctamente", id: schema.nombre });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setProductImage = async (req, res) => {
  try {
    const uuid = req.params.id;
    const image = req.image_url;
    const updatedRow = await productModel.setProductImage(uuid, image);

    if (updatedRow == 0) {
      return res
        .status(404)
        .send({ message: "No se pudo editar la imagen del producto" });
    }

    return res
      .status(200)
      .send({ message: "Imagen actualizada correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const enableProductById = async (req, res) => {
  try {
    const uuid = req.params.id;
    const enabledRow = await productModel.enableProductById(uuid);

    if (enabledRow == 0) {
      return res
        .status(404)
        .send({ message: "No se pudo habilitar el producto" });
    }

    return res
      .status(200)
      .send({ message: "Producto habilitado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const disableProductById = async (req, res) => {
  try {
    const uuid = req.params.id;
    const deleteProduct = await productModel.disableProductById(uuid);

    if (deleteProduct == 0) {
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
