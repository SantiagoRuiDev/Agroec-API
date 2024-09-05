import { connection } from "../index.js";

export const createDelivery = async (delivery_id, point_id, condition_id, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO entregas(id, id_punto, id_condicion, cantidad, cantidad_unidad, fecha_entrega, hora_entrega) VALUES (?,?,?,?,?,?,?)`,
      [
        delivery_id,
        point_id,
        condition_id,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.fecha_entrega,
        schema.hora_entrega,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDelivery = async (condition_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM entregas WHERE id_condicion = ?`,
      [
        condition_id
      ]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};
