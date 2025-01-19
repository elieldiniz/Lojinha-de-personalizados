
export default function Categorias() {

    return (
        <div
            className="flex flex-col"
            style={{
                background: 'linear-gradient(90deg, #14002D 0%, #420093 50%, #14002D 100%)',
            }}
        >
            <div>
            <ul className="flex flex-wrap justify-center gap-4 m-3">
                    <li className="border-b-4 border-transparent text-white px-4 py-2 hover:border-purple-500 hover:text-purple-300 transition duration-300">
                        Categorias
                    </li>
                    <li className="border-b-4 border-transparent text-white px-4 py-2 hover:border-purple-500 hover:text-purple-300 transition duration-300">
                        Canecas
                    </li>
                    <li className="border-b-4 border-transparent text-white px-4 py-2 hover:border-purple-500 hover:text-purple-300 transition duration-300">
                        Camisetas
                    </li>
                    <li className="border-b-4 border-transparent text-white px-4 py-2 hover:border-purple-500 hover:text-purple-300 transition duration-300">
                        Presentes personalizados
                    </li>
                    <li className="border-b-4 border-purple-500 text-white bg-purple-500 px-4 py-2 hover:bg-purple-700 hover:text-white transition duration-300">
                        Personalize do seu jeito
                    </li>
                </ul>
            </div>
          
        </div>
    );
}