<?PHP

//TODO: Clase de clientes

require_once("../config/conexion.php");

class Usuarios {

    public function todos()
    {
        //TODO: metodo para traer todos clientes 
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from usuarios";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idUsuarios)
    {
        //TODO: metodo para traer un cliente
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from usuarios where idUsuarios = $idUsuarios";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Nombre_Usuario, $Contrasenia, $Estado, $roles_idRoles)
    {
        //TODO: metodo para insertar un cliente
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `usuarios`(`Nombre_Usuario`, `Contrasenia`, `Estado`, `roles_idRoles`) VALUES ('$Nombre_Usuario', '" . md5($Contrasenia) . "', '$Estado', $roles_idRoles)";
            if (mysqli_query($con, $cadena)){
                return $con->insert_id;
            } else {
                echo GeneralController::formatoSalida("error", $con->error);
                die();
                // return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idUsuarios,$Nombre_Usuario, $Contrasenia, $roles_idRoles,  $Estado)
    {  
        //TODO: metodo para actualizar un cliente
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `usuarios` SET 
                    `Nombre_Usuario`='$Nombre_Usuario',
                    `Contrasenia`='" . md5($Contrasenia) . "',
                    `Estado`=$Estado,
                    `roles_idRoles`=$roles_idRoles
                WHERE idUsuarios=$idUsuarios";
            if (mysqli_query($con, $cadena)){
                return $idUsuarios;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idUsuarios)
    {  
        //TODO: metodo para eliminar un cliente
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `usuarios` WHERE `idUsuarios`=$idUsuarios";
            if (mysqli_query($con, $cadena)){
                return 1;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }


    public function login($Nombre_Usuario, $Contrasenia)
    {  
        //TODO: metodo para eliminar un cliente

        if (!isset($Nombre_Usuario) || $Nombre_Usuario==""){
            echo GeneralController::formatoSalida("error", "Usuario o clave incorrecta");
            die(); 
        }
        if (!isset($Contrasenia) || $Contrasenia==""){
            echo GeneralController::formatoSalida("error", "Usuario o clave incorrecta");
            die(); 
        }

        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "SELECT * FROM usuarios WHERE Nombre_Usuario='$Nombre_Usuario' AND Estado=1";
            $rs = mysqli_query($con, $cadena);
            
            if ($rs && mysqli_num_rows($rs)){
                $usuarios = mysqli_fetch_assoc($rs);

                if (md5($Contrasenia) != $usuarios["Contrasenia"]){
                    echo GeneralController::formatoSalida("error", "Usuario o clave incorrecta.");
                    die();
                }

                $cadena = "SELECT * FROM roles WHERE idRoles=" . $usuarios["roles_idRoles"];
                $rs = mysqli_query($con, $cadena);
                $roles = mysqli_fetch_assoc($rs);
                $usuarios["roles"] = $roles;
                unset($usuarios["Contrasenia"]);

                return $usuarios;
            } else{
                echo GeneralController::formatoSalida("error", "Usuario o clave incorrecta");
                die();
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
