import * as inputModel from "../models/input.model.js";
import { v4 as uuidv4 } from "uuid";
import * as profileChecker from '../libs/checker.js';

export const createInput = async (req, res) => {
  try {
    const uuid_user = req.user_id;
    const uuid_table = uuidv4();
    const inputSchema = req.body;

    // Prueba de como funciona el checker por tipo de perfil 
    // ( Se envia UUID de usuario y devuelve true/false si tiene ese tipo de perfil)
    if(!await profileChecker.isMerchantAgrochemical(uuid_user)){
        throw new Error("Perfil de tipo invalido, necesitas ser Comerciante de Agroquimicos");
    }

    const createInput = await inputModel.createInput(
      uuid_table,
      uuid_user,
      inputSchema
    );
    if (!createInput) {
      res.status(404).send({ message: "Error al crear el insumo" });
    }

    res.status(200).send({ message: "Insumo creado correctamente" });
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

    if (!deletedInput) {
      return res.status(404).send({ message: "Error al eliminar el insumo" });
    }

    res.status(200).send({ message: "Insumo eliminado correctamente" });
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
  
    res.status(200).send({ message: 'Insumo obtenido correctamente:', input });
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

export const getAllInputs = async (req, res) => {
  try{

    const getAllInputs = await inputModel.getAllInputs();
  
    if (!getAllInputs) {
      return res.status(404).send({ message: 'Error al obtener los insumos' });
    }
  
   return res.status(200).send({ message: 'Insumos obtenidos correctamente', getAllInputs });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};



