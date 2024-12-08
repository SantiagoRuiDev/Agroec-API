import { connection } from "../index.js";

//CREATE

export const createBuyerProfile = async (profile_id, user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO perfil_comprador(id, id_usuario, razon_social, actividad_economica, tipo_negocio, consumo_mes_tm, consumo_anual, presupuesto_mes, politicas_recepcion) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        profile_id,
        user_id,
        schema.razon_social,
        schema.actividad_economica,
        schema.tipo_negocio,
        schema.consumo_mes_tm,
        schema.consumo_anual,
        schema.presupuesto_mes,
        schema.politicas_recepcion,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createMerchantProfile = async (
  profile_uuid,
  uuid_user,
  bankAccount_uuid,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO perfil_comerciante (id, id_usuario, id_cuenta_bancaria, nombre, centro_acopio, capacidad_secado, capacidad_almacenamiento, capacidad, acceso_internet) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        profile_uuid,
        uuid_user,
        bankAccount_uuid,
        schema.nombre,
        schema.centro_acopio,
        schema.capacidad_secado,
        schema.capacidad_almacenamiento,
        schema.capacidad,
        schema.acceso_internet,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createFarmerProfile = async (
  profile_uuid,
  uuid_user,
  bankAccount_uuid,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO perfil_agricultor (id, id_usuario, id_cuenta_bancaria, id_asociacion, nombre, numero_hectareas, cantidad_hectareas_siembras, acceso_internet) VALUES (?,?,?,?,?,?,?,?)`,
      [
        profile_uuid,
        uuid_user,
        bankAccount_uuid,
        schema.id_asociacion,
        schema.nombre,
        schema.numero_hectareas,
        schema.cantidad_hectareas_siembra,
        schema.acceso_internet,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createMerchantAgrochemicalProfile = async (
  profile_uuid,
  uuid_user,
  bankAccount_uuid,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO perfil_comerciante_agroquimicos (id, id_usuario, id_cuenta_bancaria, nombre, centro_acopio, capacidad_secado, capacidad_almacenamiento, capacidad, acceso_internet) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        profile_uuid,
        uuid_user,
        bankAccount_uuid,
        schema.nombre,
        schema.centro_acopio,
        schema.capacidad_secado,
        schema.capacidad_almacenamiento,
        schema.capacidad,
        schema.acceso_internet,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAssocAgriculturalProfile = async (
  profile_uuid,
  uuid_user,
  bankAccount_uuid,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO perfil_asociacion_agricola (id, id_usuario, id_cuenta_bancaria, nombre, centro_acopio, capacidad_secado, capacidad_almacenamiento, capacidad, numero_hectareas, cantidad_hectareas_siembras, acceso_internet) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        profile_uuid,
        uuid_user,
        bankAccount_uuid,
        schema.nombre,
        schema.centro_acopio,
        schema.capacidad_secado,
        schema.capacidad_almacenamiento,
        schema.capacidad,
        schema.numero_hectareas,
        schema.cantidad_hectareas_siembra,
        schema.acceso_internet,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

//GET

export const getBuyerProfileById = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT 
    u.direccion,
    u.ubicacion_google_maps,
    u.provincia,
    u.canton,
    u.parroquia,
    p.razon_social,
    p.id AS id_perfil_comprador,
    u.id AS id_perfil_usuario
    FROM 
        perfil_comprador p
    JOIN 
        usuarios u ON p.id_usuario = u.id
    WHERE 
    p.id = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMerchantProfileById = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.id AS id_perfil_comerciante, u.id AS id_perfil_usuario FROM perfil_comerciante p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFarmerProfileById = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.id_asociacion, p.nueva_asociacion, p.id AS id_perfil_agricultor, u.id AS id_perfil_usuario FROM perfil_agricultor p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAssociationAgriculturalProfileById = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.centro_acopio, p.capacidad_secado, p.capacidad_almacenamiento, p.id AS id_perfil_asociacion_agricola, u.id AS id_perfil_usuario FROM perfil_asociacion_agricola p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMerchantAgrochemicalProfileById = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.numero_hectareas, p.cantidad_hectareas_siembras, id_asociacion, p.id AS id_perfil_comerciante_agroquimicos, u.id AS id_perfil_usuario FROM perfil_comerciante_agroquimicos p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
//UPDATED

export const updateBuyerProfile = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE perfil_comprador SET actividad_economica = ?, razon_social = ?, tipo_negocio = ?, consumo_mes_tm = ?, consumo_anual = ?, presupuesto_mes = ?, politicas_recepcion = ? WHERE id_usuario = ?`,
      [
        schema.actividad_economica,
        schema.razon_social,
        schema.tipo_negocio,
        schema.consumo_mes_tm,
        schema.consumo_anual,
        schema.presupuesto_mes,
        schema.politicas_recepcion,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateMerchantProfile = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE perfil_comerciante SET nombre = ?, centro_acopio = ?, capacidad_secado = ?, capacidad_almacenamiento = ?, capacidad = ?, acceso_internet = ? WHERE id_usuario = ?`,
      [
        schema.nombre,
        schema.centro_acopio,
        schema.capacidad_secado,
        schema.capacidad_almacenamiento,
        schema.capacidad,
        schema.acceso_internet,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateFarmerProfile = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE perfil_comerciante_agroquimicos SET nombre = ?, numero_hectareas = ?, cantidad_hectareas_siembras = ?, nueva_asociacion = ?, acceso_internet = ? WHERE id_usuario = ?`,
      [
        schema.nombre,
        schema.numero_hectareas,
        schema.cantidad_hectareas_siembras,
        schema.nueva_asociacion,
        schema.acceso_internet,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateMerchantAgrochemicalProfile = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE perfil_comerciante_agroquimicos SET nombre = ?, numero_hectareas = ?, cantidad_hectareas_siembras = ?, acceso_internet = ? WHERE id_usuario = ?`,
      [
        schema.nombre,
        schema.numero_hectareas,
        schema.cantidad_hectareas_siembras,
        schema.acceso_internet,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateAssociationAgriculturalProfile = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE perfil_asociacion_agricola SET nombre = ?, centro_acopio =?, capacidad_secado = ?, capacidad_almacenamiento = ?, capacidad = ?, numero_hectareas = ?, cantidad_hectareas_siembras = ?, acceso_internet = ? WHERE id_usuario = ?`,
      [
        schema.nombre,
        schema.centro_acopio,
        schema.capacidad_secado,
        schema.capacidad_almacenamiento,
        schema.capacidad,
        schema.numero_hectareas,
        schema.cantidad_hectareas_siembras,
        schema.acceso_internet,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Updated bank account for profiles

export const updatebankAccountMerchant = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE cuenta_bancaria c
JOIN perfil_comerciante p ON p.id_cuenta_bancaria = c.id
SET 
    c.tipo_de_cuenta = ?, 
    c.tipo_de_banco = ?, 
    c.numero_de_cuenta = ?, 
    c.seleccionar_banco = ?, 
    c.tipo_de_documento = ?, 
    c.numero_de_documento = ?, 
    c.nombre_del_propietario = ?
WHERE 
    p.id_usuario = ?`,
      [
        schema.tipo_de_cuenta,
        schema.tipo_de_banco,
        schema.numero_de_cuenta,
        schema.seleccionar_banco,
        schema.tipo_de_documento,
        schema.numero_de_documento,
        schema.nombre_del_propietario,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatebankAccountFarmer = async (user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE cuenta_bancaria c
JOIN perfil_agricultor p ON p.id_cuenta_bancaria = c.id
SET 
    c.tipo_de_cuenta = ?, 
    c.tipo_de_banco = ?, 
    c.numero_de_cuenta = ?, 
    c.seleccionar_banco = ?, 
    c.tipo_de_documento = ?, 
    c.numero_de_documento = ?, 
    c.nombre_del_propietario = ?
WHERE 
    p.id_usuario = ?`,
      [
        schema.tipo_de_cuenta,
        schema.tipo_de_banco,
        schema.numero_de_cuenta,
        schema.seleccionar_banco,
        schema.tipo_de_documento,
        schema.numero_de_documento,
        schema.nombre_del_propietario,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatebankAccountAssociationAgricultural = async (
  user_id,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `UPDATE cuenta_bancaria c
JOIN perfil_asociacion_agricola p ON p.id_cuenta_bancaria = c.id
SET 
    c.tipo_de_cuenta = ?, 
    c.tipo_de_banco = ?, 
    c.numero_de_cuenta = ?, 
    c.seleccionar_banco = ?, 
    c.tipo_de_documento = ?, 
    c.numero_de_documento = ?, 
    c.nombre_del_propietario = ?
WHERE 
    p.id_usuario = ?`,
      [
        schema.tipo_de_cuenta,
        schema.tipo_de_banco,
        schema.numero_de_cuenta,
        schema.seleccionar_banco,
        schema.tipo_de_documento,
        schema.numero_de_documento,
        schema.nombre_del_propietario,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatebankAccountMerchantAgrochemical = async (
  user_id,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `UPDATE cuenta_bancaria c
JOIN perfil_comerciante_agroquimicos p ON p.id_cuenta_bancaria = c.id
SET 
    c.tipo_de_cuenta = ?, 
    c.tipo_de_banco = ?, 
    c.numero_de_cuenta = ?, 
    c.seleccionar_banco = ?, 
    c.tipo_de_documento = ?, 
    c.numero_de_documento = ?, 
    c.nombre_del_propietario = ?
WHERE 
    p.id_usuario = ?`,
      [
        schema.tipo_de_cuenta,
        schema.tipo_de_banco,
        schema.numero_de_cuenta,
        schema.seleccionar_banco,
        schema.tipo_de_documento,
        schema.numero_de_documento,
        schema.nombre_del_propietario,
        user_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

// OBTENER PERFILES POR ID DE USUARIO

export const getBuyerProfileByUser = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT 
    u.direccion,
    u.ubicacion_google_maps,
    u.provincia,
    u.canton,
    u.parroquia,
    p.razon_social,
    p.presupuesto_mes,
    p.consumo_anual,
    p.consumo_mes_tm,
    p.politicas_recepcion,
    p.actividad_economica,
    p.tipo_negocio,
    p.id AS id_perfil_comprador,
    u.id AS id_perfil_usuario
FROM 
    perfil_comprador p
JOIN 
    usuarios u ON p.id_usuario = u.id
WHERE 
    p.id_usuario = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMerchantProfileByUser = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.id AS id_perfil_comerciante, u.id AS id_perfil_usuario FROM perfil_comerciante p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id_usuario = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFarmerProfileByUser = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.id_asociacion, p.nueva_asociacion, p.id AS id_perfil_agricultor, u.id AS id_perfil_usuario FROM perfil_agricultor p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id_usuario = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAssociationAgriculturalProfileByUser = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.centro_acopio, p.capacidad_secado, p.capacidad_almacenamiento, p.id AS id_perfil_asociacion_agricola, u.id AS id_perfil_usuario FROM perfil_asociacion_agricola p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id_usuario = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMerchantAgrochemicalProfileByUser = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.nombre, u.direccion, u.ubicacion_google_maps, u.provincia, u.canton, u.parroquia, p.numero_hectareas, p.cantidad_hectareas_siembras, id_asociacion, p.id AS id_perfil_comerciante_agroquimicos, u.id AS id_perfil_usuario FROM perfil_comerciante_agroquimicos p JOIN usuarios u ON p.id_usuario = u.id WHERE p.id_usuario = ?;
  `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProfileType = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT COALESCE(pc.tipo_perfil, pca.tipo_perfil, pcc.tipo_perfil, pa.tipo_perfil, paa.tipo_perfil) as tipo_perfil
        FROM usuarios u
        LEFT JOIN perfil_comerciante pc ON pc.id_usuario = u.id
        LEFT JOIN perfil_comerciante_agroquimicos pca ON pca.id_usuario = u.id
        LEFT JOIN perfil_comprador pcc ON pcc.id_usuario = u.id
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = u.id
        LEFT JOIN perfil_asociacion_agricola paa ON paa.id_usuario = u.id
        WHERE u.id_usuario = ?;
    `,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrganizations = async () => {
  try {
    const [statement] = await connection.query(`SELECT * FROM asociacion;`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};
