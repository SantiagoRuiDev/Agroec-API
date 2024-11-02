import { connection } from "../index.js";

export const createWallet = async (uuid, uuid_user) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO billetera (id, id_usuario, saldo) VALUES (?, ?, ?) `,
      [uuid, uuid_user, 0]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createFee = async (uuid, id_delivery, id_wallet, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO fee (id, id_entrega, id_billetera, monto_fee) VALUES (?, ?, ?, ?) `,
      [uuid, id_delivery, id_wallet, schema.monto_fee]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getWalletByUser = async (uuid_user) => {
  try {
    const [wallet] = await connection.query(
      `SELECT * FROM billetera WHERE id_usuario = ?`,
      [uuid_user]
    );

    wallet;

    const [recharge] = await connection.query(
      `SELECT * FROM recargas WHERE id_billetera = ? ORDER BY fecha ASC`,
      [wallet[0].id]
    );

    const [fee] = await connection.query(
      `
          SELECT f.id, cc.id_producto, f.monto_fee, f.fecha, e.cantidad, e.cantidad_unidad, pr.ubicacion_google_maps,
          COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS vendedor_nombre,
          COALESCE(pa.apellido, pac.apellido, pca.apellido, pcaq.apellido) AS vendedor_apellido
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

    const [chargeback] = await connection.query(
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
  }
};

export const getBalance = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `SELECT saldo FROM billetera WHERE id_usuario = ?`,
      [uuid_user]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const rechargeWallet = async (
  uuid,
  uuid_wallet,
  schema,
  rechargeMoreBalance
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO recargas (id, id_billetera, metodo_pago,monto_recarga) VALUES (?, ?, ?, ?)`,
      [uuid, uuid_wallet, schema.metodo_pago, rechargeMoreBalance]
    );
    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateBalance = async (id_wallet, newBalance) => {
  try {
    const [result] = await connection.query(
      `UPDATE billetera SET saldo = ? WHERE id = ?`,
      [newBalance, id_wallet]
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
