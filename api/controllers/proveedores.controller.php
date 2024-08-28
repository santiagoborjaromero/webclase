<?PHP 
include_once("cors.php");

//TODO: Controlador de proveedores
require_once("../models/proveedores.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

$proveedores = new Proveedores;   //TODO: se instancia la clase proveedores
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los proveedores
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase proveedores
        $datos = $proveedores->todos();  // Llamo 
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }

        // http_response_code(200);
        echo GeneralController::formatoSalida("ok", $todos);
        // echo json_encode($todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla proveedores
          //TODO: Proceso para capturar la informacion cuando no viene POST / REQUEST
        $idProveedores = $data["idProveedores"];
        $datos = array();
        $datos = $proveedores->uno($idProveedores);
        $res = mysqli_fetch_assoc($datos);
        // echo json_encode($res);
        echo GeneralController::formatoSalida("ok", $res);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla proveedores

        $Nombre_Empresa = $data["Nombre_Empresa"];
        $Direccion = $data["Direccion"];
        $Telefono = $data["Telefono"];
        $Contacto_Empresa = $data["Contacto_Empresa"];
        $Telefono_Contacto = $data["Telefono_Contacto"];
        $datos = array();
        $datos = $proveedores->insertar($Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto);
        // echo json_encode($datos);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla proveedores
        $idProveedores = $data["idProveedores"];
        $Nombre_Empresa = $data["Nombre_Empresa"];
        $Direccion = $data["Direccion"];
        $Telefono = $data["Telefono"];
        $Contacto_Empresa = $data["Contacto_Empresa"];
        $Telefono_Contacto = $data["Telefono_Contacto"];
        $datos = array();
        $datos = $proveedores->actualizar($idProveedores, $Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto);
        // echo json_encode($datos);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla proveedores
        $idProveedores = $data["idProveedores"];
        $datos = array();
        $datos = $proveedores->eliminar($idProveedores);
        // echo json_encode($datos);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
