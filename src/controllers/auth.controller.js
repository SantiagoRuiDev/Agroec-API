import * as authModel from "../models/auth.model.js";
import * as codesModel from "../models/codes.model.js";
import * as profileModel from "../models/profile.model.js";
import { comparePassword, hashPassword } from "../libs/password.js";
import { v4 as uuidv4 } from "uuid";
import { encodeToken } from "../libs/token.js";
import Twilio from "twilio";
import { APP_SETTINGS } from "../libs/config.js";

export const createAccount = async (req, res) => {
  try {
    const uuid = uuidv4();

    req.body.user.clave = await hashPassword(req.body.user.clave);

    const insertedRow = await authModel.createAccount(uuid, req.body.user);

    if (insertedRow > 0) {
      // AGROEC-0000 : Codigo telefonico enviado.
      const registration_uuid = uuidv4();
      const code =
        "AGROEC-" +
        Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0");
      const insertedCode = await codesModel.insertCode(
        registration_uuid,
        code,
        uuid
      );

      if (insertedCode > 0) {
        const profile_uuid = uuidv4();
        const bankAccount_uuid = uuidv4();
        const bodyProfile = req.body.profile
        switch(req.body.profile.type){
          case 'Comprador': 
            await profileModel.createBuyerProfile(
              profile_uuid,
              uuid,
              bodyProfile
            ); // Se crea el Perfil
            break;
          case 'Comerciante': 
            await bankAccount.createAccount(bankAccount_uuid);
            await profileModel.createMerchantProfile(profile_uuid, uuid, bankAccount_uuid, bodyProfile);
            break;
          default:
            throw new Error('Ingresa un tipo de Perfil Valido');
        }

        /*
        const accountSid = APP_SETTINGS.account_sid_twilio;
        const authToken = APP_SETTINGS.auth_token_twilio;
        const client = Twilio(accountSid, authToken);

        client.messages
          .create({
            body: "[AGROEC] Código de confirmación de Registro: " + code,
            from: "+17089494566",
            to: req.body.telefono,
          })
          .then()
          .catch((error) => console.error("Error:", error));*/

        return res
          .status(200)
          .json({ message: "Codigo enviado a tu telefono revisalo porfavor" });
      }

      return res.status(200).json(fetchUser);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginAccount = async (req, res) => {
  try {
    const fetchUser = await authModel.getAccountByEmail(req.body.correo);

    if (fetchUser.estado == 0) {
      throw new Error("Tu cuenta no finalizo el registro");
    }

    if(!await comparePassword(req.body.clave, fetchUser.clave)){
        throw new Error("Contraseña incorrecta");
    }

    const token = encodeToken(fetchUser.id, "1h");

    res.cookie("auth-token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    return res.status(200).json({ message: "Sesion iniciada correctamente" });
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
