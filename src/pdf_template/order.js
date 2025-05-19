function formatToUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getOrderTemplate(order) {
  return `
      <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comprobante de orden - Agroec</title>
  <style>
    * {
  box-sizing: border-box;
}
    .datatable, .wide-summary {
  page-break-inside: avoid;
}
@page {
  margin: 0;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
      background-color: #f9f9f9;
    }
    header, footer {
      font-size: 12px;
      color: #555;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

  td {
  word-break: break-word;
}

    .logo img {
      max-width: 150px;
      border-radius: 8px;
    }

    .title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #2c3e50;
    }

    .section-two-columns {
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      font-size: 13px;
    }

    .column {
      width: 48%;
      background-color: #fff;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    .column div {
      margin-bottom: 6px;
    }


    .datatable {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
      font-size: 13px;
      margin-bottom: 30px;
    }

    .datatable th, .datatable td {
      padding: 10px;
      text-align: center;
    }

    .datatable thead {
      background-color: #2c3e50;
      color: #fff;
    }

    .datatable tbody tr:nth-child(even) {
      background-color: #f2f6fa;
    }

    .datatable tbody tr:hover {
      background-color: #e3edf7;
    }

    .wide-summary {
      background-color: #fff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      font-size: 13px;
      margin-bottom: 30px;
    }

    .wide-summary div {
      margin-bottom: 6px;
    }

    footer {
      border-top: 1px solid #ccc;
      padding-top: 10px;
      text-align: center;
    }

    .footer-contact div {
      margin: 3px 0;
    }
   
  </style>
</head>
<body>
  <header>
    <div>
      <strong>Agroec</strong>
    </div>
    <div>
        <div>Identificador: ${order.order.id}</div>
        <div>Comprador: ${order.order.comprador_nombre}</div>
    </div>
  </header>

  <div class="title">Comprobante de Orden</div>

  <div class="logo" style="text-align: center; margin-bottom: 20px;">
    <img src="https://i.imgur.com/NDDmRCB.png" alt="Logo">
  </div>

    <div class="section-two-columns">
    <div class="column">
        <div><strong>Producto:</strong> ${order.order.producto}</div>
        <div><strong>Cantidad:</strong>${order.order.cantidad} ${
    order.order.cantidad_unidad
  }</div>
        <div><strong>Precio por unidad:</strong> ${formatToUSD(order.order.precio)} USD x ${
    order.order.precio_unidad
  }</div>
        <div><strong>Subtotal:</strong> ${
          formatToUSD(order.order.precio * order.order.condicion_cantidad)
        }</div>
    </div>
    <div class="column">
        <div><strong>Modo de pago:</strong> ${order.order.modo_pago}</div>
        <div><strong>Porcentaje inicial:</strong> ${
          order.order.porcentaje_inicial
        }%</div>
        <div><strong>Modo de pago final:</strong> ${
          order.order.modo_pago_final
        }</div>
        <div><strong>Porcentaje final:</strong> ${
          order.order.porcentaje_final
        }%</div>
    </div>
  </div>


  <div class="wide-summary">
    <div><strong>Notas:</strong> ${order.order.notas}</div>
    <div><strong>Vendedor:</strong> ${order.order.vendedor_nombre}</div>
    <div><strong>Total:</strong> ${
      formatToUSD(order.order.precio * order.order.condicion_cantidad)
    }</div>
  </div>

  <footer>
    <div class="footer-contact">
      <div>Agroec S.A. - Todos los derechos reservados © 2025</div>
      <div>www.agroec.com | soporte@agroec.com | +593 9 63195377</div>
    </div>
  </footer>

</body>
</html>
    `;
}
