import * as multiuserModel from "../models/multiusers.model.js";
import { decodeToken } from "./token.js";

export const isAuthentified = async (req) => {
  try {
    const multiuser_token = req.headers["x-multiuser-token"]; // Formato esperado: "Bearer <multiuser-token>"

    if (multiuser_token != undefined && multiuser_token != null) {
      if (typeof multiuser_token === "string") {
        const decoded = decodeToken(multiuser_token);

        if (decoded instanceof Object) {
          req.user_id = decoded.user;
          req.multiuser_id = decoded.multiuser;
        }
        req.permissions = await multiuserModel.getMultiuserRoleByUser(
          decoded.multiuser
        );
        req.token = decoded;
        return {
          user: req.user_id,
          multiuser: req.multiuser_id,
          token: req.token,
        };
      } else {
        return null;
      }
    }

    // Si el usuario se ingreso como multi-usuario, este flujo de abajo no seguira, entonces creamos middleware para cada permiso.

    const token = req.headers["authorization"]?.split(" ")[1];

    if (typeof token === "string") {
      const decoded = decodeToken(token);

      if (decoded instanceof Object) {
        req.user_id = decoded.user;
      }
      req.token = decoded;
      return { user: req.user_id, token: req.token };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
