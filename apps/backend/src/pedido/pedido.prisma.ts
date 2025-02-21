import { Injectable } from '@nestjs/common';
import { Pedido } from '@iroperson/core';
import { PrismaProvider } from '../db/prisma.provider';

@Injectable()
export class PedidoPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async obter(): Promise<Pedido[]> {
    const pedidos = await this.prisma.pedido.findMany();
    return pedidos as any;
  }

  async obterPorId(id: number): Promise<Pedido[]> {
    const pedidos = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: {
          include: { produto: { select: { id: true, nome: true } } },
        },
        entrega: true,
      },
    });
    return pedidos as any;
  }

  async salvar(pedido: Pedido): Promise<void> {

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: pedido.usuarioId }
    });
  
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    await this.prisma.pedido.create({
      data: {
        usuario: { connect: { id: usuario.id } },
        data: pedido.data,
        status: pedido.status,
        valorTotal: pedido.valorTotal,
        formaPagamento: pedido.formaPagamento,

        entrega: { 
          create: {
            nome: pedido.entrega.nome,
            email: pedido.entrega.email,
            cpf: pedido.entrega.cpf,
            logradouro: pedido.entrega.logradouro,
            complemento: pedido.entrega.complemento,
            cidade: pedido.entrega.cidade,
            estado: pedido.entrega.estado, 
          },
        },

        itens: {
          create: pedido.itens.map((item) => ({
            produtoId: item.produto.id,
            precoUnitario: item.precoUnitario,
            quantidade: item.quantidade,
          })),
        },
      },
    });
  }

  async excluir(id: number): Promise<void> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
    });

    if (!pedido) return;
    await this.prisma.$transaction([
      this.prisma.itemPedido.deleteMany({ where: { pedidoId: id } }),
      this.prisma.pedido.delete({ where: { id } }),
      this.prisma.pedidoEntrega.delete({ where: { id: pedido.entregaId } }),
    ]);
  }
}
