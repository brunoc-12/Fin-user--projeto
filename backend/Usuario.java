package finuser;

public class Usuario {
    private String nome;
    private double saldo;
    private String profissao;

    public Usuario(String nome, double saldo, String profissao ) {
        this.nome = nome;
        this.saldo = saldo;
        this.profissao = profissao;
    }

    public void usuarioHome () {
        System.out.println("seja Bem-Vindo ao seu amigo financeiro. ");
    }
}
