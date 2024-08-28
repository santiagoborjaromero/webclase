<?PHP 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if($method == "OPTIONS") {die();}

//TODO: Controlador de Unidad de Medida

require_once("../models/unidadmedida.model.php");
require_once("../middleware/middleware.php");

$unidad_medida = new UnidadMedida;   //TODO: se instancia la clase unidad de medida
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los unidad de medida
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase unidad de medida
        $datos = $unidad_medida->todos();  // Llamo 
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla unidad de medida
        $idUnidad_Medida = $data["idUnidad_Medida"];
        $datos = array();
        $datos = $unidad_medida->uno($idUnidad_Medida);
        $res = mysqli_fetch_assoc($datos);
        echo GeneralController::formatoSalida("ok", $res);

        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla unidad de medida
        $Detalle = $data["Detalle"];
        $Tipo = $data["Tipo"];
        $datos = array();
        $datos = $unidad_medida->insertar($Detalle, $Tipo);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla unidad de medida
        $idUnidad_Medida = $data["idUnidad_Medida"];
        $Detalle = $data["Detalle"];
        $Tipo = $data["Tipo"];
        $datos = array();
        $datos = $unidad_medida->actualizar($idUnidad_Medida, $Detalle, $Tipo);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla unidad de medida
        $idUnidad_Medida = $data["idUnidad_Medida"];
        $datos = array();
        $datos = $unidad_medida->eliminar($idUnidad_Medida);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
