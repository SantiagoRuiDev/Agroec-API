import nodemailer from "nodemailer";
import { APP_SETTINGS } from "./config.js";

export const sendMail = async (title, format, email) => {
  return;
  let transporter = nodemailer.createTransport({
    host: APP_SETTINGS.smtp_host,
    port: APP_SETTINGS.smtp_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: APP_SETTINGS.smtp_login, // generated ethereal user
      pass: APP_SETTINGS.smtp_pass, // generated ethereal password
    },
  });

  let htmlContent = format;

  // send mail with defined transport object
  await transporter.sendMail({
    sender: 'contact@santiagorui.shop',
    from: 'Santiago <contact@santiagorui.shop>',
    to: email, // list of receivers
    subject: title, // Subject line
    html: htmlContent,
  });
};