<?PHP

//TODO: Clase de productos

require_once("../config/conexion.php");

class Productos {

    public function todos()
    {
        //TODO: metodo para traer todos productos 
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT
            productos.idProductos, 
            productos.Codigo_Barras, 
            productos.Nombre_Producto, 
            productos.Graba_IVA, 
            unidad_medida.Detalle AS Unidad_Medida, 
            iva.Detalle AS IVA_Detalle, 
            kardex.Cantidad, 
            kardex.Valor_Compra, 
            kardex.Valor_Venta, 
            kardex.Fecha_Transaccion, 
            kardex.Tipo_Transaccion,
            kardex.idKardex
        FROM
            productos
            INNER JOIN kardex ON  productos.idProductos = kardex.Productos_idProductos
            INNER JOIN iva ON kardex.IVA_idIVA = iva.idIVA
            INNER JOIN proveedores ON kardex.Proveedores_idProveedores = proveedores.idProveedores
            INNER JOIN unidad_medida ON 
                kardex.Unidad_Medida_idUnidad_Medida = unidad_medida.idUnidad_Medida AND
                kardex.Unidad_Medida_idUnidad_Medida1 = unidad_medida.idUnidad_Medida AND
                kardex.Unidad_Medida_idUnidad_Medida2 = unidad_medida.idUnidad_Medida
        WHERE
            kardex.Estado = 1
        ORDER BY
	        productos.Nombre_Producto";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idProductos)
    {
        //TODO: metodo para traer un producto
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT
                productos.idProductos, 
                productos.Codigo_Barras, 
                productos.Nombre_Producto, 
                productos.Graba_IVA, 
                kardex.Unidad_Medida_idUnidad_Medida,
                kardex.IVA_idIVA,
                kardex.Proveedores_idProveedores,
                kardex.Cantidad, 
                kardex.Valor_Compra, 
                kardex.Valor_Venta, 
                kardex.Fecha_Transaccion, 
                kardex.Tipo_Transaccion,
                kardex.idKardex
            FROM
                productos
                INNER JOIN kardex ON  productos.idProductos = kardex.Productos_idProductos
            WHERE
                kardex.Estado = 1 AND productos.idProductos = $idProductos";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA, $idUnidad_Medida, 
                            $idIVA, $Cantidad, $Valor_Compra, $Valor_Venta, $idProveedores)
    {
        //TODO: metodo para insertar un producto
        try{
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `productos`(`Codigo_Barras`, `Nombre_Producto`, `Graba_IVA`) VALUES
                 ('$Codigo_Barras','$Nombre_Producto',$Graba_IVA)";
            if (mysqli_query($con, $cadena)){
                $productoId = $con->insert_id;

                $cadenaKardex = "INSERT INTO `Kardex`(`Estado`, `Fecha_Transaccion`, `Cantidad`, `Valor_Compra`, 
                        `Valor_Venta`, `Unidad_Medida_idUnidad_Medida`, `Unidad_Medida_idUnidad_Medida1`, 
                        `Unidad_Medida_idUnidad_Medida2`, `IVA`, `IVA_idIVA`, `Proveedores_idProveedores`, 
                        `Productos_idProductos`, `Tipo_Transaccion`)
                       VALUES (1, NOW(), '$Cantidad', '$Valor_Compra', 
                       '$Valor_Venta', '$idUnidad_Medida', '$idUnidad_Medida', '$idUnidad_Medida', 
                       '$idIVA', '$idIVA', '$idProveedores', '$productoId', 1)";
                if (mysqli_query($con, $cadenaKardex)){
                    return $productoId;
                } else {
                    return $con->error;
                }

            } else {
                return $con->error;
            }
        } catch(Exception $th){
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idKardex, $idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA, $idUnidad_Medida, 
    $idIVA, $Cantidad, $Valor_Compra, $Valor_Venta, $idProveedores)
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

                $cadenaKardex = "UPDATE `Kardex` SET 
                    `Cantidad` = $Cantidad, 
                    `Valor_Compra` = $Valor_Compra, 
                    `Valor_Venta` = $Valor_Venta, 
                    `Unidad_Medida_idUnidad_Medida`  = $idUnidad_Medida, 
                    `Unidad_Medida_idUnidad_Medida1` = $idUnidad_Medida, 
                    `Unidad_Medida_idUnidad_Medida2` = $idUnidad_Medida, 
                    `IVA` = $idIVA, 
                    `IVA_idIVA` = $idIVA, 
                    `Proveedores_idProveedores` = $idProveedores 
                WHERE `idKardex` = $idKardex";

                if (mysqli_query($con, $cadenaKardex)){
                } else {
                    return $con->error;
                }

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
            $cadena = "UPDATE `kardex` SET `Estado`=0 WHERE `Productos_idProductos`=$idProductos";
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
