
'use client'
import React, { createContext, useEffect, useState, ReactNode } from 'react'
import {
  CalcularParcelamento,
  Carrinho,
  ItemCarrinho,
  Parcelamento,
  Produto,
} from '@iroperson/core'
import useLocalStorage from '../hooks/useLocalStorage'

export interface ContextoCarrinhoProps {
  itens: ItemCarrinho[]
  qtdeItens: number
  valorTotalCheio: number
  valorTotal: number
  parcelamento: Parcelamento
  adicionarItem: (produto: Produto) => void
  removerItem: (produto: Produto) => void
  removerProduto: (produto: Produto) => void
  limparCarrinho: () => void
}

// Valor padrão para o contexto
const defaultCarrinho: ContextoCarrinhoProps = {
  itens: [],
  qtdeItens: 0,
  valorTotalCheio: 0,
  valorTotal: 0,
  parcelamento: new CalcularParcelamento().executar(0),
  adicionarItem: () => {},
  removerItem: () => {},
  removerProduto: () => {},
  limparCarrinho: () => {},
}

const ContextoCarrinho = createContext<ContextoCarrinhoProps>(defaultCarrinho)

interface ProvedorCarrinhoProps {
  children: ReactNode
}

export function ProvedorCarrinho({ children }: ProvedorCarrinhoProps): JSX.Element {
  const { salvarItem, obterItem } = useLocalStorage()
  const [carrinho, setCarrinho] = useState<Carrinho>(new Carrinho())

  function adicionarItem(produto: Produto) {
    alterarCarrinho(carrinho.adicionarItem(produto))
  }

  function removerItem(produto: Produto) {
    alterarCarrinho(carrinho.removerItem(produto))
  }

  function removerProduto(produto: Produto) {
    alterarCarrinho(carrinho.removerProduto(produto))
  }

  function limparCarrinho() {
    alterarCarrinho(carrinho.limpar())
  }

  function alterarCarrinho(carrinhoAtualizado: Carrinho) {
    salvarItem('carrinho', carrinhoAtualizado.itens)
    setCarrinho(carrinhoAtualizado)
  }

  useEffect(() => {
    const itensSalvos: ItemCarrinho[] = obterItem('carrinho')
    if (itensSalvos) setCarrinho(new Carrinho(itensSalvos))
  }, [obterItem])

  return (
    <ContextoCarrinho.Provider
      value={{
        itens: carrinho.itens,
        qtdeItens: carrinho.qtdeItens,
        valorTotal: carrinho.valorTotal,
        valorTotalCheio: carrinho.valorTotalCheio,
        parcelamento: new CalcularParcelamento().executar(carrinho.valorTotal),
        adicionarItem,
        removerItem,
        removerProduto,
        limparCarrinho,
      }}
    >
      {children}
    </ContextoCarrinho.Provider>
  )
}

export default ContextoCarrinho
