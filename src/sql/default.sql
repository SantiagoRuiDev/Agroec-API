-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2024 a las 01:01:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asociacion`
--

CREATE TABLE `asociacion` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asociacion`
--

INSERT INTO `asociacion` (`id`, `nombre`) VALUES
('db1b3007-2285-4580-a7e7-106857a17ff0', 'Agricultores SA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `billetera`
--

CREATE TABLE `billetera` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `saldo` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `billetera`
--

INSERT INTO `billetera` (`id`, `id_usuario`, `saldo`) VALUES
('b0572fcd-314b-406b-bcb8-e3710d91c312', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 63),
('c0532fcd-314b-406b-bcb8-e3710d91c312', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 1563);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `id` varchar(250) NOT NULL,
  `puntaje` tinyint(4) NOT NULL DEFAULT 1,
  `id_calificado` varchar(250) NOT NULL,
  `id_calificante` varchar(250) NOT NULL,
  `id_orden` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificacion`
--

INSERT INTO `calificacion` (`id`, `puntaje`, `id_calificado`, `id_calificante`, `id_orden`) VALUES
('da2c88c8-0c71-4d48-a314-4455ea21f891', 2, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `imagen` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `imagen`) VALUES
('cat_fertilizantes', 'Fertilizantes', 'Insumos.svg'),
('cat_gestion', 'Gestión', 'Aso.svg'),
('cat_quimica', 'Quimica', 'Defensive.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_insumos`
--

CREATE TABLE `categoria_insumos` (
  `id` varchar(250) NOT NULL,
  `icono` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_insumos`
--

INSERT INTO `categoria_insumos` (`id`, `icono`) VALUES
('Defensivos', 'Defensive.svg'),
('Fertilizantes', 'Fertilizer.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id` varchar(250) NOT NULL,
  `id_comprador` varchar(250) DEFAULT NULL,
  `id_vendedor` varchar(250) DEFAULT NULL,
  `push_notificacion` tinyint(1) DEFAULT NULL,
  `id_condiciones` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id`, `id_comprador`, `id_vendedor`, `push_notificacion`, `id_condiciones`) VALUES
('03184585-fe17-444a-a6c8-61b66b6a998e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, 'bc5cec82-e0bf-4d8d-a070-5288b5147280'),
('107013f0-4a54-4441-ad99-55161efbbe9c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, 'c6e697d5-90fc-412d-a262-1f25172e4ea1'),
('2943eaef-834f-42e0-9e9d-0419164e4c24', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e'),
('34e24bbc-97a8-4340-9507-986b60003879', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4'),
('536d4c80-20f3-498f-8900-f997c616d912', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, '73751a53-ff26-496c-95df-f78062822468'),
('754bd3e1-358d-485b-9bc5-22b02b31ed29', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, 'db47147f-2b21-4b94-914b-de32238b1c2c'),
('ddd56dd0-b178-4d42-a21b-bca852185de3', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', NULL, '02b4e9d0-8ecb-49b8-859c-d454aff20f6a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_telefonicos`
--

CREATE TABLE `codigos_telefonicos` (
  `id` varchar(250) NOT NULL,
  `codigo` varchar(13) NOT NULL,
  `id_usuario` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_contiene_calidad`
--

CREATE TABLE `compra_contiene_calidad` (
  `id_parametros` varchar(250) NOT NULL,
  `id_compra` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compra_contiene_calidad`
--

INSERT INTO `compra_contiene_calidad` (`id_parametros`, `id_compra`) VALUES
('10a7230f-c779-43fa-ba19-07070a41a4d1', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condiciones_compra`
--

CREATE TABLE `condiciones_compra` (
  `id` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `precio` decimal(10,0) DEFAULT 0,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `cantidad` decimal(10,0) DEFAULT 0,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `modo_pago` enum('Modo Garantía','Pago en sitio','Pago a crédito') NOT NULL DEFAULT 'Modo Garantía',
  `porcentaje_inicial` decimal(10,0) NOT NULL DEFAULT 0,
  `modo_pago_final` enum('Pago en sitio','Pago a crédito') NOT NULL DEFAULT 'Pago en sitio',
  `porcentaje_final` decimal(10,0) NOT NULL DEFAULT 0,
  `notas` text,
  `precio_puesto_domicilio` tinyint(1) NOT NULL DEFAULT 0,
  `politicas_recepcion` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `condiciones_compra`
--

INSERT INTO `condiciones_compra` (`id`, `id_producto`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `modo_pago`, `porcentaje_inicial`, `modo_pago_final`, `porcentaje_final`, `notas`, `precio_puesto_domicilio`, `politicas_recepcion`) VALUES
('02b4e9d0-8ecb-49b8-859c-d454aff20f6a', 'Tomate', 0, 'KG', 0, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, ''),
('73751a53-ff26-496c-95df-f78062822468', 'Tomate', 250, 'KG', 200, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, '', 0, 'Necesito que se cumpla los tiempos de entrega pactados.'),
('b75501ae-fe6a-49a2-9c28-c40283bcf2d4', 'Maiz', 13, 'QQ', 150, 'QQ', 'Pago en sitio', 0, 'Pago en sitio', 0, 'Cumplir condiciones de compra', 1, 'Necesito que se cumpla con los tiempos de entrega determinados por el comprador.'),
('bc5cec82-e0bf-4d8d-a070-5288b5147280', 'Tomate', 0, 'KG', 0, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, ''),
('c6e697d5-90fc-412d-a262-1f25172e4ea1', 'Tomate', 0, 'KG', 0, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, ''),
('db47147f-2b21-4b94-914b-de32238b1c2c', 'Tomate', 25, 'KG', 100, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, 'Entregar a tiempo.', 0, 'No tengo políticas de recepción definidas'),
('ff6d9dd4-01fd-4220-85df-1ac00a199a6e', 'Maiz', 25, 'KG', 250, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, 'No hay comentarios adicionales.', 0, 'Respeta las cantidades definidas por producto.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion_contiene_parametros`
--

CREATE TABLE `condicion_contiene_parametros` (
  `id` varchar(250) NOT NULL,
  `id_parametros` varchar(250) NOT NULL,
  `id_condicion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `condicion_contiene_parametros`
--

INSERT INTO `condicion_contiene_parametros` (`id`, `id_parametros`, `id_condicion`) VALUES
('0a75fcbd-0fbf-47b3-a4e0-746d533088cf', '54f8b16e-93a4-4841-bb04-dffb81b29c96', 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4'),
('1edbb3a6-0e76-4b9d-9897-6c8b861e3608', '090c9231-c34f-49f9-b76f-4e2bdeaadbe3', '73751a53-ff26-496c-95df-f78062822468'),
('865321311212121', '10a7230f-c779-43fa-ba19-07070a41a4d1', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_bancaria`
--

CREATE TABLE `cuenta_bancaria` (
  `id` varchar(250) NOT NULL,
  `tipo_de_cuenta` varchar(20) NOT NULL,
  `tipo_de_banco` varchar(30) NOT NULL,
  `numero_de_cuenta` int(50) NOT NULL,
  `seleccionar_banco` varchar(40) NOT NULL,
  `tipo_de_documento` varchar(50) NOT NULL,
  `numero_de_documento` int(50) NOT NULL,
  `nombre_del_propietario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuenta_bancaria`
--

INSERT INTO `cuenta_bancaria` (`id`, `tipo_de_cuenta`, `tipo_de_banco`, `numero_de_cuenta`, `seleccionar_banco`, `tipo_de_documento`, `numero_de_documento`, `nombre_del_propietario`) VALUES
('3b32e7e2-0ee3-49fe-af58-2042d07cc5e4', 'Ahorro', 'Nacional', 3321333, 'A', 'RUC', 67567657, 'Ramiro Lopez'),
('e4569839-638b-4f03-92ca-44217c2b0719', 'Ahorro', 'Nacional', 88889999, 'A', 'RUC', 13435, 'Pedro Ramirez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devoluciones`
--

CREATE TABLE `devoluciones` (
  `id` varchar(250) NOT NULL,
  `id_billetera` varchar(250) NOT NULL,
  `monto_devolucion` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `devoluciones`
--

INSERT INTO `devoluciones` (`id`, `id_billetera`, `monto_devolucion`, `fecha`) VALUES
('23ea0959-326c-4528-9fd0-f3702c241809', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 2500, '2024-09-14 20:07:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entregas`
--

CREATE TABLE `entregas` (
  `id` varchar(250) NOT NULL,
  `id_punto` varchar(250) NOT NULL,
  `id_condicion` varchar(250) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') DEFAULT 'KG',
  `fecha_entrega` date NOT NULL,
  `hora_entrega` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entregas`
--

INSERT INTO `entregas` (`id`, `id_punto`, `id_condicion`, `cantidad`, `cantidad_unidad`, `fecha_entrega`, `hora_entrega`) VALUES
('050a772b-c8e2-4acf-adbd-cc96404cac79', 'de92k121s3212', '73751a53-ff26-496c-95df-f78062822468', 250, 'KG', '2024-03-19', '05:30:00'),
('163dc5bd-9757-48c3-b290-78f9ca5cfe45', 'de92k121s3212', 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4', 150, 'QQ', '2024-09-25', '20:30:00'),
('16a0f30b-e07d-4632-930b-12ff59d287e7', 'de92k121s3212', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e', 250, 'KG', '2025-10-20', '10:30:00'),
('46d280af-cf68-477d-a9d0-081c89037248', 'de92k121s3212', 'db47147f-2b21-4b94-914b-de32238b1c2c', 100, 'KG', '2024-11-19', '20:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_ordenes`
--

CREATE TABLE `estado_ordenes` (
  `id` varchar(250) NOT NULL,
  `id_orden` varchar(250) NOT NULL,
  `estado` enum('Pendiente de entrega','En camino','En espera','Aceptado','Rechazado') NOT NULL DEFAULT 'Pendiente de entrega',
  `motivo` enum('','Rechazado por calidad','Nunca llegó') NOT NULL DEFAULT '',
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_ordenes`
--

INSERT INTO `estado_ordenes` (`id`, `id_orden`, `estado`, `motivo`, `fecha`) VALUES
('0281a5fb-c087-4fef-9e3d-c075f64bf165', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'Rechazado', 'Nunca llegó', '2024-09-25 14:37:35'),
('3be9b29a-e5b4-4cb5-a3a6-833ad1a1f519', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'En camino', '', '2024-09-25 14:37:35'),
('704a17e0-9039-4c9c-9b0a-c5946f419093', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'Aceptado', '', '2024-09-24 23:18:27'),
('b426bf6e-ecb7-41c2-94f0-38ae244850d3', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'Pendiente de entrega', '', '2024-09-24 23:18:10'),
('cbaae205-9eea-4187-8ad2-6cfe32e6a42d', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'En camino', '', '2024-09-24 23:18:27'),
('ef3831fd-e1d2-48b5-9920-a491cd78e666', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'Pendiente de entrega', '', '2024-09-25 14:37:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fee`
--

CREATE TABLE `fee` (
  `id` varchar(250) NOT NULL,
  `id_entrega` varchar(250) NOT NULL,
  `id_billetera` varchar(250) NOT NULL,
  `monto_fee` float NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fee`
--

INSERT INTO `fee` (`id`, `id_entrega`, `id_billetera`, `monto_fee`, `fecha`) VALUES
('d01b7471-56c4-4b4f-ba6a-0c8dfe56909c', '050a772b-c8e2-4acf-adbd-cc96404cac79', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 937.5, '2024-10-11 10:32:57'),
('fee28cca-5578-4b79-ab1d-8b490b2cf0b1', '050a772b-c8e2-4acf-adbd-cc96404cac79', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 937.5, '2024-10-23 16:34:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `categoria_insumo` varchar(250) NOT NULL,
  `nombre_comercial` varchar(50) NOT NULL,
  `precio_agroec` int(11) NOT NULL,
  `precio_mas_iva` tinyint(1) NOT NULL,
  `incluido_iva` tinyint(1) NOT NULL,
  `precio_punto_venta` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `composicion` varchar(50) NOT NULL,
  `clase` varchar(50) NOT NULL,
  `tipo_formula` varchar(50) NOT NULL,
  `titular` varchar(50) NOT NULL,
  `clasificacion` varchar(50) NOT NULL,
  `instrucciones_de_uso` varchar(50) NOT NULL,
  `epoca_intervalo` varchar(50) NOT NULL,
  `intervalo_entrada` varchar(50) NOT NULL,
  `link` text NOT NULL,
  `atencion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`id`, `id_usuario`, `categoria_insumo`, `nombre_comercial`, `precio_agroec`, `precio_mas_iva`, `incluido_iva`, `precio_punto_venta`, `stock`, `composicion`, `clase`, `tipo_formula`, `titular`, `clasificacion`, `instrucciones_de_uso`, `epoca_intervalo`, `intervalo_entrada`, `link`, `atencion`) VALUES
('0982bc5e-0020-4ba0-b503-0a09fdd51a5c', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Fertilizantes', '1,4 SIGHT', 7999, 1, 0, 1999, 64, 'Agrx93', 'C', 'dDKkd', 'Agro Ligth', 'Recomendada', 'Aplicar sobre plantas', 'AAA', 'A', 'https:link.fertilizantes', 'Mantener fuera del alcance de los niños'),
('1a46f557-ace9-453a-a79e-f5f845160639', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Defensivos', '2,4D AMINA CCAB', 4999, 0, 1, 3999, 59, 'Agrx93', 'C', 'dDKkd', 'Agro Ligth', 'Recomendada', 'Aplicar sobre plantas', 'AAA', 'A', 'https:link.fertilizantes', 'Mantener fuera del alcance de los niños');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos_imagenes`
--

CREATE TABLE `insumos_imagenes` (
  `id` varchar(250) NOT NULL,
  `id_insumo` varchar(250) NOT NULL,
  `url_imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos_imagenes`
--

INSERT INTO `insumos_imagenes` (`id`, `id_insumo`, `url_imagen`) VALUES
('x0312034-az18-41b2-8403-c19fa4b443ec', '1a46f557-ace9-453a-a79e-f5f845160639', 'https://imgs.search.brave.com/iHDC8-BzsJvkUJjaeubE393aeux3uI9xxJFrDEqma9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmFlZ3JvLmNvbS5i/ci93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OC8wNy81LWV4dHJh/dG8tcGlyb2xlbmhv/c28tZGVmZW5zaXZv/LW5hdHVyYWwuanBn');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interes_contiene_calidad`
--

CREATE TABLE `interes_contiene_calidad` (
  `id_parametros` varchar(250) NOT NULL,
  `id_interes` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licitacion_contiene_calidad`
--

CREATE TABLE `licitacion_contiene_calidad` (
  `id_parametros` varchar(250) NOT NULL,
  `id_licitacion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `licitacion_contiene_calidad`
--

INSERT INTO `licitacion_contiene_calidad` (`id_parametros`, `id_licitacion`) VALUES
('7c7f2221-9277-4174-86e4-ccac77b235bc', '275ad1f4-5936-4675-b083-391b596e645e');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` varchar(250) NOT NULL,
  `id_remitente` varchar(250) NOT NULL,
  `id_chat` varchar(250) NOT NULL,
  `texto` varchar(150) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_remitente`, `id_chat`, `texto`, `fecha`) VALUES
('50a9906d-af2c-4603-9766-bba723d5fb10', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '754bd3e1-358d-485b-9bc5-22b02b31ed29', 'Hola que tal, podemos seguir con la venta.', '2024-10-10 13:26:46'),
('6807db0b-487b-4d36-995a-2f8012718c14', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '34e24bbc-97a8-4340-9507-986b60003879', 'Hola, hazme saber cuando revises mi propuesta!', '2024-09-10 00:00:00'),
('6a7b89ef-1bfa-42f3-8242-0850466b4033', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Perfecto, estoy pensando en realizar tres entregas para esta propuesta', '2024-10-19 10:23:43'),
('774cab9d-4415-4b7b-b7f9-14872a26b96c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '34e24bbc-97a8-4340-9507-986b60003879', 'Haremos el intercambiO?', '2024-09-11 09:38:13'),
('ba98ac84-05c5-4da5-8ee5-ef2151208304', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Voy a revisar tus condiciones', '2024-10-19 10:22:54'),
('c8e33e95-762d-4cb8-8b19-51a7a3e6ed05', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Hola, respondeme cuando veas este mensaje', '2024-09-11 09:35:07'),
('d1d21462-332e-4d80-9494-71c545419bb4', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '34e24bbc-97a8-4340-9507-986b60003879', 'Hola, he recibido tu propuesta, te ofrezco 17.50 en mi planta.', '2024-09-10 20:33:01'),
('e4457f24-3ce7-4abd-b8e9-340ee6ee91cd', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Si, hagamos el intercambio', '2024-09-30 00:49:13'),
('j3k21e95-762d-4cb8-8b19-51a7a3e6ed06', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Hola, que tal, como gustas seguir la negociación?', '2024-09-30 00:49:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `tipo_pago` varchar(50) NOT NULL,
  `monto_recarga` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multiusuarios`
--

CREATE TABLE `multiusuarios` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_rol` varchar(250) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `multiusuarios`
--

INSERT INTO `multiusuarios` (`id`, `id_usuario`, `id_rol`, `nombre`, `correo`, `clave`) VALUES
('7aaea9a1-8847-4f43-ae82-c8b3bfc20c5c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Gerente General', 'Oscar Meza', 'oscar@gmail.com', '$2b$10$qjDCmC2Dwu.FuqKVVYbixe1YjJZCYwaj254XuzTYPAv2W63IokE.i');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` varchar(255) NOT NULL,
  `id_notificado` varchar(255) NOT NULL,
  `id_producto` varchar(255) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `vista` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_notificado`, `id_producto`, `fecha`, `vista`) VALUES
('05a4d9d1-7daf-4d96-9d12-38c522bbe563', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Tomate', '2024-10-11', 1),
('3eeabf36-7677-4f7d-8f5f-b3b83511c388', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Tomate', '2024-10-09', 1),
('5a8034a9-a48a-4066-b1ed-45555dfe907b', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Tomate', '2024-10-09', 1),
('bd5c07e5-edc5-4c6c-a7ee-6592e19f43a4', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maiz', '2024-10-19', 1),
('dceb6614-d55c-41f9-ae37-5a3e9c490e6b', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Tomate', '2024-10-23', 0),
('e90b65ff-dcae-4509-9c99-5193053604de', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Tomate', '2024-10-18', 0),
('edd46729-369c-4785-9c33-a3cab7db13e3', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Tomate', '2024-10-10', 1),
('f74d2998-88b1-4253-a34c-6c44d95ad22b', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', '2024-10-19', 0),
('fa468afd-f76a-4911-b286-061e306afd8f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maiz', '2024-10-11', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_chat`
--

CREATE TABLE `notificaciones_chat` (
  `id` varchar(250) NOT NULL,
  `id_notificacion` varchar(250) NOT NULL,
  `id_chat` varchar(250) NOT NULL,
  `mensaje` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones_chat`
--

INSERT INTO `notificaciones_chat` (`id`, `id_notificacion`, `id_chat`, `mensaje`) VALUES
('0f3a02a8-2849-4ad8-8ad2-a1824051e7d7', 'bd5c07e5-edc5-4c6c-a7ee-6592e19f43a4', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Has recibido un mensaje del chat #2943eaef'),
('5f7d4db6-d332-4c64-9220-0a3035dced01', 'edd46729-369c-4785-9c33-a3cab7db13e3', '754bd3e1-358d-485b-9bc5-22b02b31ed29', 'Has recibido un mensaje del chat #754bd3e1'),
('c7db983e-2eab-4d32-9054-2b62ba123b90', 'f74d2998-88b1-4253-a34c-6c44d95ad22b', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Has recibido un mensaje del chat #2943eaef');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_garantias`
--

CREATE TABLE `notificaciones_garantias` (
  `id` varchar(255) NOT NULL,
  `id_notificacion` varchar(255) NOT NULL,
  `id_garantia` varchar(255) NOT NULL,
  `mensaje` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_ordenes`
--

CREATE TABLE `notificaciones_ordenes` (
  `id` varchar(250) NOT NULL,
  `id_notificacion` varchar(250) NOT NULL,
  `id_orden` varchar(250) NOT NULL,
  `mensaje` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones_ordenes`
--

INSERT INTO `notificaciones_ordenes` (`id`, `id_notificacion`, `id_orden`, `mensaje`) VALUES
('202ea4ab-0f9f-47e1-a448-91830d646dbb', 'dceb6614-d55c-41f9-ae37-5a3e9c490e6b', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'Pago de fee Agroec completado'),
('65bd046f-f1f8-4eee-b5ff-a9ada782238e', '05a4d9d1-7daf-4d96-9d12-38c522bbe563', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'Pago de fee Agroec completado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_propuesta_compra`
--

CREATE TABLE `notificaciones_propuesta_compra` (
  `id` varchar(255) NOT NULL,
  `id_notificacion` varchar(255) NOT NULL,
  `id_propuesta` varchar(255) NOT NULL,
  `mensaje` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones_propuesta_compra`
--

INSERT INTO `notificaciones_propuesta_compra` (`id`, `id_notificacion`, `id_propuesta`, `mensaje`) VALUES
('aa4b68c6-7be0-47dc-addf-b66d5c34e265', 'fa468afd-f76a-4911-b286-061e306afd8f', '19f2b62e-2894-40d5-94f3-fa1e4482e29d', 'El comprador ha aceptado la propuesta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_propuesta_venta`
--

CREATE TABLE `notificaciones_propuesta_venta` (
  `id` varchar(255) NOT NULL,
  `id_notificacion` varchar(255) NOT NULL,
  `id_propuesta` varchar(255) NOT NULL,
  `mensaje` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones_propuesta_venta`
--

INSERT INTO `notificaciones_propuesta_venta` (`id`, `id_notificacion`, `id_propuesta`, `mensaje`) VALUES
('1802e4dd-66c5-4a9f-94d4-2b0e36a9ba33', 'e90b65ff-dcae-4509-9c99-5193053604de', 'bf7be359-4abb-4b62-98aa-4390eff6fb6d', NULL),
('2e1440f9-d65f-4e2b-adab-d2f062cef418', '5a8034a9-a48a-4066-b1ed-45555dfe907b', '9387c739-f768-4f22-99d6-0858aae8ce35', 'Has recibido una nueva propuesta de venta'),
('2f1e8b13-0f0a-4f50-b281-535d98f7f80e', '3eeabf36-7677-4f7d-8f5f-b3b83511c388', '9a5a320a-2895-4baf-ad8f-4a4d6286ec4e', 'Has recibido una nueva propuesta de venta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id` varchar(250) NOT NULL,
  `id_comprador` varchar(250) NOT NULL,
  `id_vendedor` varchar(250) NOT NULL,
  `id_entrega` varchar(250) NOT NULL,
  `estado` enum('En espera','Pago en garantia','Pendiente de entrega','En camino','Rechazado','Aceptado') DEFAULT 'Pago en garantia',
  `cantidad_recibida` int(11) NOT NULL DEFAULT 0,
  `creado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `id_comprador`, `id_vendedor`, `id_entrega`, `estado`, `cantidad_recibida`, `creado`) VALUES
('30259de2-4997-46de-8ea0-ec60b4b71b82', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '050a772b-c8e2-4acf-adbd-cc96404cac79', 'Aceptado', 200, '2024-09-21 19:30:58'),
('cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '163dc5bd-9757-48c3-b290-78f9ca5cfe45', 'Rechazado', 0, '2024-09-20 23:49:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_garantia`
--

CREATE TABLE `pago_garantia` (
  `id` varchar(250) NOT NULL,
  `id_condicion` varchar(250) NOT NULL,
  `porcentaje` decimal(10,0) NOT NULL,
  `metodo_pago` enum('TD/TC','TRANSFERENCIA') NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `devolucion` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago_garantia`
--

INSERT INTO `pago_garantia` (`id`, `id_condicion`, `porcentaje`, `metodo_pago`, `total`, `fecha`, `devolucion`) VALUES
('75c34c40-128b-4a45-a83d-f69fb2956eda', '73751a53-ff26-496c-95df-f78062822468', 20, 'TD/TC', 10000, '2024-09-24 23:18:10', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros_calidad`
--

CREATE TABLE `parametros_calidad` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `min_calidad` int(11) NOT NULL,
  `max_calidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `parametros_calidad`
--

INSERT INTO `parametros_calidad` (`id`, `id_usuario`, `nombre`, `min_calidad`, `max_calidad`) VALUES
('090c9231-c34f-49f9-b76f-4e2bdeaadbe3', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 18),
('10a7230f-c779-43fa-ba19-07070a41a4d1', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 1),
('3c1206ca-88d6-4fcc-b0a2-7340d1d0f685', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 1),
('54f8b16e-93a4-4841-bb04-dffb81b29c96', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 15),
('6a2f602c-bf7c-4e82-94b6-d0f8db74f353', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Granulado', 5, 25),
('7c7f2221-9277-4174-86e4-ccac77b235bc', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Granulado', 25, 50),
('85a6cba3-3972-4d41-b4d2-db6bb3e4c787', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Granulado', 24, 26),
('e27dd533-7180-449a-aa82-870ab2ac732d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 1),
('e385ffca-b643-4922-9814-d6e7fa0c5140', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Aflaxtoxinas', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_agricultor`
--

CREATE TABLE `perfil_agricultor` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_cuenta_bancaria` varchar(250) NOT NULL,
  `tipo_perfil` enum('Agricultor') NOT NULL DEFAULT 'Agricultor',
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `numero_hectareas` decimal(10,0) DEFAULT NULL,
  `cantidad_hectareas_siembras` decimal(10,0) DEFAULT NULL,
  `id_asociacion` varchar(100) DEFAULT NULL,
  `nueva_asociacion` varchar(255) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_asociacion_agricola`
--

CREATE TABLE `perfil_asociacion_agricola` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_cuenta_bancaria` varchar(250) NOT NULL,
  `tipo_perfil` enum('Asociación Agrícola') NOT NULL DEFAULT 'Asociación Agrícola',
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `centro_acopio` tinyint(1) DEFAULT NULL,
  `capacidad_secado` decimal(10,0) DEFAULT NULL,
  `capacidad_almacenamiento` tinyint(1) DEFAULT NULL,
  `capacidad` decimal(10,0) DEFAULT NULL,
  `numero_hectareas` decimal(10,0) DEFAULT NULL,
  `cantidad_hectareas_siembras` decimal(10,0) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_comerciante`
--

CREATE TABLE `perfil_comerciante` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_cuenta_bancaria` varchar(250) NOT NULL,
  `tipo_perfil` enum('Comerciante') NOT NULL DEFAULT 'Comerciante',
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `centro_acopio` tinyint(1) DEFAULT NULL,
  `capacidad_secado` decimal(10,0) DEFAULT NULL,
  `capacidad_almacenamiento` tinyint(1) DEFAULT NULL,
  `capacidad` decimal(10,0) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_comerciante`
--

INSERT INTO `perfil_comerciante` (`id`, `id_usuario`, `id_cuenta_bancaria`, `tipo_perfil`, `nombre`, `apellido`, `centro_acopio`, `capacidad_secado`, `capacidad_almacenamiento`, `capacidad`, `acceso_internet`) VALUES
('464e5614-230d-4639-aa91-098995c44b91', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'e4569839-638b-4f03-92ca-44217c2b0719', 'Comerciante', 'Pedro', 'Ramirez', 5, 4, 1, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_comerciante_agroquimicos`
--

CREATE TABLE `perfil_comerciante_agroquimicos` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_cuenta_bancaria` varchar(250) NOT NULL,
  `tipo_perfil` enum('Comerciante Agroquímicos') NOT NULL DEFAULT 'Comerciante Agroquímicos',
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `numero_hectareas` decimal(10,0) DEFAULT NULL,
  `cantidad_hectareas_siembras` decimal(10,0) DEFAULT NULL,
  `id_asociacion` varchar(100) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_comprador`
--

CREATE TABLE `perfil_comprador` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `razon_social` varchar(50) NOT NULL,
  `actividad_economica` text DEFAULT NULL,
  `tipo_negocio` enum('Industrial','Comercial','Intermediario') DEFAULT NULL,
  `consumo_mes_tm` decimal(10,0) DEFAULT NULL,
  `consumo_anual` decimal(10,0) DEFAULT NULL,
  `presupuesto_mes` decimal(10,0) DEFAULT NULL,
  `politicas_recepcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_comprador`
--

INSERT INTO `perfil_comprador` (`id`, `id_usuario`, `razon_social`, `actividad_economica`, `tipo_negocio`, `consumo_mes_tm`, `consumo_anual`, `presupuesto_mes`, `politicas_recepcion`) VALUES
('2a01d9fa-95fe-42b9-81bd-900b5c1e0b02', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'La Cerealera', 'Cereales y Agricolas', 'Industrial', 25000, 5600000, 100000, 'Productos de Calidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `imagen` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `imagen`) VALUES
('Arroz', 'Arroz', 'http://localhost:3000/public/images/products/Arroz.svg'),
('Cacao', 'Cacao', 'http://localhost:3000/public/images/products/Cacao.svg'),
('Maiz', 'Maiz', 'http://localhost:3000/public/images/products/Maiz.svg'),
('Maracuya', 'Maracuya', 'http://localhost:3000/public/images/products/Maracuya.svg'),
('Polvillo de Arroz', 'Polvillo de Arroz', 'http://localhost:3000/public/images/products/Polvillo.svg'),
('Tomate', 'Tomate', 'http://localhost:3000/public/images/products/Tomate.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_interes`
--

CREATE TABLE `productos_interes` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `producto_id` varchar(250) NOT NULL,
  `parametros_calidad` tinyint(1) NOT NULL,
  `aplica_tabla_castigos` tinyint(1) NOT NULL,
  `url_tabla_castigos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_listados`
--

CREATE TABLE `productos_listados` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_listados`
--

INSERT INTO `productos_listados` (`id`, `nombre`) VALUES
('Avena', 'Avena'),
('Cafe', 'Cafe'),
('Cebada', 'Cebada'),
('Frijol', 'Frijol'),
('Soja', 'Soja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_vender_imagenes`
--

CREATE TABLE `productos_vender_imagenes` (
  `id` varchar(250) NOT NULL,
  `id_venta` varchar(250) NOT NULL,
  `url_imagen` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_vender_imagenes`
--

INSERT INTO `productos_vender_imagenes` (`id`, `id_venta`, `url_imagen`) VALUES
('18fbcdf9-64ad-4202-8a95-4380f63c7537', '69aca895-621d-43d7-a7bf-18560f12bbb0', 'http://localhost:3000/public/images/sales/sale-image-1729774435678-156375135.webp'),
('73462676-7dfb-42b7-a3f6-babbd4c7aa67', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'http://localhost:3000/public/images/sales/sale-image-1724713051475-818296024.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_licitar`
--

CREATE TABLE `producto_licitar` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'QQ',
  `cantidad` decimal(10,0) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'QQ',
  `presentacion_entrega` varchar(255) NOT NULL,
  `valida_hasta` date NOT NULL,
  `informacion_adicional` text DEFAULT NULL,
  `estado` enum('Abierta','Cerrada','Caducada','Cumplida','Eliminada') NOT NULL DEFAULT 'Abierta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_licitar`
--

INSERT INTO `producto_licitar` (`id`, `id_usuario`, `id_producto`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `presentacion_entrega`, `valida_hasta`, `informacion_adicional`, `estado`) VALUES
('275ad1f4-5936-4675-b083-391b596e645e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Tomate', 25, 'KG', 250, 'KG', 'En bolsas de 100 libras', '2024-12-10', 'Precio Negociable', 'Abierta'),
('48b3ffd8-ae89-4857-969a-0823f8dbb45e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maracuya', 200, 'QQ', 5000, 'QQ', 'En sacos de 100 libras', '2025-02-20', 'Precio Negociable', 'Eliminada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_vender`
--

CREATE TABLE `producto_vender` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `cantidad` decimal(10,0) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `presentacion_entrega` varchar(255) NOT NULL,
  `fecha_entrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_vender`
--

INSERT INTO `producto_vender` (`id`, `id_usuario`, `id_producto`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `presentacion_entrega`, `fecha_entrega`) VALUES
('69aca895-621d-43d7-a7bf-18560f12bbb0', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 18, 'KG', 50, 'KG', 'En sacos de 50 libras', '2025-02-02'),
('ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maiz', 20, 'QQ', 500, 'QQ', 'En sacos de 50 libras', '2024-10-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuesta_compra`
--

CREATE TABLE `propuesta_compra` (
  `id` varchar(250) NOT NULL,
  `id_venta` varchar(250) NOT NULL,
  `id_comprador` varchar(250) NOT NULL,
  `precio` double(10,0) NOT NULL,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `cantidad` decimal(10,0) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `presentacion_entrega` varchar(255) NOT NULL,
  `ubicacion_google_maps` text DEFAULT NULL,
  `horarios` text DEFAULT NULL,
  `valida_hasta` date NOT NULL,
  `informacion_adicional` text DEFAULT NULL,
  `estado_comprador` enum('Aceptada','Recibida','Rechazada') NOT NULL DEFAULT 'Recibida',
  `estado_vendedor` enum('Aceptada','Recibida','Rechazada') NOT NULL DEFAULT 'Recibida'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propuesta_compra`
--

INSERT INTO `propuesta_compra` (`id`, `id_venta`, `id_comprador`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `presentacion_entrega`, `ubicacion_google_maps`, `horarios`, `valida_hasta`, `informacion_adicional`, `estado_comprador`, `estado_vendedor`) VALUES
('0d14d172-cd19-4f5e-b440-1a66ec99112f', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 13, 'QQ', 150, 'QQ', 'En sacos de 100 libras', NULL, NULL, '2024-10-12', 'Es importante cumplir con los tiempos', 'Aceptada', 'Aceptada'),
('19f2b62e-2894-40d5-94f3-fa1e4482e29d', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 200, 'QQ', 1000, 'QQ', 'Necesito que la condición de los sacos sea adecuada', 'Pueblo Gardey, Avenida Mayo 312', 'Entre las 10 AM y las 3 PM', '2025-02-22', 'Necesito calidad de productos', 'Aceptada', 'Recibida'),
('d16ad6d9-3f92-4233-8216-8a79ca6c5cbf', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 20, 'QQ', 5, 'QQ', 'En sacos de 100 libras', 'url_here', 'Desde 8 AM hasta 3 PM', '2024-10-22', 'Es importante cumplir con los tiempos', 'Recibida', 'Recibida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuesta_compra_contiene_condicion`
--

CREATE TABLE `propuesta_compra_contiene_condicion` (
  `id` varchar(250) NOT NULL,
  `id_propuesta` varchar(250) NOT NULL,
  `id_condicion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propuesta_compra_contiene_condicion`
--

INSERT INTO `propuesta_compra_contiene_condicion` (`id`, `id_propuesta`, `id_condicion`) VALUES
('203221a3-9005-4656-8424-f47e450bd53b', '19f2b62e-2894-40d5-94f3-fa1e4482e29d', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e'),
('39b3f711-c9b7-497c-bf46-80483ae41ea8', '0d14d172-cd19-4f5e-b440-1a66ec99112f', 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuesta_venta`
--

CREATE TABLE `propuesta_venta` (
  `id` varchar(250) NOT NULL,
  `id_licitacion` varchar(250) NOT NULL,
  `id_vendedor` varchar(250) NOT NULL,
  `precio` double NOT NULL,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `cantidad` decimal(10,0) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `presentacion_entrega` varchar(255) NOT NULL,
  `fecha_entrega` date NOT NULL,
  `informacion_adicional` varchar(250) DEFAULT NULL,
  `estado_comprador` enum('Aceptada','Recibida','Rechazada') NOT NULL DEFAULT 'Recibida',
  `estado_vendedor` enum('Aceptada','Recibida','Rechazada') NOT NULL DEFAULT 'Recibida'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propuesta_venta`
--

INSERT INTO `propuesta_venta` (`id`, `id_licitacion`, `id_vendedor`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `presentacion_entrega`, `fecha_entrega`, `informacion_adicional`, `estado_comprador`, `estado_vendedor`) VALUES
('5a8866e2-8e10-4f94-9002-8c0e74b4e664', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 14.8, 'KG', 250, 'KG', 'En sacos de 100 libras', '2024-10-23', 'Es importante cumplir con los tiempos', 'Recibida', 'Aceptada'),
('5a8a702d-f4a6-4bf1-85a1-2aa133d2b87c', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 13, 'QQ', 150, 'QQ', 'En sacos de 100 libras', '2024-10-12', 'Es importante cumplir con los tiempos', 'Aceptada', 'Aceptada'),
('9387c739-f768-4f22-99d6-0858aae8ce35', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 24.8, 'QQ', 650, 'QQ', 'En sacos de 50 libras', '2024-10-27', 'Es importante cumplir con los tiempos', 'Recibida', 'Recibida'),
('9a5a320a-2895-4baf-ad8f-4a4d6286ec4e', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 24.8, 'QQ', 650, 'QQ', 'En sacos de 50 libras', '2024-10-27', 'Es importante cumplir con los tiempos', 'Recibida', 'Recibida'),
('bf7be359-4abb-4b62-98aa-4390eff6fb6d', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 19, 'QQ', 150, 'QQ', 'En sacos de 100 libras', '2025-05-22', 'Podemos entregar en tiempo y forma.', 'Recibida', 'Recibida'),
('ff8b5b14-09eb-4552-9ad4-0e2458b6d02c', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 13, 'QQ', 150, 'QQ', 'En sacos de 100 libras', '2024-10-12', 'Es importante cumplir con los tiempos', 'Aceptada', 'Aceptada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuesta_venta_contiene_condicion`
--

CREATE TABLE `propuesta_venta_contiene_condicion` (
  `id` varchar(250) NOT NULL,
  `id_propuesta` varchar(250) NOT NULL,
  `id_condicion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propuesta_venta_contiene_condicion`
--

INSERT INTO `propuesta_venta_contiene_condicion` (`id`, `id_propuesta`, `id_condicion`) VALUES
('0748b804-a766-4023-85a8-df39ae9de801', '9a5a320a-2895-4baf-ad8f-4a4d6286ec4e', 'bc5cec82-e0bf-4d8d-a070-5288b5147280'),
('1172966d-b94f-4ab4-b436-881f970d4944', '5a8866e2-8e10-4f94-9002-8c0e74b4e664', 'db47147f-2b21-4b94-914b-de32238b1c2c'),
('6ebb1fdd-86b2-4bfc-9676-ab7092412e55', 'ff8b5b14-09eb-4552-9ad4-0e2458b6d02c', '73751a53-ff26-496c-95df-f78062822468'),
('b5eb0e15-72e8-429a-9b45-703cca06bdb8', 'bf7be359-4abb-4b62-98aa-4390eff6fb6d', '02b4e9d0-8ecb-49b8-859c-d454aff20f6a'),
('fd35a452-93f8-4248-bee7-589fbabce1c6', '9387c739-f768-4f22-99d6-0858aae8ce35', 'c6e697d5-90fc-412d-a262-1f25172e4ea1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidades`
--

CREATE TABLE `publicidades` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `url` varchar(250) NOT NULL,
  `imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicidades`
--

INSERT INTO `publicidades` (`id`, `nombre`, `url`, `imagen`) VALUES
('e0259de2-5997-48de-8ea0-ec60b4b71b81', 'Anuncio Agrometal', 'https://www.agrometal.com/', 'http://localhost:3000/public/images/sales/agrometal_arg_cover.webp'),
('f7259cx1-5997-48de-8ea0-ec60b4b71b83', 'Agtrac Insumos', 'https://agtrac.mx/', 'http://localhost:3000/public/images/sales/agtrac.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos_recepcion`
--

CREATE TABLE `puntos_recepcion` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `ubicacion_google_maps` text DEFAULT NULL,
  `direccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntos_recepcion`
--

INSERT INTO `puntos_recepcion` (`id`, `id_usuario`, `nombre`, `ubicacion_google_maps`, `direccion`) VALUES
('de92k121s3212', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cascada 32', 'Guayas, Pedro Carbo', 'Calle Cascada 132');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recargas`
--

CREATE TABLE `recargas` (
  `id` varchar(250) NOT NULL,
  `id_billetera` varchar(250) NOT NULL,
  `metodo_pago` enum('TC/TD','TRANSFERENCIA') NOT NULL,
  `monto_recarga` float NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recargas`
--

INSERT INTO `recargas` (`id`, `id_billetera`, `metodo_pago`, `monto_recarga`, `fecha`) VALUES
('10f0e094-51dc-4b41-bdbc-5d383511ff4d', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 35, '2024-10-22 21:35:14'),
('2877b254-8241-4963-b6ef-cfde3f7b4692', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 2500, '2024-09-24 23:17:54'),
('ec7248ef-b92c-4e78-a7c9-301b1e816b6b', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 25, '2024-10-22 21:21:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` varchar(250) NOT NULL,
  `permiso_dashboard` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_negociaciones` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_licitaciones` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_aceptar_pedido` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_recibir_pedido` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_rechazar_pedido` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_pagar` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_billetera` tinyint(1) NOT NULL DEFAULT 0,
  `permiso_usuarios` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `permiso_dashboard`, `permiso_negociaciones`, `permiso_licitaciones`, `permiso_aceptar_pedido`, `permiso_recibir_pedido`, `permiso_rechazar_pedido`, `permiso_pagar`, `permiso_billetera`, `permiso_usuarios`) VALUES
('Asistente de Compras', 1, 1, 1, 0, 0, 0, 1, 1, 0),
('Bodega', 0, 0, 0, 0, 1, 0, 0, 0, 0),
('Calidad', 0, 0, 0, 0, 0, 0, 1, 1, 0),
('Gerente General', 1, 1, 1, 1, 1, 1, 1, 1, 1),
('Jefe de Compras', 1, 1, 1, 0, 0, 0, 1, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sugerir_producto`
--

CREATE TABLE `sugerir_producto` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sugerir_producto`
--

INSERT INTO `sugerir_producto` (`id`, `id_usuario`, `id_producto`, `cantidad`) VALUES
('97336ce3-42d9-4819-9f62-112b16a45f96', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cebada', 250);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutoriales`
--

CREATE TABLE `tutoriales` (
  `id` varchar(250) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `url_video` varchar(150) NOT NULL,
  `id_categoria` varchar(250) NOT NULL,
  `nuevo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutoriales`
--

INSERT INTO `tutoriales` (`id`, `titulo`, `url_video`, `id_categoria`, `nuevo`) VALUES
('0873f407-f42a-456c-850b-d7b15e249bdd', 'Introducción a la gestión rural', 'https://www.youtube.com/watch?v=INwgn1iTtHc&pp=ygUNZ2VzdGlvbiBydXJhbA%3D%3D', 'cat_gestion', 1),
('tuto_fertilizantes', 'Como utilizar el fertilizante KSR-1', 'https://www.youtube.com/watch?v=2jyxYUQXKBQ', 'cat_fertilizantes', 0),
('tuto_gestion', 'Gestión de grandes plantillas', 'https://www.youtube.com/watch?v=2jyxYUQXKBQ', 'cat_gestion', 0),
('tuto_quimica', '¿Qué es la química?', 'https://www.youtube.com/watch?v=2jyxYUQXKBQ', 'cat_quimica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` varchar(250) NOT NULL,
  `tipo_identificacion` enum('RUC','Cédula','Pasaporte') DEFAULT NULL,
  `numero_identificacion` varchar(50) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `parroquia` varchar(255) DEFAULT NULL,
  `canton` varchar(255) NOT NULL,
  `acepto_terminos` tinyint(1) NOT NULL,
  `direccion` text NOT NULL,
  `ubicacion_google_maps` text DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT 0,
  `id_subscripcion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `tipo_identificacion`, `numero_identificacion`, `correo`, `clave`, `provincia`, `parroquia`, `canton`, `acepto_terminos`, `direccion`, `ubicacion_google_maps`, `telefono`, `estado`, `id_subscripcion`) VALUES
('b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cédula', '48271112', 'srui@alumnos.exa.unicen.edu.ar', '$2b$10$UVdlb9qHbN/cQuVocxWmoOHATis1D7mrL5BzatICL19T9NMX376X6', 'Manabi', '', 'Bolívar', 1, 'Calle Jaure 32', 'Avenida Olivos 92831', '+542281553030', 1, '3a1cf02c-a5f9-4f8a-ba95-ddb6b72e7585'),
('e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cédula', '2343358400', 'pedroramirez@gmail.com', '$2b$10$UVdlb9qHbN/cQuVocxWmoOHATis1D7mrL5BzatICL19T9NMX376X6', 'Bolívar', 'Santo Domingo', 'Guaranda', 1, 'Suipacha 81', 'La casita de al lado', '+542281553030', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_contiene_calidad`
--

CREATE TABLE `venta_contiene_calidad` (
  `id_parametros` varchar(250) NOT NULL,
  `id_venta` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `venta_contiene_calidad`
--

INSERT INTO `venta_contiene_calidad` (`id_parametros`, `id_venta`) VALUES
('e385ffca-b643-4922-9814-d6e7fa0c5140', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `billetera`
--
ALTER TABLE `billetera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_billetera_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_calificado` (`id_calificado`),
  ADD KEY `fk_calificante` (`id_calificante`),
  ADD KEY `fk_calificacion_orden` (`id_orden`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria_insumos`
--
ALTER TABLE `categoria_insumos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_chat_id_comprador` (`id_comprador`),
  ADD KEY `fk_chat_id_vendedor` (`id_vendedor`),
  ADD KEY `fk_chat_id_condicion` (`id_condiciones`);

--
-- Indices de la tabla `codigos_telefonicos`
--
ALTER TABLE `codigos_telefonicos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `fk_codigos_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `compra_contiene_calidad`
--
ALTER TABLE `compra_contiene_calidad`
  ADD KEY `fk_compra_contiene_calidad_parametros_calidad` (`id_parametros`),
  ADD KEY `fk_compra_contiene_calidad_compra` (`id_compra`);

--
-- Indices de la tabla `condiciones_compra`
--
ALTER TABLE `condiciones_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_condiciones_producto` (`id_producto`);

--
-- Indices de la tabla `condicion_contiene_parametros`
--
ALTER TABLE `condicion_contiene_parametros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_condicion_contiene_parametros` (`id_parametros`),
  ADD KEY `fk_condicion_contiene_condicion` (`id_condicion`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contacto_usuario` (`id_usuario`);

--
-- Indices de la tabla `cuenta_bancaria`
--
ALTER TABLE `cuenta_bancaria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `devoluciones`
--
ALTER TABLE `devoluciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_devolucion_billetera` (`id_billetera`);

--
-- Indices de la tabla `entregas`
--
ALTER TABLE `entregas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_punto_entregas` (`id_punto`),
  ADD KEY `fk_id_condicion_entregas` (`id_condicion`);

--
-- Indices de la tabla `estado_ordenes`
--
ALTER TABLE `estado_ordenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_estado_orden` (`id_orden`);

--
-- Indices de la tabla `fee`
--
ALTER TABLE `fee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_entrega` (`id_entrega`) USING BTREE,
  ADD KEY `fk_id_billetera` (`id_billetera`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_insumo` (`id_usuario`),
  ADD KEY `fk_categoria_insumo` (`categoria_insumo`);

--
-- Indices de la tabla `insumos_imagenes`
--
ALTER TABLE `insumos_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_insumo_imagen` (`id_insumo`);

--
-- Indices de la tabla `interes_contiene_calidad`
--
ALTER TABLE `interes_contiene_calidad`
  ADD KEY `fk_interes_contiene_calidad_parametros_calidad` (`id_parametros`),
  ADD KEY `fk_interes_contiene_calidad_interes` (`id_interes`);

--
-- Indices de la tabla `licitacion_contiene_calidad`
--
ALTER TABLE `licitacion_contiene_calidad`
  ADD KEY `fk_licitacion_contiene_calidad_parametros_calidad` (`id_parametros`),
  ADD KEY `fk_licitacion_contiene_calidad_licitacion` (`id_licitacion`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mensaje_usuario` (`id_remitente`),
  ADD KEY `fk_mensaje_chat` (`id_chat`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_metodo_pago_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `multiusuarios`
--
ALTER TABLE `multiusuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ck_correo_multi_usuario` (`correo`),
  ADD KEY `fk_rol_multi_usuarios` (`id_rol`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacion_producto` (`id_producto`),
  ADD KEY `fk_notificacion_usuario` (`id_notificado`);

--
-- Indices de la tabla `notificaciones_chat`
--
ALTER TABLE `notificaciones_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacion_chat_notificacion` (`id_notificacion`),
  ADD KEY `fk_notificacion_chat` (`id_chat`);

--
-- Indices de la tabla `notificaciones_garantias`
--
ALTER TABLE `notificaciones_garantias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacion_garantia` (`id_garantia`),
  ADD KEY `fk_notifcacion_garantias_padre` (`id_notificacion`);

--
-- Indices de la tabla `notificaciones_ordenes`
--
ALTER TABLE `notificaciones_ordenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacion_ordenes_notificacion` (`id_notificacion`),
  ADD KEY `fk_notificacion_ordenes_orden` (`id_orden`);

--
-- Indices de la tabla `notificaciones_propuesta_compra`
--
ALTER TABLE `notificaciones_propuesta_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacion_propuesta_compra` (`id_propuesta`),
  ADD KEY `fk_notifcacion_propuesta_compra_padre` (`id_notificacion`);

--
-- Indices de la tabla `notificaciones_propuesta_venta`
--
ALTER TABLE `notificaciones_propuesta_venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notificacion_propuesta_venta` (`id_propuesta`),
  ADD KEY `fk_notifcacion_propuesta_venta_padre` (`id_notificacion`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_comprador` (`id_comprador`),
  ADD KEY `id_vendedor` (`id_vendedor`),
  ADD KEY `id_entrega` (`id_entrega`);

--
-- Indices de la tabla `pago_garantia`
--
ALTER TABLE `pago_garantia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pago_garantia_condicion` (`id_condicion`);

--
-- Indices de la tabla `parametros_calidad`
--
ALTER TABLE `parametros_calidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_parametros_calidad_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `perfil_agricultor`
--
ALTER TABLE `perfil_agricultor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_perfil_agricultor_cuenta_bancaria` (`id_cuenta_bancaria`),
  ADD KEY `fk_perfil_agricultor_usuario` (`id_usuario`);

--
-- Indices de la tabla `perfil_asociacion_agricola`
--
ALTER TABLE `perfil_asociacion_agricola`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_perfil_asociacion_agricola_cuenta_bancaria` (`id_cuenta_bancaria`),
  ADD KEY `fk_perfil_asociacion_agricola_usuario` (`id_usuario`);

--
-- Indices de la tabla `perfil_comerciante`
--
ALTER TABLE `perfil_comerciante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_perfil_comerciante_usuario` (`id_usuario`),
  ADD KEY `fk_perfil_comerciante_cuenta_bancaria` (`id_cuenta_bancaria`);

--
-- Indices de la tabla `perfil_comerciante_agroquimicos`
--
ALTER TABLE `perfil_comerciante_agroquimicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_perfil_comerciante_agroquimicos_usuario` (`id_usuario`),
  ADD KEY `fk_perfil_comerciante_agroquimicos_cuenta_bancaria` (`id_cuenta_bancaria`);

--
-- Indices de la tabla `perfil_comprador`
--
ALTER TABLE `perfil_comprador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_perfil_comprador_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_interes`
--
ALTER TABLE `productos_interes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productos_interes_producto` (`producto_id`),
  ADD KEY `fk_productos_interes_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos_listados`
--
ALTER TABLE `productos_listados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_vender_imagenes`
--
ALTER TABLE `productos_vender_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_vender_imagen` (`id_venta`);

--
-- Indices de la tabla `producto_licitar`
--
ALTER TABLE `producto_licitar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_licitar_producto` (`id_producto`),
  ADD KEY `fk_producto_licitar_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto_vender`
--
ALTER TABLE `producto_vender`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_vender_producto` (`id_producto`),
  ADD KEY `fk_producto_vender_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `propuesta_compra`
--
ALTER TABLE `propuesta_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_propuesta_compra_id_usuario_comprador` (`id_comprador`),
  ADD KEY `fk_propuesta_compra_id_venta` (`id_venta`);

--
-- Indices de la tabla `propuesta_compra_contiene_condicion`
--
ALTER TABLE `propuesta_compra_contiene_condicion`
  ADD PRIMARY KEY (`id`,`id_propuesta`,`id_condicion`),
  ADD KEY `id_propuesta` (`id_propuesta`),
  ADD KEY `id_condicion` (`id_condicion`);

--
-- Indices de la tabla `propuesta_venta`
--
ALTER TABLE `propuesta_venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_propuesta_licitacion` (`id_licitacion`),
  ADD KEY `fk_propuesta_vendedor` (`id_vendedor`);

--
-- Indices de la tabla `propuesta_venta_contiene_condicion`
--
ALTER TABLE `propuesta_venta_contiene_condicion`
  ADD PRIMARY KEY (`id`,`id_propuesta`,`id_condicion`),
  ADD KEY `id_propuesta` (`id_propuesta`),
  ADD KEY `id_condicion` (`id_condicion`);

--
-- Indices de la tabla `publicidades`
--
ALTER TABLE `publicidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntos_recepcion`
--
ALTER TABLE `puntos_recepcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_puntos_recepcion_usuario` (`id_usuario`);

--
-- Indices de la tabla `recargas`
--
ALTER TABLE `recargas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_billetera` (`id_billetera`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sugerir_producto`
--
ALTER TABLE `sugerir_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sugerir_usuario` (`id_usuario`),
  ADD KEY `fk_sugerir_producto` (`id_producto`);

--
-- Indices de la tabla `tutoriales`
--
ALTER TABLE `tutoriales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tutorial_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_identificacion` (`numero_identificacion`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `venta_contiene_calidad`
--
ALTER TABLE `venta_contiene_calidad`
  ADD KEY `fk_venta_contiene_calidad_parametros_calidad` (`id_parametros`),
  ADD KEY `fk_venta_contiene_calidad_licitacion` (`id_venta`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `billetera`
--
ALTER TABLE `billetera`
  ADD CONSTRAINT `fk_billetera_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `fk_calificacion_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id`),
  ADD CONSTRAINT `fk_calificado` FOREIGN KEY (`id_calificado`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_calificante` FOREIGN KEY (`id_calificante`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_chat_id_comprador` FOREIGN KEY (`id_comprador`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_chat_id_condicion` FOREIGN KEY (`id_condiciones`) REFERENCES `condiciones_compra` (`id`),
  ADD CONSTRAINT `fk_chat_id_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `codigos_telefonicos`
--
ALTER TABLE `codigos_telefonicos`
  ADD CONSTRAINT `fk_codigos_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `compra_contiene_calidad`
--
ALTER TABLE `compra_contiene_calidad`
  ADD CONSTRAINT `fk_compra_contiene_calidad_compra` FOREIGN KEY (`id_compra`) REFERENCES `condiciones_compra` (`id`),
  ADD CONSTRAINT `fk_compra_contiene_calidad_parametros_calidad` FOREIGN KEY (`id_parametros`) REFERENCES `parametros_calidad` (`id`);

--
-- Filtros para la tabla `condiciones_compra`
--
ALTER TABLE `condiciones_compra`
  ADD CONSTRAINT `fk_condiciones_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `condicion_contiene_parametros`
--
ALTER TABLE `condicion_contiene_parametros`
  ADD CONSTRAINT `fk_condicion_contiene_condicion` FOREIGN KEY (`id_condicion`) REFERENCES `condiciones_compra` (`id`),
  ADD CONSTRAINT `fk_condicion_contiene_parametros` FOREIGN KEY (`id_parametros`) REFERENCES `parametros_calidad` (`id`);

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `fk_contacto_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `devoluciones`
--
ALTER TABLE `devoluciones`
  ADD CONSTRAINT `fk_devolucion_billetera` FOREIGN KEY (`id_billetera`) REFERENCES `billetera` (`id`);

--
-- Filtros para la tabla `entregas`
--
ALTER TABLE `entregas`
  ADD CONSTRAINT `fk_id_condicion_entregas` FOREIGN KEY (`id_condicion`) REFERENCES `condiciones_compra` (`id`),
  ADD CONSTRAINT `fk_id_punto_entregas` FOREIGN KEY (`id_punto`) REFERENCES `puntos_recepcion` (`id`);

--
-- Filtros para la tabla `estado_ordenes`
--
ALTER TABLE `estado_ordenes`
  ADD CONSTRAINT `fk_estado_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id`);

--
-- Filtros para la tabla `fee`
--
ALTER TABLE `fee`
  ADD CONSTRAINT `fk_id_billetera` FOREIGN KEY (`id_billetera`) REFERENCES `billetera` (`id`),
  ADD CONSTRAINT `fk_orden` FOREIGN KEY (`id_entrega`) REFERENCES `entregas` (`id`);

--
-- Filtros para la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD CONSTRAINT `fk_categoria_insumo` FOREIGN KEY (`categoria_insumo`) REFERENCES `categoria_insumos` (`id`),
  ADD CONSTRAINT `fk_usuario_insumo` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `insumos_imagenes`
--
ALTER TABLE `insumos_imagenes`
  ADD CONSTRAINT `fk_insumo_imagen` FOREIGN KEY (`id_insumo`) REFERENCES `insumos` (`id`);

--
-- Filtros para la tabla `interes_contiene_calidad`
--
ALTER TABLE `interes_contiene_calidad`
  ADD CONSTRAINT `fk_interes_contiene_calidad_interes` FOREIGN KEY (`id_interes`) REFERENCES `productos_interes` (`id`),
  ADD CONSTRAINT `fk_interes_contiene_calidad_parametros_calidad` FOREIGN KEY (`id_parametros`) REFERENCES `parametros_calidad` (`id`);

--
-- Filtros para la tabla `licitacion_contiene_calidad`
--
ALTER TABLE `licitacion_contiene_calidad`
  ADD CONSTRAINT `fk_licitacion_contiene_calidad_licitacion` FOREIGN KEY (`id_licitacion`) REFERENCES `producto_licitar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_licitacion_contiene_calidad_parametros_calidad` FOREIGN KEY (`id_parametros`) REFERENCES `parametros_calidad` (`id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `fk_mensaje_chat` FOREIGN KEY (`id_chat`) REFERENCES `chat` (`id`),
  ADD CONSTRAINT `fk_mensaje_usuario` FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD CONSTRAINT `fk_metodo_pago_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `multiusuarios`
--
ALTER TABLE `multiusuarios`
  ADD CONSTRAINT `fk_rol_multi_usuarios` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notificacion_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_notificacion_usuario` FOREIGN KEY (`id_notificado`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `notificaciones_chat`
--
ALTER TABLE `notificaciones_chat`
  ADD CONSTRAINT `fk_notificacion_chat` FOREIGN KEY (`id_chat`) REFERENCES `chat` (`id`),
  ADD CONSTRAINT `fk_notificacion_chat_notificacion` FOREIGN KEY (`id_notificacion`) REFERENCES `notificaciones` (`id`);

--
-- Filtros para la tabla `notificaciones_garantias`
--
ALTER TABLE `notificaciones_garantias`
  ADD CONSTRAINT `fk_notifcacion_garantias_padre` FOREIGN KEY (`id_notificacion`) REFERENCES `notificaciones` (`id`),
  ADD CONSTRAINT `fk_notificacion_garantia` FOREIGN KEY (`id_garantia`) REFERENCES `pago_garantia` (`id`);

--
-- Filtros para la tabla `notificaciones_ordenes`
--
ALTER TABLE `notificaciones_ordenes`
  ADD CONSTRAINT `fk_notificacion_ordenes_notificacion` FOREIGN KEY (`id_notificacion`) REFERENCES `notificaciones` (`id`),
  ADD CONSTRAINT `fk_notificacion_ordenes_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id`);

--
-- Filtros para la tabla `notificaciones_propuesta_compra`
--
ALTER TABLE `notificaciones_propuesta_compra`
  ADD CONSTRAINT `fk_notifcacion_propuesta_compra_padre` FOREIGN KEY (`id_notificacion`) REFERENCES `notificaciones` (`id`),
  ADD CONSTRAINT `fk_notificacion_propuesta_compra` FOREIGN KEY (`id_propuesta`) REFERENCES `propuesta_compra` (`id`);

--
-- Filtros para la tabla `notificaciones_propuesta_venta`
--
ALTER TABLE `notificaciones_propuesta_venta`
  ADD CONSTRAINT `fk_notifcacion_propuesta_venta_padre` FOREIGN KEY (`id_notificacion`) REFERENCES `notificaciones` (`id`),
  ADD CONSTRAINT `fk_notificacion_propuesta_venta` FOREIGN KEY (`id_propuesta`) REFERENCES `propuesta_venta` (`id`);

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`id_comprador`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ordenes_ibfk_2` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ordenes_ibfk_4` FOREIGN KEY (`id_entrega`) REFERENCES `entregas` (`id`);

--
-- Filtros para la tabla `pago_garantia`
--
ALTER TABLE `pago_garantia`
  ADD CONSTRAINT `fk_pago_garantia_condicion` FOREIGN KEY (`id_condicion`) REFERENCES `condiciones_compra` (`id`);

--
-- Filtros para la tabla `parametros_calidad`
--
ALTER TABLE `parametros_calidad`
  ADD CONSTRAINT `fk_parametros_calidad_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfil_agricultor`
--
ALTER TABLE `perfil_agricultor`
  ADD CONSTRAINT `fk_perfil_agricultor_cuenta_bancaria` FOREIGN KEY (`id_cuenta_bancaria`) REFERENCES `cuenta_bancaria` (`id`),
  ADD CONSTRAINT `fk_perfil_agricultor_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfil_asociacion_agricola`
--
ALTER TABLE `perfil_asociacion_agricola`
  ADD CONSTRAINT `fk_perfil_asociacion_agricola_cuenta_bancaria` FOREIGN KEY (`id_cuenta_bancaria`) REFERENCES `cuenta_bancaria` (`id`),
  ADD CONSTRAINT `fk_perfil_asociacion_agricola_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfil_comerciante`
--
ALTER TABLE `perfil_comerciante`
  ADD CONSTRAINT `fk_perfil_comerciante_cuenta_bancaria` FOREIGN KEY (`id_cuenta_bancaria`) REFERENCES `cuenta_bancaria` (`id`),
  ADD CONSTRAINT `fk_perfil_comerciante_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfil_comerciante_agroquimicos`
--
ALTER TABLE `perfil_comerciante_agroquimicos`
  ADD CONSTRAINT `fk_perfil_comerciante_agroquimicos_cuenta_bancaria` FOREIGN KEY (`id_cuenta_bancaria`) REFERENCES `cuenta_bancaria` (`id`),
  ADD CONSTRAINT `fk_perfil_comerciante_agroquimicos_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `perfil_comprador`
--
ALTER TABLE `perfil_comprador`
  ADD CONSTRAINT `fk_perfil_comprador_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos_interes`
--
ALTER TABLE `productos_interes`
  ADD CONSTRAINT `fk_productos_interes_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_productos_interes_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos_vender_imagenes`
--
ALTER TABLE `productos_vender_imagenes`
  ADD CONSTRAINT `fk_producto_vender_imagen` FOREIGN KEY (`id_venta`) REFERENCES `producto_vender` (`id`);

--
-- Filtros para la tabla `producto_licitar`
--
ALTER TABLE `producto_licitar`
  ADD CONSTRAINT `fk_producto_licitar_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_producto_licitar_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `producto_vender`
--
ALTER TABLE `producto_vender`
  ADD CONSTRAINT `fk_producto_vender_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_producto_vender_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `propuesta_compra`
--
ALTER TABLE `propuesta_compra`
  ADD CONSTRAINT `fk_propuesta_compra_id_usuario_comprador` FOREIGN KEY (`id_comprador`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_propuesta_compra_id_venta` FOREIGN KEY (`id_venta`) REFERENCES `producto_vender` (`id`);

--
-- Filtros para la tabla `propuesta_compra_contiene_condicion`
--
ALTER TABLE `propuesta_compra_contiene_condicion`
  ADD CONSTRAINT `propuesta_compra_contiene_condicion_ibfk_1` FOREIGN KEY (`id_propuesta`) REFERENCES `propuesta_compra` (`id`),
  ADD CONSTRAINT `propuesta_compra_contiene_condicion_ibfk_2` FOREIGN KEY (`id_condicion`) REFERENCES `condiciones_compra` (`id`);

--
-- Filtros para la tabla `propuesta_venta`
--
ALTER TABLE `propuesta_venta`
  ADD CONSTRAINT `fk_propuesta_licitacion` FOREIGN KEY (`id_licitacion`) REFERENCES `producto_licitar` (`id`),
  ADD CONSTRAINT `fk_propuesta_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_propuesta_venta_id_licitacion` FOREIGN KEY (`id_licitacion`) REFERENCES `producto_licitar` (`id`),
  ADD CONSTRAINT `fk_propuesta_venta_id_usuario_comprador` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_venta_usuario_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `propuesta_venta_contiene_condicion`
--
ALTER TABLE `propuesta_venta_contiene_condicion`
  ADD CONSTRAINT `propuesta_venta_contiene_condicion_ibfk_1` FOREIGN KEY (`id_propuesta`) REFERENCES `propuesta_venta` (`id`),
  ADD CONSTRAINT `propuesta_venta_contiene_condicion_ibfk_2` FOREIGN KEY (`id_condicion`) REFERENCES `condiciones_compra` (`id`);

--
-- Filtros para la tabla `puntos_recepcion`
--
ALTER TABLE `puntos_recepcion`
  ADD CONSTRAINT `fk_puntos_recepcion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `recargas`
--
ALTER TABLE `recargas`
  ADD CONSTRAINT `fk_billetera` FOREIGN KEY (`id_billetera`) REFERENCES `billetera` (`id`);

--
-- Filtros para la tabla `sugerir_producto`
--
ALTER TABLE `sugerir_producto`
  ADD CONSTRAINT `fk_sugerir_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos_listados` (`id`),
  ADD CONSTRAINT `fk_sugerir_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `tutoriales`
--
ALTER TABLE `tutoriales`
  ADD CONSTRAINT `fk_tutorial_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `venta_contiene_calidad`
--
ALTER TABLE `venta_contiene_calidad`
  ADD CONSTRAINT `fk_venta_contiene_calidad_licitacion` FOREIGN KEY (`id_venta`) REFERENCES `producto_vender` (`id`),
  ADD CONSTRAINT `fk_venta_contiene_calidad_parametros_calidad` FOREIGN KEY (`id_parametros`) REFERENCES `parametros_calidad` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
