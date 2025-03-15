"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  token: string;
}

interface LoginContextData {
  usuario: Usuario | null;
  logar: (usuario: Usuario) => void;
  deslogar: () => void;
}

const ContextoLogin = createContext<LoginContextData | undefined>(undefined);

export const useLoginContext = () => {
  const contexto = useContext(ContextoLogin);
  if (!contexto) {
    throw new Error("useLoginContext deve ser usado dentro de um ProvedorLogin");
  }
  return contexto;
};

interface ProvedorLoginProps {
  children: ReactNode;
}

// Hook personalizado para usar localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao ler localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao salvar localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export const ProvedorLogin = ({ children }: ProvedorLoginProps) => {
  const [usuario, setUsuario] = useLocalStorage<Usuario | null>("usuario", null);

  const logar = (usuario: Usuario) => {
    setUsuario(usuario);
  };

  const deslogar = () => {
    setUsuario(null);
  };

  useEffect(() => {
    // Carrega o usuário do localStorage na inicialização
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error("Erro ao carregar usuario do localstorage", error);
      }
    }
  }, [setUsuario]);

  return (
    <ContextoLogin.Provider value={{ usuario, logar, deslogar }}>
      {children}
    </ContextoLogin.Provider>
  );
};