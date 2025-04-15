CREATE TABLE `asociacion` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asociacion`
--

INSERT INTO `asociacion` (`id`, `nombre`) VALUES
('db1b3007-2285-4580-a7e7-106857a17ff0', 'Agricultores SA'),
('94412a30-c621-4089-8b74-694b8546e9fb', 'Asociacion Mapui'),
('c8ccdb8a-d31e-4b1a-9323-9719dd9c5447', 'Asociacion Mapui'),
('3a0d914a-d0a4-42a6-b159-fd8dbbfbd29a', 'Aso Mapu'),
('46688cbe-f2d5-475e-9326-a3e145eac9de', 'aa'),
('b059a89a-ed3f-460d-a4ff-8e002f45fe22', 'GlobalX'),
('3ee5a37e-1df2-4698-ae3f-ceec2327d4ec', 'Dve'),
('a61c2ec2-55e2-4618-a536-08ebe4853607', 'DaVe'),
('8c91f929-125a-4fb5-97d4-62a4aaf2d9b1', 'Devesa'),
('e964c3f7-632f-4bf6-ab2a-8357584879e6', 'Dvesa');

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
('0262bee8-fba5-41db-bbe1-66d6abece717', 'e8799658-2fbd-4e90-b2f0-82b62568968b', 0),
('0629111f-ac9a-4882-8a24-965ed959b269', '7a37783c-e001-4d4f-8cd4-104122d33044', 0),
('327fdf45-b665-4ee4-901b-db4fd9a218eb', '94a0909b-f61a-48e2-9ddc-504a0f1b4356', 0),
('38785f7c-cc6e-47bc-9945-6f8109f2cfc3', '3fb15766-8109-4d19-9c11-83efd1fd363d', 0),
('4c818dbf-8dfe-40cd-af7c-0283c5e49f14', '196797f5-cad5-4575-a5e0-349f4b0b6e98', 0),
('a6d84fa6-c198-4586-96e7-766e481e8555', 'd8d167f0-8162-4829-b22e-ace7bd42ec76', 0),
('b0572fcd-314b-406b-bcb8-e3710d91c312', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 49),
('bff09880-6b5d-4b7d-8b80-4e958e6cb859', '7ea5c4fd-a3f0-4d07-a633-8e7590514a58', 0),
('c0532fcd-314b-406b-bcb8-e3710d91c312', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 34),
('c58f32ca-df42-4061-b1b2-7fd69d2fbd90', '64829989-e673-4e74-947f-ade23ad9adb2', 0),
('cdfad7a3-e3bf-4b17-93ad-5ead346f1838', '00f9e3f6-2956-44b1-b9ba-5c419f6e128e', 0),
('fb19369d-c78f-4e4d-8ffc-35abe1a098d0', 'a2cca54d-2aa7-47c9-88de-319cc78752dd', 0);

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
('03dcba2d-c74b-457e-8736-d424e419b871', 4, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '746d7b5f-73b2-400a-9b11-c650c8a69e91'),
('231awaweawk2id', 3, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '58764ab9-d5a1-48fd-8798-a22bd3dffdeb'),
('279c5f5c-34e8-4bb4-a1dc-52cc263b6d87', 2, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '8c97c004-bf68-421a-a3d8-bf4dd1b13338'),
('2dd492bc-4145-407e-b776-901d4413623f', 2, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'ccff96df-ea55-4f44-951e-f073e40bc3ca'),
('338013e1-906e-4a15-81ce-cf7921a269c4', 3, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '38fb3c3d-8054-4b21-97a9-b565a1113016'),
('a5cfc07a-4b55-40f2-8adf-793fd3594bd5', 3, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'a562595f-9bdb-4053-bb1e-b95a2ef54798'),
('ab4bf25b-d050-41ca-a017-f21df13cda22', 4, 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2'),
('b1938469-499b-41a6-8797-21a752bef3b5', 4, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '40ae9141-1a7f-4237-8a45-3e5e4d87e741'),
('bf1954c9-c4ee-42c0-869a-9b68488e35b7', 1, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '38fb3c3d-8054-4b21-97a9-b565a1113016'),
('da2c88c8-0c71-4d48-a314-4455ea21f891', 2, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666'),
('e4c04347-b83d-4c0d-b3bf-5b5c33addf8e', 4, 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '28e74cec-913f-4fc7-989a-7cea5538461f');

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
('cat_fertilizantes', 'Fertilizantes', 'https://agroec-api.onrender.com/public/images/icons/Fertilizer.svg'),
('cat_quimica', 'Quimica', 'https://agroec-api.onrender.com/public/images/icons/Defensive.svg');

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
('Defensivos', 'https://agroec-api.onrender.com/public/images/icons/Defensive.svg'),
('Fertilizantes', 'https://agroec-api.onrender.com/public/images/icons/Fertilizer.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id` varchar(250) NOT NULL,
  `id_comprador` varchar(250) DEFAULT NULL,
  `id_vendedor` varchar(250) DEFAULT NULL,
  `id_condiciones` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id`, `id_comprador`, `id_vendedor`, `id_condiciones`) VALUES
('03184585-fe17-444a-a6c8-61b66b6a998e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'bc5cec82-e0bf-4d8d-a070-5288b5147280'),
('107013f0-4a54-4441-ad99-55161efbbe9c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'c6e697d5-90fc-412d-a262-1f25172e4ea1'),
('1e23dd74-1866-435b-81ec-48e36ac5c773', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '7a663566-3126-4f27-850a-a56f7f46d136'),
('2943eaef-834f-42e0-9e9d-0419164e4c24', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e'),
('2e19813b-7ffa-4c31-a9d6-f0396b273923', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'd16254f4-b830-4408-8a7c-647112af31a1'),
('34e24bbc-97a8-4340-9507-986b60003879', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4'),
('3e3c51ee-3fff-425e-a473-f9ec96d8878d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'da29d7c6-201e-4af7-a7b6-b4b04b18198b'),
('536d4c80-20f3-498f-8900-f997c616d912', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '73751a53-ff26-496c-95df-f78062822468'),
('754bd3e1-358d-485b-9bc5-22b02b31ed29', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'db47147f-2b21-4b94-914b-de32238b1c2c'),
('7602d7bb-9bc7-47c1-bfcd-98d022d4721a', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2dbdf34a-6068-4b65-a165-b099a0c3aecb'),
('80e8cab9-d960-4efd-9000-878374a32730', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '25ae36a3-f96d-4e0d-8d72-c47b61fbb527'),
('8808084a-3eae-4278-9ec1-1ec80ae326c5', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '77877c7c-cfac-4c8d-8b30-9821d2704ff1'),
('8f561883-2514-4524-ade6-b6bc5f940945', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'd62ecc78-6424-44c1-8cfa-c30cfc90476e'),
('950506c7-4051-46a5-8073-ba92892254b7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'fc25d3e8-dd66-432f-ba01-88bb117791d0'),
('d2046d86-f8ad-473f-b123-1ad94c71532a', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '802acdfe-af6a-420d-a93e-2a1f88181683'),
('d549b828-cf24-454a-a765-b88ede384139', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '7d3721cd-1ee9-4aab-ac44-a0f6b014586e'),
('d8707c7f-a80c-4361-bf87-0d64d8d3c6d7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'c3fb6ee2-ae1e-4934-b4eb-0485dc15e758'),
('dba19580-6a8a-4b1f-99dd-a01ddf362bbc', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '0977de59-5156-4b48-97d3-348e9aa3f738'),
('ddd56dd0-b178-4d42-a21b-bca852185de3', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '02b4e9d0-8ecb-49b8-859c-d454aff20f6a'),
('e579772f-49e0-4179-b8bb-a2865d24680c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'fadf7488-6951-4376-8c81-77606f4c60d2'),
('e5f75eeb-8df7-416f-b983-e3244b0935c5', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '5cee8d60-1a09-4a5d-9e46-0d677b4412e2'),
('f2266c90-e844-4dad-81a1-4108c4d6a35c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '86e50ddb-eb69-4714-b663-d1e7b9e9a61b');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_telefonicos`
--

