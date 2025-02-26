import AvaliacoesUsuarios from '@/components/produto/AvaliacoesUsuarios';
import BannerCompra from '@/components/produto/BannerCompra';
import InformacoesProduto from '@/components/produto/InformacoesProduto';
import MedidorDePreco from '@/components/produto/MedidorDePreco';
import ProdutoNaoEncontrado from '@/components/produto/ProdutoNaoEncontrado';
import TituloProduto from '@/components/produto/TituloProduto';
import { produtos } from '@iroperson/core';

// Tipo dos parâmetros da rota
interface PaginaProdutoProps {
  params: { id: string }; // Mantemos o tipo simples e síncrono
}

/*------
Resolver Peblema de rota id , na hora do build 
--------*/


export default async function PaginaProduto({ params }: PaginaProdutoProps) {
  const id = Number(params.id); // Converte o ID para número
  if (isNaN(id)) return <ProdutoNaoEncontrado />;

  const produto = produtos.find((produto) => produto.id === id);

  return produto ? (
    <div className="flex flex-col gap-20 container py-10">
      <div className="flex flex-col gap-10">
        <TituloProduto produto={produto} />
        <InformacoesProduto produto={produto} />
        <BannerCompra produto={produto} />
        <MedidorDePreco produto={produto} />
      </div>
      <AvaliacoesUsuarios produto={produto} />
    </div>
  ) : (
    <ProdutoNaoEncontrado />
  );
}
