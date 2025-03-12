import { ReactNode, createContext } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface SessaoContextData {
  numero: number;
}

// Cria o contexto com um valor padrão
const ContextoSesao = createContext<SessaoContextData>({ numero: 0 });

export default function ProvedorSesao({ children }: LayoutProps) {
  // Valor que será disponibilizado no contexto
  const valorContexto: SessaoContextData = { numero: 1000 };

  return (
    <ContextoSesao.Provider value={valorContexto}>
      {children}
    </ContextoSesao.Provider>
  );
}
