'use client'
import Logo from '../shared/Logo'
import IconeCarrinho from '../shared/IconeCarrinho'
import Link from 'next/link'
import Image from 'next/image'

import useCarrinho from '@/data/hooks/useCarrinho'

export default function Cabecalho() {

    const {qtdeItens} = useCarrinho()

    return (
        <div
            className="flex flex-col items-center h-24 "
            style={{
                background: 'linear-gradient(90deg, #14002D 0%, #420093 50%, #14002D 100%)',
            }}
        >
            <div className="flex-1 container flex flex-col justify-center ">
                <div className="flex justify-between items-center h-20 px-4 ml-10"> {/* Ajustada a altura dos itens */}
                    <Logo />
                    <div  className="flex gap-5">
                        <input
                        type="text"
                        placeholder="Pesquisar"
                        className="border text-slate-900 border-gray-300 rounded-md px-4 py-2 w-64 "
                        />
                        <button className=" bg-pink-600 text-white font-bold py-2 px-4 rounded">
                        Pesquisar
                        </button>
                    </div>

                    <Link href="/" className="border-spacing-1.5">

                        <div className='flex'>
                        <Image src="/account.png" width={50} height={50} alt="account" />
                            <h2>Entra & <br />Cadastre</h2>
                        </div>
                    </Link>

                    <Link href="/checkout/carrinho">
                        <IconeCarrinho qtdeItens={qtdeItens} />
                    </Link>
                </div>
            </div>
            <div className="h-px bg-gradient-to-r from-violet-600/20 via-violet-600/80 to-violet-600/20"></div>
        </div>
    );
}