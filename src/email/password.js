export const formatPasswordMail = (data) => {
    return `
      <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
  </head>
  
  <body style="font-family: 'Poppins', sans-serif; font-weight: 400; font-style: normal; background-color: #F5F5F5; padding: 20px;">
  
      <div style="max-width: 600px; margin: 0 auto; background: #F5F5F5; border-radius: 16px; padding: 20px; text-align: center;">
          <img src="https://i.imgur.com/NDDmRCB.png" alt="Agroec" style="max-height: 250px; margin: 0 auto;">
          <p style="font-size: 16px; line-height: 24px; color: #333;">
              Una cuenta registrada con el correo <strong>${data.correo}</strong>, ha solicitado un cambio de contraseña.<br><br>
              Te hemos asignado esta contraseña temporal, porfavor cambiala por una personal <strong>${data.clave}</strong>
          </p>
  
          <h3 style="font-size: 20px; color: #333;">Soporte via Email</h3>
          <ul style="list-style-type: none; padding: 0;">
              <li style="font-size: 16px; color: #333;">Email: support@agroec.com</li>
          </ul>
  
          <h3 style="font-size: 20px; color: #333;">Soporte via Whatsapp</h3>
          <a href="https://wa.me/593963195377" target="_blank" style="color: #5C832F; font-size: 16px; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center, place-content: center; gap: 8px; border: 2px solid #5C832F; padding: 10px 20px; border-radius: 8px;">
              <img src="https://imgs.search.brave.com/ZB2q5iKX6vjwe1vBMtuXAPEoKkUoMKKas30N_oyZGDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdG9jaGF0/LmJlL3doYXRzYXBw/LWljb24td2hpdGUu/cG5nP3c9OTAwJnNz/bD0x" alt="Whatsapp" style="width: 32px; height: 32px;">
              Contactar
          </a>
  
          <h3 style="font-size: 20px; color: #333;">Síguenos en Redes</h3>
          <ul style="list-style-type: none; padding: 0;">
              <li style="font-size: 16px; color: #333;">@Agroec</li>
          </ul>
      </div>
  
  </body>
  
  </html>
  `;
  };
  