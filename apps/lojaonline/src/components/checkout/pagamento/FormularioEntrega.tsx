import { PedidoEntrega } from '@iroperson/core'

export interface FormularioEntregaProps {
    entrega: Partial<PedidoEntrega>
    entregaMudou: (entrega: Partial<PedidoEntrega>) => void
    className?: string
}

export default function FormularioEntrega(props: FormularioEntregaProps) {
    const { entrega, entregaMudou } = props

    function alterarAtributo(atributo: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            entregaMudou({ ...entrega, [atributo]: e.target.value })
        }
    }

    return (
        <div className={`flex flex-col gap-3 ${props.className ?? ''}`}>
            <span className="px-7 pb-2 text-xl font-bold text-white/70">
                Dados da Entrega
            </span>
            <div className="flex flex-col gap-5 bg-violet-dark/50 rounded-xl p-6">
                <input
                    placeholder="Nome Completo"
                    value={entrega.nome}
                    onChange={alterarAtributo('nome')}
                    className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <div className="flex gap-5">
                    <input
                        placeholder="E-mail"
                        value={entrega.email}
                        onChange={alterarAtributo('email')}
                        className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <input
                        placeholder="CPF"
                        value={entrega.cpf}
                        onChange={alterarAtributo('cpf')}
                        className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>
                <div className="flex gap-5">
                    <input
                        placeholder="Logradouro"
                        value={entrega.logradouro}
                        onChange={alterarAtributo('logradouro')}
                        className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <input
                        placeholder="Complemento"
                        value={entrega.complemento}
                        onChange={alterarAtributo('complemento')}
                        className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>
                <div className="flex gap-5">
                    <input
                        placeholder="Cidade"
                        value={entrega.cidade}
                        onChange={alterarAtributo('cidade')}
                        className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <input
                        placeholder="Estado"
                        value={entrega.estado}
                        onChange={alterarAtributo('estado')}
                        className="input bg-violet-dark/70 text-white placeholder:text-white/50 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>
            </div>
        </div>
    )
}