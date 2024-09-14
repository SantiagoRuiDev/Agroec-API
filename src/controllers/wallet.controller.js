import * as walletModel from "../models/wallet.model.js";
import { v4 as uuidv4 } from "uuid";

export const createWallet = async (req, res) => {
    try {
        const table_id = uuidv4();
        const user_id = req.user_id;

        const createWallet = await walletModel.createWallet(table_id, user_id);

        if(!createWallet){
            res.status(404).send({message: 'Hubo un error al crear la billetera'});
        }

            res.status(200).send({message: 'Billetera creada exitosamente'});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const rechargeWallet = async (req, res) => {
    try {
        const table_id = uuidv4();
        const user_id = req.user_id;
        const rechargeSchema = req.body.recharge;

        const {wallet} = await walletModel.getWalletByUser(user_id);

        const idWallet = wallet?.id;
        console.log(wallet)

        if (!idWallet) {
            return res.status(404).send({ message: `La billetera con id: ${idWallet} no existe` });
        }
        
        const balanceNow = (wallet?.saldo); 

        const rechargeAmount = (rechargeSchema.monto_recarga);

        const rechargeMoreBalance = balanceNow + rechargeAmount;
     
        const rechargeResult = await walletModel.rechargeWallet(table_id, idWallet, rechargeSchema, rechargeAmount);
    

        if (!rechargeResult) {
            return res.status(404).send({ message: 'Hubo un error al recargar la billetera' });
        }

        await walletModel.updateBalance(idWallet, rechargeMoreBalance);

        res.status(200).send({ message: 'Billetera recargada exitosamente' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const createFee = async (req, res) => {
    try {
        const table_id = uuidv4();
        const user_id = req.user_id;
        const id_delivery = req.params.id_entrega;
        const feeSchema = req.body.fee;

        const {wallet} = await walletModel.getWalletByUser(user_id);

        const idWallet = wallet?.id;

        if (!idWallet) {
            return res.status(404).send({ message: `La billetera con id: ${idWallet} no existe` });
        }
        
        const balanceNow = (wallet?.saldo); 

        const feeBalance = (feeSchema.monto_fee);

        if(balanceNow < feeBalance){
            return res.status(404).send({ message: 'El saldo debe ser mayor al monto para cobrar' });
        }
        
        const balanceLessFee = balanceNow - feeBalance;
     
        const createFee = await walletModel.createFee(table_id, id_delivery, idWallet, feeSchema);
    
        if (!createFee) {
            return res.status(404).send({ message: 'Error al procesar el cobro' });
        }

        await walletModel.updateBalance(idWallet, balanceLessFee);

        res.status(200).send({ message: 'Cobro realizado exitosamente' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getWalletByUser = async (req, res) => {

    const user_id = req.user_id;

    const allWallet = await walletModel.getWalletByUser(user_id);

    if(!allWallet){
        res.status(404).send({message: 'Error al obtener la billetera del usuario'})
    }

    res.status(200).send(allWallet)

}   