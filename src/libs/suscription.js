import * as paymentCore from "../payments/index.js";
import * as suscriptionModel from "../models/suscription.model.js";
import { scheduleJob } from "node-schedule";

export const checkForUnpaidSuscriptions = async () => {
  try {
    const suscriptions = await suscriptionModel.getSuscriptions();
    const today = new Date();

    for (const sub of suscriptions) {
      // Crear objeto de fecha de vencimiento desde el campo "vencimiento"
      const vencimientoDate = new Date(sub.vencimiento);

      // Comparar solo las fechas (ignorando la hora)
      if (
        vencimientoDate.getFullYear() === today.getFullYear() &&
        vencimientoDate.getMonth() === today.getMonth() &&
        vencimientoDate.getDate() === today.getDate()
      ) {
        // Si está vencida, procesar el cobro
        console.log(`Procesando cobro para la suscripción: ${sub.id}`);

        // Llama al módulo de pagos
        const payment = await paymentCore.chargeCard(
          sub.valor,
          "Cobro de suscripción recurrente",
          sub.id_tarjeta,
          String(sub.numero_identificacion),
          "MEMBRESIA-" + Math.floor(Math.random() * 99999)
        );

        if (payment) {
          console.log(`Pago exitoso para la suscripción: ${sub.id}`);

          // Opcionalmente, actualizar el estado de la suscripción
          const limit_date = new Date();
          limit_date.setMonth(limit_date.getMonth() + sub.meses); // Sumar los meses del plan
          await suscriptionModel.updateSuscriptionDate(
            sub.id_usuario,
            limit_date
          ); // 1: Pagado
        } else {
          console.log(
            `Error al procesar el pago para la suscripción: ${sub.id}`
          );
        }
      }
    }
  } catch (error) {
    console.log("ERROR - Cobrador de suscripciones " + error.message);
  }
};

// Programar la tarea diaria a las 3:00 AM
scheduleJob("*/5 * * * * *", async () => {
  console.log("Iniciando revisión diaria de suscripciones vencidas...");
  await checkForUnpaidSuscriptions();
});
