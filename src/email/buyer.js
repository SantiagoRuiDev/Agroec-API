export const formatMailBuyer = (data) => {
  return `
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
      <img src="https://i.imgur.com/NDDmRCB.png" style="margin: 0 auto; width: 50%; height: 80%;">
      <p>Hola <b>${data.razon_social}</b><br>
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
};
