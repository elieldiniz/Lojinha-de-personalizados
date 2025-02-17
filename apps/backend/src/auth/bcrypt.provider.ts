/* eslint-disable prettier/prettier */
import { ProvedorCriptografia } from '@iroperson/core';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider implements ProvedorCriptografia {
    async criptografar(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(senha, salt);
    }

    async comparar(senha: string, senhaCriptografada: string): Promise<boolean> {
        return await bcrypt.compare(senha, senhaCriptografada);
    }
}
