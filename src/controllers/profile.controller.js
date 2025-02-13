import * as authModel from "../models/auth.model.js";
import * as profileChecker from "../libs/checker.js";
import * as profileModel from "../models/profile.model.js";
import * as orderModel from "../models/order.model.js";
import * as salesModel from "../models/sale.model.js";
import * as conditionModel from "../models/condition.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as walletModel from "../models/wallet.model.js";
import * as notificationService from "../services/notification.service.js";
import * as qualificationModel from "../models/qualification.models.js";
import * as contactModel from "../models/contact.model.js";
import * as licitationsModel from "../models/licitations.model.js";
import * as bankAccountModel from "../models/bankaccount.model.js";
import { v4 as uuidv4 } from "uuid";
import * as pointsModel from "../models/points.model.js";
import { pointsSchema } from "../schemas/points.schema.js";
import { validateSchemas } from "../libs/schema.js";

export const updateProfile = async (req, res) => {
  try {
    const profile = req.body.profile;
    const bank_account = req.body.bank_account;
    const bank_account_uuid = req.body.bank_account_id;
    const points = req.body.points;
    const contacts = req.body.contact;
    const user_id = req.user_id;

    if (req.body.profile.type == "Comprador") {
      const rowsUpdated = await profileModel.updateBuyerProfile(
        user_id,
        profile
      );

      if (points != null || points != undefined) {
        for (const point of points) {
          if (point.id == "") {
            await pointsModel.createPoint(uuidv4(), user_id, point);
          }
        }
      }
      if (contacts != null || contacts != undefined) {
        for (const contact of contacts) {
          if (contact.id == "") {
            await contactModel.createContact(uuidv4(), user_id, contact);
          }
        }
      }

      if (rowsUpdated > 0) {
        await conditionModel.updateConditionReceptionRules(
          profile.politicas_recepcion,
          user_id
        );
        return res
          .status(200)
          .send({ message: "Datos del perfil comprador actualizados" });
      }
    } else {
      let rowsUpdated = 0;
      // ACTUALIZAR PARA VENDEDOR
      switch (req.body.profile.type) {
        case "Comerciante":
          rowsUpdated = await profileModel.updateMerchantProfile(
            user_id,
            profile
          );
          break;
        case "Agricultor":
          rowsUpdated = await profileModel.updateFarmerProfile(
            user_id,
            profile
          );
          break;
        case "Asociacion Agricola":
          rowsUpdated = await profileModel.updateAssociationAgriculturalProfile(
            user_id,
            profile
          );
          break;
        case "Comerciante Agroquimico":
          rowsUpdated = await profileModel.updateMerchantAgrochemicalProfile(
            user_id,
            profile
          );
          break;
        default:
          throw new Error("Ingresa un tipo de Perfil Valido");
      }

      if (rowsUpdated > 0) {
        await bankAccountModel.updateBankAccount(
          bank_account_uuid,
          bank_account
        );
        return res
          .status(200)
          .send({ message: "Datos del perfil vendedor actualizados" });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET PROFILE

export const getProfileByUser = async (req, res) => {
  try {
    const user_id = req.user_id;
    const findUser = await authModel.getAccountById(user_id);

    if (!findUser) {
      throw new Error("Usuario no encontrado");
    }

    if (await profileChecker.isBuyerProfile(user_id)) {
      const reception_points = await pointsModel.getPoints(req.user_id);
      const contacts = await contactModel.getContacts(req.user_id);
      return res.status(200).json({
        user: { ...findUser },
        profile: await profileModel.getBuyerProfileByUser(user_id),
        points: reception_points,
        contacts: contacts,
      });
    } else {
      let profile = await profileChecker.getType(user_id);
      let type = profile;
      switch (profile) {
        case "Comerciante":
          profile = await profileModel.getMerchantProfileByUser(user_id);
          break;
        case "Agricultor":
          profile = await profileModel.getFarmerProfileByUser(user_id);
          break;
        case "Asociación Agrícola":
          profile = await profileModel.getAssociationAgriculturalProfileByUser(
            user_id
          );
          break;
        case "Agroquimicos":
          profile = await profileModel.getMerchantAgrochemicalProfileByUser(
            user_id
          );
          break;
        default:
          throw new Error("No tienes un perfil de este tipo");
      }

      if (profile) {
        const bank_account = await bankAccountModel.getBankAccount(profile.id_cuenta_bancaria);
        return res.status(200).json({
          user: { ...findUser },
          profile: profile,
          type: type,
          bank_account: bank_account,
        });
      }
    }

    return res.status(404).json({ error: "Perfil no encontrado" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user_id = req.params.id;
    const findUser = await authModel.getAccountById(user_id);

    if (!findUser) {
      throw new Error("Usuario no encontrado");
    }

    let sellerProfile;
    let sellerSales;
    let sellerQualifications;

    if (await profileChecker.isAssociationAgricultural(findUser.id)) {
      sellerProfile =
        await profileModel.getAssociationAgriculturalProfileByUser(findUser.id);
      sellerSales = await salesModel.getSalesByUser(findUser.id);
      sellerQualifications = await qualificationModel.getQualificationByUserId(
        findUser.id
      );
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        qualifications: sellerQualifications,
        type: "Asociación Agricola",
      });
    }
    if (await profileChecker.isFarmerProfile(findUser.id)) {
      sellerProfile = await profileModel.getFarmerProfileByUser(findUser.id);
      sellerSales = await salesModel.getSalesByUser(findUser.id);
      sellerQualifications = await qualificationModel.getQualificationByUserId(
        findUser.id
      );
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        qualifications: sellerQualifications,
        type: "Agricultor",
      });
    }
    if (await profileChecker.isMerchant(findUser.id)) {
      sellerProfile = await profileModel.getMerchantProfileByUser(findUser.id);
      sellerSales = await salesModel.getSalesByUser(findUser.id);
      sellerQualifications = await qualificationModel.getQualificationByUserId(
        findUser.id
      );
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        qualifications: sellerQualifications,
        type: "Comerciante",
      });
    }
    if (await profileChecker.isMerchantAgrochemical(findUser.id)) {
      sellerProfile = await profileModel.getMerchantAgrochemicalProfileByUser(
        findUser.id
      );
      sellerSales = await salesModel.getSalesByUser(findUser.id);
      sellerQualifications = await qualificationModel.getQualificationByUserId(
        findUser.id
      );
      return res.status(200).json({
        ...sellerProfile,
        sales: sellerSales,
        qualifications: sellerQualifications,
        type: "Comerciante Agroquimicos",
      });
    }

    const buyerProfile = await profileModel.getBuyerProfileByUser(findUser.id);
    if (buyerProfile) {
      const licitations = await licitationsModel.getLicitationsByUser(
        findUser.id
      );
      const qualifications = await qualificationModel.getQualificationByUserId(
        findUser.id
      );
      return res.status(200).json({
        ...buyerProfile,
        licitations: licitations,
        qualifications: qualifications,
        type: "Comprador",
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

    if (await profileChecker.isBuyerProfile(req.user_id)) {
      const profile = await profileModel.getBuyerProfileByUser(req.user_id);
      const receivedOrders = await orderModel.getOrdersByBuyerDeliveredAndPaid(
        req.user_id
      );
      const activeLicitations = await licitationsModel.getLicitationsByUser(
        req.user_id
      );
      const proposals = await proposalModel.getSaleProposalByLicitation(
        req.user_id
      );
      const buyProposals = await proposalModel.getLicitationProposalByUser(
        req.user_id
      );
      const unpaidOrders = await orderModel.getUnpaidOrders(req.user_id);
      const walletAmount = await walletModel.getBalance(req.user_id);
      const qualifications =
        await qualificationModel.getQualificationUserSession(req.user_id);
      const notifications =
        await notificationService.getNotificationsUnreadedByUser(req.user_id);

      return res.status(200).json({
        profile: profile,
        orders: receivedOrders.length,
        licitations: activeLicitations.length,
        proposals: proposals.length,
        buyProposals: buyProposals,
        unpaidOrders: unpaidOrders.length,
        wallet: walletAmount,
        qualifications: qualifications,
        notifications: notifications.length,
      });
    } else {
      const sendProposals = await proposalModel.getSaleProposalByUser(
        req.user_id
      );
      const receivedProposals = await proposalModel.getLicitationProposalBySale(
        req.user_id
      );
      const undeliveredOrders = await orderModel.getOrdersBySellerUndelivered(
        req.user_id
      );
      const deliveredOrders =
        await orderModel.getOrdersBySellerDeliveredAndPaid(req.user_id);
      const qualifications =
        await qualificationModel.getQualificationUserSession(req.user_id);
      const notifications =
        await notificationService.getNotificationsUnreadedByUser(req.user_id);

      return res.status(200).json({
        profile: req.user_id,
        sendProposals: sendProposals,
        receivedProposals: receivedProposals,
        undeliveredOrders: undeliveredOrders.length,
        deliveredOrders: deliveredOrders.length,
        qualifications: qualifications,
        notifications: notifications.length,
      });
    }

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createReceptionPoint = async (req, res) => {
  try {
    validateSchemas(req.body, pointsSchema)
    if (profileChecker.isBuyerProfile(req.user_id)) {
      const uuid = uuidv4()
      const inserted_row = await pointsModel.createPoint(uuid, req.user_id, req.body);

      if(inserted_row > 0){
        return res.status(200).json({"message": "Punto de recepción añadido correctamente", "id": uuid});
      } else {
        throw new Error("No ha sido posible crear este punto de recepción");
      }
    }

    throw new Error("No ha sido posible crear un punto de recepción");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getProfilePoints = async (req, res) => {
  try {
    if (profileChecker.isBuyerProfile(req.user_id)) {
      const reception_points = await pointsModel.getPoints(req.user_id);

      return res.status(200).json(reception_points);
    }

    throw new Error("No ha sido posible cargar tus puntos de recepción");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const rows = await profileModel.getOrganizations();
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (nombre == undefined || nombre == null) {
      throw new Error("Porfavor completa el campo");
    }
    if (String(nombre).trim() == "") {
      throw new Error("Asegurate de escribir un nombre valido");
    }

    const affectedRows = await profileModel.createOrganization(
      uuidv4(),
      nombre
    );

    if (affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Organización añadida correctamente." });
    }

    throw new Error("No se ha podido crear la organización");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProfilePoint = async (req, res) => {
  try {
    if (profileChecker.isBuyerProfile(req.user_id)) {
      const deleteRow = await pointsModel.deletePoint(
        req.user_id,
        req.params.id
      );

      if (deleteRow > 0) {
        return res
          .status(200)
          .json({ message: "Punto eliminado correctamente" });
      } else {
        return res
          .status(500)
          .json({ message: "Error al intentar eliminar el punto" });
      }
    }

    throw new Error("No ha sido posible cargar tus puntos de recepción");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    if (profileChecker.isBuyerProfile(req.user_id)) {
      const deleteRow = await contactModel.deleteContact(
        req.params.id,
        req.user_id
      );

      if (deleteRow > 0) {
        return res
          .status(200)
          .json({ message: "Contacto eliminado correctamente" });
      } else {
        return res
          .status(500)
          .json({ message: "Error al intentar eliminar el contacto" });
      }
    }

    throw new Error("No ha sido posible cargar tus contactos");
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
