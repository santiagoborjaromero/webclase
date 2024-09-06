<?PHP 
include_once("cors.php");
//TODO: Controlador de kardex

require_once("../models/kardex.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

$kardex = new Kardex;   //TODO: se instancia la clase kardex
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los iva
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase kardex
        $datos = $kardex->todos();  
        $todos = array();
        while ($row = mysqli_fetch_assoc()) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla iva
        $idKardex = $data["idKardex"];
        $datos = $kardex->uno($idKardex);
        $res = mysqli_fetch_assoc($datos);
        echo GeneralController::formatoSalida("ok", $res);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla iva
        $Estado = 1;
        $Fecha_Transaccion = $data["Fecha_Transaccion"];
        $Cantidad = $data["Cantidad"];
        $Valor_Compra = $data["Valor_Compra"];
        $Valor_Venta = $data["Valor_Venta"];
        $Unidad_Medida_idUnidad_Medida = $data["Unidad_Medida_idUnidad_Medida"];
        $Unidad_Medida_idUnidad_Medida1 = $data["Unidad_Medida_idUnidad_Medida1"];
        $Unidad_Medida_idUnidad_Medida2 = $data["Unidad_Medida_idUnidad_Medida2"];
        $Valor_Ganacia = $data["Valor_Ganacia"];
        $IVA = $data["IVA"];
        $IVA_idIVA = $data["IVA_idIVA"];
        $Proveedores_idProveedores = $data["Proveedores_idProveedores"];
        $Productos_idProductos = $data["Productos_idProductos"];
        $Tipo_Transaccion = $data["Tipo_Transaccion"];

        $kardex->actualizarEstado($Productos_idProductos, 0);

        $datos = array();
        $datos = $kardex->insertar($Estado, $Fecha_Transaccion, $Cantidad, $Valor_Compra, $Valor_Venta, $Unidad_Medida_idUnidad_Medida,$Unidad_Medida_idUnidad_Medida1, $Unidad_Medida_idUnidad_Medida2,$Valor_Ganacia,$IVA,$IVA_idKardex,$Proveedores_idProveedores,$Productos_idProductos,$Tipo_Transaccion);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla iva
        $idKardex = $data["idKardex"];
        $Estado = $data["Estado"];
        $Fecha_Transaccion = $data["Fecha_Transaccion"];
        $Cantidad = $data["Cantidad"];
        $Valor_Compra = $data["Valor_Compra"];
        $Valor_Venta = $data["Valor_Venta"];
        $Unidad_Medida_idUnidad_Medida = $data["Unidad_Medida_idUnidad_Medida"];
        $Unidad_Medida_idUnidad_Medida1 = $data["Unidad_Medida_idUnidad_Medida1"];
        $Unidad_Medida_idUnidad_Medida2 = $data["Unidad_Medida_idUnidad_Medida2"];
        $Valor_Ganacia = $data["Valor_Ganacia"];
        $IVA = $data["IVA"];
        $IVA_idKardex = $data["IVA_idKardex"];
        $Proveedores_idProveedores = $data["Proveedores_idProveedores"];
        $Productos_idProductos = $data["Productos_idProductos"];
        $Tipo_Transaccion = $data["Tipo_Transaccion"];
        $datos = array();
        $datos = $kardex->actualizar($idKardex, $Estado, $Fecha_Transaccion, $Cantidad, $Valor_Compra, $Valor_Venta, $Unidad_Medida_idUnidad_Medida,$Unidad_Medida_idUnidad_Medida1, $Unidad_Medida_idUnidad_Medida2,$Valor_Ganacia,$IVA,$IVA_idKardex,$Proveedores_idProveedores,$Productos_idProductos,$Tipo_Transaccion);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla iva
        $idKardex = $data["idKardex"];
        $datos = array();
        $datos = $kardex->eliminar($idKardex);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
