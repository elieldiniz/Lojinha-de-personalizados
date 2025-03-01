import { ReactNode } from "react";
import { createContext } from "@";

interface LayoutProps {
  children: ReactNode;
}

export default function ProvedorSesão({ children }: LayoutProps) {
  return (
    <div>
      <ContextoSesao>{children}</ContextoSesao>
      {children}
    </div>
  );
}
