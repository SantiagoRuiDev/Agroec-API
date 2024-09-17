import * as authModel from "../models/auth.model.js";
import * as profileChecker from "../libs/checker.js";
import * as profileModel from "../models/profile.model.js";
import * as orderModel from "../models/order.model.js";
import * as salesModel from "../models/sale.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as walletModel from "../models/wallet.model.js";
import * as licitationsModel from "../models/licitations.model.js";
//importar esquemas

export const updateProfile = async (req, res) => {
  try {
    const bodyProfile = req.body.profile;
    const idUser = req.user_id;
    const bankAccountProfile = req.body.bank_account;

    switch (req.body.profile.type) {
      case "Comprador":
        const buyerUpdated = await profileModel.updateBuyerProfile(
          idUser,
          bodyProfile
        );
        if (buyerUpdated) {
          res
            .status(200)
            .send({ message: "Datos del perfil comprador actualizados" });
        }

        break;
      case "Comerciante":
        if (bankAccountProfile) {
          const bankAccountUpdated =
            await profileModel.updatebankAccountMerchant(
              idUser,
              bankAccountProfile
            );
          if (bankAccountUpdated) {
            res.status(200).send({
              message:
                "Datos de la cuenta bancaria del perfil comprador actualizados",
            });
          } else {
            res.status(404).send({
              message:
                "No se pudo actualizar los datos de la cuenta bancaria del perfil comprador",
            });
          }
        }

        const merchantUpdated = await profileModel.updateMerchantProfile(
          idUser,
          bodyProfile
        );
        if (merchantUpdated) {
          res
            .status(200)
            .send({ message: "Datos del perfil comerciante actualizados" });
        }

        break;
      case "Agricultor":
        if (bankAccountProfile) {
          const bankAccountUpdated = await profileModel.updatebankAccountFarmer(
            idUser,
            bankAccountProfile
          );
          if (bankAccountUpdated) {
            res.status(200).send({
              message:
                "Datos de la cuenta bancaria del perfil agricultor actualizados",
            });
          } else {
            res.status(404).send({
              message:
                "No se pudo actualizar los datos de la cuenta bancaria del perfil agricultor",
            });
          }
        }

        const farmerUpdated = await profileModel.updateFarmerProfile(
          idUser,
          bodyProfile
        );
        if (farmerUpdated) {
          res
            .status(200)
            .send({ message: "Datos del perfil agricultor actualizados" });
        }

        break;
      case "Asociacion Agricola":
        if (bankAccountProfile) {
          const bankAccountUpdated =
            await profileModel.updatebankAccountAssociationAgricultural(
              idUser,
              bankAccountProfile
            );
          if (bankAccountUpdated) {
            res.status(200).send({
              message:
                "Datos de la cuenta bancaria del perfil asociacion agricola actualizados",
            });
          } else {
            res.status(404).send({
              message:
                "No se pudo actualizar los datos de la cuenta bancaria del perfil asociacion agricola",
            });
          }
        }

        const assocAgriculturalUpdated =
          await profileModel.updateAssociationAgriculturalProfile(
            idUser,
            bodyProfile
          );
        if (assocAgriculturalUpdated) {
          res.status(200).send({
            message: "Datos del perfil asociación agrícola actualizados",
          });
        }

        break;
      case "Comerciante Agroquimico":
        if (bankAccountProfile) {
          const bankAccountUpdated =
            await profileModel.updatebankAccountMerchantAgrochemical(
              idUser,
              bankAccountProfile
            );
          if (bankAccountUpdated) {
            res.status(200).send({
              message:
                "Datos de la cuenta bancaria del perfil comerciante agroquimicos actualizados",
            });
          } else {
            res.status(404).send({
              message:
                "No se pudo actualizar los datos de la cuenta bancaria del perfil comerciante agroquimicos",
            });
          }
        }

        const merchantAgrochemicalUpdated =
          await profileModel.updateMerchantAgrochemicalProfile(
            idUser,
            bodyProfile
          );
        if (merchantAgrochemicalUpdated) {
          res.status(200).send({
            message: "Datos del perfil comerciante agroquimico actualizados",
          });
        }

        break;
      default:
        throw new Error("Ingresa un tipo de Perfil Valido");
    }
  } catch (error) {
    console.log(error);
  }
};

// GET PROFILE