CREATE TABLE `codigos_telefonicos` (
  `id` varchar(250) NOT NULL,
  `codigo` varchar(13) NOT NULL,
  `id_usuario` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `codigos_telefonicos`
--

INSERT INTO `codigos_telefonicos` (`id`, `codigo`, `id_usuario`) VALUES
('611d7506-7fe8-4235-8c61-132f5e0029cb', 'AGROEC-908', '7ea5c4fd-a3f0-4d07-a633-8e7590514a58');

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
  `precio` double DEFAULT 0,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `cantidad` decimal(10,0) DEFAULT 0,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `modo_pago` enum('Modo Garantía','Pago en sitio','Pago a crédito') NOT NULL DEFAULT 'Modo Garantía',
  `porcentaje_inicial` decimal(10,0) NOT NULL DEFAULT 0,
  `modo_pago_final` enum('Pago en sitio','Pago a crédito') NOT NULL DEFAULT 'Pago en sitio',
  `porcentaje_final` decimal(10,0) NOT NULL DEFAULT 0,
  `notas` text NULL,
  `precio_puesto_domicilio` tinyint(1) NOT NULL DEFAULT 0,
  `politicas_recepcion` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `condiciones_compra`
--

INSERT INTO `condiciones_compra` (`id`, `id_producto`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `modo_pago`, `porcentaje_inicial`, `modo_pago_final`, `porcentaje_final`, `notas`, `precio_puesto_domicilio`, `politicas_recepcion`) VALUES
('02b4e9d0-8ecb-49b8-859c-d454aff20f6a', 'Tomate', 3, 'KG', 65, 'KG', 'Pago en sitio', 0, 'Pago en sitio', 0, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('0977de59-5156-4b48-97d3-348e9aa3f738', 'Cacao', 2.1, 'KG', 25, 'KG', 'Modo Garantía', 60, 'Pago en sitio', 40, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('24bcc337-c890-43bd-a01f-d6ec2860bd12', 'Cacao', 2.6, 'KG', 50, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('25ae36a3-f96d-4e0d-8d72-c47b61fbb527', 'Cacao', 2.37, 'KG', 15, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('2dbdf34a-6068-4b65-a165-b099a0c3aecb', 'Cacao', 2.6, 'KG', 50, 'KG', 'Pago en sitio', 0, 'Pago en sitio', 0, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('5cee8d60-1a09-4a5d-9e46-0d677b4412e2', 'Cacao', 2, 'KG', 60, 'KG', 'Modo Garantía', 30, 'Pago en sitio', 70, 'Nada que agregar.', 1, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('648fb6e6-d02a-4c93-9257-b6b386a5a2c4', 'Maiz', 2.3, 'KG', 25, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('73751a53-ff26-496c-95df-f78062822468', 'Tomate', 250, 'KG', 200, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, '', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('77877c7c-cfac-4c8d-8b30-9821d2704ff1', 'Maiz', 1.8, 'QQ', 15, 'QQ', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('7a663566-3126-4f27-850a-a56f7f46d136', 'Maiz', 2.1, 'KG', 25, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('7d3721cd-1ee9-4aab-ac44-a0f6b014586e', 'Maracuya', 2.4, 'KG', 45, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('802acdfe-af6a-420d-a93e-2a1f88181683', 'Maracuya', 2.3, 'KG', 20, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, 'Nada adicional.', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('86e50ddb-eb69-4714-b663-d1e7b9e9a61b', 'Cacao', 2.4, 'KG', 25, 'KG', 'Modo Garantía', 50, 'Pago en sitio', 50, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('b75501ae-fe6a-49a2-9c28-c40283bcf2d4', 'Maiz', 13, 'QQ', 150, 'QQ', 'Pago en sitio', 0, 'Pago en sitio', 0, 'Cumplir condiciones de compra', 1, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('bc5cec82-e0bf-4d8d-a070-5288b5147280', 'Tomate', 0, 'KG', 0, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('c3fb6ee2-ae1e-4934-b4eb-0485dc15e758', 'Maiz', 2.1, 'QQ', 10, 'QQ', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('c6e697d5-90fc-412d-a262-1f25172e4ea1', 'Tomate', 2, 'QQ', 85, 'QQ', 'Modo Garantía', 70, 'Pago en sitio', 30, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('d16254f4-b830-4408-8a7c-647112af31a1', 'Arroz', 2.2, 'KG', 35, 'KG', 'Pago en sitio', 0, 'Pago en sitio', 0, 'Nada que agregar', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('d62ecc78-6424-44c1-8cfa-c30cfc90476e', 'Maiz', 2.3, 'KG', 25, 'KG', 'Pago a crédito', 0, 'Pago en sitio', 0, 'Nada', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('da29d7c6-201e-4af7-a7b6-b4b04b18198b', 'Cacao', 2.3, 'KG', 25, 'KG', 'Modo Garantía', 30, 'Pago en sitio', 70, 'Pago en sitio final', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('db47147f-2b21-4b94-914b-de32238b1c2c', 'Tomate', 2, 'KG', 100, 'KG', 'Modo Garantía', 50, 'Pago en sitio', 50, 'Entregar a tiempo.', 1, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('fadf7488-6951-4376-8c81-77606f4c60d2', 'Cacao', 0, 'KG', 0, 'KG', 'Modo Garantía', 0, 'Pago en sitio', 0, '\'\'', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('fc25d3e8-dd66-432f-ba01-88bb117791d0', 'Maracuya', 2.3, 'KG', 15, 'KG', 'Modo Garantía', 30, 'Pago en sitio', 70, 'Nada', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.'),
('ff6d9dd4-01fd-4220-85df-1ac00a199a6e', 'Maiz', 25, 'KG', 250, 'KG', 'Modo Garantía', 20, 'Pago en sitio', 80, 'No hay comentarios adicionales.', 0, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.');

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
('516dd8d6-a4b6-4ac2-bf67-505d7d97e3e9', 'c9a2dfe4-660b-48a3-80ef-43c01b109b9e', 'fc25d3e8-dd66-432f-ba01-88bb117791d0'),
('6948c3d8-580f-404c-b9f8-78f02f83a50f', 'cfe786d9-36da-41c1-9eb9-b1ee7b6c9a58', 'd62ecc78-6424-44c1-8cfa-c30cfc90476e'),
('865321311212121', '10a7230f-c779-43fa-ba19-07070a41a4d1', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e'),
('b586e738-65ee-47e6-887f-64e8d347c5b1', '492a6e70-7687-45a0-b7f9-833389aae1bc', 'c6e697d5-90fc-412d-a262-1f25172e4ea1'),
('ce5ca822-6621-49e3-82c4-8532cf76e6ce', '63af586f-a314-47aa-a939-84d177fc98fe', 'd16254f4-b830-4408-8a7c-647112af31a1'),
('de248c22-448a-4b8e-a3b2-63109e7c8475', '9a80e115-adfd-46e7-b681-6fa032433873', 'db47147f-2b21-4b94-914b-de32238b1c2c'),
('dedbebb4-71a3-4d74-b338-218b95cd9ba5', '172191b7-c6aa-4c1d-aa3e-b921c0619d88', '2dbdf34a-6068-4b65-a165-b099a0c3aecb'),
('e3eaf9ed-1996-4e18-82d6-d9dacb0c75d7', '2bf8ea3d-5071-4e41-b51b-2fac01d2901e', '24bcc337-c890-43bd-a01f-d6ec2860bd12'),
('f2678e00-1e23-47e8-a4f6-9d73a716c953', '149152da-7655-44f0-9ad2-82ca0f09a7f8', '02b4e9d0-8ecb-49b8-859c-d454aff20f6a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `soporte_whatsapp_uno` varchar(100) DEFAULT NULL,
  `soporte_whatsapp_dos` varchar(100) DEFAULT NULL,
  `soporte_whatsapp_tres` varchar(100) DEFAULT NULL,
  `url_terminos_condiciones` varchar(200) DEFAULT NULL,
  `porcentaje_fee_comprador` double DEFAULT 1,
  `porcentaje_fee_vendedor` double DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`soporte_whatsapp_uno`, `soporte_whatsapp_dos`, `soporte_whatsapp_tres`, `url_terminos_condiciones`, `porcentaje_fee_comprador`, `porcentaje_fee_vendedor`) VALUES
('+593 987778886', '+593 987778886', '+593 987778886', 'https://terminos.com', 2.2, 1.5);

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
  `numero_de_cuenta` int(50) NOT NULL,
  `seleccionar_banco` varchar(40) NOT NULL,
  `tipo_de_documento` varchar(50) NOT NULL,
  `numero_de_documento` varchar(13) NOT NULL,
  `nombre_del_propietario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuenta_bancaria`
--

INSERT INTO `cuenta_bancaria` (`id`, `tipo_de_cuenta`, `numero_de_cuenta`, `seleccionar_banco`, `tipo_de_documento`, `numero_de_documento`, `nombre_del_propietario`) VALUES
('206e3ced-75cd-48a0-8841-fda116e4fe5e', 'Ahorro', 2832323, 'Banco Guayaquil', 'Cédula', '1343566431', 'Pedro Ramirez'),
('2ec2791b-647e-436c-a4c9-02d5b3f85eaa', 'Ahorro', 2147483647, 'Banco Pichincha', 'Cédula', '2147483647', 'Edward Lopez'),
('3b32e7e2-0ee3-49fe-af58-2042d07cc5e4', 'Ahorro', 3321333, 'A', 'RUC', '67567657', 'Ramiro Lopez'),
('7d63f627-86b1-449e-b897-a42783fce22d', 'Ahorro', 2147483647, 'Banco Guayaquil', 'Cédula', '2938134723', 'Gabriel Diaz'),
('96c7f002-b80b-4bf5-a5c0-767ce530df50', 'Ahorro', 2147483647, 'Banco Guayaquil', 'Cédula', '2147483647', 'Gabriel Diaz'),
('bf1d2837-011e-4ba0-bd8a-c8dbd4e563d0', 'Ahorro', 2147483647, 'Banco Pichincha', 'Cédula', '2343358402', 'Gabriel Sanz'),
('e050edf6-fe17-457d-a33c-e424d2051e83', 'Ahorro', 2147483647, 'Banco Pichincha', 'RUC', '2209182234223', 'Aso Test'),
('e4569839-638b-4f03-92ca-44217c2b0719', 'Ahorro', 88889999, 'Banco Pichincha', 'RUC', '134355332', 'Pedro Ramirez');

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
('23ea0959-326c-4528-9fd0-f3702c241809', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 25, '2024-09-14 20:07:37'),
('4bab2a7e-e7c4-48b5-ae91-883a81708ecb', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 12, '2025-04-11 11:17:32');

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
('04682d73-a107-4d77-85ac-425e52d5b736', 'a5d6d612-ddf3-4676-9b06-4ec9e69bff4e', 'fc25d3e8-dd66-432f-ba01-88bb117791d0', 15, 'KG', '2024-11-29', '20:39:00'),
('05049e56-f8ca-420f-97d8-5b3e89e39be6', 'de92k121s3212', '2dbdf34a-6068-4b65-a165-b099a0c3aecb', 13, 'KG', '2024-12-26', '14:58:00'),
('050a772b-c8e2-4acf-adbd-cc96404cac79', 'de92k121s3212', '73751a53-ff26-496c-95df-f78062822468', 250, 'KG', '2024-03-19', '05:30:00'),
('0f708c1a-02a7-431d-a4e5-03c4676a2adb', 'de92k121s3212', 'd16254f4-b830-4408-8a7c-647112af31a1', 35, 'KG', '2024-11-22', '13:40:00'),
('163dc5bd-9757-48c3-b290-78f9ca5cfe45', 'de92k121s3212', 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4', 150, 'QQ', '2024-09-25', '20:30:00'),
('16a0f30b-e07d-4632-930b-12ff59d287e7', 'de92k121s3212', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e', 250, 'KG', '2025-10-20', '10:30:00'),
('1dd394be-05bd-484e-9d4a-2c6c39eb1c45', 'de92k121s3212', '2dbdf34a-6068-4b65-a165-b099a0c3aecb', 13, 'KG', '2024-12-26', '14:58:00'),
('201ccee8-40ff-4e5c-96a3-022345385f26', 'de92k121s3212', '802acdfe-af6a-420d-a93e-2a1f88181683', 20, 'KG', '2024-11-14', '12:46:00'),
('3832ebe6-d26c-4de9-b6a6-d66fc468557c', 'de92k121s3212', 'd62ecc78-6424-44c1-8cfa-c30cfc90476e', 25, 'KG', '2024-11-30', '16:30:00'),
('3f49c076-6a77-4d87-904f-6448d9019082', 'de92k121s3212', '02b4e9d0-8ecb-49b8-859c-d454aff20f6a', 65, 'KG', '2024-11-02', '03:50:00'),
('48a229f5-506b-473a-894e-7ee01c1c16d9', 'de92k121s3212', '2dbdf34a-6068-4b65-a165-b099a0c3aecb', 13, 'KG', '2024-12-26', '14:58:00'),
('60c83288-7e63-4f4d-a0f3-1ed07cec8f7a', 'de92k121s3212', '25ae36a3-f96d-4e0d-8d72-c47b61fbb527', 15, 'KG', '2024-11-22', '11:00:00'),
('8e95cd24-eac8-4419-b79c-bc82a7ac228e', 'de92k121s3212', 'db47147f-2b21-4b94-914b-de32238b1c2c', 50, 'KG', '2024-11-18', '10:45:00'),
('8f165f37-d276-4fb0-a32e-d67c3f8f97ad', 'de92k121s3212', 'da29d7c6-201e-4af7-a7b6-b4b04b18198b', 25, 'KG', '2024-11-21', '03:00:00'),
('9de6a422-3663-406d-bd58-59d731886ed5', 'de92k121s3212', 'db47147f-2b21-4b94-914b-de32238b1c2c', 50, 'KG', '2024-11-09', '10:45:00'),
('aa1c27f0-7519-4368-95f3-bbb7904af2b4', 'de92k121s3212', '86e50ddb-eb69-4714-b663-d1e7b9e9a61b', 25, 'KG', '2024-11-21', '16:30:00'),
('c5b7ac9d-7637-46b1-8790-7e097f548d19', 'de92k121s3212', '2dbdf34a-6068-4b65-a165-b099a0c3aecb', 13, 'KG', '2024-12-26', '14:58:00'),
('e8d4b15b-5f4e-4968-9fdf-37d1c18cc6be', 'de92k121s3212', 'c6e697d5-90fc-412d-a262-1f25172e4ea1', 85, 'QQ', '2024-11-17', '15:30:00'),
('e9cd7f91-308f-4bf0-b3df-3bd79e2acec4', 'de92k121s3212', '5cee8d60-1a09-4a5d-9e46-0d677b4412e2', 60, 'KG', '2024-11-11', '20:30:00'),
('ed22e054-89b4-4908-96fe-06b15d2b7f3c', 'de92k121s3212', '0977de59-5156-4b48-97d3-348e9aa3f738', 25, 'KG', '2024-11-23', '20:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_ordenes`
--

CREATE TABLE `estado_ordenes` (
  `id` varchar(250) NOT NULL,
  `id_orden` varchar(250) NOT NULL,
  `estado` enum('Pendiente de entrega','En camino','Entregada','Recibido','Rechazado','Aceptado','Revision') NOT NULL DEFAULT 'Pendiente de entrega',
  `motivo` enum('','Rechazado por calidad','Nunca llegó') NOT NULL DEFAULT '',
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_ordenes`
--

INSERT INTO `estado_ordenes` (`id`, `id_orden`, `estado`, `motivo`, `fecha`) VALUES
('0159db26-fabc-4c06-b8f7-205c4df66ab9', 'a562595f-9bdb-4053-bb1e-b95a2ef54798', 'Aceptado', '', '2025-04-11 13:16:46'),
('0281a5fb-c087-4fef-9e3d-c075f64bf165', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'Rechazado', 'Nunca llegó', '2024-09-25 14:37:35'),
('063d28c6-a84e-453f-8314-df444d245f98', 'ccff96df-ea55-4f44-951e-f073e40bc3ca', 'Entregada', '', '2024-11-10 19:46:21'),
('074e0972-759a-4ff6-8a2c-6c31859d92a2', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'En camino', '', '2024-11-13 11:27:46'),
('0b0c31a1-0722-4e8d-bdf0-d2659e34f45e', '38fb3c3d-8054-4b21-97a9-b565a1113016', 'Pendiente de entrega', '', '2024-11-07 11:09:18'),
('0b92ca8a-d065-4fa4-97a5-486c0e157868', '38fb3c3d-8054-4b21-97a9-b565a1113016', 'En camino', '', '2024-11-07 11:11:56'),
('118d2861-ab91-4827-b0c8-9db42e708311', 'aa6ad266-003b-4475-bdfc-c3e3d756800d', 'Aceptado', '', '2024-11-14 09:20:12'),
('194e10b8-cd5b-4078-99d8-2df8c338c536', '746d7b5f-73b2-400a-9b11-c650c8a69e91', 'Entregada', '', '2024-11-14 15:43:54'),
('1ae61275-e3f4-431a-a60b-1779b0719116', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'Revision', '', '2024-11-13 11:28:13'),
('1ff4bcdb-fe6e-4505-90e3-f82f0782aa1f', '28e74cec-913f-4fc7-989a-7cea5538461f', 'Entregada', '', '2024-11-19 17:45:20'),
('20b71404-fce0-4ab4-975e-133eee14e092', '8c97c004-bf68-421a-a3d8-bf4dd1b13338', 'Recibido', '', '2024-11-10 19:39:59'),
('2913e3fb-7da9-4dd9-ba19-74f35f323b76', '746d7b5f-73b2-400a-9b11-c650c8a69e91', 'Recibido', '', '2024-11-14 15:44:13'),
('2ebd556c-b0c1-43ab-a9e5-94ef4eee796b', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'Entregada', '', '2024-11-07 10:00:38'),
('3be9b29a-e5b4-4cb5-a3a6-833ad1a1f519', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'En camino', '', '2024-09-25 14:37:35'),
('4419165b-54d5-4a53-ace4-f9696a1858c0', 'a562595f-9bdb-4053-bb1e-b95a2ef54798', 'Pendiente de entrega', '', '2024-12-12 10:13:03'),
('446d9988-99ef-4758-b669-9cfd5fb6893f', '8c97c004-bf68-421a-a3d8-bf4dd1b13338', 'Aceptado', '', '2024-11-10 19:45:09'),
('4abbd08d-9c68-4fb2-bd21-6964dd601fc9', 'ccff96df-ea55-4f44-951e-f073e40bc3ca', 'En camino', '', '2024-11-10 19:46:02'),
('4f428ddb-3090-43ec-b434-4441a84c4038', 'aa6ad266-003b-4475-bdfc-c3e3d756800d', 'Pendiente de entrega', '', '2024-11-14 09:17:53'),
('4fc92891-8767-42d1-a816-ac30e1113680', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'Entregada', '', '2024-11-13 11:27:56'),
('52eb486f-5d7e-4858-8dae-a032924e9fed', '58764ab9-d5a1-48fd-8798-a22bd3dffdeb', 'En camino', '', '2024-11-02 10:43:16'),
('58b1102c-e019-40bb-9343-4d1c1132f389', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'Pendiente de entrega', '', '2024-11-01 10:09:56'),
('5ad335b1-c43e-4ecc-8b0f-0e73a2697803', '28e74cec-913f-4fc7-989a-7cea5538461f', 'Recibido', '', '2024-11-19 17:45:29'),
('5e8eb73b-2529-4df2-bae2-57207d2888ed', '3f25e670-9b38-4aa9-81e4-f7136cc9b373', 'Pendiente de entrega', '', '2024-12-16 09:55:10'),
('633dfcc9-86ab-4485-9fea-3dc60a03424e', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'Aceptado', '', '2025-04-11 13:15:31'),
('704a17e0-9039-4c9c-9b0a-c5946f419093', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'Aceptado', '', '2024-09-24 23:18:27'),
('7c5fdd6b-18e6-4894-a973-60a812775733', '38fb3c3d-8054-4b21-97a9-b565a1113016', 'Recibido', '', '2024-11-07 11:11:56'),
('86ed06e3-52ea-407e-9f46-8100ff8640f2', '28e74cec-913f-4fc7-989a-7cea5538461f', 'Pendiente de entrega', '', '2024-11-19 12:34:55'),
('8a1fe16e-e134-419c-ae7f-578b6d9a4cb1', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'Aceptado', '', '2024-11-07 10:23:58'),
('8ddad9e5-f3c6-4ab6-85ba-763347da2fa5', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'En camino', '', '2024-11-07 09:43:43'),
('8eb3edf3-af3b-4fdc-96df-dd940f4621b4', 'ccff96df-ea55-4f44-951e-f073e40bc3ca', 'Rechazado', 'Nunca llegó', '2024-11-10 19:46:29'),
('90ba0f2c-033d-4c2e-8c03-153c66467000', '8c97c004-bf68-421a-a3d8-bf4dd1b13338', 'Entregada', '', '2024-11-10 19:38:01'),
('93e1d06b-2779-404b-a590-758a19cb1e36', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'Recibido', '', '2024-11-13 11:29:47'),
('965b78c1-bc98-49b6-a66c-b63a43292930', '8c97c004-bf68-421a-a3d8-bf4dd1b13338', 'Pendiente de entrega', '', '2024-11-10 11:46:08'),
('994c48ce-1c88-4265-aa1d-1ce66d24f66e', '58764ab9-d5a1-48fd-8798-a22bd3dffdeb', 'Pendiente de entrega', '', '2024-11-01 10:09:56'),
('9b79b69d-ef93-4470-9f0b-2ad1ff5a5175', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'Revision', '', '2024-11-07 10:01:31'),
('a145b949-68dd-47ba-8003-ae82a340cc5e', '5670dc73-1699-4de1-8097-3321b3c9e56d', 'Pendiente de entrega', '', '2024-12-16 09:55:10'),
('a3d1f13e-a587-45d9-bd5d-1c7e28fb41a0', 'aa6ad266-003b-4475-bdfc-c3e3d756800d', 'Entregada', '', '2024-11-14 09:19:13'),
('a51e6d5d-2f73-4a78-80e9-c7e18e2ad8da', '6bc1823b-e30b-4135-b5ad-41b38553fdb9', 'Pendiente de entrega', '', '2024-12-16 09:55:10'),
('b426bf6e-ecb7-41c2-94f0-38ae244850d3', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'Pendiente de entrega', '', '2024-09-24 23:18:10'),
('b5448293-0476-4d87-9fb0-e3d2c50c4585', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'Pendiente de entrega', '', '2024-11-13 11:27:27'),
('bd110b99-53f7-44ca-95e8-3651639e68c1', 'aa6ad266-003b-4475-bdfc-c3e3d756800d', 'En camino', '', '2024-11-14 09:18:43'),
('bdeefce0-ee75-4eb9-87f0-37eab2e3db3e', 'aa6ad266-003b-4475-bdfc-c3e3d756800d', 'Recibido', '', '2024-11-14 09:19:30'),
('c3917117-3b04-4b16-8bc1-ed172b25a22a', '38fb3c3d-8054-4b21-97a9-b565a1113016', 'Rechazado', 'Rechazado por calidad', '2024-11-07 13:25:21'),
('cbaae205-9eea-4187-8ad2-6cfe32e6a42d', '30259de2-4997-46de-8ea0-ec60b4b71b82', 'En camino', '', '2024-09-24 23:18:27'),
('d0149732-56e4-46b1-9c33-08307b503f5c', '5e67c192-2faa-4589-bac1-ddf016f1232e', 'Pendiente de entrega', '', '2024-12-16 09:55:10'),
('d35f975a-bf4d-4d66-891c-108a68f96a2e', '58764ab9-d5a1-48fd-8798-a22bd3dffdeb', 'Aceptado', '', '2024-11-05 23:00:46'),
('d3ac1cb4-e011-48ea-8651-737821876c06', 'd5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'Recibido', '', '2024-11-07 10:01:43'),
('e786eff8-6b69-40ae-a9c7-8a6ef4d8899b', '40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'Revision', '', '2024-11-13 11:28:09'),
('e7978648-9d93-4e8d-bfeb-cd837cfe9435', '542e6e04-1bf8-4736-a126-b5689698a720', 'Pendiente de entrega', '', '2025-04-14 14:15:45'),
('ed475426-e118-44f1-abe2-737368229a03', 'a562595f-9bdb-4053-bb1e-b95a2ef54798', 'Entregada', '', '2024-12-12 10:13:53'),
('ef3831fd-e1d2-48b5-9920-a491cd78e666', 'cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'Pendiente de entrega', '', '2024-09-25 14:37:22'),
('ef9104d6-c9d8-4a3b-ab8d-c2d0e755e575', 'a562595f-9bdb-4053-bb1e-b95a2ef54798', 'En camino', '', '2024-12-12 10:13:48'),
('efe5277f-9c04-44d5-a7d7-3661b8a21f1b', 'ed81e7f3-ee77-448f-bfcf-eadcf81a4243', 'Pendiente de entrega', '', '2025-02-02 15:31:58'),
('f1d35631-c1ae-4e69-886b-fa6b48eb38c5', '8c97c004-bf68-421a-a3d8-bf4dd1b13338', 'En camino', '', '2024-11-10 11:46:56'),
('f3828b5b-a2bc-47dd-b1bc-715a73b22bd2', 'ccff96df-ea55-4f44-951e-f073e40bc3ca', 'Pendiente de entrega', '', '2024-11-10 11:44:17'),
('f46775f0-ee6e-4d3b-8543-833f965f43b3', '746d7b5f-73b2-400a-9b11-c650c8a69e91', 'Pendiente de entrega', '', '2024-11-13 19:56:23'),
('f62309c7-58f1-491b-96cf-f0cf82421d06', 'a562595f-9bdb-4053-bb1e-b95a2ef54798', 'Recibido', '', '2024-12-12 10:16:23'),
('f6a48564-b9f9-4ba8-8cfa-ce847091563a', '28e74cec-913f-4fc7-989a-7cea5538461f', 'Aceptado', '', '2024-11-19 17:49:03'),
('f771d148-3705-4ea0-ba26-ad1acf8f61d9', '28e74cec-913f-4fc7-989a-7cea5538461f', 'En camino', '', '2024-11-19 12:37:17'),
('f997578a-8ff2-49e1-a8e0-2fe6c5a4f907', '746d7b5f-73b2-400a-9b11-c650c8a69e91', 'En camino', '', '2024-11-14 15:43:46'),
('fd88ae96-1a9d-488e-9802-e06592853997', '746d7b5f-73b2-400a-9b11-c650c8a69e91', 'Aceptado', '', '2024-11-14 15:44:20');

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
('0aff3c1c-08a3-4e70-b495-8c46fb5f65ca', '0f708c1a-02a7-431d-a4e5-03c4676a2adb', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 1.155, '2024-11-14 15:44:20'),
('1b5af41d-b764-4adc-9ba4-980d860da8a1', '9de6a422-3663-406d-bd58-59d731886ed5', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 1.5, '2024-11-05 23:00:54'),
('1c525ede-e567-4753-a296-abf76f729c9d', '8f165f37-d276-4fb0-a32e-d67c3f8f97ad', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 0.8625, '2024-11-19 17:49:03'),
('5784d7c2-d6ed-46c5-ab82-da9ec489c616', '201ccee8-40ff-4e5c-96a3-022345385f26', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 0.69, '2024-11-14 09:20:12'),
('5b1d0620-a424-4067-9ef9-af90e5b0f97d', '8e95cd24-eac8-4419-b79c-bc82a7ac228e', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 1.5, '2024-11-07 13:23:38'),
('739a67fd-9f92-45d4-8221-3625e74b1030', '8e95cd24-eac8-4419-b79c-bc82a7ac228e', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 1.5, '2024-11-07 10:23:58'),
('98970295-3e8d-4ecb-b85e-135cfbd2ceab', '16a0f30b-e07d-4632-930b-12ff59d287e7', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 93.75, '2024-11-09 17:47:49'),
('b65170f3-15d3-484b-84fd-100f75deb104', 'ed22e054-89b4-4908-96fe-06b15d2b7f3c', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 0.7875, '2025-04-12 23:35:18'),
('bb75840d-b8f4-4f34-8b68-1caf8f7b308d', 'ed22e054-89b4-4908-96fe-06b15d2b7f3c', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 1.155, '2025-04-14 13:16:46'),
('c9a19bab-e84a-45e8-914b-fd3084b0d609', '9de6a422-3663-406d-bd58-59d731886ed5', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 1.5, '2024-11-07 13:14:25'),
('d777830f-2a25-40fd-83b9-3bd8ceef6cd0', '3f49c076-6a77-4d87-904f-6448d9019082', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 2.925, '2024-11-10 19:45:09'),
('e3d77033-57c7-4a5d-a3ec-c7aaa02c5d21', 'e8d4b15b-5f4e-4968-9fdf-37d1c18cc6be', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 3.74, '2025-04-14 13:15:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `categoria_insumo` varchar(250) NOT NULL,
  `nombre_comercial` varchar(80) NOT NULL,
  `precio_agroec` double NOT NULL,
  `precio_mas_iva` tinyint(1) NOT NULL,
  `incluido_iva` tinyint(1) NOT NULL,
  `precio_punto_venta` double NOT NULL,
  `stock` int(11) NOT NULL,
  `composicion` varchar(100) NOT NULL,
  `clase` varchar(100) NOT NULL,
  `tipo_formula` varchar(50) NOT NULL,
  `titular` varchar(50) NOT NULL,
  `clasificacion` varchar(50) NOT NULL,
  `instrucciones_de_uso` varchar(350) NOT NULL,
  `epoca_intervalo` varchar(150) NOT NULL,
  `intervalo_entrada` varchar(250) NOT NULL,
  `link` text NOT NULL,
  `atencion` text NOT NULL,
  `creado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`id`, `id_usuario`, `categoria_insumo`, `nombre_comercial`, `precio_agroec`, `precio_mas_iva`, `incluido_iva`, `precio_punto_venta`, `stock`, `composicion`, `clase`, `tipo_formula`, `titular`, `clasificacion`, `instrucciones_de_uso`, `epoca_intervalo`, `intervalo_entrada`, `link`, `atencion`, `creado`) VALUES
('11615eea-fd9a-48b6-a321-d8bad5f32833', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Defensivos', 'Fosfato Monoamónico', 243, 1, 0, 212, 15, 'Nitrogeno 3$', 'Fertilizante', 'Granulado', 'YPF Agro', 'Fosfato Monoamónico (MAP)', 'CCC', 'CCC', 'Para todos. Incorporado al suelo cerca de la semilla o voleado en presiembra de acuerdo a cada situación. En mezclas físicas con otros fertilizantes.', 'https://www.agrofy.com.ar/fertilizante-fosfato-monoamonico-222193.html', 'https://www.agrofy.com.ar/fertilizante-fosfato-monoamonico-222193.html', '2024-12-21 11:12:24'),
('1a46f557-ace9-453a-a79e-f5f845160639', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Defensivos', '2,4D AMINA CCAB', 4999, 0, 1, 3999, 59, 'Agrx93', 'C', 'dDKkd', 'Agro Ligth', 'Recomendada', 'Aplicar sobre plantas', 'AAA', 'A', 'https:link.fertilizantes', 'Mantener fuera del alcance de los niños', '2024-12-10 11:07:26'),
('370dd74f-93a7-4c7c-acee-af343be7939c', 'e8799658-2fbd-4e90-b2f0-82b62568968b', 'Defensivos', 'aa', 8, 0, 1, 11, 5, 'aa', 'bb', 'cc', 'aa', 'ff', 'kk', 'uu', 'oo', 'google.com', '98', '2025-02-16 19:50:13'),
('4aee8ccb-a990-41a3-b3f6-9901f277ebbe', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Fertilizantes', '1,4 SIGHT', 23, 0, 1, 15, 12, 'MKSJ', 'Herbicida', 'Liquida', 'Carlitos', 'Data', 'Instru', 'Cultu', 'Inter', 'https://www.agrofy.com.ar/fertilizante-fosfato-monoamonico-222193.html', 'Aten', '2025-04-11 13:54:57'),
('dc2845ef-25f5-46a1-a2d1-fd33380ca836', 'e8799658-2fbd-4e90-b2f0-82b62568968b', 'Fertilizantes', 'bb', 5.67, 0, 1, 8, 5, 'bb', 'aa', 'bb', 'cc', 'hh', 'jj', 'uu', 'oo', 'facebook.com', '123', '2025-02-16 19:50:13');

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
('236364c1-ca32-495f-a1d6-03ab5c43bb63', 'dc2845ef-25f5-46a1-a2d1-fd33380ca836', 'a'),
('35dc9ffa-957d-4d5b-8941-4b902c737b92', '4aee8ccb-a990-41a3-b3f6-9901f277ebbe', 'https://agroec-api.onrender.com/public/images/sales/input-image-1744390497249-76085976.jpeg'),
('53dcfe01-31e2-405d-8ea5-9f1af97b4d15', '11615eea-fd9a-48b6-a321-d8bad5f32833', 'https://agroec-api.onrender.com/public/images/sales/input-image-1734790344235-686186367.jpeg'),
('a9244a2e-7a2c-4941-8aaa-4954bd0f18ed', '370dd74f-93a7-4c7c-acee-af343be7939c', 'a'),
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
('7c7f2221-9277-4174-86e4-ccac77b235bc', '275ad1f4-5936-4675-b083-391b596e645e'),
('0a78c852-7dd3-4149-a1af-a0aa9707e465', '8f047a8d-ecb0-4157-9131-6a26982e5d52'),
('d88ad093-4d14-4e94-8f96-836d2f7ebadc', '8f047a8d-ecb0-4157-9131-6a26982e5d52'),
('7f2c3737-7141-4c30-9eb4-049dba8e39b3', '8f047a8d-ecb0-4157-9131-6a26982e5d52'),
('e50426b1-45f8-43b3-a38a-985e91328874', 'a4a0c59e-d46e-4ed3-bb87-b599dd6ddafe'),
('1fe3e9de-c52c-41b1-894a-b0006ce47799', '681305b2-8de0-4ccb-b70e-5fd06f691fb3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` varchar(250) NOT NULL,
  `id_remitente` varchar(250) NOT NULL,
  `id_chat` varchar(250) NOT NULL,
  `texto` varchar(150) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `leido` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_remitente`, `id_chat`, `texto`, `fecha`, `leido`) VALUES
('0c4b1e4f-f721-4ea7-a03e-0c73e56820db', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '80e8cab9-d960-4efd-9000-878374a32730', 'Bien, he actualizado las condiciones, dime que opinas.', '2024-11-19 22:02:58', 1),
('0eee91d2-9064-4d2d-8dd5-0421482f3bfd', 'Sistema', '7602d7bb-9bc7-47c1-bfcd-98d022d4721a', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2024-12-16 09:54:38', 1),
('13227276-094b-4393-9b2e-7414fbf48e40', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e5f75eeb-8df7-416f-b983-e3244b0935c5', 'Hola, estas ahi?', '2024-11-10 10:55:56', 1),
('1bbc50c0-2ee6-4d6e-b6fd-1e296c15dca7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'd2046d86-f8ad-473f-b123-1ad94c71532a', 'Hola buenas, indicame si podemos cerrar con las condiciones', '2024-11-13 10:54:50', 1),
('1d003f31-01f5-4037-a7fd-09d9b08076b6', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '107013f0-4a54-4441-ad99-55161efbbe9c', 'Comprendido, puede disminuir el precio?', '2024-11-05 22:56:52', 1),
('2a67b2a7-200c-46b9-8a80-7a7379b51338', 'Sistema', 'dba19580-6a8a-4b1f-99dd-a01ddf362bbc', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2024-11-21 13:38:01', 1),
('45c4fc6f-4926-4f82-854a-f1f9057983a4', 'Sistema', '950506c7-4051-46a5-8073-ba92892254b7', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2025-04-14 12:16:25', 2),
('47275951-ff76-456c-beb1-27ff5797233a', 'Sistema', '950506c7-4051-46a5-8073-ba92892254b7', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2025-02-05 10:20:53', 2),
('481d1cf0-858d-471e-bc3b-484e063fa596', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '80e8cab9-d960-4efd-9000-878374a32730', 'Bien me parece correcto, podemos cerrar el trato.', '2024-11-19 22:40:56', 1),
('4ef23574-8a02-474a-ac5e-c711df400ba8', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'e579772f-49e0-4179-b8bb-a2865d24680c', 'Bien te vendo la cantidad deseada a ese precio.', '2024-11-05 22:44:29', 1),
('50a9906d-af2c-4603-9766-bba723d5fb10', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '754bd3e1-358d-485b-9bc5-22b02b31ed29', 'Hola que tal, podemos seguir con la venta.', '2024-10-10 13:26:46', 0),
('531bceba-7eb0-4b7c-bf07-bac48a764e11', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'El pago puede realizarlo en sitio?', '2024-11-01 14:33:15', 1),
('5402c976-2795-4607-8b25-36b4bc26cd5a', 'Sistema', '950506c7-4051-46a5-8073-ba92892254b7', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2024-11-25 15:38:04', 2),
('58b05604-f4ee-4d6e-b182-27cc3de58e7c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2e19813b-7ffa-4c31-a9d6-f0396b273923', 'Hola, puedo comprarle a ese precio', '2024-11-13 19:53:48', 1),
('6466833c-ebae-43a0-9fe1-b8af678e573a', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'f2266c90-e844-4dad-81a1-4108c4d6a35c', 'El precio?', '2024-11-19 13:05:35', 1),
('6807db0b-487b-4d36-995a-2f8012718c14', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '34e24bbc-97a8-4340-9507-986b60003879', 'Hola, hazme saber cuando revises mi propuesta!', '2024-09-10 00:00:00', 0),
('6a7b89ef-1bfa-42f3-8242-0850466b4033', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Perfecto, estoy pensando en realizar tres entregas para esta propuesta', '2024-10-19 10:23:43', 0),
('774cab9d-4415-4b7b-b7f9-14872a26b96c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '34e24bbc-97a8-4340-9507-986b60003879', 'Haremos el intercambiO?', '2024-09-11 09:38:13', 0),
('82a4b550-7e1a-4964-8e7b-6072e95ac9a5', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'dba19580-6a8a-4b1f-99dd-a01ddf362bbc', 'Hola que tal, aceptare', '2024-11-21 14:01:28', 1),
('8c9bec21-1090-4997-a072-0a9e22106287', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2e19813b-7ffa-4c31-a9d6-f0396b273923', 'Claro, pago en sitio porfavor', '2024-11-13 19:53:59', 1),
('9229deb2-9f46-4678-9643-03a1fb4bb396', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '34e24bbc-97a8-4340-9507-986b60003879', 'Hola que tal, que sucedio?', '2024-10-28 20:15:10', 0),
('9bb33bd5-9ddb-4df0-856b-91d31c542adf', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '754bd3e1-358d-485b-9bc5-22b02b31ed29', 'Si, porfavor indica las condiciones', '2024-10-24 21:16:04', 1),
('a507c969-0f9c-4764-9701-356ef49eb103', 'Sistema', '80e8cab9-d960-4efd-9000-878374a32730', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2024-11-19 22:32:56', 1),
('a64185ef-dfa9-47c6-9563-908968f78f9a', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'f2266c90-e844-4dad-81a1-4108c4d6a35c', 'Buenas, me parece bien las condiciones', '2024-11-19 13:05:02', 1),
('a9b89635-f5e3-4633-95c6-cf31c03e63eb', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e579772f-49e0-4179-b8bb-a2865d24680c', 'Hola, deseo comprar treinta kg a razón de dos el kilo, porque considero que el precio de lista es elevado.', '2024-11-03 18:42:55', 1),
('ae5ed51f-eb94-471e-8844-4a0bf0598f2a', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'e5f75eeb-8df7-416f-b983-e3244b0935c5', 'Que tal', '2024-11-10 10:56:58', 1),
('b626bb8a-e79a-430f-9152-4c44b17eeeb6', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '107013f0-4a54-4441-ad99-55161efbbe9c', 'Hola, envio mensaje para coordinar', '2024-11-03 18:36:04', 1),
('ba98ac84-05c5-4da5-8ee5-ef2151208304', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Voy a revisar tus condiciones', '2024-10-19 10:22:54', 1),
('be9b9595-e41a-4525-9b31-011cc3b5a68e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '1e23dd74-1866-435b-81ec-48e36ac5c773', 'Hola buenas', '2024-11-21 14:23:27', 1),
('c211ad08-9b27-4019-ac78-43ff90acbbae', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '536d4c80-20f3-498f-8900-f997c616d912', '@gmail.com', '2024-10-28 22:20:56', 0),
('c8e33e95-762d-4cb8-8b19-51a7a3e6ed05', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Hola, respondeme cuando veas este mensaje', '2024-09-11 09:35:07', 0),
('cfa8f87d-48db-4dcd-82aa-e2a8ccf47528', 'Sistema', '950506c7-4051-46a5-8073-ba92892254b7', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2025-02-02 09:50:51', 2),
('d1d21462-332e-4d80-9494-71c545419bb4', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '34e24bbc-97a8-4340-9507-986b60003879', 'Hola, he recibido tu propuesta, te ofrezco 17.50 en mi planta.', '2024-09-10 20:33:01', 1),
('d3823b56-d9e6-4379-9daf-ef5a936a95a5', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'dba19580-6a8a-4b1f-99dd-a01ddf362bbc', 'Buenas', '2024-11-21 13:36:12', 1),
('d9776559-9a55-44a0-ab8f-188e8a91919f', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e5f75eeb-8df7-416f-b983-e3244b0935c5', 'Todo bien y tu?', '2024-11-10 11:14:11', 1),
('d9c3b664-0f1c-48fd-b85d-ea22b5ebf222', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'd2046d86-f8ad-473f-b123-1ad94c71532a', 'Hola claro, creo son buenas condiciones', '2024-11-13 10:56:12', 1),
('dca50815-918f-40d2-a0cb-74574e652508', 'Sistema', '950506c7-4051-46a5-8073-ba92892254b7', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2025-02-02 09:50:52', 2),
('e4457f24-3ce7-4abd-b8e9-340ee6ee91cd', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Si, hagamos el intercambio', '2024-09-30 00:49:13', 0),
('e7393257-a6f0-4a97-9136-57bc02640abc', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Me parece bien, porfavor ajuste las condiciones', '2024-11-01 14:32:35', 1),
('f117cb3c-ab28-4034-9719-97a62804113b', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Si claro podria realizar un cincuenta porciento en sitio', '2024-11-01 14:33:57', 0),
('fd249b17-ce5c-4577-a0d6-e46a8bd02a6e', 'Sistema', '8f561883-2514-4524-ade6-b6bc5f940945', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2024-11-25 15:27:30', 2),
('fe53a5b4-a0f6-43bb-943a-35e4a1871410', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '536d4c80-20f3-498f-8900-f997c616d912', '@gmail.com', '2024-10-28 22:19:51', 0),
('feb92f98-ceff-43c6-bf67-5daa16b5ac7e', 'Sistema', '80e8cab9-d960-4efd-9000-878374a32730', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', '2024-11-19 21:58:15', 1),
('j3k21e95-762d-4cb8-8b19-51a7a3e6ed06', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '2943eaef-834f-42e0-9e9d-0419164e4c24', 'Hola, que tal, como gustas seguir la negociación?', '2024-09-30 00:49:00', 1);

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
  `mensaje` varchar(300) DEFAULT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `redireccion` varchar(250) DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `vista` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_notificado`, `id_producto`, `mensaje`, `titulo`, `redireccion`, `fecha`, `vista`) VALUES
('001e36b0-e6de-40a4-ba98-078ce71a3b74', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 'Nueva propuesta de venta de Maiz', 'Propuesta de venta', '/chat/licitacion/Maiz/d549b828-cf24-454a-a765-b88ede384139', '2024-11-21 14:20:09', 1),
('017978c7-dccc-48d4-a066-542ebb86a61d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 'Nueva propuesta de venta de Maiz', 'Propuesta de venta', '/chat/licitacion/Maiz/8808084a-3eae-4278-9ec1-1ec80ae326c5', '2025-01-29 09:06:15', 1),
('05e08c64-369e-4992-8803-0e9540166342', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/chat/licitacion/Cacao/dba19580-6a8a-4b1f-99dd-a01ddf362bbc', '2024-11-21 13:36:12', 1),
('081bae75-688b-4ecf-a2a1-f76fddbf1b2c', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha completado el pago de garantía de $30.00', 'Pago de garantía', '/order/ed81e7f3-ee77-448f-bfcf-eadcf81a4243', '2025-02-02 15:31:58', 1),
('26d80be8-fa5b-4c51-8a5e-175110b5384b', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-04-14 12:16:23', 1),
('274c54bc-e2ec-4b77-b10f-ac06db9d5409', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha completado el pago de garantía de $31.50', 'Pago de garantía', '/order/a562595f-9bdb-4053-bb1e-b95a2ef54798', '2024-12-12 10:13:02', 1),
('2fdf78a1-7b53-4951-89c1-6562618a1b33', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-04-14 12:16:32', 1),
('3b2fe932-e37b-4f9b-8e69-b8f3647469e1', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Nueva propuesta de compra de Cacao', 'Propuesta de compra', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 08:00:00', 1),
('3cabe8bd-ea3d-43c1-a650-4e9a20f0e02e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Nueva propuesta de compra de Cacao', 'Propuesta de compra', '/app/chat/oferta/dba19580-6a8a-4b1f-99dd-a01ddf362bbc', '2024-11-21 13:36:04', 1),
('3de44174-2a62-4dd0-a711-130d0eb8a909', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Cacao/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 17:14:37', 1),
('3e6409b1-decb-4640-9210-5b5ca1c3cf2d', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 17:14:28', 1),
('3f6dffc4-39e3-4e98-9ffb-ff07e6a4e870', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/7602d7bb-9bc7-47c1-bfcd-98d022d4721a', '2024-12-16 09:55:09', 1),
('40921923-5634-4a24-a8b1-a296e31039a3', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/dba19580-6a8a-4b1f-99dd-a01ddf362bbc', '2024-11-21 13:38:15', 1),
('430f8267-52d0-4ed0-8733-99be4a66c61c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Cacao/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 17:16:01', 1),
('48c009e4-53d2-40c0-a9ba-f767c8edf24a', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/chat/licitacion/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 10:00:00', 1),
('4c0e3d47-4cd7-4fc4-9f39-33ddcd5c5172', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha completado el pago de garantía de $17.25', 'Pago de garantía', '/order/28e74cec-913f-4fc7-989a-7cea5538461f', '2024-11-18 00:00:00', 1),
('4cd9f449-ec59-4560-ba9b-dab2081bc627', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 13:11:31', 1),
('5484e379-a570-4d9c-8427-8c24711761b5', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 16:58:52', 1),
('5ad70f41-58bb-4f81-adab-77d3d60b30b0', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Cacao/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 22:41:00', 1),
('5c650685-7a25-4b63-8653-27ee98f8b9a8', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 17:15:21', 1),
('5d4b828b-701e-4b0b-aa37-eb4a32e92327', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 22:32:56', 1),
('5ddac855-0817-45f0-8668-976c9a594ca4', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 'Nueva propuesta de venta de Maiz', 'Propuesta de venta', '/chat/licitacion/Maiz/1e23dd74-1866-435b-81ec-48e36ac5c773', '2024-11-21 14:04:19', 1),
('5ed0ed0d-0c45-4a4e-9885-7c05784d145f', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor marco la orden como despachada', 'Orden de Cacao', '/order/28e74cec-913f-4fc7-989a-7cea5538461f', '2024-11-18 14:00:00', 1),
('6167107d-a58f-46bf-b772-949fb31cd712', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor indico que recibiste la orden', 'Orden de Cacao', '/order/a562595f-9bdb-4053-bb1e-b95a2ef54798', '2024-12-12 10:13:53', 1),
('6ec06bf4-25ac-4e1a-8254-ebc5115cbd8b', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/chat/licitacion/Cacao/dba19580-6a8a-4b1f-99dd-a01ddf362bbc', '2024-11-21 14:01:28', 1),
('72a89a1c-0531-4fb2-965d-5026450dadf0', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Cacao/7602d7bb-9bc7-47c1-bfcd-98d022d4721a', '2024-12-16 09:54:53', 1),
('75ab0014-94d4-41ca-a856-b9a145912503', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-21 13:34:39', 1),
('8204c464-f446-488c-9efc-5efa3e505dbf', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 16:59:14', 1),
('8419212f-2ba1-480f-80ec-cbb1ba342cfc', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/dba19580-6a8a-4b1f-99dd-a01ddf362bbc', '2024-11-21 13:38:01', 1),
('8535db7b-1113-422f-83d7-620a9d41d39d', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-02-05 10:20:53', 1),
('890c8138-93c3-4b30-9fa3-52842e85d51c', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 17:15:00', 1),
('94b805b4-9293-4f46-b53c-e6f7cfb1b544', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Nueva propuesta de compra de Cacao', 'Propuesta de compra', '/app/chat/oferta/8e5df4ce-978e-4077-9616-fa74f423cc09', '2024-12-02 11:05:31', 1),
('96dacd9c-4e28-497c-a32a-31dab73b0f63', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maiz', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/8f561883-2514-4524-ade6-b6bc5f940945', '2024-11-25 15:27:30', 1),
('97aa5461-49ef-419b-a0f2-851e118c2d0d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Cacao/dba19580-6a8a-4b1f-99dd-a01ddf362bbc', '2024-11-21 14:03:32', 1),
('9adcea3f-5d42-4acd-a776-03d4a20fb5f4', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/7602d7bb-9bc7-47c1-bfcd-98d022d4721a', '2024-12-16 09:54:38', 1),
('9bf51dee-1562-4533-8804-a388467079cd', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'El comprador ha completado el pago de garantía de $10.35', 'Pago de garantía', '/order/542e6e04-1bf8-4736-a126-b5689698a720', '2025-04-14 14:15:44', 0),
('a80f2120-adf3-4ac2-add8-48954ec3f71c', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Nueva propuesta de compra de Cacao', 'Propuesta de compra', '/app/chat/oferta/7602d7bb-9bc7-47c1-bfcd-98d022d4721a', '2024-12-02 11:05:33', 1),
('b3771b2d-b47c-4b4b-b248-5ee4dfeb9309', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-02-02 09:50:52', 1),
('b6b0a405-e96c-4a65-8025-e8abdef56e90', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2024-11-25 15:38:04', 1),
('b780cafc-649c-4804-be4f-7bb3fffa8a6c', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maracuya', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Maracuya/950506c7-4051-46a5-8073-ba92892254b7', '2025-04-14 12:17:16', 0),
('bba279d3-b0a5-4412-b591-dce1b144eaae', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor indico que recibiste la orden', 'Orden de Cacao', '/order/28e74cec-913f-4fc7-989a-7cea5538461f', '2024-11-19 17:45:20', 1),
('bc72ded7-0334-43a2-a07a-fb02fc484372', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 'Nueva propuesta de venta de Maiz', 'Propuesta de venta', '/chat/licitacion/Maiz/8f561883-2514-4524-ade6-b6bc5f940945', '2024-11-25 15:21:16', 1),
('c95f1b9f-c2c4-4f14-86a6-a62f1e287f59', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maiz', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/chat/licitacion/Maiz/1e23dd74-1866-435b-81ec-48e36ac5c773', '2024-11-21 14:23:27', 1),
('cb19e776-449a-4c8f-bf52-5bf20dfb3ec5', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-04-14 12:16:25', 1),
('ccfbb16d-30fa-473b-9959-c7ca748f06d1', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Nueva propuesta de compra de Cacao', 'Propuesta de compra', '/app/chat/oferta/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 17:31:34', 1),
('ce74ec63-6933-4796-aeb6-41da8be15171', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/chat/licitacion/Cacao/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 22:02:58', 1),
('cf3ded17-a0d8-4e61-9ec5-6db49bc406ad', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-02-02 09:50:51', 1),
('d93ccc74-107e-4edf-833e-38529266d3a7', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 21:58:15', 1),
('d976be5e-fe87-454b-963c-ffe873c76bb7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor marco la orden como despachada', 'Orden de Cacao', '/order/a562595f-9bdb-4053-bb1e-b95a2ef54798', '2024-12-12 10:13:48', 1),
('e0d78ff4-e490-4906-8829-4fcc101bacef', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'Nueva propuesta de compra de Maracuya', 'Propuesta de compra', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2024-11-25 15:37:24', 1),
('e281cf90-69ff-49c1-b38a-4d785e671479', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 'El comprador ha aceptado la propuesta', 'Propuesta de compra', '/app/chat/oferta/950506c7-4051-46a5-8073-ba92892254b7', '2025-04-14 12:16:22', 1),
('e641840e-2ed5-48c9-ba48-1cf305811b4e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'El vendedor ha aceptado la propuesta', 'Propuesta de compra', '/chat/licitacion/Cacao/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 22:41:00', 1),
('e7c12989-bd52-436b-83d7-37a44b6987ad', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Las condiciones han sido actualizadas. Visita dando click en el botón condiciones y tanto comprador como vendedor deben aceptar la oferta.', 'Condición Actualizada', '/app/chat/oferta/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 13:10:39', 1),
('ed502cca-33ff-4b56-a6dd-689e85df4467', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador marco la orden como recibida', 'Orden de Cacao', '/order/28e74cec-913f-4fc7-989a-7cea5538461f', '2024-11-19 17:45:29', 1),
('f16a74bd-5d1d-4843-bca4-b2085fdfe812', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cacao', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/chat/licitacion/Cacao/80e8cab9-d960-4efd-9000-878374a32730', '2024-11-19 22:40:56', 1),
('f1bc75f4-f0d4-4842-81da-0246f5ef2a8c', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'El comprador marco la orden como recibida', 'Orden de Cacao', '/order/a562595f-9bdb-4053-bb1e-b95a2ef54798', '2024-12-12 10:16:23', 1),
('f2215a94-cf11-4268-9702-5f539d95c55d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 'Nueva propuesta de venta de Maiz', 'Propuesta de venta', '/chat/licitacion/Maiz/d8707c7f-a80c-4361-bf87-0d64d8d3c6d7', '2025-01-29 08:44:13', 1),
('f4770378-3ae7-4849-bbd3-7eb11e9f1f96', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 'Has recibido un mensaje en la negociación', 'Mensaje Recibido', '/app/chat/licitacion/f2266c90-e844-4dad-81a1-4108c4d6a35c', '2024-11-19 09:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_receptores`
--

CREATE TABLE `notificaciones_receptores` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_onesignal` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones_receptores`
--

INSERT INTO `notificaciones_receptores` (`id`, `id_usuario`, `id_onesignal`) VALUES
('a18c7244-4464-48c7-ae9a-e7787063ce46', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '3a1cf02c-a5f9-4f8a-ba95-ddb6b72e7585');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id` varchar(250) NOT NULL,
  `id_comprador` varchar(250) NOT NULL,
  `id_vendedor` varchar(250) NOT NULL,
  `id_entrega` varchar(250) NOT NULL,
  `estado` enum('En revision','Pago en garantia','Pendiente de entrega','En camino','Rechazado','Recibido','Entregada','Aceptado') DEFAULT 'Pago en garantia',
  `cantidad_recibida` int(11) NOT NULL DEFAULT 0,
  `creado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `id_comprador`, `id_vendedor`, `id_entrega`, `estado`, `cantidad_recibida`, `creado`) VALUES
('28e74cec-913f-4fc7-989a-7cea5538461f', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '8f165f37-d276-4fb0-a32e-d67c3f8f97ad', 'Aceptado', 25, '2024-11-19 11:37:05'),
('30259de2-4997-46de-8ea0-ec60b4b71b82', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '050a772b-c8e2-4acf-adbd-cc96404cac79', 'Aceptado', 200, '2024-09-21 19:30:58'),
('38fb3c3d-8054-4b21-97a9-b565a1113016', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '16a0f30b-e07d-4632-930b-12ff59d287e7', 'Rechazado', 250, '2024-11-02 10:09:49'),
('3f25e670-9b38-4aa9-81e4-f7136cc9b373', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '48a229f5-506b-473a-894e-7ee01c1c16d9', 'Pendiente de entrega', 0, '2024-12-16 09:55:10'),
('40ae9141-1a7f-4237-8a45-3e5e4d87e741', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'e8d4b15b-5f4e-4968-9fdf-37d1c18cc6be', 'Aceptado', 85, '2024-11-07 13:42:04'),
('542e6e04-1bf8-4736-a126-b5689698a720', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '04682d73-a107-4d77-85ac-425e52d5b736', 'Pendiente de entrega', 0, '2025-04-14 12:17:18'),
('5670dc73-1699-4de1-8097-3321b3c9e56d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'c5b7ac9d-7637-46b1-8790-7e097f548d19', 'Pendiente de entrega', 0, '2024-12-16 09:55:10'),
('58764ab9-d5a1-48fd-8798-a22bd3dffdeb', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '9de6a422-3663-406d-bd58-59d731886ed5', 'Aceptado', 100, '2024-11-01 08:45:01'),
('5e67c192-2faa-4589-bac1-ddf016f1232e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '1dd394be-05bd-484e-9d4a-2c6c39eb1c45', 'Pendiente de entrega', 0, '2024-12-16 09:55:10'),
('6bc1823b-e30b-4135-b5ad-41b38553fdb9', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '05049e56-f8ca-420f-97d8-5b3e89e39be6', 'Pendiente de entrega', 0, '2024-12-16 09:55:10'),
('746d7b5f-73b2-400a-9b11-c650c8a69e91', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '0f708c1a-02a7-431d-a4e5-03c4676a2adb', 'Aceptado', 35, '2024-11-13 19:56:23'),
('8c97c004-bf68-421a-a3d8-bf4dd1b13338', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '3f49c076-6a77-4d87-904f-6448d9019082', 'Aceptado', 65, '2024-11-10 11:46:08'),
('a562595f-9bdb-4053-bb1e-b95a2ef54798', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'ed22e054-89b4-4908-96fe-06b15d2b7f3c', 'Aceptado', 25, '2024-11-21 14:03:32'),
('aa6ad266-003b-4475-bdfc-c3e3d756800d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '201ccee8-40ff-4e5c-96a3-022345385f26', 'Aceptado', 20, '2024-11-13 20:37:14'),
('cb38f5fd-e1d2-48b5-9920-a491cd78e666', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '163dc5bd-9757-48c3-b290-78f9ca5cfe45', 'Rechazado', 0, '2024-09-20 23:49:29'),
('ccff96df-ea55-4f44-951e-f073e40bc3ca', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'e9cd7f91-308f-4bf0-b3df-3bd79e2acec4', 'Rechazado', 0, '2024-11-10 11:36:40'),
('d5a8aedc-5a76-4db5-9347-4d59ccc8dfd2', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '8e95cd24-eac8-4419-b79c-bc82a7ac228e', 'Aceptado', 100, '2024-11-01 08:45:01'),
('ed81e7f3-ee77-448f-bfcf-eadcf81a4243', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'aa1c27f0-7519-4368-95f3-bbb7904af2b4', 'Pendiente de entrega', 0, '2024-11-19 17:16:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_vendedores`
--

CREATE TABLE `pagos_vendedores` (
  `id` varchar(150) NOT NULL,
  `id_usuario` varchar(150) NOT NULL,
  `codigo_deposito` varchar(50) NOT NULL DEFAULT '0',
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos_vendedores`
--

INSERT INTO `pagos_vendedores` (`id`, `id_usuario`, `codigo_deposito`, `fecha`) VALUES
('673ed526-9efc-4ced-9cff-03dcf24718ec', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'BSDKE-293333', '2025-04-14 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago_garantia`
--

CREATE TABLE `pago_garantia` (
  `id` varchar(250) NOT NULL,
  `id_condicion` varchar(250) NOT NULL,
  `porcentaje` decimal(10,0) NOT NULL,
  `metodo_pago` enum('TD/TC','TRANSFERENCIA') NOT NULL,
  `total` double NOT NULL DEFAULT 0,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `devolucion` tinyint(1) NOT NULL DEFAULT 0,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago_garantia`
--

INSERT INTO `pago_garantia` (`id`, `id_condicion`, `porcentaje`, `metodo_pago`, `total`, `fecha`, `devolucion`, `estado`) VALUES
('07a587f1-c379-46f7-bf23-050dcc2f2c32', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e', 20, 'TD/TC', 1250, '2024-11-07 11:09:18', 0, 1),
('188e347d-3687-48d7-a307-8f6baec06905', 'c6e697d5-90fc-412d-a262-1f25172e4ea1', 70, 'TD/TC', 118.99999999999999, '2024-11-13 11:27:27', 0, 1),
('35febec7-620f-414e-86c5-2c1090cb3777', '0977de59-5156-4b48-97d3-348e9aa3f738', 60, 'TD/TC', 31.5, '2024-12-12 10:13:02', 0, 1),
('569bdcce-da67-41a1-b7c7-273be9a92ada', 'fc25d3e8-dd66-432f-ba01-88bb117791d0', 30, 'TRANSFERENCIA', 10.35, '2025-04-14 14:15:35', 0, 1),
('5d6529e3-c6c7-4e43-8e35-55d552e6455d', '5cee8d60-1a09-4a5d-9e46-0d677b4412e2', 30, 'TD/TC', 36, '2024-11-10 11:44:16', 0, 1),
('674375ff-a64e-44ce-9cbd-00cc7389d69d', 'db47147f-2b21-4b94-914b-de32238b1c2c', 50, 'TRANSFERENCIA', 100, '2024-11-01 10:09:56', 0, 1),
('75c34c40-128b-4a45-a83d-f69fb2956eda', '73751a53-ff26-496c-95df-f78062822468', 20, 'TD/TC', 10000, '2024-09-24 23:18:10', 0, 1),
('7a6e9bcc-d5d8-4a85-93eb-a1521ec789b2', '802acdfe-af6a-420d-a93e-2a1f88181683', 20, 'TD/TC', 9.200000000000001, '2024-11-14 09:17:52', 0, 1),
('7dbf0153-91ae-4189-82d6-c8a77cc4aa29', '86e50ddb-eb69-4714-b663-d1e7b9e9a61b', 50, 'TD/TC', 30, '2025-02-02 15:31:58', 0, 1),
('ec9caa0b-353b-4bd7-86fc-4857db70462c', 'da29d7c6-201e-4af7-a7b6-b4b04b18198b', 30, 'TD/TC', 17.249999999999996, '2024-11-19 12:34:55', 0, 1);

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
('0a78c852-7dd3-4149-a1af-a0aa9707e465', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('10a7230f-c779-43fa-ba19-07070a41a4d1', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 1),
('149152da-7655-44f0-9ad2-82ca0f09a7f8', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 5),
('172191b7-c6aa-4c1d-aa3e-b921c0619d88', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('1fe3e9de-c52c-41b1-894a-b0006ce47799', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('2bf8ea3d-5071-4e41-b51b-2fac01d2901e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('30223cd0-404e-48c2-9cc1-8513b55b624b', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Humedad', 2, 7),
('3c1206ca-88d6-4fcc-b0a2-7340d1d0f685', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 1),
('492a6e70-7687-45a0-b7f9-833389aae1bc', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 5),
('54f8b16e-93a4-4841-bb04-dffb81b29c96', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 15),
('63af586f-a314-47aa-a939-84d177fc98fe', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 6),
('6a2f602c-bf7c-4e82-94b6-d0f8db74f353', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Granulado', 5, 25),
('7529a255-f090-4cd7-98da-dbe1e93e1827', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 5),
('7c7f2221-9277-4174-86e4-ccac77b235bc', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 9),
('7f2c3737-7141-4c30-9eb4-049dba8e39b3', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 9),
('85a6cba3-3972-4d41-b4d2-db6bb3e4c787', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Granulado', 24, 26),
('8e6c8945-f28d-4e7e-9171-78467986df80', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('9a80e115-adfd-46e7-b681-6fa032433873', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 8),
('9c588bf7-16a2-4878-bd99-607b2b21a940', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('c212f4c8-e8f9-4489-b5dd-c2f6e45c6525', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Humedad', 2, 7),
('c9a2dfe4-660b-48a3-80ef-43c01b109b9e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 2, 7),
('caf0cc58-699f-4a51-a7f5-b83e0ac79a34', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Humedad', 2, 5),
('cfe786d9-36da-41c1-9eb9-b1ee7b6c9a58', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Humedad', 2, 10),
('d74ac106-f7cd-4e90-8b6d-5862e1ac3848', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Humedad', 2, 7),
('d88ad093-4d14-4e94-8f96-836d2f7ebadc', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'KS2', 0, 1),
('e27dd533-7180-449a-aa82-870ab2ac732d', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Almidon', 1, 1),
('e385ffca-b643-4922-9814-d6e7fa0c5140', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Aflaxtoxinas', 0, 3),
('e50426b1-45f8-43b3-a38a-985e91328874', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Humedad', 1, 7);

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
  `numero_hectareas` decimal(10,0) DEFAULT NULL,
  `cantidad_hectareas_siembras` decimal(10,0) DEFAULT NULL,
  `id_asociacion` varchar(100) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL,
  `modulo_insumos` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_agricultor`
--

INSERT INTO `perfil_agricultor` (`id`, `id_usuario`, `id_cuenta_bancaria`, `tipo_perfil`, `nombre`, `numero_hectareas`, `cantidad_hectareas_siembras`, `id_asociacion`, `acceso_internet`, `modulo_insumos`) VALUES
('cdcbe710-3e8c-4dac-af9b-970e1a2a651b', '196797f5-cad5-4575-a5e0-349f4b0b6e98', '96c7f002-b80b-4bf5-a5c0-767ce530df50', 'Agricultor', 'Gabriel Diaz Rincon', 300, 156, '8c91f929-125a-4fb5-97d4-62a4aaf2d9b1', 0, 0);

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
  `centro_acopio` tinyint(1) DEFAULT NULL,
  `capacidad_secado` decimal(10,0) DEFAULT NULL,
  `capacidad_almacenamiento` tinyint(1) DEFAULT NULL,
  `capacidad` decimal(10,0) DEFAULT NULL,
  `numero_hectareas` decimal(10,0) DEFAULT NULL,
  `cantidad_hectareas_siembras` decimal(10,0) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL,
  `modulo_insumos` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_asociacion_agricola`
--

INSERT INTO `perfil_asociacion_agricola` (`id`, `id_usuario`, `id_cuenta_bancaria`, `tipo_perfil`, `nombre`, `centro_acopio`, `capacidad_secado`, `capacidad_almacenamiento`, `capacidad`, `numero_hectareas`, `cantidad_hectareas_siembras`, `acceso_internet`, `modulo_insumos`) VALUES
('18659459-5ff1-4a47-b48d-8854c7aa008e', '3fb15766-8109-4d19-9c11-83efd1fd363d', 'bf1d2837-011e-4ba0-bd8a-c8dbd4e563d0', 'Asociación Agrícola', 'Gabriel Sanz', 1, 200, 1, 200, 1500, 850, 1, 0),
('71a8c477-4722-4a1d-95cf-0f597cb74a3f', '64829989-e673-4e74-947f-ade23ad9adb2', '7d63f627-86b1-449e-b897-a42783fce22d', 'Asociación Agrícola', 'Aso Klin', 1, 200, 1, 600, 2000, NULL, 1, 0),
('d94d752c-50cb-46ca-9a05-524bc7a9f069', '00f9e3f6-2956-44b1-b9ba-5c419f6e128e', 'e050edf6-fe17-457d-a33c-e424d2051e83', 'Asociación Agrícola', 'Aso Test', 1, 200, 1, 2000, 200, NULL, 1, 0);

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
  `centro_acopio` tinyint(1) DEFAULT NULL,
  `capacidad_secado` decimal(10,0) DEFAULT NULL,
  `capacidad_almacenamiento` tinyint(1) DEFAULT NULL,
  `capacidad` decimal(10,0) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL,
  `modulo_insumos` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_comerciante`
--

INSERT INTO `perfil_comerciante` (`id`, `id_usuario`, `id_cuenta_bancaria`, `tipo_perfil`, `nombre`, `centro_acopio`, `capacidad_secado`, `capacidad_almacenamiento`, `capacidad`, `acceso_internet`, `modulo_insumos`) VALUES
('30056457-d922-4e66-8f2d-e1f672fec450', '7a37783c-e001-4d4f-8cd4-104122d33044', '206e3ced-75cd-48a0-8841-fda116e4fe5e', 'Comerciante', 'Expoagro', 1, 200, 1, 200, 1, 0),
('464e5614-230d-4639-aa91-098995c44b91', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'e4569839-638b-4f03-92ca-44217c2b0719', 'Comerciante', 'Pedro Ramirez', 1, 4, 1, 7, 1, 0);

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
  `centro_acopio` tinyint(1) DEFAULT NULL,
  `capacidad_secado` decimal(10,0) DEFAULT NULL,
  `capacidad_almacenamiento` tinyint(1) DEFAULT NULL,
  `capacidad` decimal(10,0) DEFAULT NULL,
  `acceso_internet` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_comerciante_agroquimicos`
--

INSERT INTO `perfil_comerciante_agroquimicos` (`id`, `id_usuario`, `id_cuenta_bancaria`, `tipo_perfil`, `nombre`, `centro_acopio`, `capacidad_secado`, `capacidad_almacenamiento`, `capacidad`, `acceso_internet`) VALUES
('8a846551-2588-46bc-a43a-7075f03db937', 'e8799658-2fbd-4e90-b2f0-82b62568968b', '2ec2791b-647e-436c-a4c9-02d5b3f85eaa', 'Comerciante Agroquímicos', 'Agroquimica Sols', 1, 200, 1, 3005, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_comprador`
--

CREATE TABLE `perfil_comprador` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `tipo_perfil` varchar(50) NOT NULL DEFAULT 'Comprador',
  `razon_social` varchar(50) NOT NULL,
  `actividad_economica` text DEFAULT NULL,
  `tipo_negocio` enum('Industrial','Comercial','Intermediario') DEFAULT NULL,
  `consumo_mes_tm` decimal(10,0) DEFAULT NULL,
  `consumo_anual` decimal(10,0) DEFAULT NULL,
  `presupuesto_mes` decimal(10,0) DEFAULT NULL,
  `politicas_recepcion` text DEFAULT NULL,
  `modulo_insumos` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_comprador`
--

INSERT INTO `perfil_comprador` (`id`, `id_usuario`, `tipo_perfil`, `razon_social`, `actividad_economica`, `tipo_negocio`, `consumo_mes_tm`, `consumo_anual`, `presupuesto_mes`, `politicas_recepcion`, `modulo_insumos`) VALUES
('41a2b5e9-3e6e-4cb2-8688-3843f9b3e028', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Comprador', 'Cerealera los Hermanos', 'Cereales y Productos Agricolas', 'Industrial', 2500, 48000, 5000, 'Somos una empresa seria, que necesita de stock para producir, por favor respeta los tiempos.', 0),
('4e68181b-085c-416d-9e94-90f46fdb9b99', '94a0909b-f61a-48e2-9ddc-504a0f1b4356', 'Comprador', 'AgroSA', 'Cereales y Productos Agricolas', 'Industrial', 200, 200, 200, 'Nada', 0),
('c9fc13e4-1853-42a3-ab95-a36794f90208', '7ea5c4fd-a3f0-4d07-a633-8e7590514a58', 'Comprador', 'Keppe S.A', 'Cereales y Productos Agricolas', 'Industrial', 200, 260, 350, 'Notas', 0),
('df6668ab-9b3a-4c36-98fa-ca519617b6d0', 'a2cca54d-2aa7-47c9-88de-319cc78752dd', 'Comprador', 'CRL AS', 'Cereales y Productos Agricolas', 'Comercial', 125, 250, 150, 'Nada', 0),
('f54bff75-f75e-4d29-8a0e-f788fdf77f56', 'd8d167f0-8162-4829-b22e-ace7bd42ec76', 'Comprador', 'Nuevo Sol', 'Venta de insumos', 'Comercial', 25, 250, 1200, 'Somos una empresa seria que trabaja bajo parámetros de calidad estrictos', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(60) NOT NULL DEFAULT 'Trimestral',
  `meses` int(11) NOT NULL DEFAULT 3,
  `valor` double NOT NULL DEFAULT 0.99,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`id`, `nombre`, `meses`, `valor`, `estado`) VALUES
('edf3cf84-bdd0-473a-a9a3-6586d259f6ed', 'Trimestral', 3, 9.99, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `id` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `url_castigos` varchar(250) DEFAULT NULL,
  `parametros` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id`, `id_producto`, `id_usuario`, `url_castigos`, `parametros`) VALUES
('00ba0f58-b9a1-457e-b523-6f25b4aba18b', 'Cacao', 'a2cca54d-2aa7-47c9-88de-319cc78752dd', '', 1),
('1825f26d-e602-4dfd-bfc7-6009858d4096', 'Cacao', '94a0909b-f61a-48e2-9ddc-504a0f1b4356', '', 0),
('1c40ffad-a2df-4e11-a7a8-c69e73d14e85', 'Maiz', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '', 1),
('3d7e3f97-f357-44cf-a1b4-2a075ae9c3e4', 'Cacao', '7a37783c-e001-4d4f-8cd4-104122d33044', '', 0),
('422c37ae-0fd7-4862-9ef0-250c6132b7b6', 'Maracuya', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '', 0),
('46f24056-810a-47a5-8056-f7e2898df196', 'Cacao', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'https://agroec-api.onrender.com/public/sheets/sheet-1737213214242-631948133.xlsx', 1),
('70683c8d-ccb4-4e72-8a16-b6261adf62db', 'Arroz', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '', 0),
('7bd8bd52-5d3b-4f1c-b94a-4d5c0c4be68b', 'Maracuya', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '', 0),
('89c169a6-67e7-497d-9b98-cf2f8c80c40d', 'Maiz', '94a0909b-f61a-48e2-9ddc-504a0f1b4356', 'https://agroec-api.onrender.com/public/sheets/sheet-1737387024896-838439004.xlsx', 1),
('99487dd1-5856-4041-8838-44c048c895de', 'Maiz', '7a37783c-e001-4d4f-8cd4-104122d33044', '', 0),
('9cbea35a-c58a-446c-81ec-4e6498dd4a46', 'Maracuya', 'e8799658-2fbd-4e90-b2f0-82b62568968b', '', 0),
('b276aafe-912c-456e-a366-4bcf1be2c439', 'Maracuya', 'a2cca54d-2aa7-47c9-88de-319cc78752dd', 'https://agroec-api.onrender.com/public/sheets/sheet-1736881968614-669283245.xlsx', 1),
('c5457412-ea5a-49d6-a67c-366c364e85eb', 'Manzana', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '', 0),
('e73b1c16-ba8f-4f1e-bc61-5d59ff257cbb', 'Cacao', 'e16f5f10-7a05-4805-9336-c15dac53eaed', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencia_contiene_parametros`
--

CREATE TABLE `preferencia_contiene_parametros` (
  `id` varchar(250) NOT NULL,
  `id_parametros` varchar(250) NOT NULL,
  `id_preferencia` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` varchar(250) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `imagen` varchar(150) DEFAULT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `imagen`, `estado`) VALUES
('Arroz', 'Arroz', 'https://agroec-api.onrender.com/public/images/products/Arroz.svg', 1),
('Cacao', 'Cacao', 'https://agroec-api.onrender.com/public/images/products/Cacao.svg', 1),
('Maiz', 'Maiz', 'https://agroec-api.onrender.com/public/images/products/Maiz.svg', 1),
('Manzana', 'Manzana', 'https://agroec-api.onrender.com/public/images/sales/product-image-1744206432811-420301362.svg', 1),
('Maracuya', 'Maracuya', 'https://agroec-api.onrender.com/public/images/products/Maracuya.svg', 1),
('Polvillo de Arroz', 'Polvillo de Arroz', 'https://agroec-api.onrender.com/public/images/products/Polvillo.svg', 1),
('Tomate', 'Tomate', 'https://agroec-api.onrender.com/public/images/products/Tomate.svg', 1);

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
  `nombre` varchar(50) DEFAULT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_listados`
--

INSERT INTO `productos_listados` (`id`, `nombre`, `estado`) VALUES
('Avena', 'Avena', 1),
('Cafe', 'Cafe', 1),
('Cebada', 'Cebada', 1),
('Frijol', 'Frijol', 1),
('Soja', 'Soja', 1);

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
('18fbcdf9-64ad-4202-8a95-4380f63c7537', '69aca895-621d-43d7-a7bf-18560f12bbb0', 'https://agroec-api.onrender.com/public/images/sales/sale-image-1729774435678-156375135.webp'),
('1a85d2a6-2dd8-425a-aa91-985ee286bc94', '28e4c243-c2e0-4261-80e6-36a8d9464c2e', 'https://agroec-api.onrender.com/public/images/sales/sale-image-1731810997248-741771613.webp'),
('73462676-7dfb-42b7-a3f6-babbd4c7aa67', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'https://agroec-api.onrender.com/public/images/sales/sale-image-1724713051475-818296024.webp'),
('94b938ea-62bd-483c-9b02-358db64cf965', 'dab8c78d-421d-4c31-8494-d56004d9e1f9', 'https://agroec-api.onrender.com/public/images/sales/sale-image-1734738764162-598258432.webp'),
('af7572d9-dbbc-4d3d-8c33-a6f82cfb2ba2', 'f68951e7-a6a8-4974-ad49-37c6251fe336', 'https://agroec-api.onrender.com/public/images/sales/sale-image-1730727078767-897971951.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_licitar`
--

CREATE TABLE `producto_licitar` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `precio` double NOT NULL DEFAULT 0,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'QQ',
  `cantidad` decimal(10,0) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'QQ',
  `presentacion_entrega` varchar(255) NOT NULL,
  `valida_hasta` date NOT NULL,
  `informacion_adicional` text DEFAULT NULL,
  `estado` enum('Abierta','Cerrada','Caducada','Cumplida','Eliminada') NOT NULL DEFAULT 'Abierta',
  `fecha_publicacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_licitar`
--

INSERT INTO `producto_licitar` (`id`, `id_usuario`, `id_producto`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `presentacion_entrega`, `valida_hasta`, `informacion_adicional`, `estado`, `fecha_publicacion`) VALUES
('035e8493-37c3-4288-ac3a-d62556498c0b', 'a2cca54d-2aa7-47c9-88de-319cc78752dd', 'Maracuya', 2.7, 'QQ', 50, 'QQ', 'En sacos de 100 libras', '2025-01-31', 'Precio Negociable', 'Caducada', '2025-01-30 10:05:52'),
('187b206f-5604-4e3e-a623-3ac02ec654ac', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 2.2, 'QQ', 25, 'QQ', 'En sacos de 100 libras', '2025-01-31', 'Precio Negociable', 'Caducada', '2025-01-31 13:55:30'),
('275ad1f4-5936-4675-b083-391b596e645e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Tomate', 2, 'KG', 0, 'KG', 'En bolsas de 100 libras', '2024-12-10', 'Precio Negociable', 'Cumplida', '2024-11-09 18:48:34'),
('48b3ffd8-ae89-4857-969a-0823f8dbb45e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maracuya', 2.4, 'QQ', 50, 'QQ', 'En sacos de 100 libras', '2025-02-20', 'Precio Negociable', 'Eliminada', '2024-11-09 18:48:34'),
('681305b2-8de0-4ccb-b70e-5fd06f691fb3', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maracuya', 2.5, 'KG', 55, 'KG', 'En sacos de 100 libras', '2024-12-12', 'Precio Negociable', 'Cerrada', '2024-12-02 09:52:26'),
('8f047a8d-ecb0-4157-9131-6a26982e5d52', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Arroz', 2.3, 'KG', 0, 'KG', 'En bolsas de 100 libras', '2024-11-16', 'Precio Negociable', 'Cumplida', '2024-11-13 10:10:53'),
('92353c2c-f754-411a-85ca-30e1afd62477', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maracuya', 2.3, 'QQ', 20, 'QQ', 'En sacos de 100 libras', '2025-01-31', 'Precio Negociable', 'Caducada', '2025-01-30 10:02:45'),
('a4a0c59e-d46e-4ed3-bb87-b599dd6ddafe', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Maiz', 2.5, 'KG', 200, 'KG', 'En sacos de 100 libras', '2024-11-24', 'Precio Negociable', 'Caducada', '2024-11-21 13:41:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_vender`
--

CREATE TABLE `producto_vender` (
  `id` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `id_producto` varchar(250) NOT NULL,
  `precio` double NOT NULL DEFAULT 0,
  `precio_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `cantidad` decimal(10,0) NOT NULL,
  `cantidad_unidad` enum('KG','QQ') NOT NULL DEFAULT 'KG',
  `presentacion_entrega` varchar(255) NOT NULL,
  `fecha_entrega` date NOT NULL,
  `fecha_publicacion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('Abierta','Cerrada','Eliminada') NOT NULL DEFAULT 'Abierta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_vender`
--

INSERT INTO `producto_vender` (`id`, `id_usuario`, `id_producto`, `precio`, `precio_unidad`, `cantidad`, `cantidad_unidad`, `presentacion_entrega`, `fecha_entrega`, `fecha_publicacion`, `estado`) VALUES
('28e4c243-c2e0-4261-80e6-36a8d9464c2e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 2.3, 'KG', 0, 'KG', 'En sacos de 50 libras', '2024-12-01', '2024-11-16', 'Cerrada'),
('69aca895-621d-43d7-a7bf-18560f12bbb0', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 3.5, 'KG', 0, 'KG', 'En sacos de 50 libras', '2025-02-02', '2024-11-04', 'Cerrada'),
('ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maiz', 3, 'KG', 150, 'KG', 'En sacos de 50 libras', '2024-10-22', '2024-11-03', 'Cerrada'),
('dab8c78d-421d-4c31-8494-d56004d9e1f9', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Maracuya', 2.5, 'KG', 15, 'KG', 'En bolsas de 100 libras', '2024-11-20', '2024-11-13', 'Abierta'),
('f68951e7-a6a8-4974-ad49-37c6251fe336', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cacao', 3, 'KG', 0, 'KG', 'En sacos de 50 libras', '2024-11-23', '2024-11-05', 'Cerrada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuesta_compra`
--

CREATE TABLE `propuesta_compra` (
  `id` varchar(250) NOT NULL,
  `id_venta` varchar(250) NOT NULL,
  `id_comprador` varchar(250) NOT NULL,
  `precio` double NOT NULL DEFAULT 0,
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
('19f2b62e-2894-40d5-94f3-fa1e4482e29d', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2, 'QQ', 100, 'QQ', 'En sacos de 100 libras', 'Pueblo Gardey, Avenida Mayo 312', 'Entre las 10 AM y las 3 PM', '2025-02-22', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('21a25b3e-1ed1-4d2d-a6f6-8834a6e69e58', 'dab8c78d-421d-4c31-8494-d56004d9e1f9', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.3, 'KG', 15, 'KG', 'Necesito que la condición de los sacos sea adecuada', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-12-01', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('36ea7620-c4c1-4ec6-b541-23a5ed9e67e2', '28e4c243-c2e0-4261-80e6-36a8d9464c2e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.1, 'KG', 25, 'KG', 'Entregar en sacos de 50 libras', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-11-23', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('397c21bb-e1e3-4f25-b1cb-0a300e04e20b', '28e4c243-c2e0-4261-80e6-36a8d9464c2e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.4, 'KG', 25, 'KG', 'Enviar en sacos acorde', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-11-22', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('4532ddae-8c45-4e17-98cb-b8ee90d2c429', '69aca895-621d-43d7-a7bf-18560f12bbb0', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.6, 'KG', 50, 'KG', 'Necesito que la condición de los sacos sea adecuada', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-12-20', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('5475affe-2907-4877-84ab-10cd097dd6bb', '28e4c243-c2e0-4261-80e6-36a8d9464c2e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.24, 'KG', 45, 'KG', 'Necesito que la condición de los sacos sea adecuada', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-12-01', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('745a4a4f-5f77-48f9-822e-d6670c755cd7', '28e4c243-c2e0-4261-80e6-36a8d9464c2e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.37, 'KG', 15, 'KG', 'Necesito que la condición de los sacos sea adecuada', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-11-22', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('7db1076d-1d7c-4d62-8499-14e89fc04095', 'dab8c78d-421d-4c31-8494-d56004d9e1f9', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.3, 'KG', 20, 'KG', 'Necesito que la condición de los sacos sea adecuada', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-11-20', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('7f567641-e6df-43c4-811e-8052883c40d8', '69aca895-621d-43d7-a7bf-18560f12bbb0', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2, 'KG', 30, 'KG', 'Cumpla con entrega segura y precisa', 'Parroquia Carbo, Bolivar SMN 312', 'Entre las 10 AM y las 3 PM', '2024-11-19', 'Necesito calidad de productos', 'Aceptada', 'Rechazada'),
('d57ec7b5-5654-46ae-85cf-7e4ab3e659c4', 'f68951e7-a6a8-4974-ad49-37c6251fe336', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 3, 'QQ', 65, 'QQ', 'Necesito que la condición de los sacos sea adecuada', 'Pueblo Gardey, Avenida Mayo 312', 'Entre las 10 AM y las 3 PM', '2024-11-24', 'Necesito calidad de productos', 'Aceptada', 'Aceptada'),
('ed9c7908-cf59-4246-a0fb-6bb4ee317ec3', '69aca895-621d-43d7-a7bf-18560f12bbb0', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 2.6, 'KG', 50, 'KG', 'Necesito que la condición de los sacos sea adecuada', 'Fabrica Primaria, Av Liberador de Americas 281, Av Liberador de Americas, La Maná, Cotopaxi', 'Entre las 10 AM y las 3 PM', '2024-12-20', 'Necesito calidad de productos', 'Recibida', 'Recibida');

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
('0f6508bd-bbc6-44f6-8d08-3edef95ab773', '21a25b3e-1ed1-4d2d-a6f6-8834a6e69e58', 'fc25d3e8-dd66-432f-ba01-88bb117791d0'),
('203221a3-9005-4656-8424-f47e450bd53b', '19f2b62e-2894-40d5-94f3-fa1e4482e29d', 'ff6d9dd4-01fd-4220-85df-1ac00a199a6e'),
('39b3f711-c9b7-497c-bf46-80483ae41ea8', '0d14d172-cd19-4f5e-b440-1a66ec99112f', 'b75501ae-fe6a-49a2-9c28-c40283bcf2d4'),
('519204a1-ff4c-4999-b71f-259db2ae2275', '36ea7620-c4c1-4ec6-b541-23a5ed9e67e2', '0977de59-5156-4b48-97d3-348e9aa3f738'),
('687c8515-3a90-4794-a08a-85bc4650e767', 'ed9c7908-cf59-4246-a0fb-6bb4ee317ec3', '24bcc337-c890-43bd-a01f-d6ec2860bd12'),
('910a8451-d0b9-49fb-8869-8fb21c70a705', '7db1076d-1d7c-4d62-8499-14e89fc04095', '802acdfe-af6a-420d-a93e-2a1f88181683'),
('98997b40-b41d-49b2-a591-13c5c7128c03', '745a4a4f-5f77-48f9-822e-d6670c755cd7', '25ae36a3-f96d-4e0d-8d72-c47b61fbb527'),
('99e022b2-e3ba-4e08-a0f7-d1e6cb435022', 'd57ec7b5-5654-46ae-85cf-7e4ab3e659c4', '5cee8d60-1a09-4a5d-9e46-0d677b4412e2'),
('b19465f2-285f-4dd7-8f85-cc7e9c12cee1', '7f567641-e6df-43c4-811e-8052883c40d8', 'fadf7488-6951-4376-8c81-77606f4c60d2'),
('b5d87ecc-7716-4a04-88a4-bf5a3df19ddf', '397c21bb-e1e3-4f25-b1cb-0a300e04e20b', '86e50ddb-eb69-4714-b663-d1e7b9e9a61b'),
('c02ac172-deaf-4857-be75-34a1f6e3172c', '5475affe-2907-4877-84ab-10cd097dd6bb', 'da29d7c6-201e-4af7-a7b6-b4b04b18198b'),
('e56afb3c-9e0b-43ee-b4dc-63119c867e99', '4532ddae-8c45-4e17-98cb-b8ee90d2c429', '2dbdf34a-6068-4b65-a165-b099a0c3aecb');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuesta_venta`
--

CREATE TABLE `propuesta_venta` (
  `id` varchar(250) NOT NULL,
  `id_licitacion` varchar(250) NOT NULL,
  `id_vendedor` varchar(250) NOT NULL,
  `precio` double NOT NULL DEFAULT 0,
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
('3900effe-da7a-4109-b4ca-a0128813ef15', '187b206f-5604-4e3e-a623-3ac02ec654ac', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 2.2, 'QQ', 10, 'QQ', 'En sacos de 100 libras', '2025-02-02', 'Podemos entregar en tiempo y forma.', 'Aceptada', 'Aceptada'),
('49ca6eb3-9cca-48be-9f79-bfec48732848', '681305b2-8de0-4ccb-b70e-5fd06f691fb3', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 2.4, 'KG', 45, 'KG', 'En sacos de 100 libras', '2024-11-23', 'Podemos entregar en tiempo y forma.', 'Recibida', 'Recibida'),
('53522c1c-f1f8-4e2d-9a05-0e38e3ac9386', '8f047a8d-ecb0-4157-9131-6a26982e5d52', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 2.2, 'KG', 35, 'KG', 'En sacos de 100 libras', '2024-11-22', 'Podemos entregar en tiempo y forma.', 'Aceptada', 'Aceptada'),
('5a8866e2-8e10-4f94-9002-8c0e74b4e664', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 14.8, 'KG', 250, 'KG', 'En sacos de 100 libras', '2024-10-23', 'Es importante cumplir con los tiempos', 'Aceptada', 'Aceptada'),
('5a8a702d-f4a6-4bf1-85a1-2aa133d2b87c', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 13, 'QQ', 150, 'QQ', 'En sacos de 100 libras', '2024-10-12', 'Es importante cumplir con los tiempos', 'Aceptada', 'Aceptada'),
('9387c739-f768-4f22-99d6-0858aae8ce35', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 24.8, 'QQ', 650, 'QQ', 'En sacos de 50 libras', '2024-10-27', 'Es importante cumplir con los tiempos', 'Aceptada', 'Aceptada'),
('963f7ba0-eea0-4202-be4a-3facd594684d', 'a4a0c59e-d46e-4ed3-bb87-b599dd6ddafe', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 2.3, 'KG', 25, 'KG', 'En sacos de 100 libras', '2024-11-28', 'Podemos entregar en tiempo y forma.', 'Recibida', 'Recibida'),
('9a5a320a-2895-4baf-ad8f-4a4d6286ec4e', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 24.8, 'QQ', 650, 'QQ', 'En sacos de 50 libras', '2024-10-27', 'Es importante cumplir con los tiempos', 'Rechazada', 'Recibida'),
('bf7be359-4abb-4b62-98aa-4390eff6fb6d', '275ad1f4-5936-4675-b083-391b596e645e', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 19, 'QQ', 150, 'QQ', 'En sacos de 100 libras', '2025-05-22', 'Podemos entregar en tiempo y forma.', 'Aceptada', 'Aceptada'),
('ca4dc07d-5951-478f-8a27-822a5e65ef1c', '187b206f-5604-4e3e-a623-3ac02ec654ac', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 1.8, 'QQ', 15, 'QQ', 'En sacos de 100 libras', '2025-02-02', 'Podemos entregar en tiempo y forma.', 'Aceptada', 'Aceptada'),
('ce5f816e-8496-40c8-b9d9-16ec0751bef3', 'a4a0c59e-d46e-4ed3-bb87-b599dd6ddafe', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 2.3, 'KG', 25, 'KG', 'En sacos de 100 libras', '2024-11-28', 'Podemos entregar en tiempo y forma.', 'Recibida', 'Recibida'),
('e88c43a8-8fbf-45ea-8884-4f836b539c1b', 'a4a0c59e-d46e-4ed3-bb87-b599dd6ddafe', 'e16f5f10-7a05-4805-9336-c15dac53eaed', 2.1, 'KG', 25, 'KG', 'En bolsas de 50 libras', '2024-11-24', 'Podemos entregar en tiempo y forma.', 'Recibida', 'Recibida'),
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
('0a099bbb-ffb7-4e21-9bc8-fab84a39c2a8', '963f7ba0-eea0-4202-be4a-3facd594684d', 'd62ecc78-6424-44c1-8cfa-c30cfc90476e'),
('110a64a7-2865-4503-bc69-f3b95a839049', 'e88c43a8-8fbf-45ea-8884-4f836b539c1b', '7a663566-3126-4f27-850a-a56f7f46d136'),
('1172966d-b94f-4ab4-b436-881f970d4944', '5a8866e2-8e10-4f94-9002-8c0e74b4e664', 'db47147f-2b21-4b94-914b-de32238b1c2c'),
('384cdfb0-25a7-4ed3-800b-4544f0ac2dbd', '49ca6eb3-9cca-48be-9f79-bfec48732848', '7d3721cd-1ee9-4aab-ac44-a0f6b014586e'),
('3c35c019-e042-4660-bcf2-a27bd1ee2fdb', 'ca4dc07d-5951-478f-8a27-822a5e65ef1c', '77877c7c-cfac-4c8d-8b30-9821d2704ff1'),
('61bfc9b8-6bb3-489b-b697-212143721989', '53522c1c-f1f8-4e2d-9a05-0e38e3ac9386', 'd16254f4-b830-4408-8a7c-647112af31a1'),
('6ebb1fdd-86b2-4bfc-9676-ab7092412e55', 'ff8b5b14-09eb-4552-9ad4-0e2458b6d02c', '73751a53-ff26-496c-95df-f78062822468'),
('9c8efaca-8fbd-413c-9e43-f445bf679a6c', 'ce5f816e-8496-40c8-b9d9-16ec0751bef3', '648fb6e6-d02a-4c93-9257-b6b386a5a2c4'),
('b5eb0e15-72e8-429a-9b45-703cca06bdb8', 'bf7be359-4abb-4b62-98aa-4390eff6fb6d', '02b4e9d0-8ecb-49b8-859c-d454aff20f6a'),
('e7829ab0-c049-41e8-a778-fe2fa4284b9c', '3900effe-da7a-4109-b4ca-a0128813ef15', 'c3fb6ee2-ae1e-4934-b4eb-0485dc15e758'),
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
('790d57c7-a6ba-4e80-9c54-b2f5d0847387', 'Descarga Agroec', 'www.agroec.com', 'https://agroec-api.onrender.com/public/images/sales/image-1741703818860-356870400.jpeg');

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
('16280aee-249a-4033-b0a0-e7a18f1ff097', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Fb2', 'Ubs', 'Dse'),
('1f7f1463-7076-42fe-a46b-ffc23a0617da', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Fab4', 'UBS4', 'DS4'),
('3f68d09c-cb61-4547-b8ac-2e37ee5c0dc3', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Fb', 'UbS', 'DDS'),
('431b09bc-8d84-4b26-99ee-6edd43000b81', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'TEST', 'TEST', 'TEST'),
('9f4b445a-f883-49b7-a702-4f8d72616b1e', 'd8d167f0-8162-4829-b22e-ace7bd42ec76', 'Fabrica Central', 'Calle Falsa 323', 'Guayas, Naranjito'),
('a51d3268-5718-4fa0-9d92-f2f6fc329da1', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Fabr2', 'U1', 'Direcc'),
('a5d6d612-ddf3-4676-9b06-4ec9e69bff4e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'FabricaD', 'Ubicc', 'Direcc'),
('c4edf3f5-432a-4b9f-b56c-bbcf73fb49cf', '7ea5c4fd-a3f0-4d07-a633-8e7590514a58', 'Fabrica', 'Av Suipacha 32', 'Av Suipacha 2981, Chillanes, Bolivar'),
('de92k121s3212', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Fabrica Primaria', 'Av Liberador de Americas, La Maná, Cotopaxi', 'Av Liberador de Americas 281'),
('e6f340e8-754b-4fc0-bb99-c7e4f6ac003e', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', 'FB5', 'D3', 'D1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recargas`
--

CREATE TABLE `recargas` (
  `id` varchar(250) NOT NULL,
  `id_billetera` varchar(250) NOT NULL,
  `metodo_pago` enum('TC/TD','TRANSFERENCIA') NOT NULL,
  `monto_recarga` double NOT NULL DEFAULT 0,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recargas`
--

INSERT INTO `recargas` (`id`, `id_billetera`, `metodo_pago`, `monto_recarga`, `fecha`) VALUES
('10f0e094-51dc-4b41-bdbc-5d383511ff4d', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 35, '2024-10-22 21:35:14'),
('2877b254-8241-4963-b6ef-cfde3f7b4692', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 1120, '2024-09-24 23:17:54'),
('38489ea6-4f79-4e3c-b8b8-3f0678588f9b', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 15, '2025-02-16 22:24:20'),
('4ad49998-68a0-4b45-b78b-1031976362f7', 'b0572fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 12, '2025-04-11 11:17:28'),
('9b2e4b29-3a89-4d50-9fba-b0680a1226d9', 'c0532fcd-314b-406b-bcb8-e3710d91c312', 'TC/TD', 25, '2024-11-19 17:46:33'),
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
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `id` varchar(250) NOT NULL,
  `id_plan` varchar(250) NOT NULL,
  `id_usuario` varchar(250) NOT NULL,
  `vencimiento` date NOT NULL,
  `estado` int(11) NOT NULL,
  `id_tarjeta` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`id`, `id_plan`, `id_usuario`, `vencimiento`, `estado`, `id_tarjeta`) VALUES
('9470e342-8b5c-48ef-a519-817fab9a96e7', 'edf3cf84-bdd0-473a-a9a3-6586d259f6ed', 'e8799658-2fbd-4e90-b2f0-82b62568968b', '2025-07-10', 1, 'Sistema'),
('a6670f2d-2749-4b36-b8d6-0c344972121e', 'edf3cf84-bdd0-473a-a9a3-6586d259f6ed', 'b308a85b-1f31-4082-b9e2-4d2a9483923f', '2025-07-14', 2, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutoriales`
--

CREATE TABLE `tutoriales` (
  `id` varchar(250) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `url_video` varchar(150) NOT NULL,
  `id_categoria` varchar(250) NOT NULL,
  `nuevo` tinyint(3) NOT NULL DEFAULT 1,
  `visible` int(11) NOT NULL DEFAULT 1,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutoriales`
--

INSERT INTO `tutoriales` (`id`, `titulo`, `url_video`, `id_categoria`, `nuevo`, `visible`, `fecha_creacion`) VALUES
('36609980-9d39-42d0-95d7-b2a92f5f04d4', 'Creado', 'urlhere', 'cat_fertilizantes', 2, 1, '2025-04-11 09:50:40'),
('487045db-b0a3-487b-a8c4-4d2397b30efd', 'Tipos de Fertilizantes', 'https://url.com', 'cat_fertilizantes', 1, 1, '2025-04-01 09:45:45'),
('tuto_quimica', '¿Qué es la química?', 'https://www.youtube.com/watch?v=2jyxYUQXKBQ', 'cat_quimica', 1, 1, '2025-04-07 09:45:45');

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
  `estado` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `tipo_identificacion`, `numero_identificacion`, `correo`, `clave`, `provincia`, `parroquia`, `canton`, `acepto_terminos`, `direccion`, `ubicacion_google_maps`, `telefono`, `estado`) VALUES
('00f9e3f6-2956-44b1-b9ba-5c419f6e128e', 'Cédula', '2209182234', 'testaso@gmail.com', '$2b$10$0oDO/78L7/iyDIWhoVzi3.qGDUXmY7gO0BHrKUKJpwFjArGK90Ky2', 'Cotopaxi', 'Saquisilí', 'Saquisilí', 1, 'Direcc', 'Ubicc', '+5932281553030', 1),
('196797f5-cad5-4575-a5e0-349f4b0b6e98', 'Cédula', '2347728432', 'gabrieldiaz@gmail.com', '$2b$10$6yKGr96gK3JIXnBYmFuRF.f3KiEiA7.Vwtke/9kApW.9Ja2DJ4kCe', 'Azuay', 'Pucará', 'Pucara', 1, 'Av Suipacha 32', 'Av Suipacha, Cochapata, Nabon, Azuay', '+54+542281553022', 1),
('3fb15766-8109-4d19-9c11-83efd1fd363d', 'Cédula', '2343358406', 'sanz@gmail.com', '$2b$10$Q3jY7oO/9lZBZkL7xju2ROdiooPM/6z3ZS/gGc8MnC9tvVqA3YXPi', 'Azuay', 'Cañaribamba', 'Cuenca', 1, 'Av Suipacha 32', 'Av Libertad, Cuenca, Azuay', '+593817239223', 1),
('64829989-e673-4e74-947f-ade23ad9adb2', 'Cédula', '2347728434', 'aso@gmail.com', '$2b$10$3uZzUoRFsB4DafAgZRYat.gKmX4tshKnqP9Sc2GzClAh6V7C.aBRe', 'Azuay', 'Pucará', 'Pucara', 1, 'Av Suipacha 32', 'Av Suipacha, Cochapata, Nabon, Azuay', '+5932281553030', 1),
('7a37783c-e001-4d4f-8cd4-104122d33044', 'Cédula', '2347728435', 'expo@mail.com', '$2b$10$6/ukh6gkAzSvUemiauRu1.3PvAxA8sty8o//PCLLM84sIuLVIvcU6', 'Azuay', 'San felipe de oña cabecera cantonal', 'Oña', 1, 'Av Suipacha 32', 'Av Suipacha, Cochapata, Nabon, Azuay', '+5932281553030', 1),
('7ea5c4fd-a3f0-4d07-a633-8e7590514a58', 'Cédula', '2343358402', 'keppe@contacto.com', '$2b$10$kJWHPPTQIh6P9O/zbjD9Qe/K3yD1.wWA6Ed/7wXKKB2bBpgDbVLs6', 'Imbabura', '', 'Ibarra', 1, 'Av Suipacha 32', 'Av Liberador de Amerca, La Maná, Cotopaxi', '+593+593983711133', 1),
('94a0909b-f61a-48e2-9ddc-504a0f1b4356', 'Cédula', '2391829324', 'agrosa@gmail.com', '$2b$10$W/24dTMSxAL/JMN4po0o3.8lstuaFcHyDaGWxoZOaWUOMgkFmW7IS', 'Bolívar', '', 'Chimbo', 1, 'Av Suipacha 32', 'Av Liberador de Amerca, La Maná, Cotopaxi', '+5932243124345', 1),
('a2cca54d-2aa7-47c9-88de-319cc78752dd', 'Cédula', '2347728423', 'crl@mail.com', '$2b$10$3Xd42pB/r8/X4ANzN1W1/e3Tg3OL/5kAe9jf/xv0G5gh5l.BszbeG', 'Azuay', 'Chinchin', 'Girón', 1, 'Av Suipacha 32', 'Av Liberador de Amerca, La Maná, Cotopaxi', '+5932352112', 1),
('b308a85b-1f31-4082-b9e2-4d2a9483923f', 'Cédula', '2347728422', '360startupec@gmail.com', '$2b$10$WMmBwCBkdw0vH/ZALScKkuzmoZlD5y7.PIp8jfkJX0jtxL0Vot40u', 'Esmeraldas', '', 'Rioverde', 1, 'Calle Jaure 32', 'Avenida Olivos 92831', '+542281553030', 1),
('d8d167f0-8162-4829-b22e-ace7bd42ec76', 'Cédula', '2209381123', 'nuevosol@example.es', '$2b$10$17jn6TZfwW3eJdjamJlJoutJ/YFV5sL9nLHeyKksN1IpRh4gxVE6u', 'Guayas', '', 'Naranjito', 1, 'Calle Falsa 323', 'Guayas, Naranjito, Calle Falsa 323 ', '+59337983544', 1),
('e16f5f10-7a05-4805-9336-c15dac53eaed', 'Cédula', '2343358400', 'pedroramirez@gmail.com', '$2b$10$OjxsiIMi1IbmqwLH.J2dxeGxmPGNSxafiwILE.hYpvQng8i36wItS', 'Azuay', 'Chordeleg', 'Gualaceo', 1, 'Av Libertad 2814', 'Av Libertad, Cuenca, Azuay', '+542281553030', 1),
('e8799658-2fbd-4e90-b2f0-82b62568968b', 'Cédula', '2993813323', 'agroquimica@gmail.com', '$2b$10$Nic0WY1v/oa.FSdD5tbcL.2Eh7cR8LhiRu1dor2FWBAfF4EE38zSm', 'Azuay', 'Gima', 'Sigsig', 1, 'Av Suipacha 32', 'Av Suipacha, Cochapata, Nabon, Azuay', '239981032', 2),
('Sistema', 'RUC', '00000000', 'Sistema', '$2b$10$OjxsiIMi1IbmqwLH.J2dxeGxmPGNSxafiwILE.hYpvQng8i36wItS', 'No-Data', 'No-Data', 'No-Data', 0, 'No-Data', 'No-Data', 'No-Data', 0);

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
('e385ffca-b643-4922-9814-d6e7fa0c5140', 'ce2d0768-7ea3-4ef1-ba7d-5562f5dd39d7'),
('caf0cc58-699f-4a51-a7f5-b83e0ac79a34', 'f68951e7-a6a8-4974-ad49-37c6251fe336'),
('c212f4c8-e8f9-4489-b5dd-c2f6e45c6525', '69aca895-621d-43d7-a7bf-18560f12bbb0'),
('d74ac106-f7cd-4e90-8b6d-5862e1ac3848', 'dab8c78d-421d-4c31-8494-d56004d9e1f9'),
('30223cd0-404e-48c2-9cc1-8513b55b624b', '28e4c243-c2e0-4261-80e6-36a8d9464c2e');

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
-- Indices de la tabla `notificaciones_receptores`
--
ALTER TABLE `notificaciones_receptores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_receptores` (`id_usuario`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_comprador` (`id_comprador`),
  ADD KEY `id_vendedor` (`id_vendedor`),
  ADD KEY `id_entrega` (`id_entrega`);

--
-- Indices de la tabla `pagos_vendedores`
--
ALTER TABLE `pagos_vendedores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pago_vendedor_usuario` (`id_usuario`);

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
  ADD KEY `fk_perfil_comerciante_usuario` (`id_usuario`),
  ADD KEY `fk_perfil_comerciante_cuenta_bancaria` (`id_cuenta_bancaria`);

--
-- Indices de la tabla `perfil_comprador`
--
ALTER TABLE `perfil_comprador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_perfil_comprador_usuario` (`id_usuario`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_preferencias` (`id_producto`),
  ADD KEY `fk_usuario_preferencias` (`id_usuario`);

--
-- Indices de la tabla `preferencia_contiene_parametros`
--
ALTER TABLE `preferencia_contiene_parametros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_preferencia_parametros` (`id_parametros`),
  ADD KEY `fk_parametros_preferencia` (`id_preferencia`);

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
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_plan_suscripcion` (`id_plan`),
  ADD KEY `fk_usuario_suscripcion` (`id_usuario`);

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
-- Filtros para la tabla `notificaciones_receptores`
--
ALTER TABLE `notificaciones_receptores`
  ADD CONSTRAINT `fk_usuario_receptores` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`id_comprador`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ordenes_ibfk_2` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ordenes_ibfk_4` FOREIGN KEY (`id_entrega`) REFERENCES `entregas` (`id`);

--
-- Filtros para la tabla `pagos_vendedores`
--
ALTER TABLE `pagos_vendedores`
  ADD CONSTRAINT `fk_pago_vendedor_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

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
-- Filtros para la tabla `perfil_comprador`
--
ALTER TABLE `perfil_comprador`
  ADD CONSTRAINT `fk_perfil_comprador_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD CONSTRAINT `fk_producto_preferencias` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_usuario_preferencias` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `preferencia_contiene_parametros`
--
ALTER TABLE `preferencia_contiene_parametros`
  ADD CONSTRAINT `fk_parametros_preferencia` FOREIGN KEY (`id_preferencia`) REFERENCES `preferencias` (`id`),
  ADD CONSTRAINT `fk_preferencia_parametros` FOREIGN KEY (`id_parametros`) REFERENCES `parametros_calidad` (`id`);

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
-- Filtros para la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD CONSTRAINT `fk_plan_suscripcion` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id`),
  ADD CONSTRAINT `fk_usuario_suscripcion` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

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
