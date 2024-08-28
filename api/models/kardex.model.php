<?PHP

//TODO: Clase de Unidad Medida

require_once("../config/conexion.php");

class Kardex {

    public function todos()
    {
        //TODO: metodo para traer todos los registros del kardex
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "select * from kardex";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function uno($idKardex)
    {
        //TODO: metodo para traer un registro en el kardex
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "select * from kardex where idKardex=$idKardex";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    //TODO: Comentarios de cada campo
    /*
    Estado
        Campo para almacenar el estado del kardex
        1 = activo
        0 = inactivo
    Unidad_Medida_idUnidad_Medida
        0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack
        1 = Unidad de Medida Ej: Gramos, Litros, Kilos
        2 = Factor de Conversion Ej: Kilos a libras
    Tipo_Transaccion
        1= entrada Ej: Compra
        0 = salida  Ej: Venta
    */

    public function insertar($Estado, $Fecha_Transaccion, $Cantidad, $Valor_Compra, $Valor_Venta, $Unidad_Medida_idUnidad_Medida,$Unidad_Medida_idUnidad_Medida1, $Unidad_Medida_idUnidad_Medida2,$Valor_Ganacia,$IVA,$IVA_idIVA,$Proveedores_idProveedores,$Productos_idProductos,$Tipo_Transaccion)
    {
        //TODO: metodo para insertar un registro en el kardex
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `kardex`
                (`Estado`, `Fecha_Transaccion`, `Cantidad`, `Valor_Compra`, `Valor_Venta`, `Unidad_Medida_idUnidad_Medida`, 
                `Unidad_Medida_idUnidad_Medida1`, `Unidad_Medida_idUnidad_Medida2`, `Valor_Ganacia`, `IVA`, `IVA_idIVA`, 
                `Proveedores_idProveedores`, `Productos_idProductos`, `Tipo_Transaccion`) 
                VALUES 
                ($Estado, '$Fecha_Transaccion', $Cantidad, $Valor_Compra, $Valor_Venta, $Unidad_Medida_idUnidad_Medida, 
                $Unidad_Medida_idUnidad_Medida1, $Unidad_Medida_idUnidad_Medida2,$Valor_Ganacia,$IVA,$IVA_idIVA,
                $Proveedores_idProveedores,$Productos_idProductos,$Tipo_Transaccion)";
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

    public function actualizar($idKardex, $Estado, $Fecha_Transaccion, $Cantidad, $Valor_Compra, $Valor_Venta, $Unidad_Medida_idUnidad_Medida, 
    $Unidad_Medida_idUnidad_Medida1, $Unidad_Medida_idUnidad_Medida2,$Valor_Ganacia,$IVA,$IVA_idIVA,
    $Proveedores_idProveedores,$Productos_idProductos,$Tipo_Transaccion)
    {  
        //TODO: metodo para actualizar un registro en el kardex
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `kardex` SET 
                    `Estado`=$Estado,
                    `Fecha_Transaccion`='$Fecha_Transaccion',
                    `Cantidad`=$Cantidad,
                    `Valor_Compra`=$Valor_Compra,
                    `Valor_Venta`=$Valor_Venta,
                    `Unidad_Medida_idUnidad_Medida`=$Unidad_Medida_idUnidad_Medida,
                    `Unidad_Medida_idUnidad_Medida1`=$Unidad_Medida_idUnidad_Medida1,
                    `Unidad_Medida_idUnidad_Medida2`=$Unidad_Medida_idUnidad_Medida2,
                    `Valor_Ganacia`=$Valor_Ganacia,
                    `IVA`=$IVA,
                    `IVA_idIVA`=$IVA_idIVA,
                    `Proveedores_idProveedores`=$Proveedores_idProveedores,
                    `Productos_idProductos`=$Productos_idProductos 
                    `Tipo_Transaccion`=$Tipo_Transaccion 
                    WHERE idKardex=$idKardex";
            if (mysqli_query($con, $cadena)){
                return $idKardex;
            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizarEstado($idProductos, $Estado){
        //TODO: metodo para actualizar el estado de un registro en el kardex
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `kardex` SET 
                    `Estado`=$Estado
                    WHERE Productos_idProductos=$idProductos";
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

    public function eliminar($idKardex)
    {  
        //TODO: metodo para eliminar un registro en el kardex
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM kardex WHERE idKardex=$idKardex";
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
