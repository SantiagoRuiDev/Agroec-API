import * as productModel from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
    try {

        const products = await productModel.getAllProducts();

        if(!products){
            res.status(404).send({message: `No hay productos para mostrar`});
        }

        res.status(200).send(products)

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
