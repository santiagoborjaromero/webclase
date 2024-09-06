<?PHP 
include_once("cors.php");
//TODO: Controlador de productos

require_once("../models/productos.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

$productos = new Productos;   //TODO: se instancia la clase productos
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los productos
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase productos
        $datos = $productos->todos();  
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla productos
        $idProductos = $data["idProductos"];
        $datos = $productos->uno($idProductos);
        $res = mysqli_fetch_assoc($datos);
        echo GeneralController::formatoSalida("ok", $res);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla productos
        $Codigo_Barras  = $data["Codigo_Barras"];
        $Nombre_Producto = $data["Nombre_Producto"];
        $Graba_IVA = $data["Graba_IVA"];
        $idUnidad_Medida = $data["idUnidad_Medida"];
        $idIVA = $data["idIVA"];
        $Cantidad = $data["Cantidad"];
        $Valor_Compra = $data["Valor_Compra"];
        $Valor_Venta = $data["Valor_Venta"];
        $idProveedores = $data["idProveedores"];

        $datos = array();
        $datos = $productos->insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA, $idUnidad_Medida, $idIVA, 
            $Cantidad, $Valor_Compra, $Valor_Venta, $idProveedores);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla productos
        $idKardex = $data["idKardex"];
        $idProductos = $data["idProductos"];
        $Codigo_Barras  = $data["Codigo_Barras"];
        $Nombre_Producto = $data["Nombre_Producto"];
        $Graba_IVA = $data["Graba_IVA"];
        $idUnidad_Medida = $data["idUnidad_Medida"];
        $idIVA = $data["idIVA"];
        $Cantidad = $data["Cantidad"];
        $Valor_Compra = $data["Valor_Compra"];
        $Valor_Venta = $data["Valor_Venta"];
        $idProveedores = $data["idProveedores"];
        $datos = array();
        $datos = $productos->actualizar($idKardex, $idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA, $idUnidad_Medida, 
                    $idIVA, $Cantidad, $Valor_Compra, $Valor_Venta, $idProveedores);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla productos
        $idProductos = $data["idProductos"];
        $datos = array();
        $datos = $productos->eliminar($idProductos);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
