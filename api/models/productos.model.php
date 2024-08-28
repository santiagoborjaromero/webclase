<?PHP

//TODO: Clase de productos

require_once("../config/conexion.php");

class Productos {

    public function todos()
    {
        //TODO: metodo para traer todos productos 
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from productos";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idProductos)
    {
        //TODO: metodo para traer un producto
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select * from productos where idProductos = $idProductos";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA)
    {
        //TODO: metodo para insertar un producto
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `productos`(`Codigo_Barras`, `Nombre_Producto`, `Graba_IVA`) VALUES ('$Codigo_Barras','$Nombre_Producto',$Graba_IVA)";
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

    public function actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA)
    {  
        //TODO: metodo para actualizar un producto
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `productos` SET 
                    `Codigo_Barras`='$Codigo_Barras',
                    `Nombre_Producto`='$Nombre_Producto',
                    `Graba_IVA`=$Graba_IVA
                WHERE idProductos=$idProductos";
            if (mysqli_query($con, $cadena)){
                return $idProductos;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idProductos)
    {  
        //TODO: metodo para eliminar un producto
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM productos WHERE idProductos=$idProductos";
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
