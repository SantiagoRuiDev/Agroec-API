import { connection } from "../index.js";

export const createBuyerProfile = async (profile_id, user_id, schema) => {
    try {
        const [statement] = await connection.query(
          `INSERT INTO perfil_comprador(id, id_usuario, actividad_economica, tipo_negocio, consumo_mes_tm, consumo_anual, presupuesto_mes, politicas_recepcion) VALUES (?,?,?,?,?,?,?,?)`,
          [profile_id, user_id, schema.actividad_economica, schema.tipo_negocio, schema.consumo_mes_tm, schema.consumo_anual, schema.presupuesto_mes, schema.politicas_recepcion]
        );
    
        return statement.affectedRows;
      } catch (error) {
        throw new Error(error.message);
      }
}

export const createMerchantProfile = async (profile_uuid, uuid_user, bankAccount_uuid, schema) => {
  try {
      const [statement] = await connection.query(
        `INSERT INTO perfil_comerciante (id, id_usuario, id_cuenta_bancaria, centro_acopio, capacidad_secado, capacidad_almacenamiento, capacidad, acceso_internet) VALUES (?,?,?,?,?,?,?,?)`,
        [profile_uuid, uuid_user, bankAccount_uuid, schema.centro_acopio, schema.capacidad_secado, schema.capacidad_almacenamiento, schema.capacidad, schema.acceso_internet]
      );

      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
}

export const createFarmerProfile = async (profile_uuid, uuid_user, bankAccount_uuid, schema) => {
  try {
      const [statement] = await connection.query(
        `INSERT INTO perfil_agricultor (id, id_usuario, id_cuenta_bancaria, numero_hectareas, cantidad_hectareas_siembras, asociacion_id, nueva_asociacion, acceso_internet) VALUES (?,?,?,?,?,?,?,?)`,
        [profile_uuid, uuid_user, bankAccount_uuid, schema.numero_hectareas, schema.cantidad_hectareas_siembras, schema.asociacion_id, schema.nueva_asociacion, schema.acceso_internet]
      );

      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
}

export const createAssocAgriculturalProfile = async (profile_uuid, uuid_user, bankAccount_uuid, schema) => {
  try {
      const [statement] = await connection.query(
        `INSERT INTO perfil_asociacion_agricola (id, id_usuario, id_cuenta_bancaria, centro_acopio, capacidad_secado, capacidad_almacenamiento, capacidad, numero_hectareas, cantidad_hectareas_siembras, acceso_internet) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [profile_uuid, uuid_user, bankAccount_uuid, schema.centro_acopio, schema.capacidad_secado, schema.capacidad_almacenamiento, schema.capacidad, schema.numero_hectareas, schema.cantidad_hectareas_siembras, schema.acceso_internet]
      );

      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
}

export const createMerchantAgrochemicalProfile = async (profile_uuid, uuid_user, bankAccount_uuid, schema) => {
  try {
      const [statement] = await connection.query(
        `INSERT INTO perfil_comerciante_agroquimicos (id, id_usuario, id_cuenta_bancaria, numero_hectareas, cantidad_hectareas_siembras, asociacion_id, nueva_asociacion, acceso_internet) VALUES (?,?,?,?,?,?,?,?)`,
        [profile_uuid, uuid_user, bankAccount_uuid, schema.numero_hectareas, schema.cantidad_hectareas_siembras, schema.asociacion_id, schema.nueva_asociacion, schema.acceso_internet]
      );

      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
}

export const updateBuyerProfile = async (profile_id, user_id, schema) => {
  try {
      const [statement] = await connection.query(
        `UPDATE perfil_comprador SET actividad_economica = ?, tipo_negocio = ?, consumo_mes_tm = ?, consumo_anual = ?, presupuesto_mes = ?, politicas_reception = ? WHERE id = ? AND id_usuario = ?`,
        [schema.actividad_economica, schema.tipo_negocio, schema.consumo_mes_tm, schema.consumo_anual, schema.presupuesto_mes, schema.politicas_recepcion, profile_id, user_id]
      );
  
      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
}