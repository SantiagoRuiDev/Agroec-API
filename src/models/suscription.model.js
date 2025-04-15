import { connection } from "../index.js";

export const createSuscription = async (uuid, uuid_plan, uuid_user, uuid_card, date, state = 1) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO suscripcion (id, id_plan, id_usuario, id_tarjeta, vencimiento, estado) VALUES (?,?,?,?,?,?) `,
      [uuid, uuid_plan, uuid_user, uuid_card, date, state]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionByPlan = async (uuid_plan) => {
  try {
    const [statement] = await connection.query(
      `SELECT s.id FROM suscripcion s INNER JOIN planes p ON s.id_plan = p.id WHERE p.id = ?`,
      [uuid_plan]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionByUser = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `SELECT s.*, p.valor, p.nombre FROM suscripcion s INNER JOIN planes p ON s.id_plan = p.id WHERE s.id_usuario = ? AND s.estado != 2`,
      [uuid_user]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getSuscriptionByUserRaw = async (uuid_user) => {
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


export const getPendingSuscriptions = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT count(*) AS cantidad_suscripciones_pendientes FROM suscripcion WHERE estado = 2`
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllSuscriptions = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT s.*, p.valor, p.nombre, 
      COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre, pc.razon_social) AS usuario
      FROM suscripcion s 
      LEFT JOIN perfil_comprador pc ON pc.id_usuario = s.id_usuario
      LEFT JOIN perfil_agricultor pa ON pa.id_usuario = s.id_usuario
      LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = s.id_usuario
      LEFT JOIN perfil_comerciante pca ON pca.id_usuario = s.id_usuario
      LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = s.id_usuario
      INNER JOIN planes p ON s.id_plan = p.id`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updatePlanStatus = async (uuid_plan, status) => {
  try {
    const [statement] = await connection.query(
      `UPDATE planes SET estado = ? WHERE id = ?`,
      [status, uuid_plan]
    );

    return statement.affectedRows;
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


export const updateSuscriptionStatus = async (uuid_user, status) => {
  try {
    const [statement] = await connection.query(
      `UPDATE suscripcion SET estado = ? WHERE id_usuario = ?`,
      [status, uuid_user]
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
export const deleteSuscriptionPlan = async (uuid_plan) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM planes WHERE id = ?`,
      [uuid_plan]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteSuscription = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM suscripcion WHERE id_usuario = ?`,
      [uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSuscriptionPlan = async (id, name, months, price) => {
  try {
    const [statement] = await connection.query(`INSERT INTO planes (id, nombre, meses, valor) VALUES (?,?,?,?)`, [id, name, months, price]);

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionPlans = async () => {
  try {
    const [statement] = await connection.query(`SELECT * FROM planes WHERE estado = 1`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuscriptionPlansRaw = async () => {
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
