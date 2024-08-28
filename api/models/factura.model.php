<?PHP

//TODO: Clase de Factura

require_once("../config/conexion.php");

class Factura {

    public function todos()
    {
        //TODO: metodo para traer todas las Facturas
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT 
                f.idFactura,
                f.Fecha, 
                CONCAT('001-001-',LPAD(f.idFactura,7,'0')) as `NumeroDoc`,
                c.Nombres,
                f.Sub_total + f.Sub_total_iva as `SubTotal`,
                f.Valor_IVA,
                f.Sub_total + f.Sub_total_iva + f.Valor_IVA as `Total`
            FROM factura f
            INNER JOIN clientes c ON c.idClientes = f.Clientes_idClientes
            ORDER BY f.Fecha desc, f.idFactura desc
        ";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idFactura) // select * from factura where id = $idFactura
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT 
                f.idFactura,
                f.Fecha, 
                CONCAT('001-001-',LPAD(f.idFactura,7,'0')) as `NumeroDoc`,
                c.Nombres,
                f.Sub_total, 
                f.Sub_total_iva,
                f.Sub_total + f.Sub_total_iva as `SubTotal`,
                f.Valor_IVA,
                f.Sub_total + f.Sub_total_iva + f.Valor_IVA as `Total`,
                f.Clientes_idClientes 
            FROM factura f
                INNER JOIN clientes c ON c.idClientes = f.Clientes_idClientes
            WHERE  `idFactura` = $idFactura
            
        ";
        // $cadena = "SELECT * FROM `factura` WHERE `idFactura` = $idFactura";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Fecha, $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes) // insert into factura (Fecha, Sub_total, Sub_total_iva, Valor_IVA, Clientes_idClientes) values (...)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `factura`(`Fecha`, `Sub_total`, `Sub_total_iva`, `Valor_IVA`, `Clientes_idClientes`) 
                       VALUES ('$Fecha', $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes)";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Return the inserted ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idFactura, $Fecha, $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes) // update factura set ... where id = $idFactura
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `factura` SET 
                       `Fecha`='$Fecha',
                       `Sub_total`=$Sub_total,
                       `Sub_total_iva`=$Sub_total_iva,
                       `Valor_IVA`=$Valor_IVA,
                       `Clientes_idClientes`=$Clientes_idClientes
                       WHERE `idFactura` = $idFactura";
            if (mysqli_query($con, $cadena)) {
                return $idFactura; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idFactura) // delete from factura where id = $idFactura
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `factura` WHERE `idFactura`= $idFactura";
            if (mysqli_query($con, $cadena)) {
                // return $cadena; // Success
                return $idFactura; // Success
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
