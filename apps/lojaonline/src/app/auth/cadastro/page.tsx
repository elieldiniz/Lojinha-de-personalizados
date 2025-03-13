'use client'
import AuthPage from "@/components/auth/AuthPage";
import Logo from "@/components/shared/Logo"; // Importação da logo

export default function Cadastro() {
  return (
    <>
      <AuthPage
         logo={<Logo />} 
         loginTitle="Entrar na Plataforma" 
         cadastroTitle="Cadastrar" 
      />
    </>
  );
}
