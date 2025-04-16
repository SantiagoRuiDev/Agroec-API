import pool from "../database/index.js";

export const createDelivery = async (
  delivery_id,
  point_id,
  condition_id,
  schema
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
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
  } finally {
    db.release(); // Muy importante
  }
};

export const getDeliveryById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.*, cc.id_producto FROM entregas e 
      INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
      INNER JOIN ordenes o ON e.id = o.id_entrega WHERE e.id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getDelivery = async (condition_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM entregas WHERE id_condicion = ? ORDER BY fecha_entrega DESC`,
      [condition_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateDelivery = async (delivery_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE entregas SET id_punto = ?, cantidad = ?, cantidad_unidad = ?, fecha_entrega = ?, hora_entrega = ? WHERE id = ?`,
      [
        schema.id_punto,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.fecha_entrega,
        schema.hora_entrega,
        delivery_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateDeliveryDate = async (order_id, date) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE entregas e SET e.fecha_entrega = ? WHERE e.id = (SELECT o.id_entrega FROM ordenes o WHERE o.id = ?)`,
      [date, order_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
