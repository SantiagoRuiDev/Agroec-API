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