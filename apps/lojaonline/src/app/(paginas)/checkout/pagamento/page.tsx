'use client'
import CabecalhoCheckout from '@/components/checkout/CabecalhoCheckout'
import FormularioEntrega from '@/components/checkout/pagamento/FormularioEntrega'
import ResumoPagamento from '@/components/checkout/pagamento/ResumoPagamento'
import SelecaoFormaPagamento from '@/components/checkout/pagamento/SelecaoFormaPagamento'
import useCarrinho from '@/data/hooks/useCarrinho'
import usePagamento from '@/data/hooks/usePagamento'
import { useSessao } from '@/data/contexts/ContextoSesao'
import { useRouter } from 'next/navigation'

export default function Page() {
    const { parcelamento, qtdeItens, valorTotal, valorTotalCheio } = useCarrinho()
    const { entrega, formaPagamento, alterarEntrega, alterarFormaPagamento, finalizarCompra } =
        usePagamento()
    const { usuario } = useSessao()

    const router = useRouter()

    if (!usuario) {
        router.push('http://localhost:3000/auth/cadastro')
        return null;
    }

    return (
        <div className="flex flex-col gap-7 container">
            <CabecalhoCheckout passo="pagamento" />
            <div className="flex gap-5">
                <div className="flex-1 flex flex-col gap-5">
                    <SelecaoFormaPagamento
                        formaPagamento={formaPagamento}
                        formaPagamentoMudou={alterarFormaPagamento}
                    />
                    <FormularioEntrega entrega={entrega} entregaMudou={alterarEntrega} />
                </div>
                <ResumoPagamento
                    qtdeItens={qtdeItens}
                    valorTotal={valorTotal}
                    valorTotalCheio={valorTotalCheio}
                    parcelamento={parcelamento}
                    finalizarCompra={finalizarCompra}
                    className="mt-12"
                />
            </div>
        </div>
    )
}