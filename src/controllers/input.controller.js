import * as inputModel from "../models/input.model.js";
import { v4 as uuidv4 } from "uuid";
import * as profileChecker from "../libs/checker.js";

export const createInput = async (req, res) => {
  try {
    const uuid_user = req.user_id;
    const uuid_table = uuidv4();
    const inputSchema = req.body;

    if(!await profileChecker.isMerchantAgrochemical(uuid_user)){
      throw new Error("Solo perfiles de comerciante agroquímicos tienen permitido publicar insumos")
    }

    const createInput = await inputModel.createInput(
      uuid_table,
      uuid_user,
      inputSchema
    );
    if (!createInput) {
      res.status(404).send({ message: "Error al crear el insumo" });
    }

    res.status(200).send({ message: "Insumo creado correctamente", uuid: uuid_table });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
      const input_id = req.params.input_id

      const input = await inputModel.getInputById(input_id);

      if(input.images.length == 1){
          throw new Error("Debes tener al menos dos imagenes para eliminar una");
      }

      const deletedRow = await inputModel.deleteImage(req.params.id, input_id);

      if(deletedRow > 0) {
          return res.status(200).json({message: "Imagen eliminada correctamente"});
      }

      throw new Error("La eliminación de la imagen ha fallado, intenta nuevamente")
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
}

export const insertImageInput = async (req, res) => {
  try {
      const input_id = req.params.input_id;

      if(req.images_urls){
          for(const image of req.images_urls){
              await inputModel.insertImage(uuidv4(), input_id, image);
          }
          return res.status(200).json({message: "Imagenes subidas con exito"});
      }

      throw new Error("La subida de la imagen ha fallado, intenta nuevamente")
  } catch (error) {
      return res.status(400).json({ error: error.message });
  }
}

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
  try{
    const input_id = req.params.input_id;

    const input = await inputModel.getInputById(input_id);
  
    if (!input) {
      return res.status(404).send({ message: 'Error al obtener el insumo por id' });
    }
  
    return res.status(200).send(input);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};

export const getInputByCreatorId = async (req, res) => {
  try{

    const creatorUserId = req.user_id;

    const inputCreator = await inputModel.getInputByCreatorId(creatorUserId);
  
    if (!inputCreator) {
      return res.status(404).send({ message: 'Error al obtener el insumo del creador' });
    }
  
   return res.status(200).send({ message: `Insumo obtenido correctamente del creador con id: ${creatorUserId}`, inputCreator });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};

export const getInputCategories = async (req, res) => {
  try{
    const categories = await inputModel.getInputCategories();
  
    if (!categories) {
      return res.status(404).send({ message: 'Error al obtener las categorias' });
    }
  
   return res.status(200).send(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};

export const getAllInputs = async (req, res) => {
  try{

    const getAllInputs = await inputModel.getAllInputsByCategory(req.params.category);
  
    if (!getAllInputs) {
      return res.status(404).send({ message: 'Error al obtener los insumos' });
    }
  
   return res.status(200).send(getAllInputs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};



