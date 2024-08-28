<?PHP

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if($method == "OPTIONS") {die();}

error_reporting(0);

date_default_timezone_set ("America/Guayaquil");

// spl_autoload_register(function ($class){
//     require "$class.php";
// });

require "error.handler.controller.php";
set_exception_handler("ErrorHandler::handleException");

?>