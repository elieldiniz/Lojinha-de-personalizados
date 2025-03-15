"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface SessaoContextData {
  usuario: Usuario | null;
  logar: (usuario: Usuario) => void;
  deslogar: () => void;
}

export const ContextoSessao = createContext<SessaoContextData | undefined>(undefined);

export const useSessao = () => {
  const contexto = useContext(ContextoSessao);
  if (!contexto) {
    throw new Error("useSessao deve ser usado dentro de um ProvedorSessao");
  }
  return contexto;
};

interface ProvedorSessaoProps {
  children: ReactNode;
}


export const ProvedorSessao = ({ children }: ProvedorSessaoProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const logar = (usuario: Usuario) => setUsuario(usuario);
  const deslogar = () => setUsuario(null);

  return (
    <ContextoSessao.Provider value={{ usuario, logar, deslogar }}>
      {children}
    </ContextoSessao.Provider>
  );
};