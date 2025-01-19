/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import UsuarioDTO from './ausuario';
import { PrismaService } from 'src/db/prisma.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioRepositorio {

    private readonly logger = new Logger(UsuarioRepositorio.name);

    constructor(private readonly prisma: PrismaService) {

    }

    async salvar(usuario: UsuarioDTO): Promise<void> {
        this.logger.log('Salvando usuário...');
        if (usuario.id) {
            try {
                await this.prisma.usuario.upsert({
                    where: { id: usuario.id },
                    update: {
                        nome: usuario.nome,
                        email: usuario.email,
                        senha: usuario.senha
                    },
                    create: usuario as any
                });
                this.logger.log('Usuário salvo com sucesso!');
            } catch (error) {
                this.logger.error('Erro ao salvar usuário:', error);
            }
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