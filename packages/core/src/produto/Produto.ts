import Especificacoes from './Especificacoes'
import Precificavel from './Precificavel'

export default interface Produto extends Precificavel {
    id: number
    nome: string
    descricao: string
    especificacoes: Especificacoes
    imagem: string
    nota: number
    videoRevisao: string
    tags: string[]
}
