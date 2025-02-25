/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoPrisma } from './pedido.prisma';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [PedidoController],
  providers: [PedidoPrisma],
  imports: [DbModule], 
})
export class PedidoModule {}
