/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, Post, ValidationPipe,UsePipes } from '@nestjs/common';
import { UsuarioRepositorio } from './usuario.repositorio';

import { UsuarioDTO } from './usuarioDTO'; // Importando o DTO de Usuario
import { RegistrarUsuarios } from '@iroperson/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UsuarioRepositorio) {}

  @Post('registrar')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registrar(@Body() usuarioDTO: UsuarioDTO) { // Usando o DTO de Usuario aqui

    const CasoDeUso = new RegistrarUsuarios()
    await CasoDeUso.executar(usuarioDTO)

    const usuarioExistente = await this.repo.buscarPorEmail(usuarioDTO.email);

    if (usuarioExistente) {
      throw new HttpException('Usuário já existe', 400);
    }

    // Salva o usuário no banco de dados
    const novoUsuario = await this.repo.salvar(usuarioDTO); // Passando o DTO

    // Retorna o usuário criado
    return novoUsuario;
  }
}
