import * as warrantyModel from "../models/warranty.model.js";
import * as profileChecker from "../libs/checker.js";
import { v4 as uuidv4 } from "uuid";

export const getWarrantyByUser= async (req, res) => {
    try {

        const user_id = req.user_id;

        if (!(await profileChecker.isBuyerProfile(user_id))) {
            throw new Error(
              "Perfil de tipo invalido, necesitas ser comprador"
            );
          }

        const getWarrantyByUser = await warrantyModel.getWarrantyByUser(user_id);

        if(!getWarrantyByUser){
            res.status(404).send({message: 'No se pudo obtener la garantia del usuario'});
        }

            res.status(200).send({getWarrantyByUser});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const createWarranty = async (req, res) => {
    try {

      const user_id = req.user_id;
      const idCondition = req.params.id_condition;
      const uuid = uuidv4();
      const method_payment = req.body.metodo_pago;
  
      if (!(await profileChecker.isBuyerProfile(user_id))) {
        throw new Error("Perfil de tipo inválido, necesitas ser comprador");
      }
  
      const warrantyExists = await warrantyModel.checkWarrantyExists(idCondition);
      if (warrantyExists) {
        res.status(400).send({message: 'Ya existe un pago para esta garantia'});
        return;
      }

      const paymentCondition = await warrantyModel.getPaymentCondition(idCondition);

      if(!paymentCondition){
        res.status(404).send({message: 'La condicion de pago no existe o el modo de pago es invalido'})
        return;
      }

      const price = paymentCondition.precio;
      const quantity = paymentCondition.cantidad;
      const percentage = paymentCondition.porcentaje_inicial;

      const total =  (price * quantity) * (percentage/100);
  
      const createWarranty = await warrantyModel.createWarranty(uuid, idCondition,method_payment, percentage, total );
  
      if (!createWarranty) {
        res.status(404).send({message: 'Hubo un error al pagar la garantia'});
        return;
      }

      if(createWarranty > 0){
        res.status(200).send({ message: 'Garantia pagada exitosamente'});
      }
      
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  