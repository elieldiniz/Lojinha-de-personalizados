import BannerCompra from '@/components/produto/BannerCompra'
import InformacoesProduto from '@/components/produto/InformacoesProduto'
import ProdutoNaoEncontrado from '@/components/produto/ProdutoNaoEncontrado'
import TituloProduto from '@/components/produto/TituloProduto'
import { produtos } from '@/core'

interface PaginaProdutoProps {
    params: {
        id: string; // ou 'number', dependendo de como o ID é passado
    };
}

export default function PaginaProduto(props: PaginaProdutoProps) {
    const id = +props.params.id; // converte o id para número
    const produto = produtos.find((produto) => produto.id === id);

    return produto ? (
        <div className="flex flex-col gap-20 container py-10 ">
            <div className="flex flex-col gap-10 ">
                <TituloProduto produto={produto} />
                <InformacoesProduto produto={produto} />
                <BannerCompra produto={produto} />
            </div>
        </div>
    ) : (
        <ProdutoNaoEncontrado />
    );
}
