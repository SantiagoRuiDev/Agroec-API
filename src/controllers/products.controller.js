import * as productModel from "../models/products.model.js";
import { calcMarketTrend } from "../libs/calc.js";
import { isAuthentified } from "../libs/auth.js";
import { v4 as uuidv4 } from "uuid";

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

    const provincias = {};

    for (const item of data) {
      if (!provincias[item.provincia]) {
        provincias[item.provincia] = [];
      }
      provincias[item.provincia].push(item);
    }

    const resultado = [];

    let latestWeekPrices = {};
    if (Object.entries(provincias).length > 0) {
      latestWeekPrices = await productModel.getPriceByProductAndState(
        req.params.id
      );
    }
    for (const [provincia, registros] of Object.entries(provincias)) {
      const x = registros.map((r) => r.semana);
      const y = registros.map((r) => r.promedio);
      const m = calcMarketTrend(x, y);

      let tendencia = "Estable";
      if (m > 0.01) tendencia = "Subida";
      else if (m < -0.01) tendencia = "Bajada";

      const max = Math.max(
        Array.from(latestWeekPrices).find((week) => week.provincia == provincia)
          .max
      );
      const min = Math.max(
        Array.from(latestWeekPrices).find((week) => week.provincia == provincia)
          .min
      );

      resultado.push({
        provincia,
        max,
        min,
        tendencia,
      });
    }

    res.status(200).send(resultado);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { units } = req.query;

    let products = [];

    if (units) {
      products = await productModel.getProductUnitsById(req.params.id);
    } else {
      products = await productModel.getProductById(req.params.id);
    }

    if (!products) {
      res.status(404).send({ message: `No hay productos para mostrar` });
    }

    res.status(200).send(products);
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
export const deleteUnit = async (req, res) => {
  try {
    const removed = await productModel.deleteUnit(req.params.id);

    if (removed > 0) {
      return res
        .status(200)
        .send({ message: "Unidad de medida creada correctamente" });
    }

    throw new Error("Error al intentar eliminar la unidad.");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const createUnit = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (await productModel.getUnitNameAndProduct(req.params.id, nombre)) {
      throw new Error("Esta unidad ya existe");
    }

    const createdUnit = await productModel.createUnit(
      uuidv4(),
      req.params.id,
      nombre
    );

    if (!createdUnit) {
      res.status(404).send({ message: "No se pudo crear la unidad" });
    }

    res
      .status(200)
      .send({ message: "Unidad de medida creada correctamente", id: nombre });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const schema = req.body;

    const updateProduct = await productModel.updateProduct(
      req.params.id,
      schema
    );

    if (!updateProduct) {
      res.status(404).send({ message: "No se pudo crear el producto" });
    }

    res.status(200).send({
      message: "Producto actualizado correctamente",
      id: schema.nombre,
    });
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
