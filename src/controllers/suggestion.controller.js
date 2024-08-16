import * as suggestionModel from "../models/suggestion.model.js";
import { v4 as uuidv4 } from "uuid";

export const createSuggestion = async (req, res) => {
    try {

        const { producto, cantidad } = req.body;
        const uuid = uuidv4();
        const suggestion = await suggestionModel.createSuggestion(uuid, producto, cantidad);

        if(!suggestion){
            res.status(404).send({message: `No se pudo crear la sugerencia del producto`});
        }

        return res.status(200).json({message: `Sugerencia de producto agregada correctamente`});


    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}