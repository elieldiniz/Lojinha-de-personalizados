/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ProdutoController } from './produto.controller';
import { ProdutoPrismaTs } from './produto.prisma';

@Module({
  imports: [DbModule],
  controllers: [ProdutoController],
  providers: [ProdutoPrismaTs],
})
export class ProdutoModule {}
