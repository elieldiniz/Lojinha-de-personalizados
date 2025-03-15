"use client";
import { useState } from "react";
import FormLoginAuth from "@/components/auth/FormLoginAuth";
import FormCadastro from "@/components/auth/FormCadastro";

interface AuthPageProps {
  logo: React.ReactNode;
  loginTitle: string;
  cadastroTitle: string;
}

export default function AuthPage({ logo, loginTitle, cadastroTitle }: AuthPageProps) {
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  const toggleMode = () => {
    setModo((prev) => (prev === "login" ? "cadastro" : "login"));
  };

  return (
    <>
      {modo === "login" ? (
        <FormLoginAuth toggleMode={toggleMode} logo={logo} loginTitle={loginTitle} />
      ) : (
        <FormCadastro toggleMode={toggleMode} logo={logo} cadastroTitle={cadastroTitle} />
      )}
    </>
  );
}
