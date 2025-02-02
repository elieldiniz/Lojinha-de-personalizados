/* eslint-disable prettier/prettier */
import { Injectable, Logger, HttpException } from '@nestjs/common';
import { UsuarioDTO } from './usuarioDTO';
import { PrismaService } from 'src/db/prisma.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioRepositorio {
    private readonly logger = new Logger(UsuarioRepositorio.name);

    constructor(private readonly prisma: PrismaService) {}

    async salvar(usuario: UsuarioDTO): Promise<Usuario> { // Retorna o tipo Usuario
        this.logger.log('Salvando usuário...');

        // Verifica se a senha foi informada, caso contrário lança um erro
        if (!usuario.senha) {
            throw new HttpException('Senha é obrigatória.', 400);
        }

        try {
            const usuarioSalvo = await this.prisma.usuario.upsert({
                where: { id: usuario.id || '' },
                update: {
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: usuario.senha, // A senha agora é obrigatória
                },
                create: usuario, // Aqui o DTO será usado diretamente
            });

            this.logger.log('Usuário salvo com sucesso!');
            return usuarioSalvo; // Retorna o usuário salvo
        } catch (error) {
            this.logger.error('Erro ao salvar usuário:', error);
            throw new HttpException('Erro ao salvar usuário', 500);
        }
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        this.logger.log('Buscando usuário por e-mail...');
        try {
            const usuario = await this.prisma.usuario.findUnique({ where: { email: email } });
            this.logger.log('Usuário encontrado!');
            return usuario;
        } catch (error) {
            this.logger.error('Erro ao buscar usuário:', error);
            return null;
        }
    }
}
