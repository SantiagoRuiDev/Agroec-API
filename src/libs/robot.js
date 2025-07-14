import * as licitationsModel from "../models/licitations.model.js";
import { scheduleJob } from "node-schedule";

export const checkForExpiredLicitations = async () => {
  try {
    const licitations = await licitationsModel.getAllLicitationsNotExpired();
    const today = new Date();

    for (const lic of licitations) {
      try {
        const vencimientoDate = new Date(lic.valida_hasta);
        console.log(`Fecha de vencimiento: ${vencimientoDate}`);
        console.log(`Fecha actual: ${today}`);

        if (vencimientoDate < today) {
          console.log(`Cerrando licitación caducada: ${lic.id}`);
          await licitationsModel.expireLicitationById(lic.id);
        }
      } catch (err) {
        console.error(`Error al procesar licitación ${lic.id}:`, err);
      }
    }
  } catch (error) {
    console.log("ERROR - Robot de Licitaciones" + error.message);
  }
};

// Programar la tarea diaria a las 3:00 AM //
scheduleJob("0 3 * * * *", async () => {
  console.log("Iniciando revisión diaria de licitaciones vencidas...");
  await checkForExpiredLicitations();
});
