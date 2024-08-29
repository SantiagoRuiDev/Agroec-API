import * as qualificactionModel from "../models/qualification.models.js";
import * as authModel from "../models/auth.model.js";

import { v4 as uuidv4 } from "uuid";

export const createQualification = async (req, res) => {

    try {
        
        const uuidTable = uuidv4();
        const idCalificante = req.user_id; 
        const idCalificado = req.params.id;
        const qualificationSchema = req.body;

        if (qualificationSchema.puntaje > 5) {
            return res.status(400).json({ message: 'El puntaje no puede ser mayor a 5' });
        }
       
        const createQualification = await qualificactionModel.createQualification(uuidTable, idCalificante, idCalificado, qualificationSchema)

        if(!createQualification){
            res.status(404).send({message: 'Error al crear la calificacion'})
        }

       return res.status(200).send({message: 'Calificacion creada correctamente'})

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getQualificationUserSession = async (req, res) => {
    try {
        const idCalificante = req.user_id;

        const qualifications = await qualificactionModel.getQualificationUserSession(idCalificante);

        if (!qualifications) {
            return res.status(404).send({ message: 'No se pudieron obtener los datos del usuario' });
        }

        return res.status(200).send({ message: 'Calificación del usuario:', qualifications });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getQualificationByUserId = async (req, res) => {
    try {
  
        const idCalificante = req.params.id;

        const qualifications = await qualificactionModel.getQualificationByUserId(idCalificante);

        if (!qualifications) {
            return res.status(404).send({ message: 'No se encontraron calificaciones para este usuario' });
        }

        return res.status(200).send({ message: 'Calificaciones del usuario:', qualifications });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



export const updateQualification = async (req, res) => {
    try {
        const idCalificante = req.user_id; 
        const idCalificado = req.params.id;
        const qualificationSchema = req.body;

        if (idCalificante === idCalificado) {
            return res.status(404).send({ message: 'No puedes actualizar tu propia calificación' });
        }

        if (qualificationSchema.puntaje > 5) {
            return res.status(400).json({ message: 'El puntaje no puede ser mayor a 5' });
        }

        const updateQualification = await qualificactionModel.updateQualification(idCalificado, qualificationSchema);

        if (!updateQualification) {
            return res.status(404).send({ message: 'Error al actualizar calificación' });
        }

        return res.status(200).send({ message: 'Calificación actualizada correctamente' });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
