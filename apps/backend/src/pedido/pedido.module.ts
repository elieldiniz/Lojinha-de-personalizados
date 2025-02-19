/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoPrisma } from './pedido.prisma';

@Module({
  controllers: [PedidoController],
  providers: [PedidoPrisma],
})
export class PedidoModule {}
