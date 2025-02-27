
'use client'
import React, { createContext, useEffect, useState, ReactNode } from 'react'
import {
  ItemPedido,
  Pedido,
  PedidoEntrega,
  StatusPedido,
  FormaPagemento,
  ItemCarrinho,
} from '@iroperson/core'
import { useRouter } from 'next/navigation'
import useLocalStorage from '../hooks/useLocalStorage'
import useCarrinho from '../hooks/useCarrinho'
import useAPI from '../hooks/useAPI'

export interface ContextoPagamentoProps {
  formaPagamento: FormaPagemento
  entrega: Partial<PedidoEntrega>
  alterarFormaPagamento: (formaPagamento: FormaPagemento) => void
  alterarEntrega: (entrega: Partial<PedidoEntrega>) => void
  finalizarCompra: () => void
}

// Valor padrão para o contexto
const defaultPagamento: ContextoPagamentoProps = {
  formaPagamento: FormaPagemento.PIX,
  entrega: {},
  alterarFormaPagamento: () => {},
  alterarEntrega: () => {},
  finalizarCompra: () => {},
}

const ContextoPagamento = createContext<ContextoPagamentoProps>(defaultPagamento)

interface ProvedorPagamentoProps {
  children: ReactNode
}

export function ProvedorPagamento({ children }: ProvedorPagamentoProps): JSX.Element {
  const { httpPost } = useAPI()
  const { itens, valorTotal, limparCarrinho } = useCarrinho()
  const { salvarItem, obterItem } = useLocalStorage()
  const router = useRouter()

  const [formaPagamento, setFormaPagamento] = useState<FormaPagemento>(FormaPagemento.PIX)
  const [entrega, setEntrega] = useState<Partial<PedidoEntrega>>({})

  function alterarFormaPagamento(forma: FormaPagemento) {
    salvarItem('formaPagamento', forma)
    setFormaPagamento(forma)
  }

  function alterarEntrega(novaEntrega: Partial<PedidoEntrega>) {
    salvarItem('entrega', novaEntrega)
    setEntrega(novaEntrega)
  }

  async function finalizarCompra() {
    const pedido: Partial<Pedido> = {
      data: new Date(),
      formaPagamento,
      valorTotal,
      entrega: entrega as PedidoEntrega,
      status: StatusPedido.RECEBIDO,
      itens: itens.map((item: ItemCarrinho) => ({
        produto: item.produto,
        quantidade: item.quantidade,
        precoUnitario: item.produto.precoPromocional,
      })) as ItemPedido[],
    }

    await httpPost('/pedidos', pedido)
    limparCarrinho()
    router.push('/checkout/sucesso')
  }

  useEffect(() => {
    const entregaSalva = obterItem('entrega')
    const formaSalva = obterItem('formaPagamento')
    if (entregaSalva) setEntrega(entregaSalva)
    if (formaSalva) setFormaPagamento(formaSalva)
  }, [obterItem])

  return (
    <ContextoPagamento.Provider
      value={{
        formaPagamento,
        entrega,
        alterarFormaPagamento,
        alterarEntrega,
        finalizarCompra,
      }}
    >
      {children}
    </ContextoPagamento.Provider>
  )
}

export default ContextoPagamento
