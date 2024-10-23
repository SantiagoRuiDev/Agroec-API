export const formatMailBuyer = (data) => {
  return `
  <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    </head>

    <body>

        <div class="email-template">
            <img src="https://i.imgur.com/NDDmRCB.png" class="email-image">
            <p>Hola <b>${data.razon_social}</b><br>
                <br> Recibimos la notificación de que has registrado en nuestros servicios recientemente.<br>
                <br> Queremos agradecerte y esperamos tengas una calida experiencia en la Aplicación.</p>

            <h3>Soporte via Email</h3>
            <ul>
                <li>Email: support@agroec.com</li>
            </ul>
            <h3>Soporte via Whatsapp</h3>
            <a href="https://wa.me/593963195377" target="_blank" class="button poppins-extrabold">
                <img src="https://imgs.search.brave.com/ZB2q5iKX6vjwe1vBMtuXAPEoKkUoMKKas30N_oyZGDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdG9jaGF0/LmJlL3doYXRzYXBw/LWljb24td2hpdGUu/cG5nP3c9OTAwJnNz/bD0x" class="button-image">
                Contactar
            </a>

            <h3>Siguenos en Redes</h3>
            <ul>
                <li>@Agroec</li>
            </ul>
        </div>

    </body>

    </html>

    <style>
        * {
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;
        }

        .email-image {
            max-height: 250px;
            position: absolute;
            top: 72px;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0px auto;
        }

        .email-template {
            position: relative;
            width: 80%;
            margin: 0px auto;
            background: #F5F5F5;
            border: rounded solid;
            border-radius: 16px;
            display: grid;
            margin-top: 20px;
            padding: 178px 8px 8px 8px;
        }

        .button-image {
            width: 32px;
            height: 32px;
        }

        .button {
            color: #5C832F;
            font-size: 16px;
            text-decoration: none;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            gap: 32px;
            font-weight: bold;
            text-align: center;
            padding: 8px;
            border: #5C832F solid;
            border-radius: 8px;
        }

        .poppins-extrabold {
            font-family: "Poppins", sans-serif;
            font-weight: 800;
            font-style: normal;
        }
    </style>
  `;
};
