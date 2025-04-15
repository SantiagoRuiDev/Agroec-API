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
        
        if(req.user_id == "Sistema"){
           const tutorial = await tutorialModel.getTutorialsByCategoriesRaw(category);
           if(!tutorial){
               res.status(404).send({message: `Tutorial con ${category} no encontrado`});
           }
           res.status(200).send(tutorial)
        } else {
           const tutorial = await tutorialModel.getTutorialsByCategories(category, 1);
           if(!tutorial){
               res.status(404).send({message: `Tutorial con ${category} no encontrado`});
           }
   
           res.status(200).send(tutorial)
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const sendTutorialPushNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const tutorialExist = await tutorialModel.getTutorialById(id);

        if(tutorialExist){
            const url = "https://web.agroec.com/app/tutorials/" + category
            await notificationService.sendPushNotificationToAll("Revisa nuestro tutorial", tutorialExist.titulo, url);
            return res.status(200).send({message: `Notification enviada exitosamente`});
        }

        throw new Error("Error al intentar enviar la notificacion del tutorial.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const setVisibility = async (req, res) => {
    try {
        const {id} = req.params;
        const {visibility} = req.body;

        if(visibility != 0 && visibility != 1){
            throw new Error("Ingresa un valor valido para la visibilidad (0,1)")
        }

        const modifiedRows = await tutorialModel.setVisibility(id, visibility);

        if(modifiedRows > 0){
            return res.status(200).send({message: `Tutorial actualizado exitosamente`});
        }

        throw new Error("Error al intentar actualizar el tutorial.")

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
            const url = "https://web.agroec.com/app/tutorials/" + category
            await notificationService.sendPushNotificationToAll("Nuevo tutorial", req.body.titulo, url);
            return res.status(200).send({message: `Tutorial creado exitosamente`});
        }

        throw new Error("Error al intentar crear el tutorial.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const deleteTutorial = async (req, res) => {
    try {
        const uuid = req.params.id;

        const deletedRow = await tutorialModel.deleteTutorial(uuid);

        if(deletedRow > 0){
            return res.status(200).send({message: `Tutorial eliminado exitosamente`});
        }

        throw new Error("Error al intentar eliminar el tutorial.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const createCategory = async (req, res) => {
    try {
        const uuid = uuidv4();

        const category = await tutorialModel.createCategory(uuid, req.body.titulo);

        if(category > 0){
            return res.status(200).send({message: `Categoria creada exitosamente`, id: uuid});
        }

        throw new Error("Error al intentar crear la categoria.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}



export const setCategoryImage = async (req, res) => {
    try {
        const updatedRow = await tutorialModel.setCategoryImage(req.params.id, req.image_url);

        if(updatedRow > 0){
            return res.status(200).send({message: `Categoria actualizada exitosamente`});
        }

        throw new Error("Error al intentar actualizar la categoria.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const deleteCategory = async (req, res) => {
    try {
        await tutorialModel.deleteTutorialByCategory(req.params.id);
        const deletedRows = await tutorialModel.deleteCategoryById(req.params.id);

        if(deletedRows > 0){
            return res.status(200).send({message: `Categoria eliminada exitosamente`});
        }

        throw new Error("Error al intentar eliminar la categoria.")

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

