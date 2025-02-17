/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoPrismaTs } from './produto.prisma';
@Module({

  controllers: [ProdutoController],
  providers: [ProdutoPrismaTs],

})
export class ProdutoModule {}
