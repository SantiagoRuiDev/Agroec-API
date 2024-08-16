import * as authModel from "../models/auth.model.js";
import * as codesModel from "../models/codes.model.js";
import { comparePassword, hashPassword } from "../libs/password.js";
import { v4 as uuidv4 } from "uuid";
import { encodeToken } from "../libs/token.js";
import Twilio from "twilio";

export const createAccount = async (req, res) => {
  try {
    const uuid = uuidv4();

    req.body.clave = await hashPassword(req.body.clave);

    const insertedRow = await authModel.createAccount(uuid, req.body);

    if (insertedRow > 0) {
      // AGROEC-0000 : Codigo telefonico enviado.
      const registration_uuid = uuidv4();
      const code =
        "AGROEC-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
      const insertedCode = await codesModel.insertCode(
        registration_uuid,
        code,
        uuid
      );

      if (insertedCode > 0) {
        const accountSid = "AC0a1209bc7014673630ec5c52a24878cb";
        const authToken = "f8a19f8eaf962436d6352841a254d7e8";
        const client = Twilio(accountSid, authToken);

        client.messages
          .create({
            body: "[AGROEC] Código de confirmación de Registro: " + code,
            from: "+17089494566",
            to: req.body.telefono,
          })
          .then()
          .catch((error) => console.error("Error:", error));

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
