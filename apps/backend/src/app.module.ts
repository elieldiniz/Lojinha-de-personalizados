/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';


@Module({
  controllers: [AppController],
  imports: [AuthModule, DbModule, ProdutoModule, PedidoModule],
})
export class AppModule {}
