import { v4 as uuidv4 } from "uuid";
import * as codesModel from "../models/codes.model.js";
import * as profileModel from "../models/profile.model.js";
import * as bankAccountModel from "../models/bankaccount.model.js";
import * as profileChecker from "../libs/checker.js";
import * as contactModel from "../models/contact.model.js";
import * as pointsModel from "../models/points.model.js";
import * as userModel from "../models/user.model.js";
import * as suscriptionModel from "../models/suscription.model.js";
import * as preferencesModel from "../models/preferences.model.js";
import * as warrantyModel from "../models/warranty.model.js";
import * as walletModel from "../models/wallet.model.js";

export const getAll = async (req, res) => {
  try {
    const users = await userModel.getAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const updateById = async (req, res) => {
  try {
    const modifiedRows = await userModel.updateById(req.params.id, req.body);
    if (modifiedRows) {
      return res
        .status(200)
        .json({ message: "Usuario actualizado correctamente" });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getAnalytics = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // los meses van de 0 a 11
    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    const users = await userModel.getByStatus();
    const suscriptions = await suscriptionModel.getPendingSuscriptions();
    const warranties = await warrantyModel.getPendingWarranties();
    const fees = await walletModel.getPaidTodayFees(todayString);
    const recharges = await walletModel.getPaidTodayRecharges(todayString);
    return res
      .status(200)
      .json({ users, suscriptions, warranties, fees, recharges });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getById = async (req, res) => {
  try {
    const data = await userModel.getById(req.params.id);
    const suscription = await suscriptionModel.getSuscriptionByUser(
      req.params.id
    );
    if (data) {
      return res.status(200).json({ data, suscription });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteById = async (req, res) => {
  try {
    const uuid = req.params.id;
    const tipo_perfil = req.params.perfil;

    if (tipo_perfil == "Comprador") {
      await codesModel.deleteCodeByUser(uuid);
      await contactModel.deleteContactByUser(uuid);
      await preferencesModel.deletePreferenceByUser(uuid);
      await walletModel.deleteWalletByUserId(uuid);
      await pointsModel.deletePointsByUser(uuid);
      await profileModel.deleteBuyerProfileById(uuid);
    } else {
      await codesModel.deleteCodeByUser(uuid);
      await contactModel.deleteContactByUser(uuid);
      await preferencesModel.deletePreferenceByUser(uuid);
      await walletModel.deleteWalletByUserId(uuid);
      await pointsModel.deletePointsByUser(uuid);
      let profile = null;
      switch (tipo_perfil) {
        case "Comerciante":
          profile = await profileModel.getMerchantProfileByUser(uuid);
          await bankAccountModel.deleteBankAccountById(profile.id_cuenta_bancaria);
          await profileModel.deleteMerchantProfileById(uuid);
          break;
        case "Asociación Agrícola":
          profile = await profileModel.getAssociationAgriculturalProfileByUser(
            uuid
          );
          await bankAccountModel.deleteBankAccountById(profile.id_cuenta_bancaria);
          await profileModel.deleteAgriculturalAssociationProfileById(uuid);
          break;
        case "Agricultor":
          profile = await profileModel.getFarmerProfileByUser(uuid);
          await bankAccountModel.deleteBankAccountById(profile.id_cuenta_bancaria);
          await profileModel.deleteFarmerProfileById(uuid);
          break;
        case "Comerciante Agroquímicos":
          profile = await profileModel.getMerchantAgrochemicalProfileByUser(
            uuid
          );
          await bankAccountModel.deleteBankAccountById(profile.id_cuenta_bancaria);
          await profileModel.deleteMerchantAgrochemicalProfileById(uuid);
          break;
      }
    }

    // Eliminar billetera, puntos recepción, contactos, perfil, cuenta bancaria, codigo registro

    const deletedRow = await userModel.deleteById(uuid);

    if (deletedRow > 0) {
      return res
        .status(200)
        .json({ message: "Usuario eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
export const setStateByUserId = async (req, res) => {
  try {
    if (!req.body.state) {
      throw new Error("Porfavor ingresa un estado valido (0, 1, 2)");
    }
    const modifiedRows = await userModel.setStateByUserId(
      req.params.id,
      req.body.state
    );
    if (modifiedRows > 0) {
      return res
        .status(200)
        .json({ message: "Estado actualizado correctamente" });
    } else {
      return res.status(404).json({
        message:
          "Usuario no encontrado o error al intentar actualizar el estado",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setInputPermissionByUserId = async (req, res) => {
  try {
    if (req.body.permission == undefined || req.body.permission == null) {
      throw new Error("Porfavor ingresa un permiso valido (0, 1)");
    }
    const modifiedRows = await userModel.setInputPermissionByUserId(
      req.params.id,
      req.body.permission
    );
    if (modifiedRows > 0) {
      return res
        .status(200)
        .json({ message: "Permiso actualizado correctamente" });
    } else {
      return res.status(404).json({
        message:
          "Usuario no encontrado o error al intentar actualizar el permiso",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
