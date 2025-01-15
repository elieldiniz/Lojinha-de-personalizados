/* eslint-disable prettier/prettier */
import {Body, Controller, Post } from '@nestjs/common';


import { PrismaService } from 'src/db/prisma.service';

interface UsuarioDTO {
    id?: number
    nome: string
    email: string
    senha?: string
    telefone?: string
    perfil?: string
}


@Controller('auth')
export class AuthController {

    constructor(private readonly prisma: PrismaService){}

    @Post('login')
    async login(){
        return 'login'
    }

    @Post('registrar')
    async registrar(@Body() usuario: UsuarioDTO) {
    
        await this.prisma.usuario.create({
            data: {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                telefone: usuario.telefone
            },
        });
    }
    
}
