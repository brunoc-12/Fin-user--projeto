package finuser;
public class Main {

    public static void main(String[] args) {
        Usuario meuUsuario = new Usuario("João", 1500.00, "Estagiário");
        meuUsuario.usuarioHome();

       Metas minhaMeta = new Metas ("Macbook", 6000.00, 3500.00, "Janeiro de 2027", "Eletronico");
               minhaMeta.metaAtingida();
    }
}