/*
 Navicat Premium Dump SQL

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 80400 (8.4.0)
 Source Host           : localhost:3306
 Source Schema         : sexto

 Target Server Type    : MySQL
 Target Server Version : 80400 (8.4.0)
 File Encoding         : 65001

 Date: 28/08/2024 02:24:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for alumnos
-- ----------------------------
DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE `alumnos`  (
  `IdAlumno` int NOT NULL AUTO_INCREMENT,
  `Nombre` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Apellido` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Edad` int NOT NULL,
  PRIMARY KEY (`IdAlumno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of alumnos
-- ----------------------------
INSERT INTO `alumnos` VALUES (1, 'sa', 'cs', 50);
INSERT INTO `alumnos` VALUES (2, 'Santiago', 'Borja', 50);

-- ----------------------------
-- Table structure for clientes
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes`  (
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `Nombres` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Direccion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Telefono` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Cedula` varchar(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Correo` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`idClientes`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clientes
-- ----------------------------
INSERT INTO `clientes` VALUES (1, 'Maria la del Barrio', 'Guayaquil', '099585632', '0603123910', 'maria.barrial@gmail.com');
INSERT INTO `clientes` VALUES (4, 'Lammar', 'Nueva direccion', '095981121', '1854213210', 'accasc@ascasc');
INSERT INTO `clientes` VALUES (10, 'Cliente 2', 'Casa 2', 'Telefono 2', '1712030368', 'correo@dos.com');

-- ----------------------------
-- Table structure for detalle_factura
-- ----------------------------
DROP TABLE IF EXISTS `detalle_factura`;
CREATE TABLE `detalle_factura`  (
  `idDetalle_Factura` int NOT NULL AUTO_INCREMENT,
  `Cantidad` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Factura_idFactura` int NOT NULL,
  `Kardex_idKardex` int NOT NULL,
  `Precio_Unitario` decimal(10, 0) NOT NULL,
  `Sub_Total_item` decimal(10, 0) NOT NULL,
  PRIMARY KEY (`idDetalle_Factura`) USING BTREE,
  INDEX `fk_Detalle_Factura_Factura1_idx`(`Factura_idFactura` ASC) USING BTREE,
  INDEX `fk_Detalle_Factura_Kardex1_idx`(`Kardex_idKardex` ASC) USING BTREE,
  CONSTRAINT `fk_Detalle_Factura_Factura1` FOREIGN KEY (`Factura_idFactura`) REFERENCES `factura` (`idFactura`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Detalle_Factura_Kardex1` FOREIGN KEY (`Kardex_idKardex`) REFERENCES `kardex` (`idKardex`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalle_factura
-- ----------------------------
INSERT INTO `detalle_factura` VALUES (2, '1', 1, 5, 1, 1);
INSERT INTO `detalle_factura` VALUES (3, '1', 1, 6, 15, 15);

-- ----------------------------
-- Table structure for factura
-- ----------------------------
DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura`  (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  `Sub_total` decimal(20, 2) NOT NULL,
  `Sub_total_iva` decimal(20, 2) NOT NULL,
  `Valor_IVA` decimal(20, 2) NOT NULL,
  `Clientes_idClientes` int NOT NULL,
  PRIMARY KEY (`idFactura`) USING BTREE,
  INDEX `fk_Factura_Clientes1_idx`(`Clientes_idClientes` ASC) USING BTREE,
  CONSTRAINT `fk_Factura_Clientes1` FOREIGN KEY (`Clientes_idClientes`) REFERENCES `clientes` (`idClientes`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of factura
-- ----------------------------
INSERT INTO `factura` VALUES (1, '2024-08-01', 15.00, 15.00, 2.25, 1);
INSERT INTO `factura` VALUES (2, '2024-08-02', 80.00, 100.00, 15.00, 4);
INSERT INTO `factura` VALUES (7, '2024-08-07', 40.00, 100.00, 15.00, 1);
INSERT INTO `factura` VALUES (8, '2024-08-08', 48.00, 150.00, 22.50, 4);
INSERT INTO `factura` VALUES (9, '2024-08-28', 0.00, 500.00, 75.00, 10);
INSERT INTO `factura` VALUES (10, '2024-08-28', 0.00, 1500.00, 225.00, 1);
INSERT INTO `factura` VALUES (11, '2024-08-28', 0.00, 18000.00, 0.00, 1);
INSERT INTO `factura` VALUES (14, '2024-08-28', 30.00, 1.00, 0.15, 1);
INSERT INTO `factura` VALUES (16, '2024-08-28', 0.00, 15.00, 2.25, 1);

-- ----------------------------
-- Table structure for iva
-- ----------------------------
DROP TABLE IF EXISTS `iva`;
CREATE TABLE `iva`  (
  `idIVA` int NOT NULL AUTO_INCREMENT,
  `Detalle` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '8%\n12%\n15%',
  `Estado` int NOT NULL COMMENT '1 = activo\n0 = inactivo',
  `Valor` int NULL DEFAULT NULL COMMENT 'Campo para almacenar el valor en entero para realizar calculos',
  PRIMARY KEY (`idIVA`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of iva
-- ----------------------------
INSERT INTO `iva` VALUES (1, 'IVA 15%', 1, 15);

-- ----------------------------
-- Table structure for kardex
-- ----------------------------
DROP TABLE IF EXISTS `kardex`;
CREATE TABLE `kardex`  (
  `idKardex` int NOT NULL AUTO_INCREMENT,
  `Estado` int NOT NULL COMMENT 'Campo para almacenar el estado del kardex\n1 = activo\n0 = inactivo',
  `Fecha_Transaccion` datetime NOT NULL,
  `Cantidad` decimal(20, 4) NOT NULL,
  `Valor_Compra` decimal(20, 4) NOT NULL,
  `Valor_Venta` decimal(20, 4) NOT NULL,
  `Unidad_Medida_idUnidad_Medida` int NOT NULL,
  `Unidad_Medida_idUnidad_Medida1` int NOT NULL,
  `Unidad_Medida_idUnidad_Medida2` int NOT NULL,
  `Valor_Ganacia` decimal(20, 2) NULL DEFAULT NULL,
  `IVA` int NOT NULL,
  `IVA_idIVA` int NOT NULL,
  `Proveedores_idProveedores` int NULL DEFAULT NULL,
  `Productos_idProductos` int NULL DEFAULT NULL,
  `Tipo_Transaccion` int NOT NULL COMMENT '1= entrada Ej: Compra\n0 = salida  Ej: Venta',
  PRIMARY KEY (`idKardex`) USING BTREE,
  INDEX `fk_Kardex_Unidad_Medida_idx`(`Unidad_Medida_idUnidad_Medida` ASC) USING BTREE,
  INDEX `fk_Kardex_Unidad_Medida1_idx`(`Unidad_Medida_idUnidad_Medida1` ASC) USING BTREE,
  INDEX `fk_Kardex_Unidad_Medida2_idx`(`Unidad_Medida_idUnidad_Medida2` ASC) USING BTREE,
  INDEX `fk_Kardex_IVA1_idx`(`IVA_idIVA` ASC) USING BTREE,
  INDEX `fk_Kardex_Proveedores1_idx`(`Proveedores_idProveedores` ASC) USING BTREE,
  INDEX `fk_Kardex_Productos1_idx`(`Productos_idProductos` ASC) USING BTREE,
  CONSTRAINT `fk_Kardex_IVA1` FOREIGN KEY (`IVA_idIVA`) REFERENCES `iva` (`idIVA`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Productos1` FOREIGN KEY (`Productos_idProductos`) REFERENCES `productos` (`idProductos`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Proveedores1` FOREIGN KEY (`Proveedores_idProveedores`) REFERENCES `proveedores` (`idProveedores`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Unidad_Medida` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida`) REFERENCES `unidad_medida` (`idUnidad_Medida`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Unidad_Medida1` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida1`) REFERENCES `unidad_medida` (`idUnidad_Medida`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_Kardex_Unidad_Medida2` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida2`) REFERENCES `unidad_medida` (`idUnidad_Medida`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kardex
-- ----------------------------
INSERT INTO `kardex` VALUES (5, 0, '2024-08-07 00:00:01', 1.0000, 1.0000, 0.0000, 1, 1, 1, 0.00, 15, 1, 1, 1, 1);
INSERT INTO `kardex` VALUES (6, 1, '2024-08-07 00:00:02', 1.0000, 10.0000, 0.0000, 1, 1, 1, 1.00, 15, 1, 1, 2, 1);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `idProductos` int NOT NULL AUTO_INCREMENT,
  `Codigo_Barras` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `Nombre_Producto` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Graba_IVA` int NOT NULL COMMENT 'Campo para almacenar si el producto graba IVA o no\n1 = Graba IVA\n0 = No posee IVA',
  PRIMARY KEY (`idProductos`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (1, '86313213213213213', 'Prueba', 1);
INSERT INTO `productos` VALUES (2, '785543242111238899', 'Prueba Mas Cara', 1);

-- ----------------------------
-- Table structure for proveedores
-- ----------------------------
DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores`  (
  `idProveedores` int NOT NULL AUTO_INCREMENT,
  `Nombre_Empresa` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Direccion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `Telefono` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Contacto_Empresa` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Campo para almacenar el nombre del empleado de la empresa para contactarse',
  `Telefono_Contacto` varchar(17) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'Campo para almacenar el numero de telefono del coantacto de la emprsa',
  PRIMARY KEY (`idProveedores`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of proveedores
-- ----------------------------
INSERT INTO `proveedores` VALUES (1, 'BOSA', 'Riobamba', '0995555555', 'Santiago', '0955555555');
INSERT INTO `proveedores` VALUES (10, 'Carlos Sangucho', 'Las Casas', '555555555', 'El mismo', '55555555');

-- ----------------------------
-- Table structure for unidad_medida
-- ----------------------------
DROP TABLE IF EXISTS `unidad_medida`;
CREATE TABLE `unidad_medida`  (
  `idUnidad_Medida` int NOT NULL AUTO_INCREMENT,
  `Detalle` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `Tipo` int NULL DEFAULT NULL COMMENT '1 = Unidad de Medida Ej: Gramos, Litros, Kilos\n0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack\n2 = Factor de Conversion Ej: Kilos a libras',
  PRIMARY KEY (`idUnidad_Medida`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of unidad_medida
-- ----------------------------
INSERT INTO `unidad_medida` VALUES (1, 'UNIDAD', 1);

SET FOREIGN_KEY_CHECKS = 1;
