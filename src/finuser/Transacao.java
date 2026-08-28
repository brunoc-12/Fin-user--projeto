package finuser;

public abstract class Transacao {


    private double saldo;
    private String nome;
    private String descricao;
    private String data;
    private String categoria;


    public abstract void infoTransacao();


}
