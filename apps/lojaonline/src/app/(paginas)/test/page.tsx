import { useContext } from "react"
import ContextoSessao from "@/data/contexts/ContextoSesao"
export default function PaginaTest(){

    useContext(ContextoSessao)

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}