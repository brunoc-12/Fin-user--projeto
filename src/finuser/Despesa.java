package finuser;

public class Despesa extends Transacao implements notificacao{
    private double saldoDespesa;
    private String nomeDespesa;
    private String descricaoDespesa;


    public Despesa( double valor, String descricao, String nome) {
        this.descricaoDespesa = descricaoDespesa;
        this.nomeDespesa = nomeDespesa;
        this.saldoDespesa = saldoDespesa;
    }

    public void saldodespesa(){
        System.out.println("Saldo de Despesa: " + saldoDespesa);
    }

    public void nomeDespesa (){
        System.out.println("Nome de Despesa:" + nomeDespesa); }

    public void descricaoDespesa (){
        System.out.println("Descrição Despesa: " +descricaoDespesa);
    }

    public void exibirInformacoes(){
        System.out.println("Seu saldo da Despesa  é: " + saldoDespesa + "\n" +
                "Essa Despesa é: " + nomeDespesa + "\n" +
                "Mais informação da Despesa: " + descricaoDespesa);
    }


    @Override
    public void exibirNotificacao(){
        System.out.println("Despesa adicionada com sucesso");
    }
    @Override
    public  void infoTransacao(){
        nomeDespesa();
        descricaoDespesa();


    }


}
