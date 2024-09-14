import * as conditionModel from "../models/condition.model.js";


export const getConditionsByChat = async (req, res) => {
    try {
        const conditions = await conditionModel.getConditionByChat(req.params.id);

        if(conditions) {
            return res.status(200).json(conditions);
        }

        throw new Error("La obtención de las condiciones ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}