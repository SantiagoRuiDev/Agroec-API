import { connection } from "../index.js";

export const updateSettings = async (schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE configuracion SET url_terminos_condiciones = ?, porcentaje_fee_comprador = ?, porcentaje_fee_vendedor = ?, soporte_whatsapp_uno = ?, soporte_whatsapp_dos = ?, soporte_whatsapp_tres = ?`,
      [schema.url_terminos_condiciones, schema.porcentaje_fee_comprador, schema.porcentaje_fee_vendedor, schema.soporte_whatsapp_uno, schema.soporte_whatsapp_dos, schema.soporte_whatsapp_tres]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSettings = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM configuracion`
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
