import { connection } from "../index.js";

export const createWallet = async (uuid, uuid_user) => {
    try {
      const [statement] = await connection.query(
        `INSERT INTO billetera (id, id_usuario, saldo) VALUES (?, ?, ?) `,[uuid,uuid_user, 0]);
  
      return statement;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const createFee = async (uuid, id_delivery, id_wallet, schema) => {
    try {
      const [statement] = await connection.query(
        `INSERT INTO fee (id, id_entrega, monto_fee) VALUES (?, ?, ?, ?) `,[uuid, id_delivery, id_wallet, schema.monto_fee]);
  
      return statement;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getWalletByUser = async (uuid_user) => {
    try {
      const [wallet] = await connection.query(
        `SELECT * FROM billetera WHERE id_usuario = ?`,[uuid_user]);
  
       wallet
       

      const [recharge] = await connection.query(
        `SELECT * FROM recargas WHERE id_billetera = ?`,[wallet[0].id]);
      

        const [fee] = await connection.query(
          `SELECT * FROM fee WHERE id_billetera = ?`,[wallet[0].id]);
          
          fee
          console.log(fee)

       
  
      return {wallet: wallet[0], recharge: recharge, fee: fee};
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getBalance = async (uuid_user) => {
    try {
      const [statement] = await connection.query(
        `SELECT saldo FROM billetera WHERE id_usuario = ?`,[uuid_user]);
  
      return statement[0];
      
    } catch (error) {
      throw new Error(error.message);
    }
  };


  export const rechargeWallet = async (uuid, uuid_wallet, schema, rechargeMoreBalance) => {
    try {
      const [statement] = await connection.query(
        `INSERT INTO recargas (id, id_billetera, metodo_pago,monto_recarga) VALUES (?, ?, ?, ?)`,
        [uuid, uuid_wallet, schema.metodo_pago,  rechargeMoreBalance]
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
  



