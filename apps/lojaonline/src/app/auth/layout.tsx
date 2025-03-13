'use client'

import { ReactNode } from "react";
import ProvedorSesao from "@/data/contexts/ContextoSesao"; // Importação correta do default export

interface LayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <ProvedorSesao>
        {children}
      </ProvedorSesao>
    </div>
  );
}

