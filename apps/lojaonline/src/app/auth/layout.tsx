"use client";
import { ReactNode } from "react";
import { ProvedorLogin } from "@/data/contexts/ContextoLogin";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ProvedorLogin>
      {children}
    </ProvedorLogin>
  );
}
