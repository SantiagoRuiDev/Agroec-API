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
import { v4 as uuidv4 } from "uuid";
import * as pointsModel from "../models/points.model.js";
//importar esquemas

export const updateProfile = async (req, res) => {
  try {
    const bodyProfile = req.body.profile;
    const idUser = req.user_id;

    const buyerUpdated = await profileModel.updateBuyerProfile(
      idUser,
      bodyProfile
    );

    if (req.body.points != null || req.body.points != undefined) {
      for (const point of req.body.points) {
        if(point.id == ""){
          await pointsModel.createPoint(uuidv4(), idUser, point);
        }
      }
    }
    if (req.body.contact != null || req.body.contact != undefined) {
      for (const contact of req.body.contact) {
        if(contact.id == ""){
          await contactModel.createContact(uuidv4(), idUser, contact);
        }
      }
    }

    if (buyerUpdated) {
      await conditionModel.updateConditionReceptionRules(req.body.profile.politicas_recepcion, idUser);
      return res
        .status(200)
        .send({ message: "Datos del perfil comprador actualizados" });
    }
  } catch (error) {
    console.log(error);
  }
};

// GET PROFILE

export const getBuyerProfile = async (req, res) => {
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
    }

    throw new Error("Perfil no encontrado");
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

    throw new Error("Perfil no encontrado");
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

export const deleteProfilePoint = async (req, res) => {
  try {
    if (profileChecker.isBuyerProfile(req.user_id)) {
      const deleteRow = await pointsModel.deletePoint(req.user_id, req.params.id);

      if(deleteRow > 0){
        return res.status(200).json({message: "Punto eliminado correctamente"});
      } else {
        return res.status(500).json({message: "Error al intentar eliminar el punto"});
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
      const deleteRow = await contactModel.deleteContact(req.params.id, req.user_id);

      if(deleteRow > 0){
        return res.status(200).json({message: "Contacto eliminado correctamente"});
      } else {
        return res.status(500).json({message: "Error al intentar eliminar el contacto"});
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
