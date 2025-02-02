/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioRepositorio } from './repo.usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';

@Module({
  imports:[DbModule],
  controllers: [AuthController],
  providers: [UsuarioRepositorio, BcryptProvider]
})
export class AuthModule {}
