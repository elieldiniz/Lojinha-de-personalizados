import React, { ReactNode } from 'react';
import Pagina from '@/components/template/Pagina';
import { ProvedorCarrinho } from '@/data/contexts/ContextoCarrinho';
import { ProvedorPagamento } from '@/data/contexts/ContextoPagamento';
import { ProvedorProdutos } from '@/data/contexts/ContextoProdutos';
import{ProvedorSessao } from '@/data/contexts/ContextoSesao'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
            <ProvedorSessao>
                         <ProvedorProdutos>
                    <ProvedorCarrinho>
                        <ProvedorPagamento>
                            <Pagina>{children}</Pagina>
                        </ProvedorPagamento>
                    </ProvedorCarrinho>
                </ProvedorProdutos>
            </ProvedorSessao>
    );
}