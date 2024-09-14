import * as licitationModel from "../models/licitations.model.js";
import * as qualityParamsModel from "../models/qualityParams.model.js";
import { v4 as uuidv4 } from "uuid";

export const createLicitation = async (req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = req.user_id;
        const licitation_id = uuidv4();

        const insertLicitation = await licitationModel.createLicitation(licitation_id, product_id, user_id, req.body.licitation);

        if(insertLicitation > 0){
            if(req.body.quality_params){
                for(const param of req.body.quality_params){
                    const newParamRowId = uuidv4();
                    await qualityParamsModel.createQualityParam(newParamRowId, user_id, param);
                    await qualityParamsModel.createQualityParamForLicitation(newParamRowId, licitation_id);
                }
            }

            return res.status(200).send({message: `Licitacion creada con exito`});
        }

        throw new Error("La creacion de la licitacion ha fallado, intenta nuevamente")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const getLicitationsByUser = async (req, res) => {
    try {
        const userLicitations = await licitationModel.getLicitationsByUser(req.user_id);

        if(userLicitations) {
            return res.status(200).json(userLicitations);
        }

        throw new Error("La obtención de las licitaciones ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getLicitationsByUserAndProduct = async (req, res) => {
    try {
        const userLicitations = await licitationModel.getLicitationsByUserAndProduct(req.user_id, req.params.id);

        if(userLicitations) {
            return res.status(200).json(userLicitations);
        }

        throw new Error("La obtención de las licitaciones ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getAllLicitations = async (req, res) => {
    try {
        const licitations = await licitationModel.getAllLicitations();

        if(licitations) {
            return res.status(200).json(licitations);
        }

        throw new Error("La obtención de las licitaciones ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const getAllLicitationsByProduct = async (req, res) => {
    try {
        const licitations = await licitationModel.getAllLicitationsByProduct(req.params.id);

        if(licitations) {
            return res.status(200).json(licitations);
        }

        throw new Error("La obtención de las licitaciones ha fallado")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const deleteLicitation = async (req, res) => {
    try {
        const deletedRow = await licitationModel.deleteLicitation(req.user_id, req.params.id);

        if(deletedRow > 0) {

            return res.status(200).json({message: "Licitación eliminada correctamente"});
        }

        throw new Error("La eliminación de la licitacion ha fallado, intenta nuevamente")
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}