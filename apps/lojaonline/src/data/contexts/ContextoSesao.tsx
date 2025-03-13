'use client'
import * as React from 'react';
import { ReactNode, createContext } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface SessaoContextData {
  numero: number;
}

// Cria o contexto com o tipo explícito
const ContextoSesao = createContext<SessaoContextData>({ numero: 0 });



export default function ProvedorSesao({ children }: LayoutProps): JSX.Element {
  
  const valorContexto: SessaoContextData = { numero:0 };

  return (
    <div className='bg-black text-cyan-200 border-s-red-600' >
          <ContextoSesao.Provider value={valorContexto}>
            {children}
        </ContextoSesao.Provider>
    </div>
  );
}
