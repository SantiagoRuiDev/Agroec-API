import { connection } from "../index.js";

export const createInput = async (uuid, uuid_user, schema) => {
    try {
        const [statement] = await connection.query(
            `INSERT INTO insumos
      (id, id_usuario,categoria_insumo, nombre_comercial, precio_agroec	,precio_mas_iva ,incluido_iva ,precio_punto_venta, stock ,composicion ,clase ,tipo_formula	 ,titular ,clasificacion	 ,instrucciones_de_uso ,epoca_intervalo ,intervalo_entrada, link, atencion) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [uuid, uuid_user, schema.categoria_insumo, schema.nombre_comercial, schema.precio_agroec, schema.precio_mas_iva, schema.incluido_iva, schema.precio_punto_venta, schema.stock, schema.composicion, schema.clase, schema.tipo_formula, schema.titular, schema.clasificacion, schema.instrucciones_de_uso,schema.epoca_intervalo, schema.intervalo_entrada, schema.link, schema.atencion  ]
        );

        return statement.affectedRows;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateInput = async (input_id,schema) => {
    try {
        const [statement] = await connection.query(
            `UPDATE insumos SET categoria_insumo = ?, nombre_comercial = ?, precio_agroec = ?,precio_mas_iva = ? ,incluido_iva = ? ,precio_punto_venta = ?, stock = ? ,composicion = ?,clase = ?,tipo_formula = ? ,titular = ? ,clasificacion = ? ,instrucciones_de_uso = ?,epoca_intervalo = ?,intervalo_entrada = ?, link = ?, atencion = ?  WHERE id = ?`,
            [schema.categoria_insumo, schema.nombre_comercial, schema.precio_agroec, schema.precio_mas_iva, schema.incluido_iva, schema.precio_punto_venta, schema.stock, schema.composicion, schema.clase, schema.tipo_formula, schema.titular, schema.clasificacion, schema.instrucciones_de_uso,schema.epoca_intervalo, schema.intervalo_entrada, schema.link, schema.atencion, input_id   ]
        );

        return statement.affectedRows;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteInput = async (input_id) => {
    try {
        const [statement] = await connection.query(
            `DELETE FROM insumos WHERE id = ?`,
            [input_id]
        );

        return statement.affectedRows;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getInputById = async (input_id) => {
    try {
        const [statement] = await connection.query(
            `SELECT * FROM insumos WHERE id = ?`,
            [input_id]
        );

        return statement;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getInputByCreatorId = async (user_id) => {
    try {
        const [statement] = await connection.query(
            `SELECT * FROM insumos WHERE id_usuario = ?`,
            [user_id]
        );

        return statement;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllInputs = async () => {
    try {
        const [statement] = await connection.query(
            `SELECT * FROM insumos`,
        );

        return statement;
    } catch (error) {
        throw new Error(error.message);
    }
};