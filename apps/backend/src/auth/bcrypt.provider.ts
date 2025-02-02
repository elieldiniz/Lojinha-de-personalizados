import { ProvedorCriptografia } from '@iroperson/core';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider implements ProvedorCriptografia {
    async criptografar(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(senha, salt)
    }

    comparar(senha: string, senhaCriptografada: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
  
    
}
