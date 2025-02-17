/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { PrismaProvider } from 'src/db/prisma.provider';


@Injectable()
export class ProdutoPrismaTs {
    constructor(private readonly prisma: PrismaProvider ) {}

    async salvar(produto: Produto): Promise<void>{
        await this.prisma.produto.upsert({
            where: {id: produto.id ?? -1},
            update: produto,
            create: produto
        })
    }

    async obter(): Promise<Produto[]> {
        const produtos = await this.prisma.produto.findMany();
        return produtos;
    }
    
    async ObterProdutoId(id: number): Promise<Produto | null> {
        const produto = await this.prisma.produto.findUnique({ where: { id } });
        return produto; 
    }

    async excluir(id: number): Promise<void>{
        await this.prisma.produto.delete({where: {id: id}})
    }
}
