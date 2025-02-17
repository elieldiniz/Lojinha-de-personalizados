/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { PrismaProvider } from 'src/db/prisma.provider';


@Injectable()
export class ProdutoPrismaTs {
    constructor(private readonly prisma: PrismaProvider ) {}

    async salvar(produto: Produto){
        return this.prisma.produto.upsert({
            where: {id: produto.id ?? -1},
            update: produto,
            create: produto
        })
    }
}
