<?PHP

//TODO: Clase de IVA

require_once("../config/conexion.php");

class IVA {

    public function todos()
    {
        //TODO: metodo para traer todos IVA 
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from iva";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idIVA)
    {
        //TODO: metodo para traer un IVA
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from iva where idIVA = $idIVA";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Detalle, $Estado, $Valor)
    {
        //TODO: metodo para insertar un IVA
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `iva`(`Detalle`, `Estado`, `Valor`) VALUES ('$Detalle',$Estado,$Valor)";
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

    public function actualizar($idIVA, $Detalle, $Estado, $Valor)
    {  
        //TODO: metodo para actualizar un IVA
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `iva` SET 
                    `Detalle`='$Detalle',
                    `Estado`=$Estado,
                    `Valor`=$Valor
                WHERE idIVA=$idIVA";
            if (mysqli_query($con, $cadena)){
                return $idIVA;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idIVA)
    {  
        //TODO: metodo para eliminar un IVA
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM iva WHERE idIVA=$idIVA";
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
