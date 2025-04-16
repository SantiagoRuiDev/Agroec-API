import pool from "../database/index.js";

export const createWallet = async (uuid, uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO billetera (id, id_usuario, saldo) VALUES (?, ?, ?) `,
      [uuid, uuid_user, 0]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createFee = async (uuid, id_delivery, id_wallet, amount) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO fee (id, id_entrega, id_billetera, monto_fee) VALUES (?, ?, ?, ?) `,
      [uuid, id_delivery, id_wallet, amount]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getWalletByUser = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [wallet] = await db.query(
      `SELECT * FROM billetera WHERE id_usuario = ?`,
      [uuid_user]
    );

    wallet;

    const [recharge] = await db.query(
      `SELECT * FROM recargas WHERE id_billetera = ? ORDER BY fecha ASC`,
      [wallet[0].id]
    );

    const [fee] = await db.query(
      `
          SELECT f.id, cc.id_producto, f.monto_fee, f.fecha, e.cantidad, e.cantidad_unidad, pr.ubicacion_google_maps,
          COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS vendedor_nombre
          FROM fee f 
          INNER JOIN entregas e ON f.id_entrega = e.id 
          INNER JOIN ordenes o ON o.id_entrega = e.id
          INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
          INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
          LEFT JOIN perfil_agricultor pa ON pa.id_usuario = o.id_vendedor
          LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = o.id_vendedor
          LEFT JOIN perfil_comerciante pca ON pca.id_usuario = o.id_vendedor
          LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = o.id_vendedor
          WHERE id_billetera = ? ORDER BY f.fecha ASC
          `,
      [wallet[0].id]
    );

    const [chargeback] = await db.query(
      `
          SELECT * FROM devoluciones
          WHERE id_billetera = ? ORDER BY fecha ASC
          `,
      [wallet[0].id]
    );

    return {
      wallet: wallet[0],
      recharge: recharge,
      fee: fee,
      chargeback: chargeback,
    };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getWalletTransactions = async () => {
  const db = await pool.getConnection();
  try {
    const [recharge] = await db.query(
      `SELECT * FROM recargas ORDER BY fecha DESC`
    );

    const [fee] = await db.query(
      `
          SELECT f.id, cc.id_producto, f.monto_fee, f.fecha, e.cantidad, e.cantidad_unidad, pr.ubicacion_google_maps,
          COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS vendedor_nombre
          FROM fee f 
          INNER JOIN entregas e ON f.id_entrega = e.id 
          INNER JOIN ordenes o ON o.id_entrega = e.id
          INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
          INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
          LEFT JOIN perfil_agricultor pa ON pa.id_usuario = o.id_vendedor
          LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = o.id_vendedor
          LEFT JOIN perfil_comerciante pca ON pca.id_usuario = o.id_vendedor
          LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = o.id_vendedor
          ORDER BY f.fecha DESC
          `
    );

    const [chargeback] = await db.query(
      `
          SELECT * FROM devoluciones
          ORDER BY fecha DESC
          `
    );

    return {
      recharge: recharge,
      fee: fee,
      chargeback: chargeback,
    };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteWalletByUserId = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM billetera WHERE id_usuario = ?`,
      [uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getBalance = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT saldo FROM billetera WHERE id_usuario = ?`,
      [uuid_user]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getPaidTodayRecharges = async (date) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT COALESCE(sum(monto_recarga),0) AS cantidad_recargas_diarias FROM recargas WHERE DATE(fecha) = ?`,
      [date]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getPaidTodayFees = async (date) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT COALESCE(sum(monto_fee),0) AS cantidad_fees_diarias FROM fee WHERE DATE(fecha) = ?`,
      [date]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const chargebackWallet = async (uuid, uuid_wallet, amount) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO devoluciones (id, id_billetera, monto_devolucion) VALUES (?, ?, ?)`,
      [uuid, uuid_wallet, amount]
    );
    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const rechargeWallet = async (
  uuid,
  uuid_wallet,
  schema,
  rechargeMoreBalance
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO recargas (id, id_billetera, metodo_pago, monto_recarga) VALUES (?, ?, ?, ?)`,
      [uuid, uuid_wallet, schema.metodo_pago, rechargeMoreBalance]
    );
    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateBalance = async (id_wallet, newBalance) => {
  const db = await pool.getConnection();
  try {
    const [result] = await db.query(
      `UPDATE billetera SET saldo = ? WHERE id = ?`,
      [newBalance, id_wallet]
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
