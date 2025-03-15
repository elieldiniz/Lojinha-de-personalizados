'use client'
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import useCadastro from "@/data/hooks/useCadastro"; 

interface FormCadastroProps {
  toggleMode: () => void;
  logo: React.ReactNode;
  cadastroTitle: string;
}

export default function FormCadastro({ toggleMode, logo, cadastroTitle }: FormCadastroProps) {
  const { cadastrar } = useCadastro();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mostrarSenha, SetMostrarSenha] = useState(false)

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await cadastrar(nome, email, senha, telefone);
    if (sucesso) {
      console.log("Cadastro realizado com sucesso!");
      toggleMode(); // Alterna para a tela de login
    }
  };

  function alterarMostarSenha(){
    SetMostrarSenha(!mostrarSenha)
  }


  return (
    <div 
      className="flex justify-center items-center min-h-screen p-4"
      style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2d0064 0%, #0d001c 100%)' }}
    >
      <div className="relative flex flex-col justify-center items-center w-full max-w-sm p-6 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        {/* Botão Voltar que alterna para o formulário de login */}
        <button 
          type="button" 
          onClick={toggleMode}
          className="absolute top-2 left-2 text-sm text-white hover:text-purple-300"
        >
          ← Voltar
        </button>

        {/* Renderiza a logo passada pelo componente pai */}
        {logo}

        <h2 className="mt-4 text-white text-lg font-semibold">{cadastroTitle}</h2>

        <form onSubmit={handleCadastro} className="flex flex-col gap-4 w-full mt-6">
          <input 
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Digite seu nome"
          />
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Digite seu email"
          />
                <div className=" flex w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none 
                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400">
            <input 
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-transparent outline-none flex-1"
              placeholder="Digite sua senha"

            />
 {mostrarSenha ? (
              <IconEyeOff onClick={() => alterarMostarSenha()} />
            ) : (
              <IconEye onClick={() => alterarMostarSenha()} />
            )}

          </div>
          <input 
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full px-4 py-3 text-white bg-zinc-900 bg-opacity-70 border border-transparent rounded-lg outline-none 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
            placeholder="Digite seu telefone"
          />
          <button 
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-lg 
                       transition-all duration-200 flex justify-center items-center"
          >
            Cadastrar
          </button>
        </form>

        <button 
          type="button"
          onClick={toggleMode}
          className="w-full py-2 mt-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white 
                     font-semibold rounded-lg transition-all duration-200"
        >
          Já tem conta? Entre na plataforma!
        </button>
      </div>
    </div>
  );
}
