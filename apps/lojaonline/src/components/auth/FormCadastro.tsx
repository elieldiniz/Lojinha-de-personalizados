import Logo from "../shared/Logo";

export default function FormCadastro() {
  return (
    <div 
      className="flex justify-center items-center min-h-screen p-4"
      style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2d0064 0%, #0d001c 100%)' }}
    >
      <div className="flex flex-col justify-center items-center w-full max-w-sm p-6 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg relative">
        {/* Botão Voltar */}
        <button 
          type="button" 
          className="absolute top-2 left-2 text-sm text-white hover:text-purple-300"
        >
          ← Voltar
        </button>

        <Logo />

        <h2 className="mt-4 text-white text-lg font-semibold">Cadastrar</h2>

        <div className="flex flex-col gap-4 w-full mt-6">
          <input 
            type="text" 
            className="w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Nome"
          />
          <input 
            type="email" 
            className="w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Digite seu email"
          />
          <input 
            type="password" 
            className="w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Digite sua senha"
          />
          <button 
            className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
