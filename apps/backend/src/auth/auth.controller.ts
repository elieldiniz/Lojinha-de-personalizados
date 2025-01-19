/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import UsuarioDTO from './ausuario';
import { UsuarioRepositorio } from './usuario.repositorio';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UsuarioRepositorio) {}

  @Post('registrar')
  async registrar(@Body() usuario: UsuarioDTO) {
    // Verifica se o e-mail já existe no banco de dados
    const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

    if (usuarioExistente) {
      throw new HttpException('Usuário já existe', 400);
    }

    // Salva o usuário no banco de dados
    const novoUsuario = await this.repo.salvar(usuario);

    // Retorna o usuário criado
    return novoUsuario;
  }
}
