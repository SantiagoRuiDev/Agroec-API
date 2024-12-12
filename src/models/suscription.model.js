import { connection } from "../index.js";

export const createSuscription = async (uuid, uuid_plan, uuid_user, uuid_card, date) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO suscripcion (id, id_plan, id_usuario, id_tarjeta, vencimiento, estado) VALUES (?, ?, ?, ?, ?, 1) `,
      [uuid, uuid_plan, uuid_user, uuid_card, date]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionByUser = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `SELECT s.*, p.valor, p.nombre FROM suscripcion s INNER JOIN planes p ON s.id_plan = p.id WHERE s.id_usuario = ?`,
      [uuid_user]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSuscriptionDate = async (uuid_user, date) => {
  try {
    const [statement] = await connection.query(
      `UPDATE suscripcion SET vencimiento = ? WHERE id_usuario = ?`,
      [date, uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const cancelSuscription = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `UPDATE suscripcion SET estado = 0 WHERE id_usuario = ?`,
      [uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionPlans = async () => {
  try {
    const [statement] = await connection.query(`SELECT * FROM planes`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionPlanById = async (uuid_plan) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM planes WHERE id = ?`,
      [uuid_plan]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptions = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT s.*, p.valor, p.meses, u.numero_identificacion FROM suscripcion s 
      INNER JOIN planes p ON s.id_plan = p.id 
      INNER JOIN usuarios u ON u.id = s.id_usuario
      WHERE s.estado = 1`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};
