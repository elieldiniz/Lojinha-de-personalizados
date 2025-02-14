'use client'
import { useState } from "react";
import Link from "next/link";
import { IconEye,  IconEyeOff } from "@tabler/icons-react";

interface ApiResponse {
  mensagem: string;
  token?: string;
}

interface FormLoginAuthProps {
  toggleMode: () => void;
  httpPost: (url: string, dados: Record<string, unknown>) => Promise<ApiResponse>;
  logo: React.ReactNode;
  loginTitle: string;
}

export default function FormLoginAuth({ toggleMode, httpPost, logo, loginTitle }: FormLoginAuthProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, SetMostrarSenha] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await httpPost('/auth/login', { email, senha });
      console.log("Resultado do login:", response);
    } catch (error) {
      console.error("Erro no login:", error);
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
        <Link
          href="/"
          className="absolute top-2 left-2 text-sm text-white hover:text-purple-300"
        >
          ← Voltar
        </Link>
        {logo}

        <h2 className="mt-4 text-white text-lg font-semibold">{loginTitle}</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full mt-6">
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
            { mostrarSenha ? (
               <IconEyeOff
               onClick={alterarMostarSenha}
               className="text-zinc-400"/>
            ) : (
                <IconEye 
                onClick={alterarMostarSenha}
                className="text-zinc-400"/>
            )}

          </div>
          
          <button 
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-lg 
                       transition-all duration-200 flex justify-center items-center"
          >
            Entrar
          </button>
        </form>

        <button
          type="button"
          onClick={toggleMode}
          className="w-full py-2 mt-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white 
                     font-semibold rounded-lg transition-all duration-200 text-center block"
        >
          Ainda não tem conta? Cadastre-se
        </button>
      </div>
    </div>
  );
}
