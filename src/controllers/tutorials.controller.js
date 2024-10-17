import { v4 as uuidv4 } from "uuid";
import * as tutorialModel from "../models/tutorials.model.js";
import * as notificationService from "../services/notification.service.js";

export const getAllCategories = async (req, res) => {
    try {

        const categories = await tutorialModel.getAllCategories();

        if(!categories){
            res.status(404).send({message: `No hay categorias para mostrar`});
        }

        res.status(200).send(categories)

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getTutorialsByCategories = async (req, res) => {
    try {

        const {category} = req.params;

        const tutorial = await tutorialModel.getTutorialsByCategories(category);

        if(!tutorial){
            res.status(404).send({message: `Tutorial con ${category} no encontrado`});
        }

        res.status(200).send(tutorial)

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const createTutorial = async (req, res) => {
    try {
        const uuid = uuidv4();
        const {category} = req.params;

        const tutorial = await tutorialModel.createTutorial(uuid, category, req.body);

        if(tutorial > 0){
            const url = "http://localhost:5173/app/tutorials/" + category
            await notificationService.sendPushNotificationToAll("Nuevo tutorial", req.body.titulo, url);
            return res.status(200).send({message: `Tutorial creado exitosamente`});
        }

        throw new Error("Error al intentar crear el tutorial.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
