<?PHP

//TODO: Clase de proveedores

require_once("../config/conexion.php");

class Proveedores {

    public function todos()
    {
        //TODO: metodo para traer todos proveedores 
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "SELECT * FROM proveedores ORDER BY Nombre_Empresa";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function uno($idProveedores)
    {
        //TODO: metodo para traer un proveedor
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "select * from proveedores where idProveedores=$idProveedores";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function insertar($Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto)
    {
        //TODO: metodo para insertar un proveedor
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `proveedores`(`Nombre_Empresa`, `Direccion`, `Telefono`, `Contacto_Empresa`, `Telefono_Contacto`) VALUES ('$Nombre_Empresa','$Direccion','$Telefono','$Contacto_Empresa', '$Telefono_Contacto')";
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

    public function actualizar($idProveedores, $Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto)
    {  
        //TODO: metodo para actualizar un proveedor
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `proveedores` SET `Nombre_Empresa`='$Nombre_Empresa',
                    `Direccion`='$Direccion',`Telefono`='$Telefono',
                    `Contacto_Empresa`='$Contacto_Empresa',`Telefono_Contacto`='$Telefono_Contacto' 
                WHERE idProveedores=$idProveedores";
            if (mysqli_query($con, $cadena)){
                return $idProveedores;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idProveedores)
    {  
        //TODO: metodo para eliminar un proveedor
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM proveedores WHERE idProveedores=$idProveedores";
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
