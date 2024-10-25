export function getOrderTemplate(order) {
  return `
      <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Order ${order.order.id}</title>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>

<body>
    <div class="order-template" style="width: 100%; font-family: 'Arial', sans-serif;">

        <img src="https://i.imgur.com/NDDmRCB.png" class="order-image">
        <h1 style="color: #333333; text-align: center;">Orden de ${ order.order.producto }
        </h1>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <!-- Identificador de Orden -->
            <tr>
                <th style="background-color: #4CAF50; color: white; padding: 10px; text-align: left;">Identificador de orden:</th>
                <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.id }
                </td>
            </tr>

            <!-- Información del vendedor -->
            <tr>
                <th style="background-color: #4CAF50; color: white; padding: 10px; text-align: left;">Información del vendedor:</th>
                <td style="border: 1px solid #dddddd; padding: 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Nombre y Apellido:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.vendedor_nombre } ${order.order.vendedor_apellido}</td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Detalles de la orden -->
            <tr>
                <th style="background-color: #4CAF50; color: white; padding: 10px; text-align: left;">Detalles de la orden:</th>
                <td style="border: 1px solid #dddddd; padding: 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Producto:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.producto }
                            </td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Cantidad:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.cantidad } ${order.order.cantidad_unidad}</td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Precio por unidad:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.precio } ${order.order.precio_unidad}</td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Subtotal:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.precio * order.order.condicion_cantidad } USD</td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Información de pago -->
            <tr>
                <th style="background-color: #4CAF50; color: white; padding: 10px; text-align: left;">Información de pago:</th>
                <td style="border: 1px solid #dddddd; padding: 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Modo de pago:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.modo_pago }
                            </td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Porcentaje inicial:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.porcentaje_inicial }%
                            </td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Modo de pago final:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.modo_pago_final }
                            </td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Porcentaje final:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.porcentaje_final }%
                            </td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Notas:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.notas }
                            </td>
                        </tr>
                        <tr>
                            <th style="background-color: #f2f2f2; padding: 10px;">Total:</th>
                            <td style="border: 1px solid #dddddd; padding: 10px;">${ order.order.precio * order.order.condicion_cantidad } USD</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>

<style>
    .order-template {
        display: grid;
        justify-content: center;
    }
    * {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .order-image {
        max-height: 250px;
        top: 72px;
        margin: 0px auto;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    th {
        font-weight: bold;
        text-align: left;
    }

    td {
        padding: 8px;
    }
</style>
    `;
}
