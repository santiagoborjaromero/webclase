<?PHP 
include_once("cors.php");
//TODO: Controlador de clientes

require_once("../models/clientes.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

$clientes = new Clientes;   //TODO: se instancia la clase clientes
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los clientes
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase clientes
        $datos = $clientes->todos();  
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla clientes
        $idClientes = $data["idClientes"];
        $datos = $clientes->uno($idClientes);
        $res = mysqli_fetch_assoc($datos);
        echo GeneralController::formatoSalida("ok", $res);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla clientes
        $Nombres = $data["Nombres"];
        $Direccion = $data["Direccion"];
        $Telefono = $data["Telefono"];
        $Cedula = $data["Cedula"];
        $Correo = $data["Correo"];
        $datos = array();
        $datos = $clientes->insertar($Nombres, $Direccion, $Telefono, $Cedula, $Correo);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla clientes
        $idClientes = $data["idClientes"];
        $Nombres = $data["Nombres"];
        $Direccion = $data["Direccion"];
        $Telefono = $data["Telefono"];
        $Cedula = $data["Cedula"];
        $Correo = $data["Correo"];
        $datos = array();
        $datos = $clientes->actualizar($idClientes, $Nombres, $Direccion, $Telefono, $Cedula, $Correo);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla clientes
        $idClientes = $data["idClientes"];
        $datos = array();
        $datos = $clientes->eliminar($idClientes);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
}
