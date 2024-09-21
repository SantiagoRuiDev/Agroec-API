import * as advertisingModel from "../models/advertising.model.js";
import { v4 as uuidv4 } from "uuid";

export const createAdvertising = async (req, res) => {
    try {
        const uuid_ads = uuidv4();
        const schemaAds = req.body;

        const createAdvertising = await advertisingModel.createAdvertising(uuid_ads, schemaAds);

        if(!createAdvertising){
            res.status(404).send({message: 'No se pudo crear la publicacion'});
            }

            return res.status(200).send({message: 'Publicacion creada correctamente'});
            
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }

    export const updateImageById = async (req,res) => {
        try {

            const image = req.image_url;
            const uuidImage = req.params.id;

        
            const updateImageById = await advertisingModel.updateImageById(image, uuidImage);
    
            if(!updateImageById){
                res.status(404).send({message: 'No se actualizar la imagen'});
                }
    
                return res.status(200).send({message: 'Imagen actualizada correctamente'});
                
            }catch(error){
                return res.status(400).json({ error: error.message });
            }
        }

    export const getAllAdvertising = async (req,res) => {
        try {
        
            const getAllAdvertising = await advertisingModel.getAllAdvertisings();
    
            if(!getAllAdvertising){
                res.status(404).send({message: 'No se pudieron obtener las publicaciones'});
                }
    
                return res.status(200).send({getAllAdvertising});
                
            }catch(error){
                return res.status(400).json({ error: error.message });
            }
        }
       
