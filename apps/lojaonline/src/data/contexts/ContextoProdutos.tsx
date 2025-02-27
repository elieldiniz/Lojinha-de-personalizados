
'use client'
import React, { createContext, useCallback, useEffect, useMemo, useState, ReactNode } from 'react'
import { FiltrarProdutos, Produto } from '@iroperson/core'
import useAPI from '../hooks/useAPI'

export interface ContextoProdutosProps {
  produtos: Produto[]
  pesquisa: string
  setPesquisa: (pesquisa: string) => void
  produtoPorId: (id: number) => Produto | null
}

// Valor padrão para o contexto
const defaultContextoProdutos: ContextoProdutosProps = {
  produtos: [],
  pesquisa: '',
  setPesquisa: () => {},
  produtoPorId: () => null,
}

// Cria o contexto com o valor padrão
const ContextoProdutos = createContext<ContextoProdutosProps>(defaultContextoProdutos)

interface ProvedorProdutosProps {
  children: ReactNode
}

export const ProvedorProdutos: React.FC<ProvedorProdutosProps> = ({ children }) => {
  const { httpGet } = useAPI()
  const [pesquisa, setPesquisa] = useState<string>('')
  const [produtos, setProdutos] = useState<Produto[]>([])

  const carregarProdutos = useCallback(async () => {
    const resposta = await httpGet('/produtos')
    if (Array.isArray(resposta)) {
      setProdutos(resposta as Produto[])
    } else {
      console.error("Resposta inesperada da API:", resposta)
      setProdutos([])
    }
  }, [httpGet])

  useEffect(() => {
    carregarProdutos()
  }, [carregarProdutos])

  // Calcula os produtos filtrados com base na pesquisa
  const produtosFiltrados = useMemo(() => {
    if (!pesquisa) return produtos
    return new FiltrarProdutos().executar(pesquisa, produtos)
  }, [pesquisa, produtos])

  return (
    <ContextoProdutos.Provider
      value={{
        pesquisa,
        produtos: produtosFiltrados,
        setPesquisa,
        produtoPorId: (id: number) =>
          produtos.find((produto) => produto.id === id) ?? null,
      }}
    >
      {children}
    </ContextoProdutos.Provider>
  )
}

export default ContextoProdutos
