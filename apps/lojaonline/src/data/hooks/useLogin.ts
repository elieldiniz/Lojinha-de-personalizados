"use client";
import { useLoginContext } from "@/data/contexts/ContextoLogin";
import useAPI from "@/data/hooks/useAPI";

const useLogin = () => {
  const { logar, deslogar } = useLoginContext();
  const { httpPost } = useAPI();

  const autenticar = async (email: string, senha: string) => {
    try {
      const response = await httpPost("/auth/login", { email, senha });
      if (response.token) {
        logar({ id: "1", nome: email, email, token: response.token });
        return true;
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
    return false;
  };

  return { autenticar, deslogar };
};

export default useLogin;
