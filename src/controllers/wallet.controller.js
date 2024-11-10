import * as walletModel from "../models/wallet.model.js";
import * as deliveryModel from "../models/delivery.model.js";
import * as orderModel from "../models/order.model.js";
import * as profileChecker from "../libs/checker.js";
import * as paymentCore from "../payments/index.js";
import * as authModel from "../models/auth.model.js";
import { formatTransactionMail } from '../email/transaction.js';
import { sendMail } from "../libs/emailer.js";
import { v4 as uuidv4 } from "uuid";

export const createWallet = async (req, res) => {
  try {
    const table_id = uuidv4();
    const user_id = req.user_id;

    const createWallet = await walletModel.createWallet(table_id, user_id);

    if (!createWallet) {
      res.status(404).send({ error: "Hubo un error al crear la billetera" });
    }

    res.status(200).send({ message: "Billetera creada exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const rechargeWallet = async (req, res) => {
  try {
    const table_id = uuidv4();
    const user_id = req.user_id;
    const rechargeSchema = req.body;

    const { wallet } = await walletModel.getWalletByUser(user_id);

    const idWallet = wallet?.id;

    if (!idWallet) {
      return res
        .status(404)
        .send({ message: `La billetera con id: ${idWallet} no existe` });
    }

    const balanceNow = wallet?.saldo;

    const rechargeAmount = rechargeSchema.monto_recarga;

    if (req.body.metodo_pago == "TC/TD") {
      const creditCardCharge = await paymentCore.chargeCard(
        rechargeAmount,
        "Recarga de saldo AGROEC",
        req.body.identificador,
        String(req.body.documento),
        "RECARGA-" + Math.floor(Math.random() * 99999)
      );
      if (creditCardCharge) {
        const rechargeMoreBalance = balanceNow + rechargeAmount;

        const rechargeResult = await walletModel.rechargeWallet(
          table_id,
          idWallet,
          rechargeSchema,
          rechargeAmount
        );

        if (!rechargeResult) {
          return res
            .status(404)
            .send({ message: "Hubo un error al recargar la billetera" });
        }

        const user = await authModel.getAccountById(req.user_id);
        await sendMail(
          "Agroec - Recarga exitosa ✔",
          formatTransactionMail({operacion: "Recarga de $" + rechargeAmount + " saldo en billetera"}), user.correo);

        await walletModel.updateBalance(idWallet, rechargeMoreBalance);
      }
    }

    return res
      .status(200)
      .send({ message: "Billetera recargada exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createFee = async (req, res) => {
  try {
    const table_id = uuidv4();
    const user_id = req.user_id;
    const id_delivery = req.params.id_entrega;
    const feeSchema = req.body;

    const { wallet } = await walletModel.getWalletByUser(user_id);

    const idWallet = wallet?.id;

    if (!idWallet) {
      return res
        .status(404)
        .send({ error: `La billetera con id: ${idWallet} no existe` });
    }

    const balanceNow = wallet?.saldo;

    const feeBalance = feeSchema.monto_fee;

    if (balanceNow < feeBalance) {
      return res
        .status(404)
        .send({ error: "El saldo debe ser mayor al monto para cobrar" });
    }

    const balanceLessFee = balanceNow - feeBalance;

    const createFee = await walletModel.createFee(
      table_id,
      id_delivery,
      idWallet,
      feeSchema
    );

    if (!createFee) {
      return res.status(404).send({ error: "Error al procesar el cobro" });
    }
    
    const order = await deliveryModel.getDeliveryById(id_delivery);
    if(await profileChecker.isBuyerProfile(req.user_id) && order){
      if(!await orderModel.checkRejectedStatus(order.id)){
        await orderModel.createAcceptedStatus(uuidv4(), order.id);
        await orderModel.updateOrderStatus(order.id, 'Aceptado');
      }
    }

    const emailedUser = await authModel.getAccountById(req.user_id);
    await sendMail(
      "Agroec - Pagaste una fee de manera exitosa ✔",
      formatTransactionMail({operacion: "Pagaste la fee de $" + feeBalance + " con saldo de la billetera"}), emailedUser.correo);

    await walletModel.updateBalance(idWallet, balanceLessFee);

    return res.status(200).send({ message: "Cobro realizado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getWalletByUser = async (req, res) => {
  const user_id = req.user_id;

  const allWallet = await walletModel.getWalletByUser(user_id);

  if (!allWallet) {
    res
      .status(404)
      .send({ message: "Error al obtener la billetera del usuario" });
  }

  return res.status(200).send(allWallet);
};

export const getCardsByUser = async (req, res) => {
  try {
    const user = await authModel.getAccountById(req.user_id);

    const { data } = await paymentCore.getTokenizatedCards(
      user.numero_identificacion
    );

    if (data.length == 0) {
      throw new Error("No tienes tarjetas disponibles");
    }

    const personInfo = {
      expire_month: data[0].expiry_month,
      expire_year: data[0].expiry_year,
      name: data[0].name,
    };

    const cardsInfo = Array(...data[0].cards).map((card) => {
      return {
        card_brand: card.card_brand,
        identifier: card.token,
        number: card.number,
      };
    });

    return res.status(200).json({
      personInfo,
      cardsInfo,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createCardTokenization = async (req, res) => {
  try {
    const document = String(req.body.documento);
    const name = req.body.nombre;
    const email = req.body.email;
    const phone = String(req.body.telefono);
    const address = req.body.direccion;

    const tokenization = await paymentCore.tokenizateCard(
      document,
      name,
      email,
      phone,
      address
    );

    return res.status(200).json({ url: tokenization.data.url });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const chargeCard = async (req, res) => {
  try {
    const document = 2343358400;

    const tokenization = await paymentCore.chargeCard(
      5,
      "Cobro de subscripción recurrente",
      "",
      document,
      "AGROEC0001823"
    );

    return res.status(200).json(tokenization);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const identifier = req.params.id;

    const deleted = await paymentCore.deleteCard(identifier);

    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
