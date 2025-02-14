'use client'
import { useState } from "react";
import FormLoginAuth from "@/components/auth/FormLoginAuth";
import FormCadastro from "@/components/auth/FormCadastro";
import useAPI from "@/data/hooks/useAPI";

interface AuthPageProps {
  logo: React.ReactNode;
  loginTitle: string;
  cadastroTitle: string;
}

export default function AuthPage({ logo, loginTitle, cadastroTitle }: AuthPageProps) {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const { httpPost } = useAPI();

  const toggleMode = () => {
    setModo(prev => (prev === 'login' ? 'cadastro' : 'login'));
  };

  return (
    <>
      {modo === 'login' ? (
        <FormLoginAuth 
          toggleMode={toggleMode} 
          httpPost={httpPost} 
          logo={logo} 
          loginTitle={loginTitle} 
        />
      ) : (
        <FormCadastro 
          toggleMode={toggleMode} 
          httpPost={httpPost} 
          logo={logo} 
          cadastroTitle={cadastroTitle} 
        />
      )}
    </>
  );
}
