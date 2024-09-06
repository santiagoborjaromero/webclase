<?PHP 
include_once("cors.php");

//TODO: Controlador de iva

require_once("../models/iva.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

$iva = new IVA;   //TODO: se instancia la clase iva
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los iva
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase iva
        $datos = $iva->todos();  
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla iva
        $idIVA = $data["idIVA"];
        $datos = $iva->uno($idIVA);
        $res = mysqli_fetch_assoc($datos);
        echo GeneralController::formatoSalida("ok", $res);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla iva
        $Detalle = $data["Detalle"];
        $Estado = $data["Estado"];
        $Valor = $data["Valor"];
        $datos = array();
        $datos = $iva->insertar($Detalle, $Estado, $Valor);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla iva
        $idIVA = $data["idIVA"];
        $Detalle = $data["Detalle"];
        $Estado = $data["Estado"];
        $Valor = $data["Valor"];
        $datos = array();
        $datos = $iva->actualizar($idIVA, $Detalle, $Estado, $Valor);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla iva
        $idIVA = $data["idIVA"];
        $datos = array();
        $datos = $iva->eliminar($idIVA);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
