export interface ItemFacturaInterface {
    idProductos: number,
    Codigo: string,
    Producto?: string,
    Cantidad: number,
    PVP: number,
    Total: number,
    GrabaIVA?: number,
    Stock?: number,

}