export const getProfile = async (req, res) => {
  try {
    const user_id = req.params.id;
    const findUser = await authModel.getAccountById(user_id);

    if (!findUser) {
      throw new Error("Usuario no encontrado");
    }

    let sellerProfile;
    let sellerSales;

    if (await profileChecker.isAssociationAgricultural(findUser.id)) {
      sellerProfile =
        await profileModel.getAssociationAgriculturalProfileByUser(findUser.id);
      sellerSales = 
        await salesModel.getSalesByUser(findUser.id);
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        type: "Asociación Agricola",
      });
    }
    if (await profileChecker.isFarmerProfile(findUser.id)) {
      sellerProfile = await profileModel.getFarmerProfileByUser(findUser.id);
      sellerSales = 
        await salesModel.getSalesByUser(findUser.id);
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        type: "Agricultor",
      });
    }
    if (await profileChecker.isMerchant(findUser.id)) {
      sellerProfile = await profileModel.getMerchantProfileByUser(findUser.id);
      sellerSales = 
        await salesModel.getSalesByUser(findUser.id);
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        type: "Comerciante",
      });
    }
    if (await profileChecker.isMerchantAgrochemical(findUser.id)) {
      sellerProfile = await profileModel.getMerchantAgrochemicalProfileByUser(
        findUser.id
      );
      sellerSales = 
        await salesModel.getSalesByUser(findUser.id);
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        type: "Comerciante Agroquimicos",
      });
    }

    throw new Error("Perfil no encontrado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const getProfileStats = async (req, res) => {
  try {
    const findUser = await authModel.getAccountById(req.user_id);

    if (!findUser) {
      throw new Error("Usuario no encontrado");
    }

    if(profileChecker.isBuyerProfile(req.user_id)){
      const profile = await profileModel.getBuyerProfileByUser(req.user_id);
      const receivedOrders = await orderModel.getOrdersByBuyerDelivered(req.user_id);
      const activeLicitations = await licitationsModel.getLicitationsByUser(req.user_id);
      const proposals = await proposalModel.getSaleProposalByLicitation(req.user_id);
      const buyProposals = await proposalModel.getLicitationProposalByUser(req.user_id);
      const walletAmount = await walletModel.getBalance(req.user_id);

      return res.status(200).json({
        profile: profile,
        orders: receivedOrders.length,
        licitations: activeLicitations.length,
        proposals: proposals.length,
        buyProposals: buyProposals.length,
        wallet: walletAmount
      });
    }

    throw new Error("Perfil no encontrado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getMerchantProfile = async (req, res) => {
  try {
    const idProfile = req.params.profile_id;
    const merchantProfile = await profileModel.getMerchantProfileById(
      idProfile
    );

    if (merchantProfile) {
      return res.status(200).json({
        message: "Datos del perfil comerciante:",
        perfil: merchantProfile,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Datos del perfil comerciante no encontrados" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getFarmerProfile = async (req, res) => {
  try {
    const idProfile = req.params.profile_id;
    const farmerProfile = await profileModel.getFarmerProfileById(idProfile);

    if (farmerProfile) {
      return res.status(200).json({
        message: "Datos del perfil agricultor:",
        perfil: farmerProfile,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Datos del perfil agricultor no encontrados" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAssociationAgriculturalProfile = async (req, res) => {
  try {
    const idProfile = req.params.profile_id;
    const associationAgriculturalProfile =
      await profileModel.getAssociationAgriculturalProfileById(idProfile);

    if (associationAgriculturalProfile) {
      return res.status(200).json({
        message: "Datos del perfil asociacion agricola:",
        perfil: associationAgriculturalProfile,
      });
    } else {
      return res.status(404).json({
        message: "Datos del perfil asociacion agricola no encontrados",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getMerchantAgrochemicalProfile = async (req, res) => {
  try {
    const idProfile = req.params.profile_id;
    const merchantAgrochemicalProfile =
      await profileModel.getMerchantAgrochemicalProfileById(idProfile);

    if (merchantAgrochemicalProfile) {
      return res.status(200).json({
        message: "Datos del perfil comerciante agroquimicos:",
        perfil: merchantAgrochemicalProfile,
      });
    } else {
      return res.status(404).json({
        message: "Datos del perfil comerciante agroquimicos no encontrados",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
