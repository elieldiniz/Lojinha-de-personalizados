/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Pedido } from '@iroperson/core';
import { PrismaProvider } from '../db/prisma.provider';

@Injectable()
export class PedidoPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async obter(): Promise<Pedido[]> {
    console.log('Obtendo todos os pedidos...');
    const pedidos = await this.prisma.pedido.findMany();
    console.log('Pedidos encontrados:', pedidos);
    return pedidos as any;
  }

  async obterPorId(id: number): Promise<Pedido[]> {
    console.log(`Obtendo pedido com ID: ${id}`);
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: {
          include: { produto: { select: { id: true, nome: true } } },
        },
        entrega: true,
      },
    });
    console.log('Pedido encontrado:', pedido);
    return pedido as any;
  }

  async salvar(pedido: Pedido): Promise<void> {
    console.log('Recebendo pedido para salvar:', JSON.stringify(pedido, null, 2));
  
    if (!pedido.usuarioId) {
      console.error('Erro: usuarioId não foi enviado na requisição.');
      throw new Error('usuarioId não foi enviado na requisição.');
    }
  
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { id: pedido.usuarioId },
    });
  
    if (!usuarioExistente) {
      console.error('Erro: Usuário não encontrado no banco de dados.');
      throw new Error('Usuário não encontrado no banco de dados.');
    }
  
    console.log('Salvando pedido no banco de dados...');
  
    await this.prisma.pedido.create({
      data: {
        usuario: { connect: { id: pedido.usuarioId } },
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
          create: pedido.itens.map((item, index) => {
            console.log(`Processando item ${index}:`, item);
  
            // 🔹 Garante que produtoId está acessível corretamente
            const produtoId = item.produtoId ?? item.produto?.id;
  
            if (!produtoId) {
              console.error(`Erro: produtoId ausente no item ${index}`);
              throw new Error(`produtoId ausente no item ${index}`);
            }
  
            return {
              produtoId,
              precoUnitario: item.precoUnitario,
              quantidade: item.quantidade,
            };
          }),
        },
      },
    });
  
    
  }
  
  async excluir(id: number): Promise<void> {
    console.log(`Recebida solicitação para excluir pedido ID: ${id}`);
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });

    if (!pedido) {
      console.log('Pedido não encontrado, nada para excluir.');
      return;
    }
    
    console.log('Executando transação de exclusão...');
    await this.prisma.$transaction([
      this.prisma.itemPedido.deleteMany({ where: { pedidoId: id } }),
      this.prisma.pedido.delete({ where: { id } }),
      this.prisma.pedidoEntrega.delete({ where: { id: pedido.entregaId } }),
    ]);
    console.log(`Pedido ID ${id} excluído com sucesso.`);
  }
}