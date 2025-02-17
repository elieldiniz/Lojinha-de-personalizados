/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProdutoPrismaTs } from './produto.prisma';
import { Produto } from '@prisma/client';


@Controller('produto')
export class ProdutoController {
    constructor(private readonly repo: ProdutoPrismaTs) {}
    /*
     
    */
    @Post()
    async salvarProduto(@Body() produto: Produto): Promise<void> {
        const produtoConvertido = {
            ...produto,
            personalizavel: produto.personalizavel ?? false,
            mockup: produto.mockup ?? null,
            destaque: produto.destaque ?? null,
        };
        return this.repo.salvar(produtoConvertido);
    }

    
    @Get()  // Rota para obter todos os produtos
    obterProdutos(): Promise<Produto[]> {
        return this.repo.obter();
    }

 
    @Get(':id')  // Rota para obter um produto específico por ID
    obterProdutoPorId(@Param('id') id: string): Promise<Produto> {
        return this.repo.ObterProdutoId(+id);
    }

    @Delete(':id')  // Rota para deletar um produto pelo ID
    deletarProduto(@Param('id') id: string): Promise<void> {
        return this.repo.excluir(+id);
    }
}
