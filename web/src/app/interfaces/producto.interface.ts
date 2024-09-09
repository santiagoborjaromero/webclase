export interface ProductoInterface {
    idProductos: number; 
    idIVA?: number;
    idUnidad_Medida?: number;
    idProveedores?: number;
    Unidad_Medida?: string;
    IVA_Detalle?: string;
    idKardex?: number;
    IVA_idIVA?: number;
    Codigo_Barras: string;
    Nombre_Producto: string;
    Graba_IVA: number;
    Cantidad?: number;
    Valor_Compra?: number;
    Valor_Venta?: number;
    Fecha_Transaccion?: string;
    Tipo_Transaccion?: string;
    Unidad_Medida_idUnidad_Medida?: number;
    Proveedores_idProveedores?: number;
}

