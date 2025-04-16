import pool from "../database/index.js";

export const updateSettings = async (schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE configuracion SET url_terminos_condiciones = ?, porcentaje_fee_comprador = ?, porcentaje_fee_vendedor = ?, soporte_whatsapp_uno = ?, soporte_whatsapp_dos = ?, soporte_whatsapp_tres = ?`,
      [schema.url_terminos_condiciones, schema.porcentaje_fee_comprador, schema.porcentaje_fee_vendedor, schema.soporte_whatsapp_uno, schema.soporte_whatsapp_dos, schema.soporte_whatsapp_tres]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getSettings = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM configuracion`
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
