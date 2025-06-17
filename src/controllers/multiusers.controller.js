import * as authModel from "../models/auth.model.js";
import * as multiusersModel from "../models/multiusers.model.js";
import { v4 as uuidv4 } from "uuid";
import * as profileChecker from "../libs/checker.js";
import { hashPassword } from "../libs/password.js";

export const getMultiuserById = async (req, res) => {
  try {
    if (!(await profileChecker.isBuyerProfile(req.user_id))) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    const multiuser = await multiusersModel.getMultiuserById(req.params.id);

    return res.status(200).json(multiuser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getMultiusersByUser = async (req, res) => {
  try {
    if (!(await profileChecker.isBuyerProfile(req.user_id))) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    const multiusers = await multiusersModel.getMultiusersByUser(req.user_id);

    return res.status(200).json(multiusers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getRoleById = async (req, res) => {
  try {
    if (
      !(await profileChecker.isBuyerProfile(req.user_id)) &&
      req.user_id != "Sistema"
    ) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    const role = await multiusersModel.getRoleById(req.params.id);

    return res.status(200).json(role);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const getMultiusersRoles = async (req, res) => {
  try {
    if (
      !(await profileChecker.isBuyerProfile(req.user_id)) &&
      req.user_id != "Sistema"
    ) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    const roles = await multiusersModel.getMultiusersRoles();

    return res.status(200).json(roles);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const editMultiuser = async (req, res) => {
  try {
    if (!(await profileChecker.isBuyerProfile(req.user_id))) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    if (
      req.body.clave != undefined &&
      req.body.clave != null &&
      String(req.body.clave).trim() != ""
    ) {
      req.body.clave = await hashPassword(req.body.clave);
      const schema = req.body;

      const editUser = await multiusersModel.editMultiuserWithPassword(
        req.params.id,
        schema
      );

      if (editUser > 0) {
        return res
          .status(200)
          .json({ message: "Cuenta de multiusuario editada correctamente" });
      }
    } else {
      const schema = req.body;

      const editUser = await multiusersModel.editMultiuserWithoutPassword(
        req.params.id,
        schema
      );

      if (editUser > 0) {
        return res
          .status(200)
          .json({ message: "Cuenta de multiusuario editada correctamente" });
      }
    }

    throw new Error("Un error ha ocurrido al intentar editar el multiusuario");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const createMultiuser = async (req, res) => {
  try {
    const uuid = uuidv4();
    const uuid_user = req.user_id;
    const schema = req.body;

    if (!(await profileChecker.isBuyerProfile(uuid_user))) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    if (await authModel.getAccountByEmail(schema.correo)) {
      throw new Error("Ya existe una cuenta con este correo");
    }

    if (await multiusersModel.getMultiuserByEmail(schema.correo)) {
      throw new Error("Ya existe una cuenta con este correo");
    }

    req.body.clave = await hashPassword(schema.clave);

    const insertUser = await multiusersModel.createMultiuser(
      uuid,
      uuid_user,
      schema
    );

    if (insertUser > 0) {
      return res
        .status(200)
        .json({ message: "Cuenta de multiusuario añadida correctamente" });
    }

    throw new Error("Un error ha ocurrido al intentar agregar el multiusuario");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const updateRole = async (req, res) => {
  try {
    const schema = req.body;

    if (req.user_id != "Sistema") {
      throw new Error("No puedes realizar esta acción");
    }

    if (!await multiusersModel.getRoleById(req.params.id)) {
      throw new Error("Este rol no existe");
    }

    const updated = await multiusersModel.updateRole(
      req.params.id, schema
    );

    if (updated > 0) {
      return res
        .status(200)
        .json({ message: "Rol de multiusuario editado correctamente" });
    }

    throw new Error("Un error ha ocurrido al intentar editar el rol");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const createRole = async (req, res) => {
  try {
    const schema = req.body;

    if (req.user_id != "Sistema") {
      throw new Error("No puedes realizar esta acción");
    }

    if (await multiusersModel.getRoleById(schema.id)) {
      throw new Error("Ya existe este rol");
    }

    const inserted = await multiusersModel.createRole(
      schema.id
    );

    if (inserted > 0) {
      return res
        .status(200)
        .json({ message: "Rol de multiusuario agregado correctamente" });
    }

    throw new Error("Un error ha ocurrido al intentar agregar el rol");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteMultiuser = async (req, res) => {
  try {
    if (!(await profileChecker.isBuyerProfile(req.user_id))) {
      throw new Error("Tu perfil no es de tipo comprador");
    }

    const result = await multiusersModel.deleteMultiuser(req.params.id);

    if (result > 0) {
      return res
        .status(200)
        .json({ message: "Cuenta de multiusuario eliminada correctamente" });
    }

    throw new Error(
      "Un error ha ocurrido al intentar eliminar el multiusuario"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteRole = async (req, res) => {
  try {
    if (req.user_id != "Sistema") {
      throw new Error("No puedes realizar esta acción");
    }

    const users = await multiusersModel.getMultiuserByRole(req.params.id);

    if (users.length > 0) {
      return res
        .status(400)
        .json({
          error:
            "Este rol tiene registros vinculados, no es posible eliminarlo",
        });
    }

    const deleted = await multiusersModel.deleteRole(req.params.id);

    if (deleted > 0) {
      return res.status(200).json({ message: "Rol eliminado correctamente" });
    }

    throw new Error("Un error ha ocurrido al intentar eliminar el rol");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
