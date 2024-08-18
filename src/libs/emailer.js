import nodemailer from "nodemailer";
import config, { APP_SETTINGS } from "./config.js";

export const sendMail = async (data) => {
  let transporter = nodemailer.createTransport({
    host: APP_SETTINGS.smtp_host,
    port: APP_SETTINGS.smtp_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: APP_SETTINGS.smtp_login, // generated ethereal user
      pass: APP_SETTINGS.smtp_pass, // generated ethereal password
    },
  });

  let htmlContent = `
  <html>
  <head>
      <style>
      * {
        font-family: sans-serif;
      }
      </style>
  </head>
  <body>
  <div style="width: 100%; display: grid;">
      <img src="https://i.imgur.com/NDDmRCB.png" style="margin: 0 auto;">
      <p>Hola <b>${data.nombre} ${data.apellido}</b><br>
          <br>
          Recibimos la notificación de que has registrado en nuestros servicios recientemente.<br>
          <br>
          Queremos agradecerte y esperamos tengas una calida experiencia en la Aplicación.</p>
  
      <h3>Contacta con autoridades Agroec</h3>
      <ul>
          <li>Email: support@agroec.com</li>
          <li>Telefono: +1 220 9182311</li>
      </ul>
  
      <h3>Siguenos en Redes</h3>
      <ul>
          <li>@Agroec</li>
      </ul>
  </div>
  </body>
  </html>
  
  `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    sender: 'contact@santiagorui.shop',
    from: 'Santiago <contact@santiagorui.shop>',
    to: data.correo, // list of receivers
    subject: "Agroec - Nuevo Registro ✔", // Subject line
    html: htmlContent,
  });
};