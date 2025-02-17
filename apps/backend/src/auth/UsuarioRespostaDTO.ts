/* eslint-disable prettier/prettier */
import { Perfil } from '@prisma/client';

export default class UsuarioRespostaDTO {
    id: string;
    nome: string;
    email: string;
    telefone?: string;
    endereco?: string;
    cpf?: string;
    perfil?: Perfil;
    status: boolean;
}
