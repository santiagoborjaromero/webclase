export interface FacturaInterface {
  idFactura: number;
  Fecha: string;
  NumeroDoc: string, 
  Nombres: string, 
  Sub_total: number,
  Sub_total_iva: number,
  SubTotal: number;
  Valor_IVA: number;
  Total: number;
  Clientes_idClientes: number;
}

