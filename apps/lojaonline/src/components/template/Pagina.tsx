import Cabecalho from './Cabecalho'
import Rodape from './Rodape'
import Categorias from './Categorias';
import Banner from '../banner/Banner';

export interface PaginaProps {
    children: React.ReactNode;
    className?: string
    semCabecalho?: boolean
    semRodape?: boolean
}

export default function Pagina(props: PaginaProps) {
    return (
        <div
            className="flex flex-col min-h-screen w-full"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2d0064 0%, #0d001c 100%)' }}
        >
            <div
                className="flex-1 flex flex-col w-full h-full"
                style={{
                    background: 'url("/background.png")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {!props.semCabecalho && <Cabecalho />}
                {!props.semCabecalho && <Categorias />}

                <div className="w-full flex justify-center items-center">
                  <Banner />
                </div>

                <main className={`flex-1 flex flex-col items-center${props.className ?? ''}`}>
                    {props.children}
                </main>
                {!props.semRodape && <Rodape />}
            </div>
        </div>
    )
}
