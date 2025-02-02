import { IsEmail, IsOptional, IsString, Length, IsEnum } from 'class-validator';
import { Perfil } from '@prisma/client';  // Importe a enumeração Perfil do Prisma

export class CriarUsuarioDTO {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    @Length(2, 50, { message: 'O nome deve ter entre 2 e 50 caracteres.' })
    nome: string;

    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsString()
    @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
    senha: string; // Agora é obrigatório

    @IsOptional()
    @IsString()
    @Length(10, 15, { message: 'O telefone deve ter entre 10 e 15 caracteres.' })
    telefone?: string;

    @IsOptional()
    @IsString()
    endereco?: string; // Adicionando endereço como opcional

    @IsOptional()
    @IsString()
    cpf?: string;

    @IsOptional()
    @IsEnum(Perfil)  // Usa a enumeração Perfil
    perfil?: Perfil;

    @IsOptional()
    status?: boolean; // Opcional, mas pode ser usado para indicar se o usuário está ativo
}
