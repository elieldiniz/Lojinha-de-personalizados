/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioRepositorio } from './repo.usuario.prisma';
import { CriarUsuarioDTO } from './CriarUsuarioDTO'; 
import { LoginUsuario, RegistrarUsuarios } from '@iroperson/core';
import { BcryptProvider } from './bcrypt.provider';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly repo: UsuarioRepositorio,
    private readonly cripto: BcryptProvider
  ) {}

  

  @Post('registrar')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registrar(@Body() usuarioDTO: CriarUsuarioDTO) {
    const casoDeUso = new RegistrarUsuarios(this.repo, this.cripto);

    try {
      const usuarioCriado = await casoDeUso.executar(usuarioDTO);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuário registrado com sucesso',
        data: usuarioCriado,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao registrar usuário',
        HttpStatus.BAD_REQUEST
      );
    }
  }


  @Post('login')
  async login(@Body()dados: {email: string, senha: string}){
    const casoDeUso = new LoginUsuario(this.repo, this.cripto)
    const usuario =  await casoDeUso.executar({email: dados.email, senha: dados.senha})

    return 'login'
  }
}
