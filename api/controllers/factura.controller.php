<?PHP 
include_once("cors.php");
//TODO: Controlador de clientes

require_once("../models/factura.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

error_reporting(0);
$factura = new Factura;
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los clientes
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase clientes
        $datos = $factura->todos();  
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla clientes
        $idFactura = $_GET["idFactura"];
        $status = "";
        $message = "";

        if (!isset($idFactura)){
            $status = "error";
            $message = "Valor invalido de Factura ID" . $idFactura;
        } else{
            $datos = $factura->uno($idFactura);
            $res = mysqli_fetch_assoc($datos);
            $status = "ok";
            $message = $res;
        }
        echo GeneralController::formatoSalida($status, $message);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla clientes
        $Fecha = $data["Fecha"];
        $Sub_total = $data["Sub_total"];
        $Sub_total_iva = $data["Sub_total_iva"];
        $Valor_IVA = $data["Valor_IVA"];
        $Clientes_idClientes = intval($data["Clientes_idClientes"]);
        $datos = array();
        $datos = $factura->insertar($Fecha, $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla clientes
        $idFactura = $data["idFactura"];
        $Fecha = $data["Fecha"];
        $Sub_total = $data["Sub_total"];
        $Sub_total_iva = $data["Sub_total_iva"];
        $Valor_IVA = $data["Valor_IVA"];
        $Clientes_idClientes = intval($data["Clientes_idClientes"]);
        $datos = array();
        $datos = $factura->actualizar($idFactura, $Fecha, $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla clientes
        $idFactura = $data["idFactura"];
        $datos = array();
        $datos = $factura->eliminar($idFactura);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
