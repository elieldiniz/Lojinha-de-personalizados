// useAPI.ts
export interface ApiResponse {
    mensagem: string;
    token?: string;
  }
  
  export default function useAPI() {
    const urlBase = process.env.NEXT_PUBLIC_API_URL;
  
    async function httpGet(url: string): Promise<ApiResponse> {
      const caminho = url.startsWith('/') ? url : `/${url}`;
      const urlCompleta = `${urlBase}${caminho}`;
      const resposta = await fetch(urlCompleta);
      return extrairDados(resposta);
    }
  
    async function httpPost(url: string, dados: Record<string, unknown>): Promise<ApiResponse> {
      const caminho = url.startsWith('/') ? url : `/${url}`;
      const urlCompleta = `${urlBase}${caminho}`;
      
      const resposta = await fetch(urlCompleta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      
      return extrairDados(resposta);
    }
  
    async function extrairDados(resposta: Response): Promise<ApiResponse> {
      try {
        return await resposta.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return { mensagem: await resposta.text() };
      }
    }
    
    return { httpGet, httpPost };
  }
  