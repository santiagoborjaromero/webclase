<?PHP 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if($method == "OPTIONS") {die();}

//TODO: Controlador de productos

require_once("../models/productos.model.php");
require_once("../middleware/middleware.php");

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
        $Codigo_Barras = $data["Codigo_Barras"];
        $Nombre_Producto = $data["Nombre_Producto"];
        $Graba_IVA = $data["Graba_IVA"];
        $datos = array();
        $datos = $productos->insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA);
        echo GeneralController::formatoSalida("ok", $datos);
        break;
    case "actualizar":
        //TODO: Proceso para actualizar un registro de la tabla productos
        $idProductos = $data["idProductos"];
        $Codigo_Barras = $data["Codigo_Barras"];
        $Nombre_Producto = $data["Nombre_Producto"];
        $Graba_IVA = $data["Graba_IVA"];
        $datos = array();
        $datos = $productos->actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA);
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
