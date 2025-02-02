/* eslint-disable prettier/prettier */
import { Injectable, Logger, HttpException } from '@nestjs/common';
import { CriarUsuarioDTO } from './CriarUsuarioDTO';
import { PrismaService } from 'src/db/prisma.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioRepositorio {
    private readonly logger = new Logger(UsuarioRepositorio.name);

    constructor(private readonly prisma: PrismaService) {}

    async salvar(usuario: CriarUsuarioDTO): Promise<Usuario> {
        this.logger.log('Salvando usuário...');
        
        try {
            const usuarioSalvo = await this.prisma.usuario.create({
                data: {
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: usuario.senha, // A senha já deve estar criptografada antes de salvar
                    telefone: usuario.telefone,
                    endereco: usuario.endereco,
                    cpf: usuario.cpf,
                    perfil: usuario.perfil,
                    status: true
                }
            });

            this.logger.log('Usuário salvo com sucesso!');
            return usuarioSalvo;
        } catch (error) {
            this.logger.error('Erro ao salvar usuário:', error);
            throw new HttpException('Erro ao salvar usuário', 500);
        }
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        this.logger.log('Buscando usuário por e-mail...');
        return this.prisma.usuario.findUnique({ where: { email } });
    }
}
