import * as inputModel from "../models/input.model.js";
import { v4 as uuidv4 } from "uuid";
import * as profileChecker from "../libs/checker.js";
import fs from "fs";
import XLSX from "xlsx";
import { inputMultipleSchemaArray } from "../schemas/input.schema.js";
import { validateSchemas } from "../libs/schema.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 240 }); // 4 minutos por defecto
const key_inputs = "inputs_";
const key_categories = "categories";

export const createMultipleInput = async (req, res) => {
  try {
    const uuid_user = req.user_id;

    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ningún archivo" });
    }

    if (!(await profileChecker.isMerchantAgrochemical(uuid_user))) {
      if (!(await profileChecker.canUseInputModule(uuid_user))) {
        throw new Error(
          "Solo perfiles de comerciante agroquímicos tienen permitido publicar insumos"
        );
      }
    }

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    try {
      validateSchemas(data, inputMultipleSchemaArray);
    } catch (error) {
      res.status(400).json({ error: error.message });
      fs.unlinkSync(filePath); // Elimina el archivo después de procesarlo
      return;
    }

    const categories = await inputModel.getInputCategories();

    // Aquí puedes iterar sobre cada fila e insertarla en la base de datos
    data.forEach(async (row) => {
      const uuid_table = uuidv4();
      const keepImage = row.imagen;
      const inputSchema = row;
      if (
        categories.filter((category) => category.id == row.categoria_insumo)
          .length > 0
      ) {
        row.incluido_iva =
          String(row.incluido_iva).toLowerCase() == "si" ? 1 : 0;
        row.precio_mas_iva =
          String(row.precio_mas_iva).toLowerCase() == "si" ? 1 : 0;
        if (row.incluido_iva == 1) {
          row.precio_mas_iva = 0;
          row.incluido_iva == 1;
        } else {
          row.precio_mas_iva = 1;
          row.incluido_iva == 0;
        }
        if (keepImage) {
          delete row.imagen;
        }
        await inputModel.createInput(uuid_table, uuid_user, inputSchema);
        await inputModel.insertImage(uuidv4(), uuid_table, keepImage);
      }
    });

    fs.unlinkSync(filePath); // Elimina el archivo después de procesarlo
    res.status(200).send({ message: "Subida masiva exitosa" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createInput = async (req, res) => {
  try {
    const uuid_user = req.user_id;
    const uuid_table = uuidv4();
    const inputSchema = req.body;

    if (!(await profileChecker.isMerchantAgrochemical(uuid_user))) {
      if (!(await profileChecker.canUseInputModule(uuid_user))) {
        throw new Error(
          "Solo perfiles de comerciante agroquímicos tienen permitido publicar insumos"
        );
      }
    }

    const createInput = await inputModel.createInput(
      uuid_table,
      uuid_user,
      inputSchema
    );
    if (!createInput) {
      res.status(404).send({ message: "Error al crear el insumo" });
    }

    res
      .status(200)
      .send({ message: "Insumo creado correctamente", uuid: uuid_table });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const input_id = req.params.input_id;

    const input = await inputModel.getInputById(input_id);

    if (input.images.length == 1) {
      throw new Error("Debes tener al menos dos imagenes para eliminar una");
    }

    const deletedRow = await inputModel.deleteImage(req.params.id, input_id);

    if (deletedRow > 0) {
      return res
        .status(200)
        .json({ message: "Imagen eliminada correctamente" });
    }

    throw new Error(
      "La eliminación de la imagen ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const insertImageInput = async (req, res) => {
  try {
    const input_id = req.params.input_id;

    if (req.images_urls) {
      for (const image of req.images_urls) {
        await inputModel.insertImage(uuidv4(), input_id, image);
      }
      return res.status(200).json({ message: "Imagenes subidas con exito" });
    }

    throw new Error("La subida de la imagen ha fallado, intenta nuevamente");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateInputStockById = async (req, res) => {
  try {
    const input_id = req.params.input_id;
    const stock = req.body.stock;

    const updatedRows = await inputModel.updateInputStockById(input_id, stock);

    if (updatedRows == 0) {
      res.status(404).json({ message: "Error al actualizar el insumo" });
    }

    return res.status(200).json({ message: "Insumo actualizado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const updateInput = async (req, res) => {
  try {
    const input_id = req.params.input_id;
    const inputSchema = req.body;

    const updatedInput = await inputModel.updateInput(input_id, inputSchema);

    if (!updatedInput) {
      res.status(404).send({ message: "Error al actualizar el insumo" });
    }

    res.status(200).send({ message: "Insumo actualizado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteInput = async (req, res) => {
  try {
    const input_id = req.params.input_id;

    const deletedInput = await inputModel.deleteInput(input_id);

    if (deletedInput == 0) {
      return res.status(404).send({ message: "Error al eliminar el insumo" });
    }

    return res.status(200).send({ message: "Insumo eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const insertInputImage = async (req, res) => {
  try {
    const input_id = req.params.input_id;

    if (req.images_urls) {
      for (const image of req.images_urls) {
        await inputModel.insertInputImage(uuidv4(), input_id, image);
      }
      return res.status(200).json({ message: "Imagenes subidas con exito" });
    }

    throw new Error("La subida de la imagen ha fallado, intenta nuevamente");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getInputById = async (req, res) => {
  try {
    const input_id = req.params.input_id;

    const input = await inputModel.getInputById(input_id);

    if (!input) {
      return res
        .status(404)
        .send({ message: "Error al obtener el insumo por id" });
    }

    return res.status(200).send(input);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getInputByCreatorId = async (req, res) => {
  try {
    const creatorUserId = req.user_id;

    const inputCreator = await inputModel.getInputByCreatorId(creatorUserId);

    if (!inputCreator) {
      return res
        .status(404)
        .send({ message: "Error al obtener el insumo del creador" });
    }

    return res.status(200).send({
      message: `Insumo obtenido correctamente del creador con id: ${creatorUserId}`,
      inputCreator,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getInputCategories = async (req, res) => {
  try {
    const cached = cache.get(key_categories);
    if (cached) {
      res.status(200).json(cached);
      return;
    }
    const categories = await inputModel.getInputCategories();

    if (!categories) {
      return res
        .status(404)
        .send({ message: "Error al obtener las categorias" });
    }

    cache.set(key_categories, categories)
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllInputs = async (req, res) => {
  try {
    const cached = cache.get(key_inputs + req.params.category);
    if (cached) {
      res.status(200).json(cached);
      return;
    }
    const getAllInputs = await inputModel.getAllInputsByCategory(
      req.params.category
    );

    if (!getAllInputs) {
      return res.status(404).send({ message: "Error al obtener los insumos" });
    }

    cache.set(key_inputs + req.params.category, getAllInputs);
    return res.status(200).send(getAllInputs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
    try {
        const category = await inputModel.createCategory(req.body.titulo, "https://icono.com");

        if(category > 0){
            return res.status(200).send({message: `Categoria creada exitosamente`, id: req.body.titulo});
        }

        throw new Error("Error al intentar crear la categoria.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.id;

    const deletedRows = await inputModel.deleteCategory(category_id);

    if (deletedRows == 0) {
      return res.status(404).send({ message: "Error al eliminar la categoria" });
    }

    return res.status(200).send({ message: "Categoria eliminada correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setCategoryImage = async (req, res) => {
    try {
        const updatedRow = await inputModel.setCategoryImage(req.params.id, req.image_url);

        if(updatedRow > 0){
            return res.status(200).send({message: `Categoria actualizada exitosamente`});
        }

        throw new Error("Error al intentar actualizar la categoria.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


