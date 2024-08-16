import * as tutorialModel from "../models/tutorials.model.js";

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