<?PHP

//TODO: Clase de Unidad Medida

require_once("../config/conexion.php");

class UnidadMedida {

    public function todos()
    {
        //TODO: metodo para traer todas las unidades de medida
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "select * from unidad_medida";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function uno($idUnidad_Medida)
    {
        //TODO: metodo para traer una unidad de medida
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "select * from unidad_medida where idUnidad_Medida=$idUnidad_Medida";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function insertar($Detalle, $Tipo)
    {
        //TODO: metodo para insertar una unidad de medida
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `unidad_medida`(`Detalle`, `Tipo`) VALUES ('$Detalle',$Tipo)";
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

    public function actualizar($idUnidad_Medida, $Detalle, $Tipo)
    {  
        //TODO: metodo para actualizar una unidad de medida
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `unidad_medida` SET `Detalle`='$Detalle',
                    `Tipo`=$Tipo 
                    WHERE idUnidad_Medida=$idUnidad_Medida";
            if (mysqli_query($con, $cadena)){
                return $idUnidad_Medida;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idUnidad_Medida)
    {  
        //TODO: metodo para eliminar una unidad de medida
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM unidad_medida WHERE idUnidad_Medida=$idUnidad_Medida";
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
