import { FormaPagemento } from "./FormasPagamento";
import ItemPedido from "./ItemPedido";
import PedidoEntrega  from "./PedidoEntrega";
import { StatusPedido } from "./StatusPedido";

export default interface Pedido {
    id?: string;
    usuarioId: string; 
    data: Date;
    itens: ItemPedido[];
    valorTotal: number;
    status: StatusPedido;  
    formaPagamento: FormaPagemento;
    entrega: PedidoEntrega;
}