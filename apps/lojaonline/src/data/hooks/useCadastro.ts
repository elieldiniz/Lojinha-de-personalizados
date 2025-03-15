"use client";
import { useLoginContext } from "@/data/contexts/ContextoLogin";
import useAPI from "@/data/hooks/useAPI";

const useCadastro = () => {
  const { logar } = useLoginContext();
  const { httpPost } = useAPI();

  const cadastrar = async (nome: string, email: string, senha: string, telefone: string) => {
    try {
      const response = await httpPost("/auth/registrar", { nome, email, senha, telefone });
      if (response.token) {
        logar({ id: "1", nome, email, token: response.token });
        return true;
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
    return false;
  };

  return { cadastrar };
};

export default useCadastro;
