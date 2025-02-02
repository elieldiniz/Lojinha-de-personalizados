import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
    salvar(usuario: Usuario): Promise<Usuario>; // Alterado de Promise<void> para Promise<Usuario>
    buscarPorEmail(email: string): Promise<Usuario | null>;
}
