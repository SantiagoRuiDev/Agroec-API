import { v4 as uuidv4 } from "uuid";
import * as userModel from "../models/user.model.js";
import * as suscriptionModel from "../models/suscription.model.js";

export const getAll = async (req, res) => {
    try {
        const users = await userModel.getAll();

        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export const updateById = async (req, res) => {
    try {
        const modifiedRows = await userModel.updateById(req.params.id, req.body);
        if(modifiedRows){
            return res.status(200).json({message: "Usuario actualizado correctamente"})
        } else {
            return res.status(404).json({message: "Usuario no encontrado"})
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export const getById = async (req, res) => {
    try {
        const data = await userModel.getById(req.params.id);
        const suscription = await suscriptionModel.getSuscriptionByUser(req.params.id);
        if(data){
            return res.status(200).json({data, suscription})
        } else {
            return res.status(404).json({message: "Usuario no encontrado"})
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export const setStateByUserId = async (req, res) => {
    try {
        if(!req.body.state){
            throw new Error("Porfavor ingresa un estado valido (0, 1, 2)");
        }
        const modifiedRows = await userModel.setStateByUserId(req.params.id, req.body.state);
        if(modifiedRows > 0){
            return res.status(200).json({message: "Estado actualizado correctamente"})
        } else {
            return res.status(404).json({message: "Usuario no encontrado o error al intentar actualizar el estado"})
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const setInputPermissionByUserId = async (req, res) => {
    try {
        if(req.body.permission == undefined || req.body.permission == null){
            throw new Error("Porfavor ingresa un permiso valido (0, 1)");
        }
        const modifiedRows = await userModel.setInputPermissionByUserId(req.params.id, req.body.permission);
        if(modifiedRows > 0){
            return res.status(200).json({message: "Permiso actualizado correctamente"})
        } else {
            return res.status(404).json({message: "Usuario no encontrado o error al intentar actualizar el permiso"})
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

