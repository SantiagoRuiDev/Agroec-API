import * as inputModel from "../models/input.model.js";
import { v4 as uuidv4 } from "uuid";
import { inputSchema } from "../schemas/input.schema.js";

export const createInput = async (req, res) => {

    try{

        const uuid_user = req.user_id;
        const uuid_table  = uuidv4();
        const inputSchema = req.body;

        const createInput = await inputModel.createInput(uuid_table, uuid_user, inputSchema);
        if(!createInput){
            res.status(404).send({message: 'Error al crear el insumo'});
        }

        res.status(200).send({message: 'Insumo creado correctamente'});

    }catch(error){
        return res.status(400).json({ error: error.message });
    }

}

export const updateInput = async (req, res) => {

    try {
        const input_id = req.params.input_id;
        const inputSchema = req.body;

        const updatedInput = await inputModel.updateInput(input_id, inputSchema);

        if(!updatedInput){
            res.status(404).send({message: 'Error al actualizar el insumo'});
        }

        res.status(200).send({message: 'Insumo actualizado correctamente'});
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }  
}

export const deleteInput = async (req, res) => {
    try {
        const input_id = req.params.input_id;

        const deletedInput = await inputModel.deleteInput(input_id);

        if (!deletedInput) {
            return res.status(404).send({ message: 'Error al eliminar el insumo' });
        }

        res.status(200).send({ message: 'Insumo eliminado correctamente' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
