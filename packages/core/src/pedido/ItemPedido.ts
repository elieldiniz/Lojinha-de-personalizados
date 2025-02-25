import { Produto } from "../produto";

export default interface ItemPedido {
    id?: number;
    produtoId: number; 
    produto?: Produto; 
    quantidade: number;
    precoUnitario: number;
  }
  