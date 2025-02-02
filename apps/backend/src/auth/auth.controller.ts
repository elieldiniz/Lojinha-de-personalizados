/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, Post, ValidationPipe,UsePipes } from '@nestjs/common';
import { UsuarioRepositorio } from './repo.usuario.prisma';

import { UsuarioDTO } from './usuarioDTO'; 
import { RegistrarUsuarios } from '@iroperson/core';
import { BcryptProvider } from './bcrypt.provider';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UsuarioRepositorio, private readonly cripto: BcryptProvider 
  ) {}

  @Post('registrar')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registrar(@Body() usuarioDTO: UsuarioDTO) {
    const CasoDeUso = new RegistrarUsuarios(this.repo,this.cripto);
    await CasoDeUso.executar(usuarioDTO);
  }
}
