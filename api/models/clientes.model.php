<?PHP

//TODO: Clase de clientes

require_once("../config/conexion.php");

class Clientes {

    public function todos()
    {
        //TODO: metodo para traer todos clientes 
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from clientes";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idClientes)
    {
        //TODO: metodo para traer un cliente
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from clientes where idClientes = $idClientes";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Nombres, $Direccion, $Telefono, $Cedula, $Correo)
    {
        //TODO: metodo para insertar un cliente
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `clientes`(`Nombres`, `Direccion`, `Telefono`, `Cedula`, `Correo`) VALUES ('$Nombres','$Direccion','$Telefono','$Cedula', '$Correo')";
            if (mysqli_query($con, $cadena)){
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idClientes, $Nombres, $Direccion, $Telefono, $Cedula, $Correo)
    {  
        //TODO: metodo para actualizar un cliente
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `clientes` SET 
                    `Nombres`='$Nombres',
                    `Direccion`='$Direccion',
                    `Telefono`='$Telefono',
                    `Cedula`='$Cedula',
                    `Correo`='$Correo' 
                WHERE idClientes=$idClientes";
            if (mysqli_query($con, $cadena)){
                return $idClientes;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idClientes)
    {  
        //TODO: metodo para eliminar un cliente
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM clientes WHERE idClientes=$idClientes";
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
}
