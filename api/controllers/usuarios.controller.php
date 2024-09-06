<?PHP 
include_once("cors.php");
//TODO: Controlador de usuarios

require_once("../models/usuarios.model.php");
require_once("../middleware/middleware.php");
require_once("./general.controller.php");

$usuarios = new Usuarios;   //TODO: se instancia la clase usuarios
$data = Middleware::request();

switch ($_GET["op"]) {
    case "todos":
        //TODO: Proceso para listar todos los usuarios
        $datos = array(); //Defino arreglo para almacenar los datos que vienen de la clase usuarios
        $datos = $usuarios->todos();  
        $todos = array();
        while ($row = mysqli_fetch_assoc($datos)) { 
            $todos[] = $row;
        }
        echo GeneralController::formatoSalida("ok", $todos);
        break;
    case "uno":
        //TODO: Proceso para obtener un registro de la tabla usuarios
        $idUsuarios = $data["idUsuarios"];
        $datos = $usuarios->uno($idUsuarios);
        $res = mysqli_fetch_assoc($datos);
        echo GeneralController::formatoSalida("ok", $res);
        break;
    case "insertar":
        //TODO: Proceso para insertar un proveedor en la tabla usuarios
        $Nombre_Usuario = $data["Nombre_Usuario"];
        $Contrasenia = $data["Contrasenia"];
        $Estado = $data["Estado"];
        $roles_idRoles = $data["roles_idRoles"];
        $datos = array();
        $datos = $usuarios->insertar($Nombre_Usuario, $Contrasenia, $roles_idRoles, $Estado);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla usuarios
        $idUsuarios = $data["idUsuarios"];
        $Nombre_Usuario = $data["Nombre_Usuario"];
        $Contrasenia = $data["Contrasenia"];
        $Estado = $data["Estado"];
        $roles_idRoles = $data["roles_idRoles"];
        $datos = array();
        $datos = $usuarios->actualizar($idUsuarios, $Nombre_Usuario, $Contrasenia, $roles_idRoles, $Estado);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "eliminar":
        //TODO: Proceso para elimina un registro de la tabla usuarios
        $idUsuarios = $data["idUsuarios"];
        $datos = array();
        $datos = $usuarios->eliminar($idUsuarios);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "login":
        //TODO: Proceso para realizar el proceso de logueo
        $Nombre_Usuario = $data["Nombre_Usuario"];
        $Contrasenia = $data["Contrasenia"];
        $datos = array();
        $datos = $usuarios->login($Nombre_Usuario, $Contrasenia);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    default:
        echo GeneralController::formatoSalida("error", "Ruta no existe");
        break;
}
