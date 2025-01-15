/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';


@Module({
  controllers: [AppController],
  imports: [AuthModule, DbModule],
})
export class AppModule {}
