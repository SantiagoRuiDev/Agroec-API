export function getOrderTemplate(order) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Order ${order.order.id}</title>
        </head>
        <body>
          <div style="width: 100%; margin: 20px; font-family: 'Arial', sans-serif;">
            <h1 style="color: #333333; text-align: center;">Orden de ${
              order.order.producto
            }</h1>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <!-- Identificador de Orden -->
              <tr>
                <th style="background-color: #4CAF50; color: white; padding: 10px; text-align: left;">Identificador de orden:</th>
                <td style="border: 1px solid #dddddd; padding: 10px;">${
                  order.order.id
                }</td>
              </tr>
  
              <!-- Información del vendedor -->
              <tr>
                <th style="background-color: #4CAF50; color: white; padding: 10px; text-align: left;">Información del vendedor:</th>
                <td style="border: 1px solid #dddddd; padding: 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Nombre y Apellido:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.vendedor_nombre
                      } ${order.order.vendedor_apellido}</td>
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
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.producto
                      }</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Cantidad:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.cantidad
                      } ${order.order.cantidad_unidad}</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Precio por unidad:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.precio
                      } ${order.order.precio_unidad}</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Subtotal:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.precio * order.order.condicion_cantidad
                      } USD</td>
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
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.modo_pago
                      }</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Porcentaje inicial:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.porcentaje_inicial
                      }%</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Modo de pago final:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.modo_pago_final
                      }</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Porcentaje final:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.porcentaje_final
                      }%</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Notas:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.notas
                      }</td>
                    </tr>
                    <tr>
                      <th style="background-color: #f2f2f2; padding: 10px;">Total:</th>
                      <td style="border: 1px solid #dddddd; padding: 10px;">${
                        order.order.precio * order.order.condicion_cantidad
                      } USD</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
      
      <style>
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
