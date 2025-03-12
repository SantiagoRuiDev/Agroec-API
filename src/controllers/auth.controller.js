import * as authModel from "../models/auth.model.js";
import * as codesModel from "../models/codes.model.js";
import * as profileModel from "../models/profile.model.js";
import * as bankAccountModel from "../models/bankaccount.model.js";
import * as contactModel from "../models/contact.model.js";
import * as pointsModel from "../models/points.model.js";
import * as notificationService from "../services/notification.service.js";
import * as walletModel from "../models/wallet.model.js";
import { sendMail } from "../libs/emailer.js";
import { formatMailBuyer } from "../email/buyer.js";
import { formatMailSeller } from "../email/seller.js";
import { comparePassword, generateRandomPassword, hashPassword } from "../libs/password.js";
import { v4 as uuidv4 } from "uuid";
import { encodeMultiuserToken, encodeToken } from "../libs/token.js";
import Twilio from "twilio";
import * as profileChecker from "../libs/checker.js";
import { APP_SETTINGS } from "../libs/config.js";
import { formatPasswordMail } from "../email/password.js";

export const createAccount = async (req, res) => {
  try {
    const uuid = uuidv4();

    req.body.user.clave = await hashPassword(req.body.user.clave);

    const getAccount = await authModel.getAccountByEmail(req.body.user.correo);

    if (getAccount) {
      throw new Error("Ya existe una cuenta con este correo");
    }

    const getAccountByDocument = await authModel.getAccountByDocument(
      req.body.user.numero_identificacion
    );

    if (getAccountByDocument) {
      throw new Error("Ya existe una cuenta con este documento");
    }

    let insertedRow = 0;
    if (req.body.profile.type == "Comprador") {
      insertedRow = await authModel.createAccount(uuid, req.body.user, 0);
    } else {
      insertedRow = await authModel.createAccount(uuid, req.body.user, 1);
    }

    if (insertedRow > 0) {
      const profile_uuid = uuidv4();
      const bankAccount_uuid = uuidv4();
      const wallet_id = uuidv4();
      const bodyProfile = req.body.profile;
      const bodyBankAccount = req.body.bank_account;
      const code = "AGROEC-" + Math.floor(Math.random() * 999);

      switch (req.body.profile.type) {
        case "Comprador":
          // AGROEC-0000 : Codigo telefonico enviado.
          const registration_uuid = uuidv4();
          await codesModel.insertCode(registration_uuid, code, uuid);
          await profileModel.createBuyerProfile(
            profile_uuid,
            uuid,
            bodyProfile
          ); // Se crea el Perfil
          // Envia Email al comprador
          await sendMail(
            "Agroec - Nuevo Registro ✔",
            formatMailBuyer(bodyProfile, code),
            req.body.user.correo
          );
          await walletModel.createWallet(wallet_id, uuid);
          break;
        case "Comerciante":
          await bankAccountModel.createBankAccount(
            bankAccount_uuid,
            bodyBankAccount
          );
          await profileModel.createMerchantProfile(
            profile_uuid,
            uuid,
            bankAccount_uuid,
            bodyProfile
          );
          await sendMail(
            "Agroec - Nuevo Registro ✔",
            formatMailSeller(bodyProfile),
            req.body.user.correo
          );
          await walletModel.createWallet(wallet_id, uuid);
          break;
        case "Agricultor":
          await bankAccountModel.createBankAccount(
            bankAccount_uuid,
            bodyBankAccount
          );
          await profileModel.createFarmerProfile(
            profile_uuid,
            uuid,
            bankAccount_uuid,
            bodyProfile
          );
          await sendMail(
            "Agroec - Nuevo Registro ✔",
            formatMailSeller(bodyProfile),
            req.body.user.correo
          );
          await walletModel.createWallet(wallet_id, uuid);
          break;
        case "Asociación Agrícola":
          await bankAccountModel.createBankAccount(
            bankAccount_uuid,
            bodyBankAccount
          );
          await profileModel.createAssocAgriculturalProfile(
            profile_uuid,
            uuid,
            bankAccount_uuid,
            bodyProfile
          );
          await sendMail(
            "Agroec - Nuevo Registro ✔",
            formatMailSeller(bodyProfile),
            req.body.user.correo
          );
          await walletModel.createWallet(wallet_id, uuid);
          break;
        case "Agroquimicos":
          await bankAccountModel.createBankAccount(
            bankAccount_uuid,
            bodyBankAccount
          );
          await profileModel.createMerchantAgrochemicalProfile(
            profile_uuid,
            uuid,
            bankAccount_uuid,
            bodyProfile
          );
          await sendMail(
            "Agroec - Nuevo Registro ✔",
            formatMailSeller(bodyProfile),
            req.body.user.correo
          );
          await walletModel.createWallet(wallet_id, uuid);
          break;
        default:
          throw new Error("Ingresa un tipo de Perfil Valido");
      }

      // Si se envian Contactos, se agregan.
      if (req.body.contact) {
        req.body.contact.forEach(async (contact) => {
          await contactModel.createContact(uuidv4(), uuid, contact);
        });
      }
      if (req.body.points) {
        req.body.points.forEach(async (point) => {
          await pointsModel.createPoint(uuidv4(), uuid, point);
        });
      }

        const accountSid = APP_SETTINGS.account_sid_twilio;
        const authToken = APP_SETTINGS.auth_token_twilio;
        const client = Twilio(accountSid, authToken);

        client.messages
          .create({
            body: "[AGROEC] Código de confirmación de Registro: " + code,
            from: APP_SETTINGS.sms_number_twilio,
            to: req.body.user.telefono,
          })
          .then()
          .catch((error) => console.error("Error:", error));

      return res.status(200).json({
        message: "Codigo enviado a tu telefono revisalo porfavor", code: code, id: uuid
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginAccount = async (req, res) => {
  try {
    const fetchUser = await authModel.getAccountByEmail(req.body.correo);

    if (!fetchUser) {
      const fetchMultiuser = await authModel.getMultiuserByEmail(
        req.body.correo
      );
      if (!fetchMultiuser) {
        throw new Error("No hemos podido encontrar una cuenta con ese correo.");
      }

      if (!(await comparePassword(req.body.clave, fetchMultiuser.clave))) {
        throw new Error("Clave Incorrecta");
      }

      const multi_token = encodeMultiuserToken(
        fetchMultiuser.id_usuario,
        fetchMultiuser.id,
        "360d"
      );
      const token = encodeToken(fetchMultiuser.id_usuario, "buyer", "360d");

      return res.status(200).json({
        message: "Sesion iniciada correctamente",
        token: token,
        multi_token: multi_token,
      });
    }

    if (!(await profileChecker.isBuyerProfile(fetchUser.id))) {
      throw new Error("No puedes ingresar con una cuenta de vendedor");
    }

    if (fetchUser.estado == 0) {
      throw new Error("Tu cuenta no finalizo el registro");
    }

    if (!(await comparePassword(req.body.clave, fetchUser.clave))) {
      throw new Error("Clave Incorrecta");
    }

    const token = encodeToken(fetchUser.id, "buyer", "360d");

    return res
      .status(200)
      .json({ message: "Sesion iniciada correctamente", token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginSellerAccount = async (req, res) => {
  try {
    const fetchUser = await authModel.getAccountByEmail(req.body.correo);

    if (!fetchUser) {
      throw new Error("No hemos podido encontrar una cuenta con ese correo.");
    }

    if (await profileChecker.isBuyerProfile(fetchUser.id)) {
      throw new Error("No puedes ingresar con una cuenta de comprador");
    }

    if (fetchUser.estado == 0) {
      throw new Error("Tu cuenta no finalizo el registro");
    }

    if (!(await comparePassword(req.body.clave, fetchUser.clave))) {
      throw new Error("Clave Incorrecta");
    }

    const token = encodeToken(fetchUser.id, "seller", "360d");

    return res
      .status(200)
      .json({ message: "Sesion iniciada correctamente", token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const loginAdminAccount = async (req, res) => {
  try {
    const fetchUser = await authModel.getAccountByEmail(req.body.correo);

    if (!fetchUser) {
      throw new Error("No hemos podido encontrar una cuenta con ese correo.");
    }

    if (fetchUser.id != "Sistema") {
      throw new Error("No puedes ingresar con una cuenta de comprador o vendedor");
    }

    if (!(await comparePassword(req.body.clave, fetchUser.clave))) {
      throw new Error("Clave Incorrecta");
    }

    const token = encodeToken(fetchUser.id, "admin", "1d");

    return res
      .status(200)
      .json({ message: "Sesion iniciada correctamente", token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const finishAccount = async (req, res) => {
  try {
    const code = req.body.codigo;
    const fetchCode = await codesModel.getCode(code);

    if (fetchCode.codigo) {
      const updateUserState = await authModel.setState(fetchCode.id_usuario, 1);
      if (updateUserState > 0) {
        await codesModel.deleteCode(code);
        return res
          .status(200)
          .json({ message: "Registro finalizado, ingresa a tu cuenta!" });
      }
    }

    throw new Error("Codigo de registro invalido");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const isAuthentified = async (req, res) => {
  try {
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const expireTime = req.token.exp; // Tiempo de expiración del token
    const timeRemaining = req.token.exp - currentTime;

    const todayDate = new Date(currentTime * 1000).toISOString();
    const expireDate = new Date(expireTime * 1000).toISOString();

    const SIXTY_DAYS_IN_SECONDS = 60 * 24 * 60 * 60; // 5184000 segundos (60 días)
    if (timeRemaining <= SIXTY_DAYS_IN_SECONDS) {
      // Si el token expira en menos de 60 días
      if (req.token.multiuser) {
        const refreshToken = encodeToken(
          req.token.user,
          req.token.profile,
          "360d"
        );
        const refreshMultiuserToken = encodeMultiuserToken(
          req.token.user,
          req.token.multiuser,
          "360d"
        );
        return res.status(200).json({
          loggedIn: true,
          token: refreshToken,
          multiuser_token: refreshMultiuserToken,
          type: "multiuser",
          profile: req.token.profile,
          "expire-date": expireDate,
          "today-date": todayDate
        });
      } else {
        let refreshToken = null
        if(req.token.profile == "admin"){
          refreshToken = encodeToken(
            req.token.user,
            req.token.profile,
            "1d"
          );
        } else {
          refreshToken = encodeToken(
            req.token.user,
            req.token.profile,
            "360d"
          );
        }
        return res
          .status(200)
          .json({
            loggedIn: true,
            token: refreshToken,
            type: "user",
            profile: req.token.profile,
            "expire-date": expireDate,
            "today-date": todayDate
          });
      }
    }

    // Si aún le queda más de 60 días al token, no lo renovamos
    return res.status(200).json({
      loggedIn: true,
      token: null,
      type: "none",
      profile: req.token.profile,
      "expire-date": expireDate,
      "today-date": todayDate
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const logoutAccount = async (req, res) => {
  try {
    const notification_id = req.body.notification_id;
    
    if(notification_id != null || notification_id != undefined){
      const result = await notificationService.deleteNotificationReceptor(req.user_id, notification_id);
  
      if(result){
        return res.status(200).json({ message: "Logout successful" });
      }else {
        throw new Error("Error while triying to logout")
      }
    }
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const user = req.user_id;
    if (req.body.clave != "") {
      const hashedPassword = await hashPassword(req.body.clave);
      req.body.clave = hashedPassword;
    } else {
      const userData = await authModel.getAccountById(user);
      req.body.clave = userData.clave;
    }

    const updateRow = await authModel.updateAccount(user, req.body);
    if (updateRow > 0) {
      return res
        .status(200)
        .json({ message: "Cuenta actualizada exitosamente" });
    } else {
      throw new Error("Error al actualizar la cuenta");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const email = req.body.correo;

    if(email == null || email == undefined || String(email).trim() == ""){
      throw new Error("Porfavor ingresa un correo electronico valido");
    }

    const userData = await authModel.getAccountByEmail(email);

    if(!userData){
      throw new Error("No encontramos una cuenta con este correo");
    }

    const plainPassword = generateRandomPassword();
    const randomGeneratedPassword = await hashPassword(plainPassword);
    
    await sendMail(
      "Agroec - Cambio de contraseña ✔",
      formatPasswordMail({correo: email, clave: plainPassword}),
      email
    );

    const updateRow = await authModel.updateAccountPassword(userData.id, randomGeneratedPassword);
    if (updateRow > 0) {
      return res
        .status(200)
        .json({ message: "Contraseña actualizada exitosamente" });
    } else {
      throw new Error("Error al actualizar la cuenta");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};