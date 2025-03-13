import { useContext } from "react"
import ContextoSessao from "@/data/contexts/ContextoSesao"

export default function PaginaTest(){

    const {numero} = useContext(ContextoSessao)

    return (
        <div>
            <h1>{numero}</h1>
        </div>
    )
}