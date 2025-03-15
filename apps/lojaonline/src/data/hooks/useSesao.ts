"use client";
import { useContext } from "react";
import {ContextoSessao} from "@/data/contexts/ContextoSesao";


export default function useSesao() {
  const contexto = useContext(ContextoSessao);
  if (!contexto) {
    throw new Error("useSessao deve ser usado dentro de um ProvedorSessao.");
  }
  return contexto;
}
